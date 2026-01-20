import QuizSection from "./components/QuizSection";

export default function Home() {
  return (
    <main>
      <section className="mx-auto grid w-full max-w-5xl items-center gap-10 px-4 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="text-[0.7rem] uppercase tracking-[0.35em] text-[#9aa6bf]">
            TiltFit Challenge
          </div>
          <h1 className="mt-3 text-5xl font-semibold leading-tight md:text-6xl">
            GET FIT THROUGH{" "}
            <span className="text-[#c8a453]">LEAGUE OF LEGENDS</span>.
          </h1>
          <p className="mt-3 max-w-xl text-sm">
            TiltFit connects to your match history and creates fitness challenges
            from every game.
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#9aa6bf]">
            Every Death Is a Rep. Every Tilt Is Progress.
          </p>
          <div className="mt-4 grid gap-3 text-[0.65rem] sm:grid-cols-3">
            <div className="rounded-lg border border-[#262d3a] bg-[#131722] px-3 py-2">
              <p className="font-semibold text-[#e6ecf7]">Mario — Silver</p>
              <p className="mt-1 text-[#9aa6bf]">
                "I used to tilt and waste time. Now every loss is training."
              </p>
            </div>
            <div className="rounded-lg border border-[#262d3a] bg-[#131722] px-3 py-2">
              <p className="font-semibold text-[#e6ecf7]">David — Gold</p>
              <p className="mt-1 text-[#9aa6bf]">
                "TiltFit turned my rage queues into real progress."
              </p>
            </div>
            <div className="rounded-lg border border-[#262d3a] bg-[#131722] px-3 py-2">
              <p className="font-semibold text-[#e6ecf7]">Sergio — Platinum</p>
              <p className="mt-1 text-[#9aa6bf]">
                "I stopped spiraling and started leveling up my fitness."
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-[#262d3a] bg-[#0f1320] p-2">
          <video
            className="h-auto w-full rounded-2xl object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/titfilt-video-hero.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <QuizSection />

      <section id="features" className="mx-auto w-full max-w-5xl px-4 py-14">
        <div className="text-[0.7rem] uppercase tracking-[0.35em] text-[#9aa6bf]">
          How TiltFit Works
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-4">
          <div className="rounded-xl border border-[#262d3a] bg-[#131722] p-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1a2030] px-3 py-1 text-xs text-[#9aa6bf]">
              🎯 Instant Fitness Rank
            </div>
            <h3 className="mt-3 text-base font-semibold">
              Input your stats, get your tier.
            </h3>
            <p className="mt-2 text-sm">
              We map your current fitness to a competitive tier so you know
              exactly where you stand and how to climb.
            </p>
          </div>
          <div className="rounded-xl border border-[#262d3a] bg-[#131722] p-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1a2030] px-3 py-1 text-xs text-[#9aa6bf]">
              ⚔️ Death-to-Workout
            </div>
            <h3 className="mt-3 text-base font-semibold">
              Every League loss equals reps.
            </h3>
            <p className="mt-2 text-sm">
              Losses convert into short, safe workouts that build consistency
              without killing your queue time.
            </p>
          </div>
          <div className="rounded-xl border border-[#262d3a] bg-[#131722] p-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1a2030] px-3 py-1 text-xs text-[#9aa6bf]">
              📈 Progress Tracking
            </div>
            <h3 className="mt-3 text-base font-semibold">
              Track macros, workouts, trends.
            </h3>
            <p className="mt-2 text-sm">
              Weekly dashboards show your XP, streaks, and how fast your Fitness
              Rank is climbing.
            </p>
          </div>
          <div className="rounded-xl border border-[#262d3a] bg-[#131722] p-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#1a2030] px-3 py-1 text-xs text-[#9aa6bf]">
              🧩 Squad Challenges
            </div>
            <h3 className="mt-3 text-base font-semibold">
              Compete with friends, not just ranks.
            </h3>
            <p className="mt-2 text-sm">
              Create challenges with friends, track their performance, and compare
              your fitness levels week by week.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-5xl px-4 py-12">
        <div className="text-[0.7rem] uppercase tracking-[0.35em] text-[#9aa6bf]">
          FAQ
        </div>
        <h2 className="mt-3 text-2xl font-semibold">
          Everything you need to feel confident.
        </h2>
        <div className="mt-5 space-y-3">
          <details className="rounded-xl border border-[#262d3a] bg-[#131722] p-4" open>
            <summary className="cursor-pointer text-base font-semibold">
              How do you calculate my rank?
            </summary>
            <p className="mt-2 text-sm">
              We normalize your metrics against population percentiles, weight them,
              and map the final score to a TiltFit Rank.
            </p>
          </details>
          <details className="rounded-xl border border-[#262d3a] bg-[#131722] p-4">
            <summary className="cursor-pointer text-base font-semibold">
              Is this medical advice?
            </summary>
            <p className="mt-2 text-sm">
              No. This is a fun fitness challenge and the scores are estimates.
              Always listen to your body.
            </p>
          </details>
          <details className="rounded-xl border border-[#262d3a] bg-[#131722] p-4">
            <summary className="cursor-pointer text-base font-semibold">
              I am not fit. Is this judging me?
            </summary>
            <p className="mt-2 text-sm">
              No. Your rank is percentile-based and meant to motivate, not shame.
              Everyone starts somewhere.
            </p>
          </details>
          <details className="rounded-xl border border-[#262d3a] bg-[#131722] p-4">
            <summary className="cursor-pointer text-base font-semibold">
              Does it sync with League of Legends?
            </summary>
            <p className="mt-2 text-sm">
              Yes. Once connected, TiltFit pulls your match history and creates a
              fitness challenge based on your performance.
            </p>
          </details>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-14">
        <div className="text-[0.7rem] uppercase tracking-[0.35em] text-[#9aa6bf]">
          Founder Note
        </div>
        <h2 className="mt-3 text-2xl font-semibold">
          Built by a gamer who wanted healthier queues.
        </h2>
        <div className="mt-5 rounded-xl border border-[#262d3a] bg-[#131722] p-5">
          <p className="text-sm">
            I've been a hardstuck League player for years.
          </p>
          <p className="mt-3 text-sm">
            The more I played, the more out of shape I got. Long sessions, bad
            posture, no movement, and honestly, I hated the idea of gyms and rigid
            workout routines.
          </p>
          <p className="mt-3 text-sm">
            So instead of starting a fitness journey, a few friends and I made a
            simple challenge. Every time something bad happened in-game, we had to
            do an exercise. Deaths, bad games, tilt, all of it turned into reps.
          </p>
          <p className="mt-3 text-sm">
            We started comparing our performance, not just in League, but
            physically. Who improved their push-ups? Who handled tilt better? Who
            stayed consistent?
          </p>
          <p className="mt-3 text-sm">It worked because it was fun.</p>
          <p className="mt-3 text-sm">
            TiltFit was born from that idea. Working out should not compete with
            our habits. It should complement them. We are not trying to replace
            gaming. We are turning it into something healthier.
          </p>
          <p className="mt-3 text-sm">
            If you play a lot, get tilted a lot, and want to feel better without
            quitting what you enjoy, this app was built for you.
          </p>
          <p className="mt-4 inline-flex items-center rounded-full bg-[#1a2030] px-3 py-1 text-xs text-[#9aa6bf]">
            Founder, TiltFit
          </p>
        </div>
      </section>

      <footer className="mx-auto w-full max-w-5xl px-4 pb-10 text-xs text-[#9aa6bf]">
        TiltFit is a community-driven challenge. Always listen to your body and
        scale as needed.
      </footer>
    </main>
  );
}
