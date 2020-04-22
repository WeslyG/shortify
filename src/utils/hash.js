import crypto from 'crypto';
import { crc32 }  from 'crc';
import { INSIDE_HASH } from '../../config';

export const hash = name => crc32(name).toString(16);

export const hashString = text => {
  return crypto.createHash(INSIDE_HASH).update(text).digest('hex');
};
