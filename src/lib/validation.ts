import { z } from 'zod';

export const zMinMessage = 'Must not be empty';

export const zedEmailValidator = z.string().email();
export const zedPasswordValidator = z.string().min(1, { message: zMinMessage });
