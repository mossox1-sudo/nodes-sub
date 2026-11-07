#!/bin/sh
set -eu
PORT="${PORT:-8080}"
UUID="${UUID:?UUID environment variable is required}"
WSPATH="${WSPATH:-/tk-rail}"
cat > /tmp/config.json <<EOJ
{
  "log": { "loglevel": "warning" },
  "inbounds": [
    {
      "listen": "0.0.0.0",
      "port": ${PORT},
      "protocol": "vless",
      "settings": {
        "clients": [{ "id": "${UUID}" }],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "ws",
        "wsSettings": { "path": "${WSPATH}" },
        "security": "none"
      },
      "sniffing": { "enabled": true, "destOverride": ["http", "tls", "quic"] }
    }
  ],
  "outbounds": [
    { "protocol": "freedom", "tag": "direct" },
    { "protocol": "blackhole", "tag": "block" }
  ]
}
EOJ
echo "Xray starting on port ${PORT}, VLESS+WS path ${WSPATH} (plain, TLS terminated at Hubfly edge)"
exec /usr/local/bin/xray run -c /tmp/config.json
