import { ReactNode } from "react";

export default function SectionBlock({
  label,
  prompt,
  children,
}: {
  label: string;
  prompt?: string;
  children: ReactNode;
}) {
  return (
    <section className="bg-blush/50 rounded-xl p-4 sm:p-6 space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-dark-brown uppercase tracking-wide">
          {label}
        </h3>
        {prompt && (
          <p className="text-xs text-charcoal/50 mt-0.5 italic">{prompt}</p>
        )}
      </div>
      {children}
    </section>
  );
}
