import db from '@/lib/db';
import respond from '@/lib/respond';
import { NextRequest } from 'next/server';
import hashPassword from '@/lib/hashPassword';
import { z } from 'zod';

const postSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  terms: z.boolean().refine((val) => val, {
    message: 'You are required to accept the terms. Value should be: true.',
  }),
});

export type ApiSignUpPost = z.infer<typeof postSchema>;

export async function POST(req: NextRequest) {
  try {
    const result = postSchema.safeParse(await req.json());

    if (!result.success) {
      return respond.withValidationErrors(result.error);
    }

    const { data } = result;

    const count = await db.users.count({
      where: { email: data.email },
    });

    if (count > 0) {
      return respond.withErrors(['Email is already in use.']);
    }

    const hash = await hashPassword(data.password);

    await db.users.create({
      data: {
        firstName: '',
        lastName: '',
        email: data.email,
        emailVerified: false,
        image: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        password: {
          create: {
            hash: hash,
          },
        },
        verifyEmail: {
          create: {
            createdAt: new Date(),
          },
        },
      },
    });

    // todo: send email for verification

    return respond.withOk();
  } catch (error) {
    return respond.withServerError(req, error);
  }
}
