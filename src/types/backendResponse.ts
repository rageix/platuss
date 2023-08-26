export enum ResponseType {
  Data = 'data',
  Error = 'error',
  Ok = 'ok',
  Redirect = ''
}

export enum ResponseError {
  Server = 'server',
  Validation = 'validation',
  ApplicationError = 'appError',
  Authentication = 'auth',
  OTP = 'otp',
  Permission = 'permission',
}

export interface BackendResponse<T> {
  type: ResponseType,
  error?: ResponseError,
  data?: T,
  errors?: string[],
  redirect?: string,
}