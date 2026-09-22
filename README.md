# ATS CV Builder

A free, privacy-friendly **ATS-compatible CV builder** that runs entirely in the browser. Fill in your details, watch a clean live preview update as you type, then print to PDF or export to Word — no account, no backend, no data ever leaves your device.

## ✨ Features

- **Live preview** — see your CV update in real time as you type
- **ATS-friendly layout** — simple single-column structure, standard section headings, no graphics/tables that confuse parsers
- **PDF import** — upload an existing CV (PDF) and auto-fill the form via pdf.js
- **Export** — print to PDF or download as Word (.doc)
- **Bilingual UI** — full Arabic (RTL) and English interface
- **Dynamic sections** — add/remove experience, education, projects, and languages entries
- **100% client-side** — your data never leaves the browser

## 🚀 Live Demo

**https://ramezsameh.github.io/ATS-CV-Builder/**

Just open the link and start building.

## 🛠️ Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- [pdf.js](https://mozilla.github.io/pdf.js/) (PDF import, loaded from CDN)

## 📁 Project Structure

```
ATS-CV-Builder/
├── index.html      # App markup (form + preview)
├── styles.css      # Styling, print layout
└── script.js       # Form logic, i18n, PDF import, export
```

## ⚙️ Run Locally

No build step needed:

```bash
git clone https://github.com/RamezSameh/ATS-CV-Builder.git
cd ATS-CV-Builder
```

Then open `index.html` in your browser (or serve the folder with any static server).

## 🖨️ Exporting

- **PDF**: click Print, then choose "Save as PDF" in the print dialog
- **Word**: click the Word download button for a `.doc` file

## 👨‍💻 Author

**Ramez Sameh** — Full Stack .NET Developer

- GitHub: https://github.com/RamezSameh
- LinkedIn: https://linkedin.com/in/ramez-sameh

## 📜 License

MIT
