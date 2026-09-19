'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/theme/theme-context';
import { cn } from '@/lib/utils/cn';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
    >
      {/* Sun — rotates and fades out as dark mode activates */}
      <Sun
        className={cn(
          'absolute h-5 w-5 transition-all duration-500 ease-out',
          isDark
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100',
        )}
      />
      {/* Moon — rotates in from the opposite direction, mirroring the sun */}
      <Moon
        className={cn(
          'absolute h-5 w-5 transition-all duration-500 ease-out',
          isDark
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0',
        )}
      />
    </button>
  );
}
