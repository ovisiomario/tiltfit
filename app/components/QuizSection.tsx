"use client";

import FitnessQuiz from "./FitnessQuiz";

export default function QuizSection() {
  return (
    <section id="quiz" className="mx-auto w-full max-w-5xl px-4 py-12">
      <div className="text-[0.7rem] uppercase tracking-[0.35em] text-[#9aa6bf]">
        Fitness Percentile Quiz
      </div>
      <h2 className="mt-3 text-2xl font-semibold">
        Unlock your TiltFit Rank in under one minute.
      </h2>
      <p className="mt-2 max-w-2xl text-sm">
        Afterward we will build fitness challenges from your in-game performance
        so you can level up in real life too.
      </p>

      <div className="mt-6 flex justify-center">
        <div className="w-full max-w-2xl">
          <FitnessQuiz />
        </div>
      </div>
    </section>
  );
}
