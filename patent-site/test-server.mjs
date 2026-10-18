// Minimal fixture server for automated tests; production serves static files directly.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('patents');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};
http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/patents(?=\/|$)/,'');
    let file = path.resolve(root,'.'+(pathname || '/'));
    if (!file.startsWith(root + path.sep) && file !== root) throw new Error('Outside root');
    try { if ((await fs.stat(file)).isDirectory()) file=path.join(file,'index.html'); }
    catch (_) { file=path.join(root,'404.html'); res.statusCode=404; }
    res.setHeader('Content-Type',types[path.extname(file)] || 'application/octet-stream');
    res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'");
    res.end(await fs.readFile(file));
  } catch (_) { res.writeHead(400); res.end('Bad request'); }
}).listen(4173,'127.0.0.1');
