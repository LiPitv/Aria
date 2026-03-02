const http = require("http");
const fs = require("fs");
const path = require("path");
const https = require("https");

// Carregar .env se existir (local). No Render usa variáveis de ambiente diretas.
function loadEnv() {
  try {
    const env = fs.readFileSync(path.join(__dirname, ".env"), "utf8");
    env.split("\n").forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) return;
      const idx = trimmed.indexOf("=");
      if (idx === -1) return;
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (key && !process.env[key]) process.env[key] = val;
    });
  } catch {}
}
loadEnv();

const API_KEY = process.env.ANTHROPIC_API_KEY || "";
const PORT = parseInt(process.env.PORT) || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
};

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // PROXY para a API da Anthropic
  if (req.method === "POST" && req.url === "/api/aria") {
    if (!API_KEY) {
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({
        error: { message: "ANTHROPIC_API_KEY não configurada no servidor." }
      }));
    }

    const chunks = [];
    let totalSize = 0;
    const MAX = 20 * 1024 * 1024; // 20MB

    req.on("data", (chunk) => {
      totalSize += chunk.length;
      if (totalSize > MAX) {
        req.destroy();
        if (!res.headersSent) {
          res.writeHead(413, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: { message: "Imagem demasiado grande." } }));
        }
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      if (res.headersSent) return;
      const body = Buffer.concat(chunks);

      let payload;
      try {
        payload = JSON.parse(body.toString("utf8"));
      } catch {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ error: { message: "JSON inválido." } }));
      }

      const outData = Buffer.from(JSON.stringify(payload), "utf8");
      console.log(`[ARIA] Pedido recebido (${Math.round(outData.length / 1024)} KB)`);

      const options = {
        hostname: "api.anthropic.com",
        path: "/v1/messages",
        method: "POST",
        headers: {
          "Content-Type":      "application/json",
          "Content-Length":    outData.length,
          "x-api-key":         API_KEY,
          "anthropic-version": "2023-06-01",
        },
      };

      const apiReq = https.request(options, (apiRes) => {
        const resChunks = [];
        apiRes.on("data", (c) => resChunks.push(c));
        apiRes.on("end", () => {
          const result = Buffer.concat(resChunks).toString("utf8");
          if (apiRes.statusCode === 200) {
            console.log("[ARIA] Resposta enviada com sucesso!");
          } else {
            console.error(`[ARIA] Erro API (${apiRes.statusCode}):`, result.slice(0, 200));
          }
          res.writeHead(apiRes.statusCode, {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          });
          res.end(result);
        });
      });

      apiReq.on("error", (e) => {
        console.error("[ARIA] Erro de rede:", e.message);
        if (!res.headersSent) {
          res.writeHead(502, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: { message: "Sem ligação à API da Anthropic." } }));
        }
      });

      apiReq.write(outData);
      apiReq.end();
    });

    req.on("error", (e) => console.error("[ARIA] Erro no pedido:", e.message));
    return;
  }

  // Ficheiros estáticos
  let filePath = req.url === "/" ? "/public/index.html" : "/public" + req.url;
  filePath = path.join(__dirname, filePath);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("404 - Não encontrado");
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(content);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`\n🕊️  ARIA v2 online → http://0.0.0.0:${PORT}`);
  console.log(`🔑  API Key: ${API_KEY ? "carregada ✅" : "NÃO ENCONTRADA ⚠️"}\n`);
});

server.on("error", (e) => {
  console.error("Erro no servidor:", e.message);
  process.exit(1);
});
