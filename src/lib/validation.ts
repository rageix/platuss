import { z } from 'zod';

export const zMinMessage = 'Must not be empty';

export const zEmailValidator = z.string().email();
export const zPasswordValidator = z.string().min(1, { message: zMinMessage });

export const zCssColorValidator = z.string().regex(/#([a-f0-9]{3}){1,2}\b/i);
