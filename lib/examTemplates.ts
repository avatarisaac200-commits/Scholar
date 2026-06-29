import { ExamTemplate, ExamTemplateId, PrepMode, TestSection } from '../types';

const defaultDifficultyMix = { easy: 30, medium: 50, hard: 20 };

export const EXAM_TEMPLATES: ExamTemplate[] = [
  {
    id: 'utme-standard',
    prepMode: 'utme',
    name: 'JAMB UTME Standard',
    description: 'Official UTME structure: English 60 questions plus three selected subjects with 40 questions each, 120 minutes total.',
    durationMinutes: 120,
    totalQuestions: 180,
    optionCount: 4,
    scoringNote: '1 mark per correct answer. Wrong or unanswered questions score 0; no negative marking.',
    officialDetailsStatus: 'specified',
    structureSource: 'official',
    officialStructureNote: 'JAMB UTME uses 180 four-option MCQs: Use of English 60, three other subjects 40 each, in one 120-minute CBT session.',
    sections: [
      { id: 'utme_english', name: 'Use of English', questionCount: 60, marksPerQuestion: 1, subjectFilter: 'Use of English' },
      { id: 'utme_subject_1', name: 'UTME Subject 1', questionCount: 40, marksPerQuestion: 1 },
      { id: 'utme_subject_2', name: 'UTME Subject 2', questionCount: 40, marksPerQuestion: 1 },
      { id: 'utme_subject_3', name: 'UTME Subject 3', questionCount: 40, marksPerQuestion: 1 }
    ]
  },
  {
    id: 'oau-legacy',
    prepMode: 'oau',
    name: 'OAU Prep Custom',
    description: 'Current OAU past-question practice format. Admins can adjust sections, subjects, and timing.',
    durationMinutes: 60,
    totalQuestions: 20,
    optionCount: 4,
    scoringNote: 'Practice scoring uses 1 mark per correct answer with no negative marking.',
    officialDetailsStatus: 'partially-specified',
    structureSource: 'institution-practice',
    officialStructureNote: 'This preserves the existing OAU Prep flow rather than imposing a fully official exam structure.',
    sections: [
      { id: 'oau_section_1', name: 'Section 1', questionCount: 20, marksPerQuestion: 1 }
    ]
  },
  {
    id: 'putme-configurable',
    prepMode: 'putme',
    name: 'OAU Post-UTME Standard',
    description: 'OAU Post-UTME practice structure: 10 Aptitude questions plus 10 questions from each of three licensed subjects.',
    durationMinutes: 60,
    totalQuestions: 40,
    optionCount: 4,
    scoringNote: 'Practice scoring assumes 1 mark per correct answer with no negative marking. OAU has not published a contrary scoring rule.',
    officialDetailsStatus: 'specified',
    structureSource: 'institution-practice',
    officialStructureNote: 'OAU Post-UTME practice uses 40 questions: 10 Aptitude plus 10 each from three licensed subjects.',
    sections: [
      { id: 'putme_aptitude', name: 'Aptitude', questionCount: 10, marksPerQuestion: 1, subjectFilter: 'Aptitude', tags: ['aptitude'] },
      { id: 'putme_subject_1', name: 'P-UTME Subject 1', questionCount: 10, marksPerQuestion: 1 },
      { id: 'putme_subject_2', name: 'P-UTME Subject 2', questionCount: 10, marksPerQuestion: 1 },
      { id: 'putme_subject_3', name: 'P-UTME Subject 3', questionCount: 10, marksPerQuestion: 1 }
    ]
  }
];

export const getExamTemplatesForPrepMode = (prepMode: PrepMode) => {
  return EXAM_TEMPLATES.filter((template) => template.prepMode === prepMode);
};

export const getExamTemplate = (templateId?: ExamTemplateId | string | null) => {
  return EXAM_TEMPLATES.find((template) => template.id === templateId) || null;
};

export const getDefaultExamTemplateForPrepMode = (prepMode: PrepMode) => {
  return getExamTemplatesForPrepMode(prepMode)[0] || null;
};

export const buildSectionsFromExamTemplate = (template: ExamTemplate): TestSection[] => {
  const stamp = Date.now();
  return template.sections.map((section, index) => ({
    id: `sec_${template.id}_${index}_${stamp}`,
    name: section.name,
    questionIds: [],
    marksPerQuestion: section.marksPerQuestion,
    questionCount: section.questionCount,
    sampleFilters: {
      subjects: section.subjectFilter ? [section.subjectFilter] : [],
      topics: [],
      difficulties: ['easy', 'medium', 'hard'],
      tags: section.tags || []
    },
    difficultyMix: { ...defaultDifficultyMix }
  }));
};
