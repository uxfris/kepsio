import { Link2, Image, Clock } from "lucide-react";
import { ContextOption, PreviousPost } from "../types";

export const CONTEXT_OPTIONS: ContextOption[] = [
  { id: "product-link", label: "Add product link", icon: Link2 },
  { id: "upload-image", label: "Upload image", icon: Image },
  { id: "previous-post", label: "Use previous post", icon: Clock },
];

export const PREVIOUS_POSTS: PreviousPost[] = [
  { id: "1", title: "Launching our new product line", date: "2 days ago" },
  {
    id: "2",
    title: "Behind the scenes of our design process",
    date: "1 week ago",
  },
  {
    id: "3",
    title: "Client success story: 300% growth",
    date: "2 weeks ago",
  },
];

export const CTA_OPTIONS = [
  { value: "link-in-bio", label: "Link in bio" },
  { value: "shop-now", label: "Shop now" },
  { value: "dm-me", label: "DM me" },
  { value: "comment-below", label: "Comment below" },
  { value: "custom", label: "Custom" },
];

export const CAPTION_LENGTH_OPTIONS = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

export const EMOJI_STYLE_OPTIONS = [
  { value: "none", label: "None" },
  { value: "minimal", label: "Minimal" },
  { value: "generous", label: "Generous" },
];

export const CREDITS = {
  remaining: 9,
  total: 10,
};
