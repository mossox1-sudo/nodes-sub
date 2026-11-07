// Minimal Zoho Catalyst AppSail launcher: writes Xray VLESS+XHTTP config and spawns xray.
// Env: UUID (required), XPATH (default /tk-rail), X_ZOHO_CATALYST_LISTEN_PORT (platform, default 9000).
// Downloads the xray binary from GitHub releases at first start if not present (no binary in repo).
const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const https = require('https');

const UUID = process.env.UUID;
if (!UUID) { console.error('UUID env required'); process.exit(1); }
const XPATH = process.env.XPATH || '/tk-rail';
const PORT = parseInt(process.env.X_ZOHO_CATALYST_LISTEN_PORT || '9000', 10);
const XRAY_BIN = path.join(__dirname, 'xray');
const XRAY_VERSION = '26.3.27';
const XRAY_URL = `https://github.com/XTLS/Xray-core/releases/download/v${XRAY_VERSION}/Xray-linux-64.zip`;

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'node' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        return reject(new Error(`download failed: ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (e) => { try { fs.unlinkSync(dest); } catch (_) {} reject(e); });
  });
}

async function ensureXray() {
  if (fs.existsSync(XRAY_BIN)) { console.log('xray binary present'); return; }
  console.log(`downloading xray ${XRAY_VERSION} ...`);
  const zipPath = path.join(__dirname, 'xray.zip');
  await download(XRAY_URL, zipPath);
  console.log('extracting xray ...');
  execSync(`unzip -o -j ${zipPath} xray -d ${__dirname}`, { stdio: 'inherit' });
  fs.chmodSync(XRAY_BIN, 0o755);
  fs.unlinkSync(zipPath);
  console.log('xray ready');
}

function start() {
  const config = {
    log: { loglevel: 'warning' },
    inbounds: [{
      listen: '0.0.0.0', port: PORT, protocol: 'vless',
      settings: { clients: [{ id: UUID }], decryption: 'none' },
      streamSettings: {
        network: 'xhttp',
        xhttpSettings: { path: XPATH, mode: 'packet-up' },
        security: 'none'
      },
      sniffing: { enabled: true, destOverride: ['http', 'tls', 'quic'] }
    }],
    outbounds: [
      { protocol: 'freedom', tag: 'direct' },
      { protocol: 'blackhole', tag: 'block' }
    ]
  };
  fs.writeFileSync('/tmp/config.json', JSON.stringify(config));
  console.log(`starting xray on port ${PORT} path ${XPATH}`);
  const xray = spawn(XRAY_BIN, ['run', '-c', '/tmp/config.json'], { stdio: 'inherit' });
  xray.on('exit', (c) => process.exit(c || 0));
}

ensureXray().then(start).catch((e) => { console.error(e); process.exit(1); });
