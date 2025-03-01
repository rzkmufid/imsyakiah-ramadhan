import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, options: Intl.DateTimeFormatOptions = {
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric'
}): string {
  return date.toLocaleDateString('id-ID', options);
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
}

export function getCurrentHijriYear(): number {
  // This is a simplified calculation and may not be accurate
  // In a real app, you would use a proper Hijri calendar library
  const today = new Date();
  const gregorianYear = today.getFullYear();
  return gregorianYear - 579; // Approximate conversion
}