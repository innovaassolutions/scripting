"use client";

interface ShotListGridProps {
  shots: string[];
  editable?: boolean;
  onChange?: (index: number, value: string) => void;
}

export default function ShotListGrid({
  shots,
  editable = false,
  onChange,
}: ShotListGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {shots.map((shot, i) => (
        <div
          key={i}
          className="bg-cream rounded-lg border border-dark-brown/10 p-3 min-h-[80px] flex items-start"
        >
          {editable ? (
            <textarea
              value={shot}
              onChange={(e) => onChange?.(i, e.target.value)}
              placeholder={`Shot ${i + 1}`}
              className="w-full bg-transparent text-sm text-charcoal resize-none outline-none placeholder:text-charcoal/30 min-h-[60px]"
            />
          ) : (
            <div>
              <span className="text-[10px] font-medium text-charcoal/30 uppercase tracking-wider block mb-1">
                Shot {i + 1}
              </span>
              <p className="text-sm text-charcoal leading-relaxed">
                {shot || <span className="text-charcoal/20">—</span>}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
