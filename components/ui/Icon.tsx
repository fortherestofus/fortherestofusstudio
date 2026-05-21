import {
  BarChart2,
  BookOpen,
  Clock,
  Refrigerator,
  Search,
  Share2,
  Sparkles,
  Zap,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

// Explicit map keeps the bundle lean (only icons referenced in lib/apps.ts).
const registry: Record<string, LucideIcon> = {
  BarChart2,
  BookOpen,
  Clock,
  Refrigerator,
  Search,
  Share2,
  Sparkles,
  Zap,
};

interface IconProps extends LucideProps {
  name: string;
}

export default function Icon({ name, ...props }: IconProps) {
  const LucideComp = registry[name] ?? Sparkles;
  return <LucideComp {...props} />;
}
