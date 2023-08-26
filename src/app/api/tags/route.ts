import respond from '@/lib/respond';
import { NextRequest } from "next/server";
import { getUserFromSession } from "@/lib/getUserFromSession";
import { Tag } from "@/types/tag";
import Joi from "joi";
import {
  PaginatedRequest,
  PaginatedResponse,
  paginationSchema
} from "@/types/pagination";
import { getQuery } from "@/lib/getQuery";
import { JoiSettings } from "@/lib/joi";
import db from '@/lib/db';
import { uuidValidator } from "@/lib/validators";
import { validateDelete } from "@/types/deleteRequest";

interface GetRequest extends PaginatedRequest {
  name?: string
}

const getSchema = Joi.object<GetRequest>({
  name: Joi.string().trim().optional(),
}).keys(paginationSchema);

export async function GET(req: NextRequest) {
  try {

    const user = await getUserFromSession(req.cookies);
    if (!user) {
      return respond.withAuthenticationRequired();
    }

    const result = getSchema.validate(getQuery(req), JoiSettings);

    if (result.error) {
      return respond.withValidationErrors(result);
    }

    const tags = await db.tags.findMany({
      where: {
        userId: user.id,
        name: result.value.name ? {
          contains: result.value.name,
          mode: 'insensitive'
        } : undefined
      },
      skip: result.value.page * result.value.perPage,
      take: result.value.perPage
    });

    const response: PaginatedResponse<Tag[]> = {
      data: tags,
      page: result.value.page,
      perPage: result.value.perPage
    }

    return respond.withData(response);

  } catch (error) {
    return respond.withServerError(req, error);
  }
}

interface PostRequest extends Partial<Tag> {
}

const postSchema = Joi.object<PostRequest>({
  name: Joi.string().trim().required(),
  color: Joi.string().trim().required(),
});

export async function POST(req: NextRequest) {
  try {

    const user = await getUserFromSession(req.cookies);
    if (!user) {
      return respond.withAuthenticationRequired();
    }

    const result = postSchema.validate(await req.json(), JoiSettings);

    if (result.error) {
      return respond.withValidationErrors(result);
    }

    const tag = await db.tags.create({
      data: {
        userId: user.id,
        name: result.value.name,
        color: result.value.color,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    return respond.withData<Tag>(tag);

  } catch (error) {
    return respond.withServerError(req, error);
  }
}

interface PutRequest extends Partial<Tag> {
}

const putSchema = Joi.object<PutRequest>({
  id: uuidValidator.required()
}).keys(postSchema);

export async function PUT(req: NextRequest) {
  try {

    const user = await getUserFromSession(req.cookies);
    if (!user) {
      return respond.withAuthenticationRequired();
    }

    const result = putSchema.validate(await req.json(), JoiSettings);

    if (result.error) {
      return respond.withValidationErrors(result);
    }

    const oldTag = await db.tags.findUnique({
      where: {
        id: result.value.id,
        userId: user.id,
      }
    });

    if (!oldTag) {
      return respond.withErrors(['Invalid id.']);
    }

    const tag = await db.tags.update({
      where: {
        id: result.value.id,
      },
      data: {
        name: result.value.name,
        color: result.value.color,
        updatedAt: new Date(),
      }
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

    const result = validateDelete(await req.json());

    if (result.error) {
      return respond.withValidationErrors(result);
    }

    await db.tags.deleteMany({
      where: {
        id: {
          in: result.value.ids
        },
        userId: user.id
      }
    });

    return respond.withOk();

  } catch (error) {
    return respond.withServerError(req, error);
  }
}
