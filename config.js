// app config
export const PORT = process.env.PORT || '3000';
export const HOSTNAME =  process.env.HOSTNAME || 'https://short.weslyg.ru';
export const INSIDE_HASH = process.env.INSIDE_HASH || 'md5';
// export const REGEXP_LINK = process.env.REGEXP_LINK || '/(^http(s)?:\\/\\/\\w{2,})\\.\\w{2,}.*|(^(\\w|\\d){2,})\\.\\w{2,}.*/';

// Mongo config
export const MONGO_URL = process.env.MONGO_URL || 'localhost:27017';
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'shorter';
export const MONGO_USER = process.env.MONGO_USER || '';
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';

