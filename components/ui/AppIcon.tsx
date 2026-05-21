import Image from "next/image";
import PlaceholderIcon from "@/components/ui/PlaceholderIcon";

interface AppIconProps {
  icon?: string;
  color: string;
  label: string;
  size?: number;
  className?: string;
}

export default function AppIcon({
  icon,
  color,
  label,
  size = 64,
  className = "",
}: AppIconProps) {
  if (icon) {
    return (
      <Image
        src={icon}
        alt={`${label} icon`}
        width={size}
        height={size}
        className={`shrink-0 rounded-2xl ${className}`}
        priority={size >= 80}
      />
    );
  }

  return (
    <PlaceholderIcon
      color={color}
      label={label}
      size={size}
      className={className}
    />
  );
}
