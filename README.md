# 🕊️ ARIA — Inteligência Amorosa

> Conselheira do coração com valores éticos: Honestidade, Fé e Respeito.

---

## ⚡ Instalar e correr (5 minutos)

### 1. Instala o Node.js
Vai a **https://nodejs.org** e descarrega a versão **LTS** (botão verde).  
Instala normalmente — segue os passos do instalador.

---

### 2. Obtém a tua API Key da Anthropic
1. Vai a **https://console.anthropic.com**
2. Cria uma conta gratuita (ou faz login)
3. Clica em **"API Keys"** → **"Create Key"**
4. Copia a chave (começa por `sk-ant-...`)

---

### 3. Configura a tua chave
Abre o ficheiro **`.env`** com qualquer editor de texto (Bloco de Notas, etc.)  
Substitui `coloca-aqui-a-tua-api-key` pela tua chave:

```
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxx
```

Guarda o ficheiro.

---

### 4. Inicia a ARIA

**No Windows:**
- Abre a pasta `aria-app`
- Clica duas vezes em **`iniciar.bat`**  
  *(ou clica com o botão direito → "Abrir Terminal" → escreve `node server.js`)*

**No Mac / Linux:**
- Abre o Terminal dentro da pasta `aria-app`
- Escreve: `node server.js`

---

### 5. Abre no browser
Vai a: **http://localhost:3000**

A ARIA está pronta! 🕊️

---

## 📱 Usar no telemóvel (mesma rede Wi-Fi)

1. No computador, descobre o teu IP local:
   - **Windows:** abre o CMD e escreve `ipconfig` → procura "Endereço IPv4" (ex: `192.168.1.5`)
   - **Mac:** Definições → Wi-Fi → detalhes → IP

2. No telemóvel (ligado ao mesmo Wi-Fi), abre o browser e vai a:
   `http://192.168.1.5:3000` *(substitui pelo teu IP)*

---

## 🛑 Parar o servidor
No terminal onde o servidor está a correr, pressiona **Ctrl + C**.

---

## 📁 Estrutura dos ficheiros

```
aria-app/
├── server.js          ← O servidor Node.js
├── .env               ← A tua API Key (não partilhes!)
├── package.json       ← Configuração do projeto
├── iniciar.bat        ← Atalho para Windows
├── README.md          ← Este guia
└── public/
    └── index.html     ← O site da ARIA
```

---

*Feito com 💌 — ARIA é uma IA com alma.*
