import {
  Activity,
  BarChart2,
  Bell,
  BookOpen,
  Bookmark,
  Clock,
  Lock,
  Mic,
  Quote,
  Refrigerator,
  Search,
  Share2,
  ShieldBan,
  ShieldCheck,
  Shuffle,
  Skull,
  Sparkles,
  Users,
  Volume2,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

// Explicit map keeps the bundle lean (only icons referenced in lib/apps.ts).
const registry: Record<string, LucideIcon> = {
  Activity,
  BarChart2,
  Bell,
  BookOpen,
  Bookmark,
  Clock,
  Lock,
  Mic,
  Quote,
  Refrigerator,
  Search,
  Share2,
  ShieldBan,
  ShieldCheck,
  Shuffle,
  Skull,
  Sparkles,
  Users,
  Volume2,
};

interface IconProps extends LucideProps {
  name: string;
}

export default function Icon({ name, ...props }: IconProps) {
  const LucideComp = registry[name] ?? Sparkles;
  return <LucideComp {...props} />;
}
