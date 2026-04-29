type Props = {
  className?: string;
  variant?: 1 | 2 | 3;
  fill?: string;
  ariaHidden?: boolean;
};

const PATHS: Record<1 | 2 | 3, string> = {
  1: "M170 30c50 0 110 30 120 90s-30 110-90 120-130-10-150-70 70-140 120-140Z",
  2: "M60 70c20-40 80-60 130-40s100 70 90 130-80 100-140 80S40 110 60 70Z",
  3: "M40 130c0-70 60-110 140-110s130 60 110 130-90 130-160 110S40 200 40 130Z",
};

export function Blob({ className, variant = 1, fill = "#fff1e3", ariaHidden = true }: Props) {
  return (
    <svg
      viewBox="0 0 320 320"
      aria-hidden={ariaHidden}
      className={className}
      preserveAspectRatio="none"
    >
      <path d={PATHS[variant]} fill={fill} />
    </svg>
  );
}
