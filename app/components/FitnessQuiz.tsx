"use client";

import { useMemo, useState } from "react";

type Sex = "male" | "female" | "other";
type UnitHeight = "cm" | "in";
type UnitWeight = "kg" | "lb";
type RunDistance = "km" | "mile";

type PercentilePoint = { value: number; percentile: number };
type AgeGroup = { min: number; max: number; points: PercentilePoint[] };

type Metric =
  | "pushups"
  | "pullups"
  | "squats"
  | "plank"
  | "run"
  | "body";

const weights: Record<Metric, number> = {
  pushups: 15,
  pullups: 15,
  squats: 10,
  plank: 10,
  run: 25,
  body: 25
};

const norms = {
  pushups: {
    male: [
      { min: 18, max: 29, points: pctPoints([15, 25, 35, 45, 55]) },
      { min: 30, max: 39, points: pctPoints([12, 22, 30, 40, 50]) },
      { min: 40, max: 49, points: pctPoints([10, 18, 26, 34, 44]) },
      { min: 50, max: 59, points: pctPoints([8, 15, 22, 30, 38]) },
      { min: 60, max: 120, points: pctPoints([6, 12, 18, 25, 32]) }
    ],
    female: [
      { min: 18, max: 29, points: pctPoints([5, 12, 20, 30, 40]) },
      { min: 30, max: 39, points: pctPoints([4, 10, 17, 26, 35]) },
      { min: 40, max: 49, points: pctPoints([3, 8, 14, 22, 30]) },
      { min: 50, max: 59, points: pctPoints([2, 6, 12, 18, 26]) },
      { min: 60, max: 120, points: pctPoints([2, 5, 10, 16, 22]) }
    ]
  },
  pullups: {
    male: [
      { min: 18, max: 29, points: pctPoints([1, 4, 8, 12, 16]) },
      { min: 30, max: 39, points: pctPoints([1, 3, 6, 10, 14]) },
      { min: 40, max: 49, points: pctPoints([0, 2, 5, 8, 12]) },
      { min: 50, max: 59, points: pctPoints([0, 2, 4, 6, 9]) },
      { min: 60, max: 120, points: pctPoints([0, 1, 3, 5, 7]) }
    ],
    female: [
      { min: 18, max: 29, points: pctPoints([0, 1, 3, 6, 10]) },
      { min: 30, max: 39, points: pctPoints([0, 1, 2, 5, 8]) },
      { min: 40, max: 49, points: pctPoints([0, 1, 2, 4, 7]) },
      { min: 50, max: 59, points: pctPoints([0, 1, 2, 3, 5]) },
      { min: 60, max: 120, points: pctPoints([0, 1, 2, 3, 4]) }
    ]
  },
  squats: {
    male: [
      { min: 18, max: 29, points: pctPoints([25, 35, 45, 60, 75]) },
      { min: 30, max: 39, points: pctPoints([22, 32, 42, 55, 70]) },
      { min: 40, max: 49, points: pctPoints([20, 28, 38, 50, 62]) },
      { min: 50, max: 59, points: pctPoints([18, 24, 34, 44, 56]) },
      { min: 60, max: 120, points: pctPoints([15, 20, 30, 40, 50]) }
    ],
    female: [
      { min: 18, max: 29, points: pctPoints([20, 30, 40, 55, 70]) },
      { min: 30, max: 39, points: pctPoints([18, 28, 38, 50, 64]) },
      { min: 40, max: 49, points: pctPoints([16, 24, 34, 46, 58]) },
      { min: 50, max: 59, points: pctPoints([14, 20, 30, 40, 52]) },
      { min: 60, max: 120, points: pctPoints([12, 18, 26, 36, 46]) }
    ]
  },
  plank: {
    male: [
      { min: 18, max: 29, points: pctPoints([45, 75, 110, 150, 190]) },
      { min: 30, max: 39, points: pctPoints([40, 70, 100, 135, 175]) },
      { min: 40, max: 49, points: pctPoints([35, 60, 90, 120, 155]) },
      { min: 50, max: 59, points: pctPoints([30, 55, 80, 110, 140]) },
      { min: 60, max: 120, points: pctPoints([25, 45, 70, 95, 120]) }
    ],
    female: [
      { min: 18, max: 29, points: pctPoints([40, 70, 100, 140, 180]) },
      { min: 30, max: 39, points: pctPoints([35, 65, 95, 130, 170]) },
      { min: 40, max: 49, points: pctPoints([30, 55, 85, 115, 150]) },
      { min: 50, max: 59, points: pctPoints([28, 50, 75, 105, 135]) },
      { min: 60, max: 120, points: pctPoints([24, 42, 65, 90, 120]) }
    ]
  },
  run: {
    male: [
      { min: 18, max: 29, points: runPoints([210, 255, 300, 360, 420]) },
      { min: 30, max: 39, points: runPoints([225, 270, 315, 375, 435]) },
      { min: 40, max: 49, points: runPoints([240, 285, 330, 390, 450]) },
      { min: 50, max: 59, points: runPoints([255, 300, 345, 405, 465]) },
      { min: 60, max: 120, points: runPoints([270, 315, 360, 420, 480]) }
    ],
    female: [
      { min: 18, max: 29, points: runPoints([230, 275, 320, 385, 450]) },
      { min: 30, max: 39, points: runPoints([245, 290, 335, 400, 465]) },
      { min: 40, max: 49, points: runPoints([260, 305, 350, 415, 480]) },
      { min: 50, max: 59, points: runPoints([275, 320, 365, 430, 495]) },
      { min: 60, max: 120, points: runPoints([290, 335, 380, 445, 510]) }
    ]
  },
  body: {
    male: [
      { min: 18, max: 120, points: bodyFatPoints([10, 15, 20, 25, 30]) }
    ],
    female: [
      { min: 18, max: 120, points: bodyFatPoints([18, 23, 28, 33, 38]) }
    ]
  },
  bmi: {
    male: [{ min: 18, max: 120, points: bmiPoints([20, 23, 26, 30, 35]) }],
    female: [{ min: 18, max: 120, points: bmiPoints([20, 23, 26, 30, 35]) }]
  }
};

type QuizState = {
  age: string;
  sex: Sex;
  height: string;
  heightUnit: UnitHeight;
  weight: string;
  weightUnit: UnitWeight;
  bodyFat: string;
  pushups: string;
  pullups: string;
  squats: string;
  plank: string;
  runMinutes: string;
  runSeconds: string;
  runDistance: RunDistance;
};

const initialState: QuizState = {
  age: "",
  sex: "male",
  height: "",
  heightUnit: "cm",
  weight: "",
  weightUnit: "kg",
  bodyFat: "",
  pushups: "",
  pullups: "",
  squats: "",
  plank: "",
  runMinutes: "",
  runSeconds: "",
  runDistance: "km"
};

const steps = [
  "age",
  "sex",
  "height",
  "weight",
  "bodyFat",
  "pushups",
  "pullups",
  "squats",
  "plank",
  "run"
] as const;

type Step = (typeof steps)[number];

type Result = {
  weightedPercentile: number;
  rank: string;
  breakdown: Record<Metric, number>;
  categoryRanks: Record<Metric, string>;
};

function pctPoints(values: number[]): PercentilePoint[] {
  const percentiles = [10, 25, 50, 75, 90];
  return values.map((value, index) => ({ value, percentile: percentiles[index] }));
}

function runPoints(valuesInSeconds: number[]): PercentilePoint[] {
  const percentiles = [90, 75, 50, 25, 10];
  return valuesInSeconds.map((value, index) => ({
    value,
    percentile: percentiles[index]
  }));
}

function bodyFatPoints(values: number[]): PercentilePoint[] {
  const percentiles = [90, 75, 50, 25, 10];
  return values.map((value, index) => ({ value, percentile: percentiles[index] }));
}

function bmiPoints(values: number[]): PercentilePoint[] {
  const percentiles = [80, 65, 50, 25, 10];
  return values.map((value, index) => ({ value, percentile: percentiles[index] }));
}

function getAgeGroup(groups: AgeGroup[], age: number): AgeGroup {
  return (
    groups.find((group) => age >= group.min && age <= group.max) ??
    groups[groups.length - 1]
  );
}

function interpolatePercentile(
  value: number,
  points: PercentilePoint[],
  higherBetter: boolean
): number {
  if (points.length === 0) return 0;
  const sorted = [...points].sort((a, b) => a.value - b.value);
  if (value <= sorted[0].value) return sorted[0].percentile;
  if (value >= sorted[sorted.length - 1].value)
    return sorted[sorted.length - 1].percentile;

  for (let i = 0; i < sorted.length - 1; i += 1) {
    const current = sorted[i];
    const next = sorted[i + 1];
    if (value >= current.value && value <= next.value) {
      if (next.value === current.value) return next.percentile;
      const ratio = (value - current.value) / (next.value - current.value);
      return current.percentile + ratio * (next.percentile - current.percentile);
    }
  }

  return higherBetter
    ? sorted[sorted.length - 1].percentile
    : sorted[0].percentile;
}

function getPercentile(
  metric: Metric,
  value: number,
  age: number,
  sex: Sex
): number {
  if (sex === "other") {
    const male = getPercentile(metric, value, age, "male");
    const female = getPercentile(metric, value, age, "female");
    return (male + female) / 2;
  }

  const higherBetter = metric !== "run" && metric !== "body";
  const groups = norms[metric][sex];
  const ageGroup = getAgeGroup(groups, age);
  const percentile = interpolatePercentile(value, ageGroup.points, higherBetter);
  return clamp(percentile, 0, 100);
}

function getBodyPercentile(
  bodyFat: number | null,
  bmi: number,
  age: number,
  sex: Sex
): number {
  if (bodyFat !== null) {
    return getPercentile("body", bodyFat, age, sex);
  }

  if (sex === "other") {
    const male = getBodyPercentile(null, bmi, age, "male");
    const female = getBodyPercentile(null, bmi, age, "female");
    return (male + female) / 2;
  }

  const groups = norms.bmi[sex];
  const ageGroup = getAgeGroup(groups, age);
  return clamp(interpolatePercentile(bmi, ageGroup.points, false), 0, 100);
}

function computeWeightedPercentile(
  values: Record<Metric, number>
): number {
  return clamp(
    Object.entries(values).reduce((total, [metric, value]) => {
      const weight = weights[metric as Metric];
      return total + value * weight;
    }, 0) / 100,
    0,
    100
  );
}

function rankFromPercentile(percentile: number): string {
  if (percentile < 8) return "Iron";
  if (percentile < 26) return "Bronze";
  if (percentile < 43) return "Silver";
  if (percentile < 62) return "Gold";
  if (percentile < 80) return "Platinum";
  if (percentile < 90) return "Emerald";
  if (percentile < 96) return "Diamond";
  if (percentile < 99) return "Master";
  if (percentile < 99.9) return "Grandmaster";
  return "Challenger";
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function toNumber(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function FitnessQuiz() {
  const [state, setState] = useState<QuizState>(initialState);
  const [stepIndex, setStepIndex] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [pendingResult, setPendingResult] = useState<Result | null>(null);
  const [touched, setTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [riotId, setRiotId] = useState("");
  const [riotRegion, setRiotRegion] = useState("NA1");
  const [matchResult, setMatchResult] = useState<{
    gameName: string;
    tagLine: string;
    matches: string[];
  } | null>(null);
  const [matchError, setMatchError] = useState<string | null>(null);
  const [matchLoading, setMatchLoading] = useState(false);

  const currentStep = steps[stepIndex];

  const isValid = useMemo(() => {
    switch (currentStep) {
      case "age":
        return toNumber(state.age) > 0;
      case "sex":
        return Boolean(state.sex);
      case "height":
        return toNumber(state.height) > 0;
      case "weight":
        return toNumber(state.weight) > 0;
      case "bodyFat":
        return true;
      case "pushups":
        return toNumber(state.pushups) >= 0;
      case "pullups":
        return toNumber(state.pullups) >= 0;
      case "squats":
        return toNumber(state.squats) >= 0;
      case "plank":
        return toNumber(state.plank) > 0;
      case "run":
        return toNumber(state.runMinutes) > 0 || toNumber(state.runSeconds) > 0;
      default:
        return false;
    }
  }, [currentStep, state]);

  function handleNext() {
    if (!isValid) {
      setTouched(true);
      return;
    }

    setTouched(false);

    if (stepIndex === steps.length - 1) {
      const computed = calculateResult(state);
      setPendingResult(computed);
      return;
    }

    setStepIndex((prev) => prev + 1);
  }

  function handleBack() {
    setTouched(false);
    setStepIndex((prev) => Math.max(prev - 1, 0));
  }

  function handleReset() {
    setState(initialState);
    setStepIndex(0);
    setResult(null);
    setPendingResult(null);
    setTouched(false);
    setEmail("");
    setEmailTouched(false);
    setRiotId("");
    setRiotRegion("NA1");
    setMatchResult(null);
    setMatchError(null);
    setMatchLoading(false);
  }

  return (
    <div className="flex flex-col items-center rounded-2xl border border-[#262d3a] bg-[#131722] p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
      {!result && !pendingResult ? (
        <div className="w-full max-w-xl">
          <div className="text-xs uppercase tracking-[0.3em] text-[#9aa6bf]">
            TiltFit Rank Quiz
          </div>
          <h3 className="mt-3 text-2xl font-semibold">
            Question {stepIndex + 1} of {steps.length}
          </h3>
          <div className="mt-6">{renderStep(currentStep, state, setState)}</div>
          {touched && !isValid ? (
            <p className="mt-3 text-sm text-[#ff6b6b]">Please enter a value to continue.</p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {stepIndex > 0 ? (
              <button
                className="rounded-xl border border-[#262d3a] px-5 py-3 text-sm font-semibold text-[#e6ecf7]"
                type="button"
                onClick={handleBack}
              >
                Back
              </button>
            ) : null}
            <button
              className="rounded-xl bg-gradient-to-r from-[#6cffb1] to-[#67a7ff] px-6 py-3 text-sm font-bold text-[#07111e] shadow-[0_14px_30px_rgba(90,255,190,0.22)]"
              type="button"
              onClick={handleNext}
            >
              {stepIndex === steps.length - 1 ? "See my rank" : "Next"}
            </button>
          </div>
          <p className="mt-4 text-sm text-[#9aa6bf]">
            Percentiles are calculated from age- and sex-specific fitness norms. Replace
            these defaults with validated tables for production use.
          </p>
        </div>
      ) : pendingResult && !result ? (
        <div className="w-full max-w-xl">
          <EmailGate
            email={email}
            onEmailChange={setEmail}
            emailTouched={emailTouched}
            onEmailTouched={setEmailTouched}
            onContinue={() => {
              setEmailTouched(true);
              if (!isValidEmail(email)) return;
              setResult(pendingResult);
              setPendingResult(null);
            }}
          />
        </div>
      ) : result ? (
        <div className="w-full max-w-xl">
          <ResultCard
            result={result}
            onReset={handleReset}
            riotId={riotId}
            riotRegion={riotRegion}
            onRiotIdChange={setRiotId}
            onRiotRegionChange={setRiotRegion}
            onFetchMatches={async () => {
              setMatchLoading(true);
              setMatchError(null);
              setMatchResult(null);
              try {
                const response = await fetch("/api/riot/matches", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ riotId, region: riotRegion })
                });
                const payload = await response.json();
                if (!response.ok) {
                  throw new Error(payload?.error ?? "Unable to fetch matches.");
                }
                setMatchResult(payload);
              } catch (error) {
                setMatchError(
                  error instanceof Error ? error.message : "Something went wrong."
                );
              } finally {
                setMatchLoading(false);
              }
            }}
            matchResult={matchResult}
            matchError={matchError}
            matchLoading={matchLoading}
          />
        </div>
      ) : null}
    </div>
  );
}

function EmailGate({
  email,
  onEmailChange,
  emailTouched,
  onEmailTouched,
  onContinue
}: {
  email: string;
  onEmailChange: (value: string) => void;
  emailTouched: boolean;
  onEmailTouched: (value: boolean) => void;
  onContinue: () => void;
}) {
  const valid = isValidEmail(email);

  return (
    <div>
      <div className="text-xs uppercase tracking-[0.3em] text-[#9aa6bf]">
        Almost there
      </div>
      <h3 className="mt-3 text-2xl font-semibold">Where should we send your rank?</h3>
      <p className="mt-2">
        Enter your email to reveal your TiltFit Rank and save your quiz results.
      </p>
      <label className="mt-5 flex flex-col gap-2 text-sm font-semibold">
        Email address
        <input
          className="w-full rounded-xl border border-[#262d3a] bg-[#0f1320] px-4 py-3 text-sm text-[#e6ecf7]"
          type="email"
          value={email}
          onChange={(event) => {
            onEmailChange(event.target.value);
            if (!emailTouched) onEmailTouched(true);
          }}
          placeholder="you@example.com"
        />
      </label>
      {emailTouched && !valid ? (
        <p className="mt-3 text-sm text-[#ff6b6b]">Enter a valid email address.</p>
      ) : null}
      <button
        className="mt-4 rounded-xl bg-gradient-to-r from-[#6cffb1] to-[#67a7ff] px-6 py-3 text-sm font-bold text-[#07111e] shadow-[0_14px_30px_rgba(90,255,190,0.22)]"
        type="button"
        onClick={onContinue}
      >
        Reveal my rank
      </button>
    </div>
  );
}

function renderStep(
  step: Step,
  state: QuizState,
  setState: React.Dispatch<React.SetStateAction<QuizState>>
) {
  switch (step) {
    case "age":
      return (
        <InputField
          label="Age"
          type="number"
          value={state.age}
          onChange={(value) => setState((prev) => ({ ...prev, age: value }))}
          placeholder="Enter your age"
        />
      );
    case "sex":
      return (
        <SelectField
          label="Sex"
          value={state.sex}
          onChange={(value) =>
            setState((prev) => ({ ...prev, sex: value as Sex }))
          }
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" }
          ]}
        />
      );
    case "height":
      return (
        <div className="space-y-3">
          <InputField
            label="Height"
            type="number"
            value={state.height}
            onChange={(value) => setState((prev) => ({ ...prev, height: value }))}
            placeholder={state.heightUnit === "cm" ? "cm" : "inches"}
          />
          <SelectField
            label="Height unit"
            value={state.heightUnit}
            onChange={(value) =>
              setState((prev) => ({ ...prev, heightUnit: value as UnitHeight }))
            }
            options={[
              { value: "cm", label: "Centimeters" },
              { value: "in", label: "Inches" }
            ]}
          />
        </div>
      );
    case "weight":
      return (
        <div className="space-y-3">
          <InputField
            label="Weight"
            type="number"
            value={state.weight}
            onChange={(value) => setState((prev) => ({ ...prev, weight: value }))}
            placeholder={state.weightUnit === "kg" ? "kg" : "lb"}
          />
          <SelectField
            label="Weight unit"
            value={state.weightUnit}
            onChange={(value) =>
              setState((prev) => ({ ...prev, weightUnit: value as UnitWeight }))
            }
            options={[
              { value: "kg", label: "Kilograms" },
              { value: "lb", label: "Pounds" }
            ]}
          />
        </div>
      );
    case "bodyFat":
      return (
        <>
          <InputField
            label="Body fat percentage (optional)"
            type="number"
            value={state.bodyFat}
            onChange={(value) => setState((prev) => ({ ...prev, bodyFat: value }))}
            placeholder="% body fat"
          />
          <p className="mt-3 text-sm text-[#9aa6bf]">
            Leave this blank to use BMI for the body composition score.
          </p>
        </>
      );
    case "pushups":
      return (
        <InputField
          label="Push-ups (max in 1 min)"
          type="number"
          value={state.pushups}
          onChange={(value) => setState((prev) => ({ ...prev, pushups: value }))}
          placeholder="Reps"
        />
      );
    case "pullups":
      return (
        <InputField
          label="Pull-ups (max reps)"
          type="number"
          value={state.pullups}
          onChange={(value) => setState((prev) => ({ ...prev, pullups: value }))}
          placeholder="Reps"
        />
      );
    case "squats":
      return (
        <InputField
          label="Squats (max in 1 min)"
          type="number"
          value={state.squats}
          onChange={(value) => setState((prev) => ({ ...prev, squats: value }))}
          placeholder="Reps"
        />
      );
    case "plank":
      return (
        <InputField
          label="Plank hold (seconds)"
          type="number"
          value={state.plank}
          onChange={(value) => setState((prev) => ({ ...prev, plank: value }))}
          placeholder="Seconds"
        />
      );
    case "run":
      return (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <InputField
              label="Run time minutes"
              type="number"
              value={state.runMinutes}
              onChange={(value) =>
                setState((prev) => ({ ...prev, runMinutes: value }))
              }
              placeholder="Minutes"
            />
            <InputField
              label="Run time seconds"
              type="number"
              value={state.runSeconds}
              onChange={(value) =>
                setState((prev) => ({ ...prev, runSeconds: value }))
              }
              placeholder="Seconds"
            />
          </div>
          <SelectField
            label="Run distance"
            value={state.runDistance}
            onChange={(value) =>
              setState((prev) => ({ ...prev, runDistance: value as RunDistance }))
            }
            options={[
              { value: "km", label: "1 km" },
              { value: "mile", label: "1 mile" }
            ]}
          />
        </div>
      );
    default:
      return null;
  }
}

function InputField({
  label,
  value,
  onChange,
  type,
  placeholder
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold">
      {label}
      <input
        className="w-full rounded-xl border border-[#262d3a] bg-[#0f1320] px-4 py-3 text-sm text-[#e6ecf7]"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold">
      {label}
      <select
        className="w-full rounded-xl border border-[#262d3a] bg-[#0f1320] px-4 py-3 text-sm text-[#e6ecf7]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultCard({
  result,
  onReset,
  riotId,
  riotRegion,
  onRiotIdChange,
  onRiotRegionChange,
  onFetchMatches,
  matchResult,
  matchError,
  matchLoading
}: {
  result: Result;
  onReset: () => void;
  riotId: string;
  riotRegion: string;
  onRiotIdChange: (value: string) => void;
  onRiotRegionChange: (value: string) => void;
  onFetchMatches: () => void;
  matchResult: { gameName: string; tagLine: string; matches: string[] } | null;
  matchError: string | null;
  matchLoading: boolean;
}) {
  return (
    <div className="text-center">
      <div className="text-xs uppercase tracking-[0.3em] text-[#9aa6bf]">
        Your TiltFit Rank
      </div>
      <h3 className="mt-3 text-3xl font-semibold">{result.rank}</h3>
      <p className="mt-2 text-lg">
        You are fitter than {result.weightedPercentile.toFixed(1)}% of people
        your age.
      </p>
      <div className="mt-6 grid gap-3 text-sm text-[#9aa6bf] sm:grid-cols-2">
        {Object.entries(result.breakdown).map(([key, value]) => (
          <div key={key} className="rounded-xl border border-[#262d3a] px-4 py-3">
            <span className="uppercase tracking-[0.2em] text-[0.65rem] text-[#9aa6bf]">
              {key}
            </span>
            <div className="mt-2 text-lg font-semibold text-[#e6ecf7]">
              {value.toFixed(1)}%
            </div>
            <div className="mt-1 text-sm text-[#9aa6bf]">
              Rank: {result.categoryRanks[key as Metric]}
            </div>
          </div>
        ))}
      </div>
      <button
        className="mt-6 rounded-xl border border-[#262d3a] px-5 py-3 text-sm font-semibold text-[#e6ecf7]"
        type="button"
        onClick={onReset}
      >
        Retake quiz
      </button>
      <div className="mt-8 rounded-2xl border border-[#262d3a] bg-[#0f1320] p-5">
        <div className="text-xs uppercase tracking-[0.3em] text-[#9aa6bf]">
          Start the TiltFit Challenge
        </div>
        <h4 className="mt-3 text-xl font-semibold">Connect your Riot account</h4>
        <p className="mt-2">
          Add your Riot ID so we can pull your match history and turn every loss
          into workouts.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <label className="flex flex-col gap-2 text-sm font-semibold md:col-span-2">
            Riot ID (Name#TAG)
            <input
              className="w-full rounded-xl border border-[#262d3a] bg-[#0f1320] px-4 py-3 text-sm text-[#e6ecf7]"
              value={riotId}
              onChange={(event) => onRiotIdChange(event.target.value)}
              placeholder="Summoner#TAG"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold">
            Region
            <select
              className="w-full rounded-xl border border-[#262d3a] bg-[#0f1320] px-4 py-3 text-sm text-[#e6ecf7]"
              value={riotRegion}
              onChange={(event) => onRiotRegionChange(event.target.value)}
            >
              <option value="NA1">NA</option>
              <option value="EUW1">EUW</option>
              <option value="EUN1">EUNE</option>
              <option value="KR">KR</option>
              <option value="BR1">BR</option>
              <option value="LA1">LAN</option>
              <option value="LA2">LAS</option>
              <option value="OC1">OCE</option>
              <option value="JP1">JP</option>
              <option value="RU">RU</option>
              <option value="TR1">TR</option>
            </select>
          </label>
        </div>
        <button
          className="mt-4 rounded-xl bg-gradient-to-r from-[#6cffb1] to-[#67a7ff] px-6 py-3 text-sm font-bold text-[#07111e] shadow-[0_14px_30px_rgba(90,255,190,0.22)]"
          type="button"
          onClick={onFetchMatches}
          disabled={matchLoading || riotId.trim().length === 0}
        >
          {matchLoading ? "Connecting..." : "Fetch match history"}
        </button>
        {matchError ? (
          <p className="mt-3 text-sm text-[#ff6b6b]">{matchError}</p>
        ) : null}
        {matchResult ? (
          <div className="mt-4 rounded-xl border border-[#262d3a] px-4 py-3 text-sm text-[#9aa6bf]">
            <p className="text-[#e6ecf7]">
              Connected: {matchResult.gameName}#{matchResult.tagLine}
            </p>
            <p className="mt-1">
              Loaded {matchResult.matches.length} recent matches. Ready to start
              the challenge.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function calculateResult(state: QuizState): Result {
  const age = toNumber(state.age);
  const height = toNumber(state.height);
  const weight = toNumber(state.weight);
  const heightCm = state.heightUnit === "cm" ? height : height * 2.54;
  const weightKg = state.weightUnit === "kg" ? weight : weight * 0.453592;
  const heightM = heightCm / 100;
  const bmi = heightM > 0 ? weightKg / (heightM * heightM) : 0;
  const bodyFat = state.bodyFat ? toNumber(state.bodyFat) : null;

  const runMinutes = toNumber(state.runMinutes);
  const runSeconds = toNumber(state.runSeconds);
  const totalSeconds = runMinutes * 60 + runSeconds;
  const perKmSeconds =
    state.runDistance === "km" ? totalSeconds : totalSeconds / 1.60934;

  const breakdown: Record<Metric, number> = {
    pushups: getPercentile("pushups", toNumber(state.pushups), age, state.sex),
    pullups: getPercentile("pullups", toNumber(state.pullups), age, state.sex),
    squats: getPercentile("squats", toNumber(state.squats), age, state.sex),
    plank: getPercentile("plank", toNumber(state.plank), age, state.sex),
    run: getPercentile("run", perKmSeconds, age, state.sex),
    body: getBodyPercentile(bodyFat, bmi, age, state.sex)
  };

  const weightedPercentile = computeWeightedPercentile(breakdown);
  const categoryRanks = (Object.keys(breakdown) as Metric[]).reduce(
    (acc, metric) => {
      acc[metric] = rankFromPercentile(breakdown[metric]);
      return acc;
    },
    {} as Record<Metric, string>
  );

  return {
    weightedPercentile,
    rank: rankFromPercentile(weightedPercentile),
    breakdown,
    categoryRanks
  };
}


