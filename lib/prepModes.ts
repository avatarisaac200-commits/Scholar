import { MockTest, PrepMode, TestSection, User } from '../types';

export const PREP_MODES: PrepMode[] = ['utme', 'oau', 'putme'];

export const DEFAULT_PREP_MODE: PrepMode = 'oau';

export const PREP_MODE_LABELS: Record<PrepMode, string> = {
  utme: 'UTME Prep',
  oau: 'OAU Prep',
  putme: 'OAU P-UTME Prep'
};

export const PREP_MODE_DESCRIPTIONS: Record<PrepMode, string> = {
  utme: 'Practice for JAMB UTME with focused subject tests and exam-style drills.',
  oau: 'Use the original OAU past-question and CBT practice experience.',
  putme: 'Prepare for OAU post-UTME with tailored practice and review.'
};

export const PREP_MODE_FEATURES: Record<PrepMode, {
  courses: boolean;
  videos: boolean;
  community: boolean;
  attendance: boolean;
}> = {
  utme: {
    courses: false,
    videos: false,
    community: false,
    attendance: false
  },
  oau: {
    courses: true,
    videos: true,
    community: true,
    attendance: true
  },
  putme: {
    courses: false,
    videos: false,
    community: false,
    attendance: false
  }
};

export const isPrepFeatureEnabled = (prepMode: PrepMode, feature: keyof typeof PREP_MODE_FEATURES[PrepMode]) => {
  return PREP_MODE_FEATURES[prepMode]?.[feature] === true;
};

export const normalizePrepMode = (value: unknown): PrepMode => {
  return PREP_MODES.includes(value as PrepMode) ? value as PrepMode : DEFAULT_PREP_MODE;
};

export const getTestPrepMode = (value: { prepMode?: PrepMode | string | null }): PrepMode => {
  return normalizePrepMode(value?.prepMode || DEFAULT_PREP_MODE);
};

export const getLicenseForPrepMode = (user: User | null, prepMode: PrepMode) => {
  return user?.licenses?.[prepMode] || null;
};

const normalizeSubject = (value: string) => value.trim().toLowerCase();
const COMPULSORY_EXAM_SUBJECTS = new Set([
  'english',
  'english language',
  'use of english',
  'aptitude'
]);

const GENERIC_SECTION_NAMES = new Set([
  'section',
  'section 1',
  'quiz',
  'utme subject 1',
  'utme subject 2',
  'utme subject 3',
  'utme subject combination',
  'p-utme subject 1',
  'p-utme subject 2',
  'p-utme subject 3'
]);

export const getRequiredSubjectsForSections = (sections: TestSection[] = []) => {
  const subjects = new Set<string>();
  sections.forEach((section) => {
    section.sampleFilters?.subjects?.forEach((subject) => {
      const trimmed = subject.trim();
      if (trimmed) subjects.add(trimmed);
    });

    const sectionName = section.name?.trim();
    if (sectionName && !GENERIC_SECTION_NAMES.has(normalizeSubject(sectionName))) {
      subjects.add(sectionName);
    }
  });
  return Array.from(subjects);
};

export const getRequiredSubjectsForTest = (test: MockTest | null) => {
  if (!test) return [];
  return getRequiredSubjectsForSections(test.sections || []);
};

export const hasActivePrepLicense = (user: User | null, prepMode: PrepMode, requiredSubjects: string[] = []) => {
  const license = getLicenseForPrepMode(user, prepMode);
  if (license?.status === 'active') {
    const endsAt = Date.parse(license.endsAt || '');
    const activeByDate = !license.endsAt || (Number.isFinite(endsAt) && endsAt > Date.now());
    if (!activeByDate) return false;
    if (!requiredSubjects.length || !license.scope || license.scope === 'all') return true;
    const allowed = new Set((license.subjects || []).map(normalizeSubject).filter(Boolean));
    return requiredSubjects.every((subject) => {
      const normalized = normalizeSubject(subject);
      return COMPULSORY_EXAM_SUBJECTS.has(normalized) || allowed.has(normalized);
    });
  }

  if (prepMode === DEFAULT_PREP_MODE && user?.subscriptionStatus === 'active') {
    if (!user.subscriptionEndsAt) return true;
    const endsAt = Date.parse(user.subscriptionEndsAt);
    return Number.isFinite(endsAt) && endsAt > Date.now();
  }

  return false;
};
