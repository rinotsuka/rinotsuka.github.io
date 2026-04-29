import type { ReactNode } from "react";

const ARC_WIDTH = 64;
const ARC_DEPTH = 7;
const ARC_COUNT = 3;
const STROKE_WIDTH = 2.5;
const DOT_LENGTH = 9.3;
const DOT_GAP = 6.5;
const TOTAL_WIDTH = ARC_WIDTH * ARC_COUNT;
const PADDING_Y = 6;
const VIEW_HEIGHT = ARC_DEPTH * 2 + PADDING_Y * 2;

const ARC_PATH =
  "M 0 0 " +
  Array.from({ length: ARC_COUNT }, (_, i) => {
    const x0 = i * ARC_WIDTH;
    const xMid = x0 + ARC_WIDTH / 2;
    const x1 = x0 + ARC_WIDTH;
    return `Q ${xMid} ${ARC_DEPTH * 2} ${x1} 0`;
  }).join(" ");

function DottedArcs() {
  return (
    <svg
      aria-hidden
      width={TOTAL_WIDTH}
      height={VIEW_HEIGHT}
      viewBox={`0 ${-PADDING_Y} ${TOTAL_WIDTH} ${VIEW_HEIGHT}`}
      className="shrink-0"
    >
      <path
        d={ARC_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={STROKE_WIDTH}
        strokeLinecap="round"
        strokeDasharray={`${DOT_LENGTH} ${DOT_GAP}`}
      />
    </svg>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full justify-center overflow-hidden">
      <div className="flex w-full min-w-[640px] items-center justify-between gap-4 text-primary md:min-w-[704px]">
        <DottedArcs />
        <h2 className="shrink-0 text-2xl font-bold tracking-[0.15em] text-[#ee6f2b]">
          {children}
        </h2>
        <DottedArcs />
      </div>
    </div>
  );
}
