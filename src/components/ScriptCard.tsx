import Link from "next/link";
import type { Script } from "@/lib/types";

export default function ScriptCard({ script }: { script: Script }) {
  const title = script.title_1 || script.title_2 || script.title_3 || "Untitled Script";
  const preview = script.opening_hook || script.credibility_points || "";

  return (
    <Link
      href={`/scripts/${script.id}`}
      className="block bg-blush/50 rounded-xl p-5 hover:bg-blush transition-colors border border-dark-brown/5"
    >
      <h3 className="font-semibold text-dark-brown text-base mb-1 line-clamp-1">
        {title}
      </h3>
      {preview && (
        <p className="text-sm text-charcoal/60 line-clamp-2 leading-relaxed">
          {preview}
        </p>
      )}
      <p className="text-xs text-charcoal/30 mt-3">
        {new Date(script.updated_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    </Link>
  );
}
