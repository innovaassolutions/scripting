"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Markdown from "react-markdown";
import ShotListGrid from "./ShotListGrid";
import type { Script } from "@/lib/types";

function Prose({ children }: { children: string }) {
  return (
    <div className="prose-script">
      <Markdown>{children}</Markdown>
    </div>
  );
}

function ViewSection({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  return (
    <section className="py-5">
      <p className="text-[11px] font-medium text-charcoal/30 uppercase tracking-widest mb-2">
        {label}
      </p>
      <Prose>{content}</Prose>
    </section>
  );
}

export default function ScriptView({ script }: { script: Script }) {
  const router = useRouter();
  const title =
    script.title_1 || script.title_2 || script.title_3 || "Untitled Script";

  const keyPoints = [
    { point: script.key_point_1, details: script.point_1_details },
    { point: script.key_point_2, details: script.point_2_details },
    { point: script.key_point_3, details: script.point_3_details },
    { point: script.key_point_4, details: script.point_4_details },
    { point: script.key_point_5, details: script.point_5_details },
  ].filter((kp) => kp.point?.trim());

  const shots = [
    script.shot_1, script.shot_2, script.shot_3,
    script.shot_4, script.shot_5, script.shot_6,
  ];
  const hasShots = shots.some((s) => s?.trim());

  const handleDelete = async () => {
    if (!confirm("Delete this script? This cannot be undone.")) return;

    const res = await fetch(`/api/scripts/${script.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/scripts");
    } else {
      alert("Failed to delete script.");
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Minimal top bar */}
      <div className="sticky top-0 z-10 bg-cream/90 backdrop-blur-sm border-b border-dark-brown/5">
        <div className="max-w-2xl mx-auto px-4 py-2 flex items-center justify-between">
          <Link
            href="/scripts"
            className="flex items-center gap-2 text-charcoal/40 hover:text-charcoal/70 transition-colors text-sm"
          >
            <Image
              src="/scriptwriter.png"
              alt=""
              width={24}
              height={24}
              className="rounded-full"
            />
            <span>All Scripts</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href={`/scripts/${script.id}/edit`}
              className="text-sm text-muted-blue hover:text-muted-blue/80 transition-colors font-medium"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="text-sm text-muted-red/60 hover:text-muted-red transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Script content */}
      <div className="max-w-2xl mx-auto px-5 sm:px-6 pt-6 pb-16">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-dark-brown leading-tight mb-1">
          {title}
        </h1>
        {/* Alternate titles */}
        {[script.title_2, script.title_3]
          .filter((t) => t?.trim())
          .map((t, i) => (
            <p key={i} className="text-sm text-charcoal/35 italic">
              alt: {t}
            </p>
          ))}

        <hr className="my-6 border-dark-brown/8" />

        {/* Opening Hook */}
        {script.opening_hook?.trim() && (
          <ViewSection label="Opening Hook" content={script.opening_hook} />
        )}

        {/* Credibility Points */}
        {script.credibility_points?.trim() && (
          <ViewSection label="Credibility" content={script.credibility_points} />
        )}

        {/* Story or Quote */}
        {script.story_or_quote?.trim() && (
          <ViewSection label="Story / Quote" content={script.story_or_quote} />
        )}

        {/* Key Points + Details */}
        {keyPoints.length > 0 && (
          <div className="py-5">
            <p className="text-[11px] font-medium text-charcoal/30 uppercase tracking-widest mb-4">
              Key Points
            </p>
            <div className="space-y-6">
              {keyPoints.map((kp, i) => (
                <div key={i}>
                  <h3 className="text-lg sm:text-xl font-semibold text-dark-brown mb-1">
                    {i + 1}. {kp.point}
                  </h3>
                  {kp.details?.trim() && (
                    <div className="pl-5">
                      <Prose>{kp.details}</Prose>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Helpful Ending */}
        {script.helpful_ending?.trim() && (
          <ViewSection label="Ending" content={script.helpful_ending} />
        )}

        {/* Revenue CTA */}
        {script.revenue_cta?.trim() && (
          <ViewSection label="CTA" content={script.revenue_cta} />
        )}

        {/* CTA Placement */}
        {script.revenue_cta_placement?.trim() && (
          <ViewSection label="CTA Placement" content={script.revenue_cta_placement} />
        )}

        {/* Shot List */}
        {hasShots && (
          <div className="pt-8 mt-4 border-t border-dark-brown/8">
            <p className="text-[11px] font-medium text-charcoal/30 uppercase tracking-widest mb-3">
              Shot List
            </p>
            <ShotListGrid shots={shots} />
          </div>
        )}
      </div>
    </div>
  );
}
