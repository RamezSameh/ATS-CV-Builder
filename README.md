# 📄 ATS CV Builder

A free, privacy-first **ATS-friendly CV builder** that runs entirely in your browser. Fill in your details, watch a clean live preview update as you type, check your ATS compatibility score, then export to PDF or Word — no account, no backend, no data ever leaves your device.

## ✨ Features

- **🔴 Live preview** — your CV updates in real time as you type
- **📊 ATS compatibility score** — instant score (0–100) with a checklist: contact info, summary length, skills count, quantified achievements, experience, education and more
- **🤖 AI refinement (optional)** — import a PDF and let AI clean up the extracted text before filling the form; works with Google Gemini (free), OpenAI, or any custom endpoint. Your API key stays in your browser only
- **📥 PDF import** — upload an existing CV and auto-fill the form via pdf.js
- **🖨️ Export** — print to PDF or download as Word (`.doc`)
- **🌍 Bilingual UI** — full Arabic (RTL) and English interface
- **🧩 Dynamic sections** — add/remove experience, education, projects and languages entries
- **💾 Autosave** — your progress is saved automatically in the browser
- **🔒 100% client-side** — no server, no tracking, no signup

## 🚀 Live Demo

**https://ramezsameh.github.io/ATS-CV-Builder/**

Just open the link and start building — nothing to install.

## 🛠️ Technologies

- HTML5 / CSS3 / Vanilla JavaScript (no build step, no framework)
- [pdf.js](https://mozilla.github.io/pdf.js/) — PDF text extraction (CDN)
- Browser `localStorage` — autosave + AI settings
- GitHub Pages — free static hosting

## 📁 Project Structure

```
ATS-CV-Builder/
├── index.html   # App markup (form + live preview)
├── styles.css   # Styling + print layout
└── script.js    # Form logic, i18n, PDF import, AI refine, export
```

## ⚙️ Run Locally

No build step needed:

```bash
git clone https://github.com/RamezSameh/ATS-CV-Builder.git
cd ATS-CV-Builder
```

Then open `index.html` in your browser (or serve the folder with any static server, e.g. `npx serve`).

## 🤖 Using the AI Refinement

1. Import your CV as PDF (or type your details manually).
2. Open the *AI refinement* section, paste your API key and pick a provider:
   - **Google Gemini** (free tier available)
   - **OpenAI**
   - **Custom** endpoint + model
3. Click *Refine* — the AI cleans and structures the extracted text, then the form is auto-filled.

> Your API key is stored only in your browser's localStorage and is sent directly to the provider you choose. It never touches any other server.

## 🖨️ Exporting

- **PDF** — click *Print*, then choose "Save as PDF" in the print dialog
- **Word** — click the Word button to download a `.doc` file

## 👨‍💻 Author

**Ramez Sameh** — Full-Stack .NET Developer

- GitHub: https://github.com/RamezSameh
- LinkedIn: https://linkedin.com/in/ramez-sameh

## 📜 License

MIT — free to use, modify and share.
