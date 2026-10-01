export interface Stats {
  totalWords: number;
  totalCategories: number;
  categories: Record<string, number>;
  largestCategory: { name: string; count: number };
  smallestCategory: { name: string; count: number };
}

export interface ScrambleResult {
  original: string;
  scrambled: string;
}

export interface MissingResult {
  word: string;
  puzzle: string;
  missing: string;
}

export type Lang = 'en' | 'ar';

export type Category =
  | 'adjectives'
  | 'nouns'
  | 'verbs'
  | 'animals'
  | 'colors'
  | 'emotions'
  | 'food'
  | 'nature'
  | 'technology'
  | 'space'
  | 'music'
  | 'sports'
  | 'mythology'
  | 'professions'
  | 'abstract';
export class PowerWordGenerator {
  word(category?: Category | Lang, lang?: Lang): string;
  words(count?: number | Category | Lang, category?: Category | Lang, lang?: Lang): string[];
  uniqueWords(count?: number | Category | Lang, category?: Category | Lang, lang?: Lang): string[];
  sentence(wordCount?: number | Lang, lang?: Lang): string;
  sentences(count?: number | Lang, lang?: Lang): string[];
  paragraph(sentenceCount?: number | Lang, lang?: Lang): string;
  paragraphs(count?: number | Lang, lang?: Lang): string[];
  getCategories(lang?: Lang): string[];
  count(category?: Category | Lang, lang?: Lang): number;
  wordStartsWith(letter: string, category?: Category | Lang, lang?: Lang): string | null;
  wordWithLength(length: number, category?: Category | Lang, lang?: Lang): string | null;
  shuffle(count?: number | Lang, lang?: Lang): string[];
  search(text: string, category?: Category | Lang, lang?: Lang): string[];
  stats(lang?: Lang): Stats;
  scramble(category?: Category | Lang, lang?: Lang): ScrambleResult;
  missing(category?: Category | Lang, lang?: Lang): MissingResult;
}

export { PowerWordGenerator as PowerRandomWords };

export function word(category?: Category | Lang, lang?: Lang): string;
export function words(count?: number | Category | Lang, category?: Category | Lang, lang?: Lang): string[];
export function uniqueWords(count?: number | Category | Lang, category?: Category | Lang, lang?: Lang): string[];
export function sentence(count?: number | Lang, lang?: Lang): string;
export function sentences(count?: number | Lang, lang?: Lang): string[];
export function paragraph(count?: number | Lang, lang?: Lang): string;
export function paragraphs(count?: number | Lang, lang?: Lang): string[];
export function categories(lang?: Lang): string[];
export function count(category?: Category | Lang, lang?: Lang): number;
export function shuffle(count?: number | Lang, lang?: Lang): string[];
export function search(text: string, category?: Category | Lang, lang?: Lang): string[];
export function stats(lang?: Lang): Stats;
export function wordStartsWith(letter: string, category?: Category | Lang, lang?: Lang): string | null;
export function wordWithLength(length: number, category?: Category | Lang, lang?: Lang): string | null;
export function scramble(category?: Category | Lang, lang?: Lang): ScrambleResult;
export function missing(category?: Category | Lang, lang?: Lang): MissingResult;
