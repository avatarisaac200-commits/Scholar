import { MockTest, PrepMode, TestSection, User } from '../types';
import { getLicenseForPrepMode, getTestPrepMode } from './prepModes';

export const UTME_COMPULSORY_SUBJECT = 'English Language';
export const UTME_ENGLISH_FILTERS = ['English Language', 'Use of English', 'English'];
export const PUTME_COMPULSORY_SUBJECT = 'Aptitude';

const defaultDifficultyMix = { easy: 30, medium: 50, hard: 20 };

export interface ExamModeFlowConfig {
  prepMode: PrepMode;
  compulsorySubject: string;
  additionalSubjectCount: number;
  compulsoryQuestionCount: number;
  additionalQuestionCount: number;
  durationSeconds?: number;
  totalQuestions: number;
  title: string;
  instruction: string;
}

export const EXAM_MODE_FLOW_CONFIGS: Partial<Record<PrepMode, ExamModeFlowConfig>> = {
  utme: {
    prepMode: 'utme',
    compulsorySubject: UTME_COMPULSORY_SUBJECT,
    additionalSubjectCount: 3,
    compulsoryQuestionCount: 60,
    additionalQuestionCount: 40,
    durationSeconds: 120 * 60,
    totalQuestions: 180,
    title: 'Choose UTME Subjects',
    instruction: 'English Language is compulsory. Select exactly three additional licensed subjects.'
  },
  putme: {
    prepMode: 'putme',
    compulsorySubject: PUTME_COMPULSORY_SUBJECT,
    additionalSubjectCount: 3,
    compulsoryQuestionCount: 10,
    additionalQuestionCount: 10,
    durationSeconds: 60 * 60,
    totalQuestions: 40,
    title: 'Choose OAU P-UTME Subjects',
    instruction: 'Aptitude is compulsory. Select exactly three licensed subjects for the 40-question session.'
  }
};

export const getExamModeFlowConfig = (testOrMode: MockTest | PrepMode | string | null | undefined) => {
  const prepMode = typeof testOrMode === 'string' ? testOrMode as PrepMode : getTestPrepMode(testOrMode || {});
  return EXAM_MODE_FLOW_CONFIGS[prepMode] || null;
};

export const shouldUseSubjectCombinationFlow = (test: MockTest) => {
  return Boolean(getExamModeFlowConfig(test));
};

export const getLicensedSubjectsForPrepMode = (user: User | null, prepMode: PrepMode) => {
  const license = getLicenseForPrepMode(user, prepMode);
  if (license?.scope === 'subjects') {
    return Array.from(new Set((license.subjects || []).map(subject => subject.trim()).filter(Boolean)));
  }
  return [];
};

const makeSection = (
  testId: string,
  name: string,
  questionCount: number,
  subjects: string[],
  tags: string[] = []
): TestSection => ({
  id: `sec_${testId}_${name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_${Date.now()}`,
  name,
  questionIds: [],
  marksPerQuestion: 1,
  questionCount,
  sampleFilters: {
    subjects,
    topics: [],
    difficulties: ['easy', 'medium', 'hard'],
    tags
  },
  difficultyMix: { ...defaultDifficultyMix }
});

export const applySubjectCombinationToTest = (
  test: MockTest,
  selectedSubjects: string[]
): MockTest => {
  const config = getExamModeFlowConfig(test);
  if (!config) return test;

  const trimmedSubjects = selectedSubjects.map(subject => subject.trim()).filter(Boolean);
  const compulsorySection = config.prepMode === 'utme'
    ? makeSection(test.id, config.compulsorySubject, config.compulsoryQuestionCount, UTME_ENGLISH_FILTERS)
    : makeSection(test.id, config.compulsorySubject, config.compulsoryQuestionCount, [PUTME_COMPULSORY_SUBJECT], ['aptitude']);

  const subjectSections = trimmedSubjects.map(subject => (
    makeSection(test.id, subject, config.additionalQuestionCount, [subject])
  ));

  return {
    ...test,
    name: `${test.name} - ${config.compulsorySubject} + ${trimmedSubjects.join(', ')}`,
    sections: [compulsorySection, ...subjectSections],
    generationMode: 'dynamic',
    totalDurationSeconds: config.durationSeconds || test.totalDurationSeconds
  };
};
