import { access, readFile } from 'node:fs/promises';
const required = [
  'public/index.html', 'public/login.html', 'public/setup.html',
  'worker.js', 'netlify/functions/api.mjs', 'migrations/0001_initial_schema.sql',
  'wrangler.jsonc'
];
for (const file of required) await access(new URL(`../${file}`, import.meta.url));
const api = await readFile(new URL('../netlify/functions/api.mjs', import.meta.url), 'utf8');
for (const forbidden of ["@netlify/database", "@netlify/blobs", "process.env"]) {
  if (api.includes(forbidden)) throw new Error(`Осталась зависимость Netlify: ${forbidden}`);
}
if (!api.includes('EMPLOYEE_FILES') || !api.includes('HYPERDRIVE')) throw new Error('Не найдены привязки Cloudflare.');
console.log('КУТ: статические страницы, Cloudflare Worker, Hyperdrive, R2 и SQL-схема на месте.');
