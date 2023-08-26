import z from 'zod';

export const deleteSchema = z.object({
  ids: z.string().array(),
});

export type DeleteReq = z.infer<typeof deleteSchema>;
