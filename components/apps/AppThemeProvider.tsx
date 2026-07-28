/**
 * AppThemeProvider — scopes an app's accent to its own pages.
 *
 * Only the accent tokens are overridden. Background, surface, type, and the
 * ink pill buttons stay on the global system, so an app page still reads as
 * part of the same site.
 */
import type { App } from "@/lib/apps";
import type { CSSProperties } from "react";

interface AppThemeProviderProps {
  app: App;
  children: React.ReactNode;
  className?: string;
}

export default function AppThemeProvider({
  app,
  children,
  className,
}: AppThemeProviderProps) {
  const style = {
    "--color-accent": app.accentColor,
    "--color-accent-soft": `color-mix(in srgb, ${app.accentColor} 16%, transparent)`,
    "--color-accent-ink": app.accentInk ?? "#ffffff",
  } as CSSProperties;

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}
