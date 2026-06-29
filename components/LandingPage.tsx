import logo from '../assets/scholar-main.png';
import PartnershipLogos from './PartnershipLogos';

interface LandingPageProps {
  onGetStarted: () => void;
}

const metrics = [
  { label: 'UTME format', value: '180 questions' },
  { label: 'OAU P-UTME', value: '40 questions' },
  { label: 'Practice source', value: 'Admin pool' }
];

const productHighlights = [
  'Licensed subject combinations',
  'Fresh generated sessions',
  'Attempt history and review',
  'Subject performance analytics'
];

const sections = [
  {
    eyebrow: 'Practice',
    title: 'Exam structure, not random drills',
    body: 'Scholar locks the compulsory paper, lets students pick the licensed subjects they actually need, and generates a fresh CBT-style session from the approved question pool.'
  },
  {
    eyebrow: 'Analytics',
    title: 'A dashboard that shows what to fix next',
    body: 'Students see attempts, best score, average score, completion rate, recent reviews, and subject performance without digging through old test cards.'
  },
  {
    eyebrow: 'Admin',
    title: 'One managed bank, many realistic sessions',
    body: 'Admins maintain questions by prep mode, subject, topic, difficulty, year, and source. Students simply start practicing from the pool their license unlocks.'
  }
];

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-[100dvh] overflow-y-auto bg-[#f7f4ee] text-slate-950 safe-top safe-bottom">
      <header className="sticky top-0 z-40 border-b border-slate-950/10 bg-[#f7f4ee]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <button type="button" onClick={onGetStarted} className="flex items-center gap-3 text-left">
            <img src={logo} alt="Scholar!" className="h-11 w-11 rounded-lg bg-white object-contain shadow-sm" />
            <div>
              <p className="text-base font-black tracking-tight">Scholar!</p>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-slate-500">CBT Prep</p>
            </div>
          </button>

          <nav className="hidden items-center gap-7 text-xs font-black uppercase tracking-widest text-slate-500 md:flex">
            <a href="#practice" className="hover:text-slate-950">Practice</a>
            <a href="#analytics" className="hover:text-slate-950">Analytics</a>
            <a href="#schools" className="hover:text-slate-950">Schools</a>
          </nav>

          <button
            type="button"
            onClick={onGetStarted}
            className="rounded-lg bg-slate-950 px-5 py-3 text-xs font-black uppercase tracking-widest text-white shadow-sm"
          >
            Sign In
          </button>
        </div>
      </header>

      <main>
        <section className="relative min-h-[calc(100svh-76px)] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              className="absolute bottom-[-8rem] right-[-8rem] h-[34rem] w-[34rem] object-contain opacity-[0.08] md:bottom-[-7rem] md:right-[2rem] md:h-[44rem] md:w-[44rem]"
            />
          </div>

          <div className="relative mx-auto grid min-h-[calc(100svh-76px)] max-w-7xl grid-cols-1 gap-10 px-5 py-10 md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-8">
            <div className="max-w-2xl">
              <p className="mb-5 inline-flex rounded-lg border border-slate-950/10 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-slate-600 shadow-sm">
                Built for UTME and OAU P-UTME preparation
              </p>
              <h1 className="text-[3.4rem] font-black leading-[0.92] tracking-tight text-slate-950 md:text-[5.8rem]">
                Practice like the real exam.
              </h1>
              <p className="mt-6 max-w-xl text-lg font-bold leading-relaxed text-slate-600">
                Scholar gives licensed students a clean practice dashboard, realistic CBT sessions, smart question rotation, and analytics that make the next study decision obvious.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onGetStarted}
                  className="rounded-lg bg-amber-500 px-7 py-4 text-xs font-black uppercase tracking-widest text-slate-950 shadow-sm"
                >
                  Get Started Now
                </button>
                <a
                  href="#practice"
                  className="rounded-lg border border-slate-950/15 bg-white px-7 py-4 text-center text-xs font-black uppercase tracking-widest text-slate-800 shadow-sm"
                >
                  Explore Scholar
                </a>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {metrics.map(item => (
                  <div key={item.label} className="border-t border-slate-950/15 pt-4">
                    <p className="text-sm font-black text-slate-950">{item.value}</p>
                    <p className="mt-1 text-[11px] font-black uppercase tracking-widest text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-4 top-10 hidden h-44 w-20 bg-amber-400 md:block" />
              <div className="relative border border-slate-950/10 bg-slate-950 p-3 shadow-2xl">
                <div className="bg-white">
                  <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={logo} alt="" className="h-9 w-9 rounded-lg object-contain" />
                      <div>
                        <p className="text-sm font-black text-slate-950">UTME Practice</p>
                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Licensed dashboard</p>
                      </div>
                    </div>
                    <span className="rounded-lg bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">
                      Active
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-0 md:grid-cols-[0.95fr_1.05fr]">
                    <div className="border-b border-slate-200 p-5 md:border-b-0 md:border-r">
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Start practice</p>
                      <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950">English is locked. Pick 3 subjects.</h2>
                      <div className="mt-5 space-y-2">
                        {['English Language', 'Biology', 'Chemistry', 'Physics'].map((subject, index) => (
                          <div key={subject} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
                            <span className="text-sm font-black text-slate-800">{subject}</span>
                            <span className={`h-2.5 w-2.5 rounded-full ${index === 0 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          </div>
                        ))}
                      </div>
                      <button type="button" onClick={onGetStarted} className="mt-5 w-full rounded-lg bg-slate-950 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">
                        Start Practicing
                      </button>
                    </div>

                    <div className="p-5">
                      <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Performance</p>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-slate-50 p-4">
                          <p className="text-3xl font-black text-slate-950">86%</p>
                          <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Average</p>
                        </div>
                        <div className="rounded-lg bg-slate-50 p-4">
                          <p className="text-3xl font-black text-emerald-600">94%</p>
                          <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Best</p>
                        </div>
                      </div>
                      <div className="mt-5 space-y-4">
                        {[
                          ['Biology', 84],
                          ['Chemistry', 72],
                          ['Physics', 91]
                        ].map(([subject, score]) => (
                          <div key={subject}>
                            <div className="mb-2 flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-500">
                              <span>{subject}</span>
                              <span>{score}%</span>
                            </div>
                            <div className="h-2 rounded-full bg-slate-100">
                              <div className="h-full rounded-full bg-slate-950" style={{ width: `${score}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-slate-500">
                A focused workspace for practice, review, and measurable progress.
              </p>
            </div>
          </div>
        </section>

        <section id="practice" className="bg-white px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-600">Student flow</p>
                <h2 className="mt-3 text-4xl font-black leading-tight tracking-tight md:text-5xl">
                  No hunting for tests. Just start practicing.
                </h2>
              </div>
              <p className="text-base font-bold leading-relaxed text-slate-600">
                In UTME and OAU P-UTME modes, students see a practice workspace instead of admin-published test cards. The engine handles compulsory papers, licensed subject selection, timed sessions, and review data.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
              {productHighlights.map((item, index) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <p className="text-3xl font-black text-slate-300">0{index + 1}</p>
                  <p className="mt-5 text-lg font-black leading-tight text-slate-950">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="analytics" className="bg-[#e9eef3] px-5 py-20 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {sections.map(item => (
                <article key={item.title} className="rounded-lg bg-white p-6 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-400">{item.eyebrow}</p>
                  <h3 className="mt-4 text-2xl font-black leading-tight tracking-tight text-slate-950">{item.title}</h3>
                  <p className="mt-5 text-sm font-bold leading-relaxed text-slate-600">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="schools" className="bg-slate-950 px-5 py-16 text-white md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-400">For serious prep programs</p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight md:text-5xl">
                Question pools, licenses, practice, analytics, all in one place.
              </h2>
            </div>
            <div className="flex flex-col items-start gap-5">
              <PartnershipLogos variant="dark" size="compact" />
              <button
                type="button"
                onClick={onGetStarted}
                className="rounded-lg bg-white px-7 py-4 text-xs font-black uppercase tracking-widest text-slate-950"
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
