"use client";

import FitnessQuiz from "./FitnessQuiz";

export default function QuizSection() {
  return (
    <section id="quiz" className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="text-[0.7rem] uppercase tracking-[0.35em] text-[#9aa6bf]">
        Fitness Percentile Quiz
      </div>
      <h2 className="mt-3 text-2xl font-semibold">
        Calculate your TiltFit Rank in real time.
      </h2>
      <p className="mt-2 max-w-2xl text-sm">
        TiltFit connects to your match history and creates fitness challenges
        from every game.
      </p>

      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-2xl">
          <FitnessQuiz />
        </div>
      </div>
    </section>
  );
}
