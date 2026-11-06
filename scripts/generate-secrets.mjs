import crypto from 'node:crypto';
console.log('KUT_SESSION_SECRET=' + crypto.randomBytes(48).toString('base64url'));
console.log('KUT_DATA_ENCRYPTION_KEY=' + crypto.randomBytes(32).toString('base64'));
console.log('KUT_SETUP_TOKEN=' + crypto.randomBytes(32).toString('base64url'));
