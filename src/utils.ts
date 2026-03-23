import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCoralColor = (variant: string, day: number) => {
  const intensity = (day / 21);
  const saturation = 10 + intensity * 80;
  const lightness = 95 - intensity * 35;
  
  let hue = 25;
  if (variant === 'cool') hue = 190;
  if (variant === 'soft') hue = 280;
  
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
