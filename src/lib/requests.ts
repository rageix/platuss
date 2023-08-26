'use client';
import {
  BackendResponse,
  ResponseError,
  ResponseType,
} from '@/types/backendResponse';
import emitter from './emitter';
import _ from 'lodash';

export function processResponse<T>(
  response: BackendResponse<T>,
): BackendResponse<T> {
  switch (response.type) {
    case ResponseType.Ok:
    case ResponseType.Data:
      return response;
    case ResponseType.Error:
      switch (response.error) {
        case ResponseError.ApplicationError:
        case ResponseError.Server:
        case ResponseError.Permission:
        case ResponseError.Validation:
          for (const error of response.errors || []) {
            emitter.emitNotificationError(error);
          }
          break;
        case ResponseError.OTP:
          window.location.href = '/otp';
          break;
        case ResponseError.Authentication:
          window.location.href = '/login';
          break;
      }
      return response;
    case ResponseType.Redirect:
      window.location.href = _.toString(response.redirect);
      return response;
  }
}

export async function getData<V>(
  url = '',
  data?: string | string[][],
): Promise<BackendResponse<V>> {
  // Default options are marked with *
  let query = '';
  if (data) {
    query = '?' + new URLSearchParams(data);
  }
  const rawResponse = await fetch(url + query);
  const response = (await rawResponse.json()) as BackendResponse<V>;
  return processResponse<V>(response);
}

export async function postData<T, V>(
  url = '',
  data: T,
): Promise<BackendResponse<V>> {
  return await sendData<T, V>(url, 'POST', data);
}

export async function putData<T, V>(
  url = '',
  data: T,
): Promise<BackendResponse<V>> {
  return await sendData<T, V>(url, 'PUT', data);
}

export async function deleteData<T, V>(
  url = '',
  data: T,
): Promise<BackendResponse<V>> {
  return await sendData<T, V>(url, 'DELETE', data);
}

export async function sendData<T, V>(
  url = '',
  method: string,
  data: T,
): Promise<BackendResponse<V>> {
  const el = document.querySelector(
    'meta[name="x-csrf-token"]',
  ) as HTMLMetaElement | null;
  const rawResponse = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': el ? el.content : '',
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  });
  const response = (await rawResponse.json()) as BackendResponse<V>; // parses JSON response into native JavaScript objects
  return processResponse<V>(response);
}
