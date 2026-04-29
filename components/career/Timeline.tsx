"use client";

import { useState } from "react";
import { loadCareer, formatYearMonth, formatPeriod } from "@/lib/career/load";
import { SectionHeading } from "@/components/heading/SectionHeading";
import type { CareerEntry, CareerProject } from "@/content/career/types";

const GRID_COLS =
  "grid-cols-[3.5rem_1.5rem_1fr] md:grid-cols-[4.5rem_2rem_1fr]";

const LINE_CLASS = "absolute left-1/2 w-[2px] -translate-x-1/2 bg-ink-mute/40";

type BelowMode = "solid" | "fade" | "none";

type RailProps = {
  dotKind: "filled" | "hollow" | "line";
  hideAbove?: boolean;
  belowMode?: BelowMode;
};

function FadeBelow({ topOffset }: { topOffset: number }) {
  const gap = 6;
  const longLen = 20;
  const midLen = 12;
  const dotGap = 4;

  const longTop = topOffset + gap;
  const midTop = longTop + longLen + gap;
  const dotTop = midTop + midLen + dotGap;

  return (
    <>
      <span
        aria-hidden
        className={LINE_CLASS}
        style={{ top: `${longTop}px`, height: `${longLen}px` }}
      />
      <span
        aria-hidden
        className={LINE_CLASS}
        style={{ top: `${midTop}px`, height: `${midLen}px` }}
      />
      <span
        aria-hidden
        className="absolute left-1/2 h-[2px] w-[2px] -translate-x-1/2 rounded-full bg-ink-mute/40"
        style={{ top: `${dotTop}px` }}
      />
    </>
  );
}

function Rail({ dotKind, hideAbove, belowMode = "solid" }: RailProps) {
  if (dotKind === "line") {
    const showSpan = !(hideAbove && belowMode !== "solid");
    return (
      <div className="relative h-full">
        {showSpan && (
          <span
            aria-hidden
            className={`${LINE_CLASS} ${
              hideAbove ? "top-[14px]" : "top-0"
            } ${belowMode === "solid" ? "bottom-0" : "h-[14px]"}`}
          />
        )}
        {belowMode === "fade" && <FadeBelow topOffset={14} />}
      </div>
    );
  }

  const isFilled = dotKind === "filled";
  const dotClass = isFilled
    ? "absolute left-1/2 top-[8px] h-3 w-3 -translate-x-1/2 rounded-full bg-primary"
    : "absolute left-1/2 top-[10px] h-2 w-2 -translate-x-1/2 rounded-full border border-primary bg-paper";
  const fadeTopOffset = isFilled ? 20 : 18;

  return (
    <div className="relative h-full">
      {!hideAbove && (
        <span aria-hidden className={`${LINE_CLASS} top-0 h-[14px]`} />
      )}
      {belowMode === "solid" && (
        <span aria-hidden className={`${LINE_CLASS} top-[14px] bottom-0`} />
      )}
      {belowMode === "fade" && <FadeBelow topOffset={fadeTopOffset} />}
      <span aria-hidden className={dotClass} />
    </div>
  );
}

function MetaLine({
  period,
  employment,
  members,
  methodology,
}: {
  period: string;
  employment?: string;
  members?: string;
  methodology?: string;
}) {
  return (
    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-ink-mute">
      <span>{period}</span>
      {employment && <span>{employment}</span>}
      {members && <span>メンバー {members}</span>}
      {methodology && <span>{methodology}</span>}
    </div>
  );
}

function TargetPills({ target }: { target: string[] }) {
  return (
    <div className="mb-2 flex flex-wrap gap-1.5">
      {target.map((t, i) => (
        <span
          key={i}
          className="rounded-full border border-ink-mute/40 px-2 py-0.5 text-xs text-ink-mute"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectRow({
  project,
  isVeryLast,
}: {
  project: CareerProject;
  isVeryLast: boolean;
}) {
  return (
    <li className={`grid ${GRID_COLS} gap-x-3`}>
      <div aria-hidden className="text-sm text-transparent">
        —
      </div>
      <Rail
        dotKind="hollow"
        belowMode={isVeryLast ? "fade" : "solid"}
      />
      <div className={isVeryLast ? "" : "pb-8"}>
        <h4 className="text-base font-bold leading-snug text-ink">
          {project.name}
        </h4>
        <MetaLine
          period={formatPeriod(project.start, project.end)}
          members={project.members}
          methodology={project.methodology}
        />
        {project.target && project.target.length > 0 && (
          <TargetPills target={project.target} />
        )}
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {project.summary}
        </p>
        {project.duties && project.duties.length > 0 && (
          <ul className="mt-2 list-disc space-y-0.5 pl-5 text-sm leading-relaxed text-ink-soft">
            {project.duties.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        )}
        {project.tech && project.tech.length > 0 && (
          <p className="mt-2 text-xs leading-relaxed text-ink-mute">
            {project.tech.join(" · ")}
          </p>
        )}
      </div>
    </li>
  );
}

function CompanyItem({
  entry,
  isFirstCompany,
  isLastCompany,
}: {
  entry: CareerEntry;
  isFirstCompany: boolean;
  isLastCompany: boolean;
}) {
  const [open, setOpen] = useState(isFirstCompany);

  const projects = (entry.projects ?? [])
    .slice()
    .sort((a, b) => b.start.localeCompare(a.start));
  const hasProjects = projects.length > 0;

  const summaryBelowMode: BelowMode =
    isLastCompany && !open ? "fade" : "solid";
  const detailBelowMode: BelowMode =
    isLastCompany && !hasProjects ? "fade" : "solid";

  return (
    <li>
      {!isFirstCompany && (
        <div
          aria-hidden
          className={`grid ${GRID_COLS} h-6 gap-x-3`}
        >
          <div />
          <div className="relative">
            <span className={`${LINE_CLASS} top-0 bottom-0`} />
          </div>
          <div />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`grid w-full ${GRID_COLS} cursor-pointer gap-x-3 text-left`}
      >
        <div className="pt-[2px] text-right text-sm font-semibold tabular-nums text-ink">
          {formatYearMonth(entry.start)}
        </div>
        <Rail
          dotKind="filled"
          hideAbove={isFirstCompany}
          belowMode={summaryBelowMode}
        />
        <div className="pb-4">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <h3 className="text-lg font-bold leading-snug text-ink md:text-xl">
                {entry.company}
              </h3>
              <MetaLine
                period={formatPeriod(entry.start, entry.end)}
                employment={entry.employment}
              />
            </div>
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className={`mt-1 h-4 w-4 shrink-0 text-ink-mute transition-transform duration-[400ms] ease-out ${
                open ? "rotate-180" : ""
              }`}
            >
              <path
                d="M6 9l6 6 6-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </button>

      <div
        aria-hidden={!open}
        className={`grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-[400ms] motion-safe:ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className={`grid ${GRID_COLS} gap-x-3`}>
            <div aria-hidden className="text-sm text-transparent">
              —
            </div>
            <Rail dotKind="line" belowMode={detailBelowMode} />
            <div className="pb-8">
              <p className="text-[15px] leading-relaxed text-ink">
                {entry.summary}
              </p>
            </div>
          </div>

          {hasProjects && (
            <ol>
              {projects.map((p, pi) => {
                const isLastProject = pi === projects.length - 1;
                const isVeryLast = isLastCompany && isLastProject;
                return (
                  <ProjectRow
                    key={p.id}
                    project={p}
                    isVeryLast={isVeryLast}
                  />
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </li>
  );
}

export function Timeline() {
  const entries = loadCareer();

  return (
    <section id="career" className="py-20 md:py-24">
      <div className="mx-auto max-w-content px-4">
        <header className="mb-12 text-center">
          <SectionHeading>職務経歴</SectionHeading>
        </header>

        <ol>
          {entries.map((entry, ci) => (
            <CompanyItem
              key={entry.id}
              entry={entry}
              isFirstCompany={ci === 0}
              isLastCompany={ci === entries.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
