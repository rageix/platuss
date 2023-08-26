import { FormState } from './formController/FormState';
import { ZodIssue } from 'zod';

/**
 * Joins multiple classes together into one string.
 * @param classes - classes to join
 */
export function classNames(...classes: (string | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Checks if a string is blank. Will detect if a string has just whitespace.
 * @param arg
 */
export function isBlank(arg: string): boolean {
  return !arg || /^\s*$/.test(arg);
}

/**
 * Extracts Form state errors that have a certain path.
 * @param state
 * @param path
 */
export function formErrorsByPath(state: FormState, path: string): ZodIssue[] {
  return state.errors.filter((v) => v.path.indexOf(path) > -1);
}
