import respond from '@/lib/respond';
import { NextRequest } from 'next/server';
import { getUserFromSession } from '@/lib/getUserFromSession';
import { Tag } from '@/types/tag';
import { PaginatedResponse, paginationSchema } from '@/types/pagination';
import { getQuery } from '@/lib/getQuery';
import db from '@/lib/db';
import { deleteSchema } from '@/types/deleteRequest';
import { z } from 'zod';
import { makePagination } from '@/lib/pagination';

const getSchema = paginationSchema.extend({
  id: z.string().uuid().optional(),
  name: z.string().trim().optional(),
});

export type ApiTagsGet = z.infer<typeof getSchema>;

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromSession(req.cookies);
    if (!user) {
      return respond.withAuthenticationRequired();
    }

    const result = getSchema.safeParse(getQuery(req));

    if (!result.success) {
      return respond.withValidationErrors(result.error);
    }

    const { data } = result;
    const { pageIndex, pageSize } = makePagination(data);

    const tags = await db.tags.findMany({
      where: {
        userId: user.id,
        id: data.id ? data.id : undefined,
        name: data.name
          ? {
              contains: data.name,
              mode: 'insensitive',
            }
          : undefined,
      },
      skip: pageIndex * pageSize,
      take: pageSize,
    });

    const response: PaginatedResponse<Tag[]> = {
      data: tags,
      pageIndex: pageIndex,
      pageSize: pageSize,
    };

    return respond.withData(response);
  } catch (error) {
    return respond.withServerError(req, error);
  }
}

const postSchema = z.object({
  name: z.string(),
  color: z.string(),
});

export type ApiTagsPost = z.infer<typeof postSchema>;

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromSession(req.cookies);
    if (!user) {
      return respond.withAuthenticationRequired();
    }

    const result = postSchema.safeParse(await req.json());

    if (!result.success) {
      return respond.withValidationErrors(result.error);
    }

    const tag = await db.tags.create({
      data: {
        userId: user.id,
        name: result.data.name,
        color: result.data.color,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return respond.withData<Tag>(tag);
  } catch (error) {
    return respond.withServerError(req, error);
  }
}

const putSchema = postSchema.extend({
  id: z.string().uuid(),
});

export type ApiTagsPut = z.infer<typeof putSchema>;

export async function PUT(req: NextRequest) {
  try {
    const user = await getUserFromSession(req.cookies);
    if (!user) {
      return respond.withAuthenticationRequired();
    }

    const result = putSchema.safeParse(await req.json());

    if (!result.success) {
      return respond.withValidationErrors(result.error);
    }

    const oldTag = await db.tags.findUnique({
      where: {
        id: result.data.id,
        userId: user.id,
      },
    });

    if (!oldTag) {
      return respond.withErrors(['Invalid id.']);
    }

    const tag = await db.tags.update({
      where: {
        id: result.data.id,
      },
      data: {
        ...result.data,
        updatedAt: new Date(),
      },
    });

    return respond.withData<Tag>(tag);
  } catch (error) {
    return respond.withServerError(req, error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getUserFromSession(req.cookies);
    if (!user) {
      return respond.withAuthenticationRequired();
    }

    const result = deleteSchema.safeParse(await req.json());

    if (!result.success) {
      respond.withValidationErrors(result.error);
      return;
    }

    await db.tags.deleteMany({
      where: {
        id: {
          in: result.data.ids,
        },
        userId: user.id,
      },
    });

    return respond.withOk();
  } catch (error) {
    return respond.withServerError(req, error);
  }
}
