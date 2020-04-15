const crc = require('crc');

export const hash = name => crc.crc32(name).toString(16);
