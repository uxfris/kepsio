import React from "react";
import { ChevronDown } from "lucide-react";
import { Card } from "../ui/Card";
import { SegmentedControl } from "../ui/SegmentedControl";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/Select";
import {
  CTA_OPTIONS,
  CAPTION_LENGTH_OPTIONS,
  EMOJI_STYLE_OPTIONS,
} from "../../lib/utils/constants";
import { CaptionOptions } from "../../types";

interface AdvancedOptionsProps {
  isOpen: boolean;
  options: CaptionOptions;
  onToggle: () => void;
  onOptionsUpdate: (updates: Partial<CaptionOptions>) => void;
}

export const AdvancedOptions = ({
  isOpen,
  options,
  onToggle,
  onOptionsUpdate,
}: AdvancedOptionsProps) => {
  return (
    <Card
      variant="outlined"
      className="overflow-hidden bg-section"
      padding="none"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-4 hover:bg-section-light transition-colors rounded-lg"
      >
        <span className="text-sm font-medium text-text-head">
          Advanced Options
        </span>
        <div
          className={`transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <ChevronDown className="w-4 h-4 text-secondary" />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-6 space-y-6 border-t border-divider">
          {/* Call-to-Action */}
          <div className="pt-4">
            <label className="block text-xs font-medium text-primary mb-2">
              Call-to-Action
            </label>
            <Select
              value={options.cta}
              onValueChange={(value) => onOptionsUpdate({ cta: value })}
            >
              <SelectTrigger className="w-full border border-border rounded-xl bg-surface text-sm">
                <SelectValue placeholder="Choose a CTA" />
              </SelectTrigger>
              <SelectContent>
                {CTA_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hashtag Preference */}
          <div>
            <label className="block text-xs font-medium text-primary mb-3">
              Hashtags:{" "}
              {options.hashtagCount === 0 ? "None" : `${options.hashtagCount}`}
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={options.hashtagCount}
              onChange={(e) =>
                onOptionsUpdate({ hashtagCount: parseInt(e.target.value) })
              }
              className="w-full h-2 bg-section-light rounded-full appearance-none cursor-pointer accent-accent"
            />
            <div className="flex justify-between text-xs text-hint mt-2">
              <span>None</span>
              <span>Max</span>
            </div>
          </div>

          {/* Caption Length */}
          <div>
            <label className="block text-xs font-medium text-primary mb-3">
              Caption Length
            </label>
            <SegmentedControl
              options={CAPTION_LENGTH_OPTIONS}
              value={options.captionLength}
              onChange={(value) => onOptionsUpdate({ captionLength: value })}
              className="w-full"
            />
          </div>

          {/* Emoji Style */}
          <div>
            <label className="block text-xs font-medium text-primary mb-3">
              Emoji Style
            </label>
            <SegmentedControl
              options={EMOJI_STYLE_OPTIONS}
              value={options.emojiStyle}
              onChange={(value) => onOptionsUpdate({ emojiStyle: value })}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
