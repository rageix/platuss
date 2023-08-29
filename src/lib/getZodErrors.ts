import { SafeParseReturnType } from 'zod';

export function getZodErrors(result: SafeParseReturnType<any, any>): string[] {
  if (!result.success) {
    return result.error.issues.map((v) => v.message);
  }

  return [];
}
