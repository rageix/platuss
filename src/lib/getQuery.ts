import { NextRequest } from 'next/server';
import _ from 'lodash';

export function getQuery(req: NextRequest): Object {
  try {
    const { searchParams } = new URL(req.url);
    return JSON.parse(_.toString(searchParams.get('q')));
  } catch (e) {
    return {};
  }
}
