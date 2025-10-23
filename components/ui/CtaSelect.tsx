import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./Select";

interface CtaSelectProps {
  ctaType: string;
  setCtaType: (value: string) => void;
}

export function CtaSelect({ ctaType, setCtaType }: CtaSelectProps) {
  return (
    <Select value={ctaType} onValueChange={setCtaType}>
      <SelectTrigger className="w-full border border-border rounded-lg bg-section-light text-sm">
        <SelectValue placeholder="Choose a CTA" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="link-in-bio">Link in bio</SelectItem>
        <SelectItem value="shop-now">Shop now</SelectItem>
        <SelectItem value="dm-me">DM me</SelectItem>
        <SelectItem value="comment-below">Comment below</SelectItem>
        <SelectItem value="custom">Custom</SelectItem>
      </SelectContent>
    </Select>
  );
}
