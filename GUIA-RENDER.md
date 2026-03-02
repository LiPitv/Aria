# 🚀 Colocar a ARIA online no Render (grátis)

Segue estes passos e em 10 minutos tens um link público para partilhar com qualquer pessoa!

---

## PASSO 1 — Criar conta no GitHub
1. Vai a **https://github.com** e cria uma conta gratuita (ou faz login)

---

## PASSO 2 — Criar repositório no GitHub
1. Clica no **+** (canto superior direito) → **New repository**
2. Nome: `aria-amorosa` (ou o que quiseres)
3. Mantém **Public**
4. Clica **Create repository**

---

## PASSO 3 — Enviar os ficheiros para o GitHub
Na página do repositório vazio, clica em **"uploading an existing file"**

Arrasta TODOS estes ficheiros (não envies o .env!):
- ✅ server.js
- ✅ package.json
- ✅ .gitignore
- ✅ pasta public/ (com o index.html dentro)

Clica **Commit changes** → pronto!

---

## PASSO 4 — Criar conta no Render
1. Vai a **https://render.com**
2. Clica **Get Started for Free**
3. Faz login com a tua conta do GitHub (mais fácil!)

---

## PASSO 5 — Criar o serviço no Render
1. No dashboard do Render, clica **+ New** → **Web Service**
2. Clica **Connect** ao lado do teu repositório `aria-amorosa`
3. Preenche assim:
   - **Name:** aria-amorosa
   - **Runtime:** Node
   - **Build Command:** (deixa vazio)
   - **Start Command:** `node server.js`
   - **Instance Type:** Free ✅
4. Clica **Create Web Service**

---

## PASSO 6 — Adicionar a tua API Key (IMPORTANTE!)
Ainda no Render, antes de fazer deploy:

1. Vai ao separador **Environment**
2. Clica **Add Environment Variable**
3. Preenche:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-api03-xxxxxxxx` (a tua chave real)
4. Clica **Save Changes**

---

## PASSO 7 — Deploy! 🚀
1. Vai ao separador **Deploys**
2. Clica **Deploy latest commit**
3. Aguarda 2-3 minutos enquanto o Render instala tudo
4. Quando aparecer **Live** ✅, o teu link está pronto!

O link vai ser algo como:
**https://aria-amorosa.onrender.com**

---

## ✅ Partilhar com qualquer pessoa
Basta enviar o link! Funciona em qualquer browser, telemóvel ou computador, em qualquer parte do mundo.

---

## ⚠️ Nota sobre o plano gratuito
No plano gratuito do Render, o servidor "dorme" após 15 minutos sem uso.
A primeira vez que alguém abre o link pode demorar 30-60 segundos a acordar.
Isso é normal e gratuito!

Para evitar isso, podes usar **https://uptimerobot.com** (gratuito) para fazer ping ao site a cada 5 minutos e mantê-lo acordado.

---

*Feito com 💌 — ARIA é uma IA com alma.*
