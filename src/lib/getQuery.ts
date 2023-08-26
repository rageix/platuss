import { NextRequest } from "next/server";

export function getQuery(req: NextRequest): Object {

  try {
    const { searchParams } = new URL(req.url)
    return JSON.parse(searchParams.get('q'));

  } catch (e) {

    return {};

  }

}