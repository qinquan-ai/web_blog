import { cp } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const from = resolve(__dirname, 'dist', 'pagefind');
const to = resolve(__dirname, 'public', 'pagefind');

try {
  await cp(from, to, { force: true, recursive: true });
  console.log('Copied pagefind to public/pagefind');
} catch (err) {
  if (err.code !== 'ENOENT') throw err;
  console.log('No pagefind directory to copy — skipping');
}
