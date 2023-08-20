import { randomBytes, secretbox } from 'tweetnacl';
import {
  decodeBase64,
  decodeUTF8,
  encodeBase64,
  encodeUTF8,
} from 'tweetnacl-util';

function newNonce() {
  return randomBytes(secretbox.nonceLength);
}

/**
 * Encrypts a json object
 * @param json
 * @param key - a base 64 encoded 32bit key
 * @return string - a base 64 encoded message
 */
export function encrypt (json: object, key: string): string {
  const keyUint8Array = decodeBase64(key);

  if(keyUint8Array.length !== secretbox.keyLength) {

    throw new Error(`Key size is incorrect! Key is ${keyUint8Array.length} bytes and should be ${secretbox.keyLength} bytes!`);

  }

  const nonce = newNonce();
  const messageUint8 = decodeUTF8(JSON.stringify(json));
  const box = secretbox(messageUint8, nonce, keyUint8Array);

  const fullMessage = new Uint8Array(nonce.length + box.length);
  fullMessage.set(nonce);
  fullMessage.set(box, nonce.length);

  return encodeBase64(fullMessage);
}

/**
 * Decrypts a secret box message
 * @param messageWithNonce - a base64 encoded string
 * @param key - a base64 encoded 32bit key
 */
export function decrypt<T>(messageWithNonce: string, key: string): T {
  const keyUint8Array = decodeBase64(key);

  if(keyUint8Array.length !== secretbox.keyLength) {

    throw new Error(`Key size is incorrect! Key is ${keyUint8Array.length} bytes and should be ${secretbox.keyLength} bytes!`);

  }

  const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, secretbox.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(
    secretbox.nonceLength,
    messageWithNonce.length,
  );

  const decrypted = secretbox.open(message, nonce, keyUint8Array);

  if (!decrypted) {
    throw new Error('Could not decrypt message');
  }

  const base64DecryptedMessage = encodeUTF8(decrypted);
  return JSON.parse(base64DecryptedMessage);
}