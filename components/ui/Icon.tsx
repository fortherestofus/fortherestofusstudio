/**
 * Icon registry — maps the icon-name strings in lib/apps.ts and lib/services.ts
 * to lucide components. Explicit so only referenced icons enter the bundle.
 * Unknown names fall back to Sparkles.
 */
import {
  BarChart2,
  Bell,
  BookOpen,
  Bookmark,
  Clock,
  Code2,
  Compass,
  FileText,
  Flame,
  Gauge,
  Globe,
  LayoutGrid,
  LineChart,
  Lock,
  Megaphone,
  Mic,
  Palette,
  PenTool,
  Quote,
  Radar,
  Refrigerator,
  Search,
  Share2,
  ShieldBan,
  ShieldCheck,
  Shuffle,
  Skull,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  BarChart2,
  Bell,
  BookOpen,
  Bookmark,
  Clock,
  Code2,
  Compass,
  FileText,
  Flame,
  Gauge,
  Globe,
  LayoutGrid,
  LineChart,
  Lock,
  Megaphone,
  Mic,
  Palette,
  PenTool,
  Quote,
  Radar,
  Refrigerator,
  Search,
  Share2,
  ShieldBan,
  ShieldCheck,
  Shuffle,
  Skull,
  Smartphone,
  Sparkles,
  Users,
  Workflow,
  Zap,
};

interface IconProps extends LucideProps {
  name: string;
}

export default function Icon({ name, ...props }: IconProps) {
  const LucideComp = registry[name] ?? Sparkles;
  return <LucideComp {...props} />;
}
