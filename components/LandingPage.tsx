import logo from '../assets/scholar-main.png';
import PartnershipLogos from './PartnershipLogos';

interface LandingPageProps {
  onGetStarted: () => void;
}

const stats = [
  { value: '180', label: 'UTME question structure' },
  { value: '40', label: 'OAU P-UTME practice set' },
  { value: '24/7', label: 'CBT-ready preparation' }
];

const features = [
  {
    title: 'Exam-accurate practice',
    body: 'UTME locks English by default and OAU P-UTME locks Aptitude, then builds a fresh session from the subjects in each learner license.'
  },
  {
    title: 'Smarter question rotation',
    body: 'Each attempt is generated from admin-managed pools with duplicate prevention, difficulty balancing, and lower priority for questions a learner has already seen.'
  },
  {
    title: 'Performance analytics',
    body: 'Students can track attempts, completion, subject trends, best scores, and review-ready results from one focused dashboard.'
  },
  {
    title: 'Built for schools and cohorts',
    body: 'Admins manage prep modes, subject licenses, question banks, leaderboards, class tools, announcements, schedules, and learning resources.'
  }
];

const workflow = [
  'Activate the right prep license',
  'Choose UTME or OAU P-UTME mode',
  'Select the required subject combination',
  'Start a fresh timed CBT session',
  'Review outcomes and improve the next attempt'
];

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-[100dvh] bg-slate-950 text-white overflow-y-auto safe-top safe-bottom">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <button type="button" onClick={onGetStarted} className="flex items-center gap-3 text-left">
            <img src={logo} alt="Scholar!" className="h-10 w-10 rounded-xl object-contain bg-white" />
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-400">Scholar!</p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">CBT Prep Engine</p>
            </div>
          </button>
          <nav className="hidden items-center gap-8 text-xs font-black uppercase tracking-widest text-slate-300 md:flex">
            <a href="#practice" className="hover:text-amber-400">Practice</a>
            <a href="#analytics" className="hover:text-amber-400">Analytics</a>
            <a href="#admin" className="hover:text-amber-400">Admin</a>
          </nav>
          <button
            type="button"
            onClick={onGetStarted}
            className="rounded-xl bg-amber-500 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-950 shadow-lg shadow-amber-500/20"
          >
            Get Started
          </button>
        </div>
      </header>

      <main>
        <section className="relative min-h-[88svh] overflow-hidden">
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="absolute right-[-10rem] top-8 h-[42rem] w-[42rem] max-w-none object-contain opacity-20 md:right-[-4rem] md:top-12 md:opacity-25"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#020617_0%,rgba(2,6,23,0.92)_42%,rgba(2,6,23,0.65)_100%)]" />
          <div className="relative mx-auto grid min-h-[88svh] max-w-7xl grid-cols-1 content-center gap-10 px-5 py-14 md:grid-cols-[1.1fr_0.9fr] md:px-8">
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.26em] text-amber-300">
                UTME. OAU P-UTME. Real CBT rhythm.
              </p>
              <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-7xl">
                Scholar!
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-bold leading-relaxed text-slate-300 md:text-xl">
                A modern exam-prep workspace for students who need realistic practice, cleaner feedback, sharper analytics, and licensed subject access that mirrors real entrance exam structure.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="rounded-2xl bg-amber-500 px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-950 shadow-xl shadow-amber-500/20"
                >
                  Sign In
                </button>
                <a
                  href="#practice"
                  className="rounded-2xl border border-white/15 px-8 py-4 text-center text-xs font-black uppercase tracking-widest text-white hover:border-amber-400/60"
                >
                  See How It Works
                </a>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {stats.map(item => (
                  <div key={item.label} className="border-l border-white/15 pl-4">
                    <p className="text-3xl font-black text-amber-400">{item.value}</p>
                    <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="self-end border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-widest text-slate-300">Live Practice Console</p>
                <span className="rounded-lg bg-emerald-400/15 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-300">Ready</span>
              </div>
              <div className="space-y-3">
                {['English Language - Locked', 'Biology - Selected', 'Chemistry - Selected', 'Physics - Selected'].map((item, index) => (
                  <div key={item} className="flex items-center justify-between border border-white/10 bg-slate-950/70 px-4 py-3">
                    <span className="text-sm font-bold text-white">{item}</span>
                    <span className={`h-3 w-3 ${index === 0 ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-950/70 p-3">
                  <p className="text-xl font-black text-white">93%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Best</p>
                </div>
                <div className="bg-slate-950/70 p-3">
                  <p className="text-xl font-black text-white">12</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Attempts</p>
                </div>
                <div className="bg-slate-950/70 p-3">
                  <p className="text-xl font-black text-white">4</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Subjects</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="practice" className="bg-white px-5 py-20 text-slate-950 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-600">Practice Mode</p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-5xl">Built around the exam, not random quizzes.</h2>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-4">
              {features.map(item => (
                <article key={item.title} className="border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-lg font-black uppercase tracking-tight">{item.title}</h3>
                  <p className="mt-4 text-sm font-bold leading-relaxed text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="analytics" className="bg-slate-100 px-5 py-20 text-slate-950 md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-700">Student Analytics</p>
              <h2 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-5xl">Know what is improving and what is costing marks.</h2>
              <p className="mt-5 text-base font-bold leading-relaxed text-slate-600">
                Scholar turns every session into progress data: attempt history, completion rate, score trends, subject breakdowns, answer review, and leaderboard-ready public summaries where enabled.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Score trend', 'Subject strength', 'Completion rate', 'Review mode', 'Leaderboard', 'Offline drafts'].map((item) => (
                <div key={item} className="bg-white p-5 shadow-sm">
                  <p className="text-sm font-black uppercase tracking-wide text-slate-900">{item}</p>
                  <div className="mt-4 h-2 bg-slate-100">
                    <div className="h-full bg-slate-950" style={{ width: `${55 + (item.length % 4) * 10}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="admin" className="bg-slate-950 px-5 py-20 text-white md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_0.85fr] md:items-start">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-400">Admin-Controlled Pools</p>
                <h2 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-5xl">Admins manage the bank. Students launch fresh practice.</h2>
                <p className="mt-5 max-w-2xl text-base font-bold leading-relaxed text-slate-300">
                  Question pools are tagged by prep mode, subject, difficulty, topic, year, and source. Students never need to hunt for test cards in UTME or P-UTME mode; their dashboard launches exam-format practice directly from the licensed pool.
                </p>
              </div>
              <div className="space-y-3">
                {workflow.map((item, index) => (
                  <div key={item} className="flex items-center gap-4 border border-white/10 bg-white/5 p-4">
                    <span className="flex h-9 w-9 items-center justify-center bg-amber-500 text-sm font-black text-slate-950">{index + 1}</span>
                    <p className="text-sm font-black uppercase tracking-wide text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
              <PartnershipLogos variant="dark" size="compact" />
              <button
                type="button"
                onClick={onGetStarted}
                className="rounded-2xl bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-slate-950"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
