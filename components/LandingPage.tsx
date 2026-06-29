import logo from '../assets/scholar-main.png';
import PartnershipLogos from './PartnershipLogos';

interface LandingPageProps {
  onGetStarted: () => void;
}

const stats = [
  { value: '2', label: 'Exam modes' },
  { value: '100+', label: 'CBT questions per UTME session' },
  { value: '40', label: 'OAU P-UTME questions' }
];

const subjects = ['English', 'Biology', 'Chemistry', 'Physics', 'Maths', 'Economics', 'Literature'];

const modes = [
  {
    name: 'JAMB UTME',
    shortName: 'UTME',
    title: 'JAMB exam practice setup',
    body: 'English Language is compulsory. Students select three other subjects, choose practice or full test mode, and start inside a CBT-style session.',
    accent: 'gold',
    compulsory: 'English Language',
    progress: '1 / 4 selected',
    optionalChecks: ['Include current JAMB novel questions', 'Include English comprehension questions'],
    slots: ['Biology', 'Chemistry', 'Physics'],
    emptySlots: [],
    testModes: [
      { label: 'Practice Mode', minutes: 35, active: false },
      { label: 'Full Test Mode', minutes: 120, active: true }
    ],
    resources: ['Current JAMB Novel', 'Latest JAMB Brochure', 'Latest JAMB Syllabus'],
    specs: ['100 questions per session', '4 subjects per session', 'Official CBT-style pacing', 'Subject-level score review']
  },
  {
    name: 'OAU Post-UTME',
    shortName: 'PUTME',
    title: 'Post-UTME practice setup',
    body: 'Aptitude is auto-included. Students complete the remaining subject slots around their intended course and practice in a tighter screening format.',
    accent: 'blue',
    compulsory: 'Aptitude',
    progress: '1 / 4 selected',
    optionalChecks: ['Mix quantitative reasoning into aptitude', 'Prioritize recent OAU-style questions'],
    slots: ['Mathematics', 'Physics'],
    emptySlots: ['Select Subject 4'],
    testModes: [
      { label: 'Practice Mode', minutes: 20, active: false },
      { label: 'Screening Mode', minutes: 40, active: true }
    ],
    resources: ['OAU Past Questions', 'Faculty Subject Guide', 'Screening Tips'],
    specs: ['40 questions per session', 'Aptitude auto-included', 'Faculty-aware subject mix', 'Past-paper style review']
  }
];

const features = [
  {
    title: 'Realistic timed sessions',
    body: 'Students practice under the same pressure they will face in the exam room.'
  },
  {
    title: 'Smart question rotation',
    body: 'Questions rotate across topic, year, difficulty, source, and subject tags.'
  },
  {
    title: 'Review mode',
    body: 'Every attempt can be reviewed with correct answers, selected answers, and explanations.'
  },
  {
    title: 'Performance analytics',
    body: 'Score history, average score, best score, completion rate, and subject accuracy stay visible.'
  },
  {
    title: 'Licensed access',
    body: 'Students only see the prep modes and subjects assigned by their admin.'
  },
  {
    title: 'Managed question bank',
    body: 'Admins maintain the content pool while students get simple, repeatable practice.'
  }
];

const analyticsPoints = [
  ['Avg score', '68%', 'text-amber-300'],
  ['Sessions', '23', 'text-sky-300'],
  ['Best score', '84%', 'text-emerald-300']
];

const accuracy = [
  ['Chemistry', 84, 'bg-emerald-400'],
  ['English', 76, 'bg-sky-400'],
  ['Physics', 62, 'bg-amber-400'],
  ['Biology', 51, 'bg-rose-400']
];

const questionCells = Array.from({ length: 40 }, (_, index) => {
  if (index === 12) return 'bg-sky-400';
  if (index === 7 || index === 9) return 'bg-violet-400';
  if (index < 12) return 'bg-amber-400';
  return 'bg-white/10';
});

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-[100dvh] overflow-y-auto bg-[#080d1a] text-[#f8fafc] safe-top safe-bottom">
      <header className="sticky top-0 z-40 border-b border-amber-400/10 bg-[#080d1a]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 md:px-8">
          <button type="button" onClick={onGetStarted} className="flex items-center gap-3 text-left">
            <img src={logo} alt="Scholar!" className="h-10 w-10 bg-white object-contain shadow-lg shadow-black/20" />
            <div>
              <p className="font-display text-xl font-black leading-none tracking-tight">
                Scholar<span className="text-amber-400">!</span>
              </p>
              <p className="mt-1 text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">CBT Prep</p>
            </div>
          </button>

          <nav className="hidden items-center gap-8 text-sm font-bold text-slate-400 md:flex">
            <a href="#modes" className="hover:text-white">Exam modes</a>
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#analytics" className="hover:text-white">Analytics</a>
            <a href="#institutions" className="hover:text-white">Institutions</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onGetStarted}
              className="hidden border border-white/10 px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-amber-400/60 hover:text-amber-300 sm:inline-flex"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={onGetStarted}
              className="bg-amber-400 px-4 py-2 font-display text-sm font-black text-slate-950 shadow-lg shadow-amber-400/20 transition hover:bg-amber-300"
            >
              Start
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute right-[-12rem] top-[-14rem] h-[34rem] w-[34rem] rounded-full bg-amber-400/10 blur-3xl" />
          <div className="absolute bottom-[-14rem] left-[-12rem] h-[30rem] w-[30rem] rounded-full bg-sky-500/10 blur-3xl" />

          <div className="relative mx-auto grid min-h-[calc(100svh-68px)] max-w-7xl grid-cols-1 gap-10 px-5 py-12 md:grid-cols-[0.92fr_1.08fr] md:items-center md:px-8 md:py-16">
            <div className="max-w-2xl">
              <p className="mb-6 inline-flex items-center gap-2 border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-amber-300">
                <span className="h-2 w-2 bg-amber-400 shadow-[0_0_16px_rgba(251,191,36,0.85)]" />
                Nigeria-focused CBT preparation
              </p>
              <h1 className="font-display text-[3rem] font-black leading-[0.98] tracking-tight text-white sm:text-[4.25rem] md:text-[5rem]">
                Practice for the exam you actually have to pass.
              </h1>
              <p className="mt-6 max-w-xl text-base font-medium leading-8 text-slate-300 sm:text-lg">
                Scholar gives UTME and OAU Post-UTME candidates a realistic CBT workspace, licensed subject access, fresh practice sessions, and analytics that show exactly what to fix next.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="bg-amber-400 px-7 py-4 font-display text-sm font-black text-slate-950 shadow-xl shadow-amber-400/20 transition hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Start practicing
                </button>
                <a
                  href="#modes"
                  className="border border-white/10 px-7 py-4 text-center text-sm font-bold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  Explore exam modes
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                {stats.map(item => (
                  <div key={item.label}>
                    <p className="font-display text-2xl font-black text-white sm:text-3xl">{item.value}</p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 sm:text-xs">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative pb-8 md:pb-0">
              <div className="absolute -right-2 -top-4 z-10 hidden border border-white/10 bg-[#111827] p-4 shadow-2xl shadow-black/40 md:block">
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Latest score</p>
                <p className="mt-2 font-display text-4xl font-black text-white">72<span className="text-lg text-amber-300">%</span></p>
                <div className="mt-3 h-1.5 w-32 bg-white/10">
                  <div className="h-full w-[72%] bg-emerald-400" />
                </div>
              </div>

              <div className="border border-white/10 bg-[#111827] shadow-2xl shadow-black/50">
                <div className="flex items-center justify-between border-b border-white/10 bg-[#1c2437] px-4 py-4 sm:px-5">
                  <div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-amber-300">JAMB UTME practice</p>
                    <p className="mt-1 text-xs font-bold text-slate-400">Question 13 of 40</p>
                  </div>
                  <div className="border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 font-mono text-base font-black text-white">
                    01:47:23
                  </div>
                </div>
                <div className="h-1 bg-white/10">
                  <div className="h-full w-[32%] bg-gradient-to-r from-amber-500 to-amber-200" />
                </div>

                <div className="p-5 sm:p-6">
                  <div className="mb-5 inline-flex border border-sky-400/25 bg-sky-400/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-sky-300">
                    Biology / Genetics
                  </div>
                  <p className="text-base font-semibold leading-8 text-white">
                    Which option best describes the law of independent assortment as proposed by Gregor Mendel?
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      'Alleles of one gene separate independently during gamete formation',
                      'Each organism inherits one allele from each parent for every trait',
                      'Dominant traits always mask recessive traits',
                      'Genes on the same chromosome are always inherited together'
                    ].map((option, index) => (
                      <div
                        key={option}
                        className={`flex items-start gap-3 border px-4 py-3 text-sm leading-6 ${
                          index === 1
                            ? 'border-amber-400/60 bg-amber-400/10 text-white'
                            : 'border-white/10 bg-white/[0.025] text-slate-300'
                        }`}
                      >
                        <span className={`grid h-6 w-6 shrink-0 place-items-center font-mono text-xs font-black ${index === 1 ? 'bg-amber-400 text-slate-950' : 'bg-white/10 text-slate-400'}`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-4 sm:px-5">
                  <button type="button" className="border border-white/10 px-4 py-2 text-xs font-bold text-slate-400">Prev</button>
                  <div className="grid max-w-[220px] flex-1 grid-cols-10 gap-1">
                    {questionCells.map((color, index) => (
                      <span key={index} className={`aspect-square ${color}`} />
                    ))}
                  </div>
                  <button type="button" className="bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">Next</button>
                </div>
              </div>

              <div className="mt-4 border border-white/10 bg-[#111827] p-4">
                <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Subject selection / JAMB UTME</p>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject, index) => (
                    <span
                      key={subject}
                      className={`border px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] ${
                        index === 0
                          ? 'border-amber-400/50 bg-amber-400/10 text-amber-300'
                          : index < 4
                            ? 'border-sky-400/40 bg-sky-400/10 text-sky-300'
                            : 'border-white/10 text-slate-500'
                      }`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="modes" className="border-b border-white/10 bg-[#080d1a] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">Exam modes</p>
                <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
                  UTME and PUTME should start like a real CBT setup.
                </h2>
              </div>
              <div className="border border-white/10 bg-[#111827] p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="grid h-16 w-16 shrink-0 place-items-center bg-amber-400 font-display text-2xl font-black text-slate-950">
                    CBT
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-black text-white">Exam practice setup, not a generic quiz picker</h3>
                    <p className="mt-2 text-sm font-medium leading-7 text-slate-400">
                      Inspired by the simulator flow in the `.mhtml`: compulsory paper first, selected subject slots next, then a clear test-mode choice before the session begins.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">
              {modes.map(mode => (
                <article key={mode.name} className="relative overflow-hidden border border-white/10 bg-[#111827] shadow-xl shadow-black/20">
                  <div className={`absolute right-0 top-0 h-56 w-56 ${mode.accent === 'gold' ? 'bg-amber-400/10' : 'bg-sky-400/10'} blur-3xl`} />
                  <div className="relative">
                    <div className="border-b border-white/10 p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className={`inline-flex border px-3 py-1.5 font-mono text-[10px] font-black uppercase tracking-[0.14em] ${mode.accent === 'gold' ? 'border-amber-400/40 bg-amber-400/10 text-amber-300' : 'border-sky-400/40 bg-sky-400/10 text-sky-300'}`}>
                            {mode.name}
                          </p>
                          <h3 className="mt-4 font-display text-2xl font-black leading-tight text-white">{mode.title}</h3>
                        </div>
                        <span className={`grid h-12 w-12 shrink-0 place-items-center font-display text-sm font-black ${mode.accent === 'gold' ? 'bg-amber-400 text-slate-950' : 'bg-sky-400 text-slate-950'}`}>
                          {mode.shortName}
                        </span>
                      </div>
                      <p className="mt-4 text-sm font-medium leading-7 text-slate-400">{mode.body}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.08fr_0.92fr]">
                      <div className="border-b border-white/10 p-5 sm:p-6 lg:border-b-0 lg:border-r">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`h-8 w-8 ${mode.accent === 'gold' ? 'bg-amber-400/15 text-amber-300' : 'bg-sky-400/15 text-sky-300'} grid place-items-center font-display text-sm font-black`}>
                              1
                            </span>
                            <p className="font-display text-base font-black text-white">Select Subjects</p>
                          </div>
                          <span className="bg-white/5 px-3 py-1 text-xs font-black text-slate-400">{mode.progress}</span>
                        </div>

                        <div className="bg-white/[0.04] p-4">
                          <div className="flex items-center justify-between gap-3">
                            <h4 className="font-display text-lg font-black text-white">{mode.compulsory}</h4>
                            <span className={`${mode.accent === 'gold' ? 'text-amber-300' : 'text-sky-300'} text-xs font-black uppercase tracking-[0.16em]`}>
                              Locked
                            </span>
                          </div>
                          <div className="mt-4 space-y-3">
                            {mode.optionalChecks.map(check => (
                              <label key={check} className="flex items-center gap-3 text-xs font-bold normal-case tracking-normal text-slate-400">
                                <span className={`h-4 w-4 border ${mode.accent === 'gold' ? 'border-amber-400/50 bg-amber-400/20' : 'border-sky-400/50 bg-sky-400/20'}`} />
                                {check}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 space-y-3">
                          {[...mode.slots, ...mode.emptySlots].map((slot, index) => {
                            const isEmpty = slot.toLowerCase().startsWith('select');
                            return (
                              <div
                                key={`${mode.name}-${slot}`}
                                className={`flex items-center justify-between border border-dashed px-4 py-3 text-sm font-bold ${
                                  isEmpty
                                    ? 'border-white/15 bg-white/[0.02] text-slate-500'
                                    : mode.accent === 'gold'
                                      ? 'border-amber-400/30 bg-amber-400/10 text-amber-100'
                                      : 'border-sky-400/30 bg-sky-400/10 text-sky-100'
                                }`}
                              >
                                <span>{isEmpty ? slot : `${index + 2}. ${slot}`}</span>
                                <span className={`grid h-5 w-5 place-items-center text-xs ${isEmpty ? 'bg-white/10 text-slate-500' : mode.accent === 'gold' ? 'bg-amber-400 text-slate-950' : 'bg-sky-400 text-slate-950'}`}>
                                  {isEmpty ? '+' : '✓'}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <span className={`h-8 w-8 ${mode.accent === 'gold' ? 'bg-amber-400/15 text-amber-300' : 'bg-sky-400/15 text-sky-300'} grid place-items-center font-display text-sm font-black`}>
                            2
                          </span>
                          <p className="font-display text-base font-black text-white">Select Test Mode</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          {mode.testModes.map(testMode => (
                            <div
                              key={testMode.label}
                              className={`min-h-[128px] border p-4 ${
                                testMode.active
                                  ? mode.accent === 'gold'
                                    ? 'border-amber-400 bg-amber-400/10'
                                    : 'border-sky-400 bg-sky-400/10'
                                  : 'border-white/10 bg-white/[0.025]'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className={`h-4 w-4 rounded-full border ${testMode.active ? mode.accent === 'gold' ? 'border-amber-300 bg-amber-400' : 'border-sky-300 bg-sky-400' : 'border-white/25'}`} />
                                <span className="bg-white px-2 py-1 text-center text-[10px] font-black text-slate-950">
                                  {testMode.label}
                                </span>
                              </div>
                              <div className="mt-7 flex items-end gap-1">
                                <p className="font-display text-4xl font-black leading-none text-white">{testMode.minutes}</p>
                                <p className="pb-1 text-xs font-bold text-slate-400">Min</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 border border-white/10 bg-[#080d1a] p-4">
                          <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Get ready</p>
                          <div className="mt-3 grid grid-cols-1 gap-2">
                            {mode.resources.map(resource => (
                              <div key={resource} className="flex items-center gap-3 bg-white/[0.035] px-3 py-2 text-xs font-bold text-slate-300">
                                <span className={`h-2 w-2 ${mode.accent === 'gold' ? 'bg-amber-400' : 'bg-sky-400'}`} />
                                {resource}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
                      {mode.specs.map(spec => (
                        <div key={spec} className="border-r border-white/10 px-4 py-4 last:border-r-0">
                          <p className="text-xs font-black leading-5 text-slate-300">{spec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-[#eef2f8] px-5 py-20 text-slate-950 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">Platform features</p>
                <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight md:text-5xl">
                  Every tool a serious candidate expects.
                </h2>
              </div>
              <p className="text-base font-semibold leading-8 text-slate-600">
                The student experience stays simple: pick the right mode, start a realistic session, review mistakes, and use the dashboard to choose the next move.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <article key={feature.title} className="border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400">
                  <div className="grid h-11 w-11 place-items-center bg-slate-950 font-display text-sm font-black text-amber-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-black tracking-tight">{feature.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="analytics" className="border-y border-white/10 bg-[#080d1a] px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">Performance tracking</p>
              <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
                Know your numbers. Close your gaps.
              </h2>
              <p className="mt-5 max-w-xl text-base font-medium leading-8 text-slate-400">
                Scholar turns attempts into useful direction: scores, subject accuracy, trend movement, completion history, and review data are visible without digging.
              </p>
              <div className="mt-7 space-y-3">
                {['Subject-level score history', 'Topic and difficulty tagging', 'Review-first learning loop'].map(item => (
                  <div key={item} className="flex items-center gap-3 border border-white/10 bg-white/[0.025] px-4 py-3 text-sm font-bold text-slate-300">
                    <span className="h-2.5 w-2.5 bg-amber-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-white/10 bg-[#111827] shadow-2xl shadow-black/40">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#1c2437] px-5 py-4">
                <p className="font-display font-black text-white">My Performance Dashboard</p>
                <p className="bg-[#080d1a] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Last 30 days</p>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-3 gap-3">
                  {analyticsPoints.map(([label, value, color]) => (
                    <div key={label} className="border border-white/10 bg-white/[0.035] p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
                      <p className={`mt-2 font-display text-3xl font-black ${color}`}>{value}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Score trend</p>
                <div className="mt-4 flex h-40 items-end gap-3 border-b border-white/10">
                  {[48, 55, 51, 63, 60, 72, 68, 84].map((height, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center gap-2">
                      <div className={`w-full ${index === 7 ? 'bg-amber-400' : index > 2 ? 'bg-amber-400/25' : 'bg-white/10'}`} style={{ height: `${height}%` }} />
                      <p className="font-mono text-[10px] text-slate-600">S{index + 1}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Subject accuracy</p>
                <div className="mt-4 space-y-4">
                  {accuracy.map(([subject, score, color]) => (
                    <div key={subject as string} className="grid grid-cols-[92px_1fr_42px] items-center gap-3 text-sm">
                      <p className="font-bold text-slate-300">{subject}</p>
                      <div className="h-2 bg-white/10">
                        <div className={`h-full ${color}`} style={{ width: `${score}%` }} />
                      </div>
                      <p className="text-right font-mono text-xs font-bold text-slate-400">{score}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="institutions" className="bg-[#111827] px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">For schools and prep centres</p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
                Question pools, licenses, practice, analytics, and admin control in one place.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-400">
                Institutions can manage verified content, assign prep access, monitor performance, and keep students practicing inside a controlled system.
              </p>
            </div>
            <div className="border border-white/10 bg-[#080d1a] p-6">
              <PartnershipLogos variant="dark" className="items-start" />
              <button
                type="button"
                onClick={onGetStarted}
                className="mt-7 w-full bg-amber-400 px-7 py-4 font-display text-sm font-black text-slate-950 shadow-xl shadow-amber-400/20 transition hover:bg-amber-300"
              >
                Get started with Scholar
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#080d1a] px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-lg font-black text-white">
            Scholar<span className="text-amber-400">!</span>
          </p>
          <p>Built for Nigerian exam candidates preparing for UTME and OAU Post-UTME.</p>
        </div>
      </footer>
    </div>
  );
}
