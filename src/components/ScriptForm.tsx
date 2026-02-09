"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SectionBlock from "./SectionBlock";
import ShotListGrid from "./ShotListGrid";
import { SECTION_LABELS, EMPTY_SCRIPT_FORM } from "@/config/template";
import type { Script } from "@/lib/types";

type FormData = { -readonly [K in keyof typeof EMPTY_SCRIPT_FORM]: string };

interface ScriptFormProps {
  initialData?: Script;
}

export default function ScriptForm({ initialData }: ScriptFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState<FormData>(() => {
    if (initialData) {
      const { id, created_at, updated_at, ...rest } = initialData;
      void id; void created_at; void updated_at;
      return rest;
    }
    return { ...EMPTY_SCRIPT_FORM };
  });

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const shots = [form.shot_1, form.shot_2, form.shot_3, form.shot_4, form.shot_5, form.shot_6];

  const handleShotChange = (index: number, value: string) => {
    const key = `shot_${index + 1}` as keyof FormData;
    set(key, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = initialData
        ? `/api/scripts/${initialData.id}`
        : "/api/scripts";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save");

      const script = await res.json();
      router.push(`/scripts/${script.id}`);
    } catch {
      alert("Failed to save script. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full bg-cream rounded-lg border border-dark-brown/10 px-3 py-2 text-charcoal text-sm outline-none focus:border-dark-brown/30 focus:ring-1 focus:ring-dark-brown/10 transition-colors placeholder:text-charcoal/30";
  const textareaClass = `${inputClass} min-h-[100px] resize-y`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 pb-8">
      {/* Tentative Titles */}
      <SectionBlock label={SECTION_LABELS.titles}>
        <div className="space-y-2">
          {([1, 2, 3] as const).map((n) => (
            <input
              key={n}
              type="text"
              value={form[`title_${n}`]}
              onChange={(e) => set(`title_${n}`, e.target.value)}
              placeholder={`Title option ${n}`}
              className={inputClass}
            />
          ))}
        </div>
      </SectionBlock>

      {/* Opening Hook */}
      <SectionBlock
        label={SECTION_LABELS.opening_hook}
        prompt={SECTION_LABELS.opening_hook_prompt}
      >
        <textarea
          value={form.opening_hook}
          onChange={(e) => set("opening_hook", e.target.value)}
          placeholder="What will they learn today?"
          className={textareaClass}
        />
      </SectionBlock>

      {/* Credibility Points */}
      <SectionBlock
        label={SECTION_LABELS.credibility_points}
        prompt={SECTION_LABELS.credibility_points_prompt}
      >
        <textarea
          value={form.credibility_points}
          onChange={(e) => set("credibility_points", e.target.value)}
          placeholder="Why should they listen to you?"
          className={textareaClass}
        />
      </SectionBlock>

      {/* Story or Quote */}
      <SectionBlock label={SECTION_LABELS.story_or_quote}>
        <textarea
          value={form.story_or_quote}
          onChange={(e) => set("story_or_quote", e.target.value)}
          placeholder="A short story or powerful quote..."
          className={textareaClass}
        />
      </SectionBlock>

      {/* Key Points */}
      <SectionBlock
        label={SECTION_LABELS.key_points}
        prompt={SECTION_LABELS.key_points_prompt}
      >
        <div className="space-y-2">
          {([1, 2, 3, 4, 5] as const).map((n) => (
            <input
              key={n}
              type="text"
              value={form[`key_point_${n}`]}
              onChange={(e) => set(`key_point_${n}`, e.target.value)}
              placeholder={`Key point ${n}`}
              className={inputClass}
            />
          ))}
        </div>
      </SectionBlock>

      {/* Point Details (shown for each filled key point) */}
      {([1, 2, 3, 4, 5] as const).map(
        (n) =>
          form[`key_point_${n}`].trim() && (
            <SectionBlock
              key={n}
              label={`${SECTION_LABELS.point_details_prefix} ${n} ${SECTION_LABELS.point_details_suffix}`}
              prompt={`${SECTION_LABELS.point_details_prompt} — "${form[`key_point_${n}`]}"`}
            >
              <textarea
                value={form[`point_${n}_details`]}
                onChange={(e) => set(`point_${n}_details`, e.target.value)}
                placeholder="Teachings, stories, and quotes..."
                className={textareaClass}
              />
            </SectionBlock>
          )
      )}

      {/* Helpful Ending */}
      <SectionBlock label={SECTION_LABELS.helpful_ending}>
        <textarea
          value={form.helpful_ending}
          onChange={(e) => set("helpful_ending", e.target.value)}
          placeholder="Wrap it up with something helpful..."
          className={textareaClass}
        />
      </SectionBlock>

      {/* Revenue CTA */}
      <SectionBlock label={SECTION_LABELS.revenue_cta}>
        <textarea
          value={form.revenue_cta}
          onChange={(e) => set("revenue_cta", e.target.value)}
          placeholder="Your call to action..."
          className={textareaClass}
        />
      </SectionBlock>

      {/* Revenue CTA Placement */}
      <SectionBlock label={SECTION_LABELS.revenue_cta_placement}>
        <textarea
          value={form.revenue_cta_placement}
          onChange={(e) => set("revenue_cta_placement", e.target.value)}
          placeholder="Where in the video will the CTA appear?"
          className={textareaClass}
        />
      </SectionBlock>

      {/* Shot List */}
      <SectionBlock
        label={SECTION_LABELS.shot_list}
        prompt={SECTION_LABELS.shot_list_prompt}
      >
        <ShotListGrid shots={shots} editable onChange={handleShotChange} />
      </SectionBlock>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 bg-dark-brown text-cream py-3 rounded-lg font-medium hover:bg-dark-brown/90 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : initialData ? "Update Script" : "Save Script"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-lg font-medium text-charcoal/60 hover:bg-charcoal/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
