import logo from '../assets/scholar-main.png';
import PartnershipLogos from './PartnershipLogos';

interface LandingPageProps {
  onGetStarted: () => void;
}

const stats = [
  { value: '2', label: 'Exam tracks' },
  { value: '100+', label: 'UTME questions per session' },
  { value: '40', label: 'OAU screening questions' }
];

const examModes = [
  {
    name: 'JAMB UTME',
    description: 'English is locked in first, then students choose three more subjects and practice in a familiar CBT flow.',
    details: ['4 subjects per session', 'Practice or full test mode', 'Novel and comprehension options']
  },
  {
    name: 'OAU Post-UTME',
    description: 'Aptitude is included automatically, with course-aware subject choices and shorter screening-style sessions.',
    details: ['40-question sessions', 'Aptitude first', 'Past-question review loop']
  }
];

const features = [
  {
    title: 'Timed CBT sessions',
    body: 'Students practice with realistic pacing, subject setup, question navigation, and session review.'
  },
  {
    title: 'Focused analytics',
    body: 'Scores, completion rate, best attempts, and subject accuracy are easy to scan after every practice run.'
  },
  {
    title: 'Managed access',
    body: 'Schools and prep centres control assigned modes, question banks, and licensed student access.'
  }
];

const subjects = ['English', 'Biology', 'Chemistry', 'Physics'];
const trendBars = [42, 58, 53, 66, 72, 84];

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-[100dvh] overflow-y-auto bg-[#f6f8fc] text-slate-950 safe-top safe-bottom">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
          <button type="button" onClick={onGetStarted} className="flex min-w-0 items-center gap-3 text-left">
            <img src={logo} alt="Scholar!" className="h-11 w-11 shrink-0 object-contain" />
            <div className="min-w-0">
              <p className="font-display text-xl font-black leading-none tracking-tight">
                Scholar<span className="text-amber-500">!</span>
              </p>
              <p className="mt-1 text-xs font-bold text-slate-500">CBT prep for Nigerian exams</p>
            </div>
          </button>

          <nav className="hidden items-center gap-7 text-sm font-bold text-slate-600 md:flex">
            <a href="#modes" className="transition hover:text-slate-950">Exam modes</a>
            <a href="#features" className="transition hover:text-slate-950">Features</a>
            <a href="#schools" className="transition hover:text-slate-950">Schools</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onGetStarted}
              className="hidden border border-slate-300 bg-white px-4 py-2 text-sm font-black text-slate-800 shadow-sm transition hover:border-slate-400 sm:inline-flex"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={onGetStarted}
              className="bg-slate-950 px-4 py-2 text-sm font-black text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800"
            >
              Start now
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-slate-200 bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl grid-cols-1 gap-10 px-5 py-10 md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-8 md:py-14">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-black uppercase tracking-[0.14em] text-amber-700">
                <span className="h-2 w-2 bg-amber-500" />
                UTME and OAU Post-UTME
              </div>

              <h1 className="mt-6 font-display text-[2.7rem] font-black leading-[1.02] tracking-tight text-slate-950 sm:text-[4rem] lg:text-[4.8rem]">
                Exam practice that is clear, focused, and built like CBT.
              </h1>

              <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-slate-600">
                Scholar helps candidates set up the right subjects, practice timed sessions, review mistakes, and see what to fix before exam day.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="bg-amber-400 px-7 py-4 text-center font-display text-sm font-black text-slate-950 shadow-xl shadow-amber-400/25 transition hover:bg-amber-300"
                >
                  Start practicing
                </button>
                <a
                  href="#modes"
                  className="border border-slate-300 bg-white px-7 py-4 text-center text-sm font-black text-slate-800 shadow-sm transition hover:border-slate-400"
                >
                  View exam modes
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {stats.map(item => (
                  <div key={item.label} className="border border-slate-200 bg-slate-50 p-4">
                    <p className="font-display text-3xl font-black text-slate-950">{item.value}</p>
                    <p className="mt-1 text-sm font-bold leading-5 text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="border border-slate-200 bg-white shadow-2xl shadow-slate-950/10">
                <div className="flex flex-col gap-4 border-b border-slate-200 bg-slate-950 p-5 text-white sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-amber-300">JAMB UTME Practice</p>
                    <p className="mt-1 text-sm font-semibold text-slate-300">Question 13 of 40</p>
                  </div>
                  <div className="w-fit bg-white px-3 py-2 font-mono text-base font-black text-slate-950">01:47:23</div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="mb-5 flex flex-wrap gap-2">
                    {subjects.map((subject, index) => (
                      <span
                        key={subject}
                        className={`border px-3 py-2 text-xs font-black ${
                          index === 0
                            ? 'border-amber-300 bg-amber-50 text-amber-700'
                            : 'border-sky-200 bg-sky-50 text-sky-700'
                        }`}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>

                  <p className="text-lg font-black leading-8 text-slate-950">
                    Which option best describes the law of independent assortment?
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
                        className={`flex items-start gap-3 border px-4 py-3 text-sm font-semibold leading-6 ${
                          index === 1
                            ? 'border-amber-300 bg-amber-50 text-slate-950'
                            : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        <span className={`grid h-7 w-7 shrink-0 place-items-center font-mono text-xs font-black ${index === 1 ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'}`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 border-t border-slate-200 bg-slate-50 sm:grid-cols-4">
                  {['Answered 12', 'Flagged 2', 'Left 28', 'Score 72%'].map(item => (
                    <div key={item} className="border-r border-slate-200 p-4 text-sm font-black text-slate-700 last:border-r-0">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-slate-950">Performance trend</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">Last six attempts</p>
                  </div>
                  <p className="font-display text-3xl font-black text-emerald-600">84%</p>
                </div>
                <div className="mt-5 flex h-28 items-end gap-3 border-b border-slate-200">
                  {trendBars.map((height, index) => (
                    <div key={index} className="flex flex-1 items-end">
                      <div className={`w-full ${index === trendBars.length - 1 ? 'bg-emerald-500' : 'bg-slate-300'}`} style={{ height: `${height}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="modes" className="border-b border-slate-200 bg-[#f6f8fc] px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">Exam modes</p>
              <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl">
                The setup matches how candidates actually prepare.
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {examModes.map(mode => (
                <article key={mode.name} className="border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-display text-2xl font-black text-slate-950">{mode.name}</h3>
                  <p className="mt-3 text-base font-medium leading-8 text-slate-600">{mode.description}</p>
                  <div className="mt-6 grid gap-3">
                    {mode.details.map(detail => (
                      <div key={detail} className="flex items-center gap-3 border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-700">
                        <span className="h-2.5 w-2.5 bg-amber-400" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="bg-white px-5 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-700">Why it works</p>
                <h2 className="mt-3 font-display text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-5xl">
                  Less clutter. More practice.
                </h2>
              </div>
              <p className="text-base font-semibold leading-8 text-slate-600">
                The landing page now mirrors the product promise: direct actions, readable sections, and product UI examples that explain the value quickly.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
              {features.map(feature => (
                <article key={feature.title} className="border border-slate-200 bg-slate-50 p-6">
                  <h3 className="font-display text-xl font-black tracking-tight text-slate-950">{feature.title}</h3>
                  <p className="mt-3 text-sm font-medium leading-7 text-slate-600">{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="schools" className="border-y border-slate-800 bg-slate-950 px-5 py-16 text-white md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-[1fr_0.8fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-amber-300">For schools and prep centres</p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl font-black leading-tight tracking-tight md:text-5xl">
                Manage question pools, student access, and exam performance in one place.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-medium leading-8 text-slate-300">
                Admins can assign preparation modes, maintain content, and track practice outcomes without making the student experience harder.
              </p>
            </div>
            <div className="border border-white/10 bg-white/[0.04] p-6">
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

      <footer className="bg-white px-5 py-8 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm font-semibold text-slate-500 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-lg font-black text-slate-950">
            Scholar<span className="text-amber-500">!</span>
          </p>
          <p>Built for Nigerian exam candidates preparing for UTME and OAU Post-UTME.</p>
        </div>
      </footer>
    </div>
  );
}
