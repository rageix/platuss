import log from '../log/logger';
import {
  BackendResponse,
  ResponseError,
  ResponseType,
} from './backendResponse';
import { PaginatedResults, Pagination } from '../pagination';
import { SelectOption } from '../selectOptions';
import { ValidationResult } from 'joi';
import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export const defaultServerErrorResponse =
  "Your request failed. We've logged the error and will look " +
  'into the issue as soon as possible.';

class Respond {
  withOk = (): NextResponse => {
    const responseData: BackendResponse<null> = {
      type: ResponseType.Ok,
    };

    return NextResponse.json(responseData, {
      headers: { 'X-Robots-Tag': 'noindex' },
    });
  };

  withDatabaseError = (error: Error): NextResponse => {
    log.error('database error', error);

    return this.withErrors([
      "There was a database error. It was logged and we'll get it fixed.",
    ]);
  };

  withPaginatedResults = <T>(
    results: T[],
    pagination: Pagination,
  ): NextResponse => {
    const responseData: BackendResponse<PaginatedResults<T>> = {
      type: ResponseType.Data,
      data: {
        results: results,
        pagination: pagination,
      },
    };

    return NextResponse.json(responseData, {
      headers: { 'X-Robots-Tag': 'noindex' },
    });
  };

  withErrorFromError = (error: Error, message?: string): NextResponse => {
    log.error('response error', error);

    return this.withErrors([message ? message : error?.message]);
  };

  withErrors = (
    errors: string[],
    type: ResponseError = ResponseError.ApplicationError,
  ): NextResponse => {
    const responseData: BackendResponse<null> = {
      type: ResponseType.Error,
      error: type,
      errors: errors,
    };

    return NextResponse.json(responseData, {
      status: 400,
      headers: { 'X-Robots-Tag': 'noindex' },
    });
  };

  withValidationErrors = (result: ValidationResult): NextResponse => {
    const responseData: BackendResponse<ValidationResult> = {
      type: ResponseType.Error,
      error: ResponseError.Validation,
      data: result,
    };

    return NextResponse.json(responseData, {
      status: 400,
      headers: { 'X-Robots-Tag': 'noindex' },
    });
  };

  withSelectOptions = <T>(options: SelectOption<T>[]): NextResponse => {
    const responseData: BackendResponse<SelectOption<T>[]> = {
      type: ResponseType.Data,
      data: options,
    };

    return NextResponse.json(responseData, {
      headers: { 'X-Robots-Tag': 'noindex' },
    });
  };

  withPermissionError = (): NextResponse => {
    return this.withErrors(
      ['You do not have permission to do that.'],
      ResponseError.Permission,
    );
  };

  withRedirect = (path: string, status = 302): NextResponse => {
    return NextResponse.redirect(path, status);
  };

  withFrontEndRedirect = (path: string): NextResponse => {
    const responseData: BackendResponse<string> = {
      type: ResponseType.Redirect,
      redirect: path,
    };

    return NextResponse.json(responseData, {
      headers: { 'X-Robots-Tag': 'noindex' },
    });
  };

  withData = <T>(data: T): NextResponse => {
    const responseData: BackendResponse<T> = {
      type: ResponseType.Data,
      data: data,
    };

    return NextResponse.json(responseData, {
      headers: { 'X-Robots-Tag': 'noindex' },
    });
  };

  // withJoiErrors = (response: NextApiResponse, result: ValidationResult<any>) => {
  //
  //   let errors: string[] = [];
  //
  //   if (!isEmpty(result.error)) {
  //
  //     for (let detail of result.error.details) {
  //
  //       errors.push(`Validation error: ${detail.path.join('.')}:  ${detail.message}`);
  //
  //     }
  //
  //   }
  //
  //   if (!isEmpty(result.warning)) {
  //
  //     for (let detail of result.warning.details) {
  //
  //       errors.push(`Validation warning: ${detail.path.join('.')}:  ${detail.message}`);
  //
  //     }
  //
  //   }
  //
  //   this.withErrors(response, errors);
  //
  // }

  // withAPIAuthRequired = (response: NextApiResponse) => {
  //
  //   response.status(401).send('');
  //
  // }
  //
  // withAPIOtpRequired = (response: NextApiResponse) => {
  //
  //   response.status(407).send('');
  //
  // }

  withServerError = (
    request: NextRequest,
    error: unknown,
    message = defaultServerErrorResponse,
  ): NextResponse => {
    log.requestError(request, error);

    const responseData: BackendResponse<null> = {
      type: ResponseType.Error,
      error: ResponseError.Server,
      errors: [message],
    };

    return NextResponse.json(responseData, {
      status: 500,
      headers: { 'X-Robots-Tag': 'noindex' },
    });

  };

  withInvalidRequestError = (): NextResponse => {
    return this.withErrors(
      ["You're request is invalid."],
      ResponseError.ApplicationError,
    );
  };

  // withTemplate = (response: NextApiResponse, template: string, data: RouteConfig) => {
  //   response.render(template, { ...newRouteConfig(), ...data });
  // };
  //
  // withHTML = (response: NextApiResponse, body: string) => {
  //   response.send(body);
  // };

  withText = (response: NextApiResponse, text: string) => {
    response.setHeader('Content-Type', 'text/plain');
    response.setHeader('X-Robots-Tag', 'noindex');
    response.send(text);
  };

  // withCSVFromArray = (response: NextApiResponse,
  //                    rows: any[],
  //                    filename: string,
  //                    header: boolean = true) => {
  //
  //     let data = rows.map((v) => {
  //
  //         for(let key in v) {
  //
  //             if (v.hasOwnProperty(key)){
  //
  //                 if(_.isArray(v[key])) {
  //
  //                     v[key] = v[key].join(', ')
  //
  //                 } else if(_.isObject(v[key])) {
  //
  //                     v[key] = JSON.stringify(v[key]);
  //
  //                 }
  //
  //             }
  //
  //         }
  //
  //         return v;
  //
  //     })
  //
  //     response.setHeader('Content-disposition', 'attachment; filename=' + filename);
  //     response.setHeader('Content-Type', 'text/csv');
  //     response.setHeader('X-Robots-Tag', 'noindex');
  //     response.send(Papa.unparse(data, {header: header}))
  //
  // }

  withFile = (
    response: NextApiResponse,
    filename: string,
    contentType: string,
    data: never,
  ) => {
    response.setHeader(
      'Content-disposition',
      'attachment; filename=' + filename,
    );
    response.setHeader('Content-Type', contentType);
    response.setHeader('X-Robots-Tag', 'noindex');
    response.send(data);
  };
}

export default new Respond();
