const form = document.getElementById("cvForm");
const printBtn = document.getElementById("printBtn");
const languageSelect = document.getElementById("languageSelect");
const addExperienceBtn = document.getElementById("addExperienceBtn");
const addEducationBtn = document.getElementById("addEducationBtn");
const addProjectBtn = document.getElementById("addProjectBtn");
const importPdfBtn = document.getElementById("importPdfBtn");
const pdfUploadInput = document.getElementById("pdfUploadInput");
const pdfImportStatus = document.getElementById("pdfImportStatus");
const experienceItems = document.getElementById("experienceItems");
const educationItems = document.getElementById("educationItems");
const projectItems = document.getElementById("projectItems");
let importStatusKey = "importPdfStatusReady";
const pdfJsCandidates = [
  {
    lib: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
    worker: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
  },
  {
    lib: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js",
    worker: "https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
  }
];
let activePdfWorkerSrc = "";

const fields = {
  fullName: document.getElementById("previewName"),
  jobTitle: document.getElementById("previewJobTitle"),
  email: document.getElementById("previewEmail"),
  phone: document.getElementById("previewPhone"),
  address: document.getElementById("previewAddress"),
  website: document.getElementById("previewWebsite"),
  summary: document.getElementById("previewSummary"),
  experience: document.getElementById("previewExperience"),
  education: document.getElementById("previewEducation"),
  projects: document.getElementById("previewProjects"),
  skills: document.getElementById("previewSkills")
};

const i18n = {
  ar: {
    dir: "rtl",
    pageTitle: "منشئ السيرة الذاتية ATS",
    strings: {
      builderTag: "ATS CV Builder",
      languageLabel: "اللغة",
      panelTitle: "أنشئ سيرة ذاتية متوافقة مع ATS",
      panelCopy: "اكتب بياناتك وشاهد النتيجة مباشرة بصيغة منظمة وسهلة الفحص للأنظمة الآلية.",
      basicInfoSection: "البيانات الأساسية",
      fullNameLabel: "الاسم الكامل",
      jobTitleLabel: "المسمى الوظيفي",
      summaryLabel: "النبذة المختصرة",
      contactSection: "بيانات التواصل",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "رقم الهاتف",
      addressLabel: "العنوان",
      websiteLabel: "لينكدإن أو موقع شخصي",
      experienceSection: "الخبرات",
      experienceHint: "أضف كل خبرة بشكل منفصل مع إنجازات قابلة للقياس.",
      addExperienceBtn: "+ إضافة خبرة",
      educationSection: "التعليم",
      educationHint: "أضف الدرجة العلمية والجامعة وتفاصيل إضافية مثل المعدل أو مشروع التخرج.",
      addEducationBtn: "+ إضافة مؤهل",
      projectsSection: "المشروعات",
      projectsHint: "أضف مشاريعك المهمة مع رابط GitHub لكل مشروع.",
      addProjectBtn: "+ إضافة مشروع",
      skillsSection: "المهارات",
      skillsLabel: "المهارات (كل سطر مهارة)",
      importPdfSection: "استيراد CV من PDF",
      importPdfHint: "ارفع ملف PDF وسيتم محاولة استخراج البيانات وملء الحقول تلقائيًا.",
      importPdfBtn: "استيراد من PDF",
      importPdfStatusReady: "جاهز لاستيراد ملف PDF.",
      importPdfStatusReading: "جاري تحليل ملف PDF واستخراج البيانات...",
      importPdfStatusDone: "تم استيراد البيانات بنجاح. يمكنك الآن التعديل والطباعة.",
      importPdfStatusError: "حدث خطأ أثناء قراءة ملف PDF.",
      importPdfStatusNoFile: "اختر ملف PDF أولًا.",
      importPdfStatusInvalidType: "الملف المختار ليس PDF صالحًا.",
      importPdfStatusNoText: "لم يتم العثور على نص قابل للاستخراج داخل هذا الملف.",
      importPdfStatusUnsupported: "مكتبة PDF غير متاحة. تأكد من الاتصال بالإنترنت ثم أعد المحاولة.",
      printBtn: "طباعة / حفظ PDF",
      resetBtn: "إعادة ضبط",
      previewLabel: "معاينة ATS",
      atsBadge: "ATS Friendly",
      summarySection: "الملف الشخصي",
      expRoleLabel: "المسمى الوظيفي",
      expCompanyLabel: "الشركة",
      expLocationLabel: "الموقع",
      expStartLabel: "تاريخ البداية",
      expEndLabel: "تاريخ النهاية",
      expAchievementsLabel: "الإنجازات (كل سطر إنجاز)",
      eduDegreeLabel: "الدرجة العلمية",
      eduInstitutionLabel: "الجامعة / المعهد",
      eduLocationLabel: "الموقع",
      eduStartLabel: "تاريخ البداية",
      eduEndLabel: "تاريخ النهاية",
      eduDetailsLabel: "تفاصيل إضافية (كل سطر بند)",
      removeBtn: "حذف",
      expEntryTitle: "خبرة",
      eduEntryTitle: "تعليم",
      projectNameLabel: "اسم المشروع",
      projectDescLabel: "وصف المشروع",
      projectGithubLabel: "رابط GitHub",
      projectEntryTitle: "مشروع",
      emptyProjects: "أضف مشاريعك من النموذج لتظهر هنا.",
      viewGithub: "عرض على GitHub",
      present: "الآن",
      emptyExperience: "أضف خبراتك من النموذج لتظهر هنا.",
      emptyEducation: "أضف بيانات التعليم من النموذج لتظهر هنا.",
      emptyListItem: "أضف بيانات في النموذج"
    },
    placeholders: {
      fullNamePlaceholder: "مثال: محمد أحمد",
      jobTitlePlaceholder: "مثال: Frontend Developer",
      summaryPlaceholder: "اكتب ملخصًا قصيرًا يعكس خبرتك.",
      emailPlaceholder: "example@email.com",
      phonePlaceholder: "+20 1xx xxx xxxx",
      addressPlaceholder: "القاهرة، مصر",
      websitePlaceholder: "linkedin.com/in/yourname",
      skillsPlaceholder: "كل سطر سيظهر كبند مستقل",
      expRolePlaceholder: "مثال: Senior Frontend Developer",
      expCompanyPlaceholder: "مثال: ABC Tech",
      expLocationPlaceholder: "مثال: القاهرة، مصر",
      expStartPlaceholder: "مثال: يناير 2022",
      expEndPlaceholder: "مثال: الآن أو ديسمبر 2024",
      expAchievementsPlaceholder: "حسّنت الأداء بنسبة 35%\nقمت بقيادة تطوير لوحة التحكم",
      eduDegreePlaceholder: "مثال: بكالوريوس علوم الحاسب",
      eduInstitutionPlaceholder: "مثال: جامعة القاهرة",
      eduLocationPlaceholder: "مثال: القاهرة، مصر",
      eduStartPlaceholder: "مثال: سبتمبر 2020",
      eduEndPlaceholder: "مثال: يونيو 2024",
      eduDetailsPlaceholder: "المعدل: 3.5/4\nمشروع التخرج: نظام توصية ذكي"
      ,
      projectNamePlaceholder: "مثال: CV ATS Builder",
      projectDescPlaceholder: "مثال: مولّد سيرة ذاتية يدعم العربية والإنجليزية ومتوافق مع ATS",
      projectGithubPlaceholder: "https://github.com/username/repository"
    },
    defaults: {
      fullName: "اسمك الكامل",
      jobTitle: "المسمى الوظيفي",
      summary: "اكتب نبذة مختصرة عن خبراتك.",
      contactFallback: ""
    },
    templates: {
      experience: [
        {
          role: "Frontend Developer",
          company: "ABC Company",
          location: "القاهرة، مصر",
          start: "2023",
          end: "الآن",
          achievements: "بنيت واجهات تفاعلية عالية الأداء\nحسّنت سرعة التحميل بنسبة 30%\nتعاونت مع فريق التصميم لرفع جودة تجربة المستخدم"
        }
      ],
      education: [
        {
          degree: "بكالوريوس حاسبات ومعلومات",
          institution: "جامعة القاهرة",
          location: "القاهرة، مصر",
          start: "2020",
          end: "2024",
          details: "تقدير: جيد جدًا\nمشروع التخرج: نظام تحليل سير ذاتية"
        }
      ],
      projects: [
        {
          name: "ATS CV Builder",
          description: "تطبيق ويب لإنشاء CV احترافي مع دعم عربي/إنجليزي ومعاينة مباشرة.",
          github: "https://github.com/RamezSameh/ATS-CV-Builder"
        }
      ]
    }
  },
  en: {
    dir: "ltr",
    pageTitle: "ATS CV Builder",
    strings: {
      builderTag: "ATS CV Builder",
      languageLabel: "Language",
      panelTitle: "Build an ATS-Friendly CV",
      panelCopy: "Enter your details and get a clean, structured CV preview that ATS can parse easily.",
      basicInfoSection: "Basic Information",
      fullNameLabel: "Full Name",
      jobTitleLabel: "Job Title",
      summaryLabel: "Professional Summary",
      contactSection: "Contact Information",
      emailLabel: "Email",
      phoneLabel: "Phone",
      addressLabel: "Address",
      websiteLabel: "LinkedIn or Website",
      experienceSection: "Experience",
      experienceHint: "Add each experience separately and include measurable achievements.",
      addExperienceBtn: "+ Add Experience",
      educationSection: "Education",
      educationHint: "Add degree, institution, and key details such as GPA or graduation project.",
      addEducationBtn: "+ Add Education",
      projectsSection: "Projects",
      projectsHint: "Add your key projects and include a GitHub link for each one.",
      addProjectBtn: "+ Add Project",
      skillsSection: "Skills",
      skillsLabel: "Skills (one skill per line)",
      importPdfSection: "Import CV from PDF",
      importPdfHint: "Upload a PDF file and the app will try to extract and map your data automatically.",
      importPdfBtn: "Import from PDF",
      importPdfStatusReady: "Ready to import a PDF file.",
      importPdfStatusReading: "Analyzing PDF and extracting data...",
      importPdfStatusDone: "Data imported successfully. You can edit and print now.",
      importPdfStatusError: "An error occurred while reading the PDF file.",
      importPdfStatusNoFile: "Please choose a PDF file first.",
      importPdfStatusInvalidType: "The selected file is not a valid PDF.",
      importPdfStatusNoText: "No extractable text was found in this file.",
      importPdfStatusUnsupported: "PDF library is unavailable. Check your internet connection and try again.",
      printBtn: "Print / Save PDF",
      resetBtn: "Reset",
      previewLabel: "ATS Preview",
      atsBadge: "ATS Friendly",
      summarySection: "Professional Summary",
      expRoleLabel: "Role",
      expCompanyLabel: "Company",
      expLocationLabel: "Location",
      expStartLabel: "Start Date",
      expEndLabel: "End Date",
      expAchievementsLabel: "Achievements (one per line)",
      eduDegreeLabel: "Degree",
      eduInstitutionLabel: "University / Institute",
      eduLocationLabel: "Location",
      eduStartLabel: "Start Date",
      eduEndLabel: "End Date",
      eduDetailsLabel: "Additional Details (one per line)",
      removeBtn: "Remove",
      expEntryTitle: "Experience",
      eduEntryTitle: "Education",
      projectNameLabel: "Project Name",
      projectDescLabel: "Project Description",
      projectGithubLabel: "GitHub URL",
      projectEntryTitle: "Project",
      emptyProjects: "Add your projects from the form.",
      viewGithub: "View on GitHub",
      present: "Present",
      emptyExperience: "Add your experience details from the form.",
      emptyEducation: "Add your education details from the form.",
      emptyListItem: "Add data using the form"
    },
    placeholders: {
      fullNamePlaceholder: "Example: John Smith",
      jobTitlePlaceholder: "Example: Frontend Developer",
      summaryPlaceholder: "Write a short summary highlighting your profile.",
      emailPlaceholder: "example@email.com",
      phonePlaceholder: "+1 xxx xxx xxxx",
      addressPlaceholder: "City, Country",
      websitePlaceholder: "linkedin.com/in/yourname",
      skillsPlaceholder: "Each line will appear as a bullet item",
      expRolePlaceholder: "Example: Senior Frontend Developer",
      expCompanyPlaceholder: "Example: ABC Tech",
      expLocationPlaceholder: "Example: Cairo, Egypt",
      expStartPlaceholder: "Example: Jan 2022",
      expEndPlaceholder: "Example: Present or Dec 2024",
      expAchievementsPlaceholder: "Improved performance by 35%\nLed dashboard revamp",
      eduDegreePlaceholder: "Example: BSc in Computer Science",
      eduInstitutionPlaceholder: "Example: Cairo University",
      eduLocationPlaceholder: "Example: Cairo, Egypt",
      eduStartPlaceholder: "Example: Sep 2020",
      eduEndPlaceholder: "Example: Jun 2024",
      eduDetailsPlaceholder: "GPA: 3.5/4\nGraduation Project: Resume Parser"
      ,
      projectNamePlaceholder: "Example: ATS CV Builder",
      projectDescPlaceholder: "Example: A bilingual ATS-friendly CV generator with live preview",
      projectGithubPlaceholder: "https://github.com/username/repository"
    },
    defaults: {
      fullName: "Your Full Name",
      jobTitle: "Job Title",
      summary: "Add a short summary about your experience.",
      contactFallback: ""
    },
    templates: {
      experience: [
        {
          role: "Frontend Developer",
          company: "ABC Company",
          location: "Cairo, Egypt",
          start: "2023",
          end: "Present",
          achievements: "Built responsive dashboard interfaces\nImproved load performance by 30%\nPartnered with designers to improve UX quality"
        }
      ],
      education: [
        {
          degree: "BSc in Computer Science",
          institution: "Cairo University",
          location: "Cairo, Egypt",
          start: "2020",
          end: "2024",
          details: "Grade: Very Good\nGraduation Project: CV Analysis System"
        }
      ],
      projects: [
        {
          name: "ATS CV Builder",
          description: "A web app to build bilingual ATS-friendly CVs with live preview.",
          github: "https://github.com/your-username/ats-cv-builder"
        }
      ]
    }
  }
};

function currentLocale() {
  return i18n[languageSelect.value] || i18n.ar;
}

function linesFromValue(value) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function createExperienceItem(values = {}) {
  const card = document.createElement("div");
  card.className = "entry-card";
  card.innerHTML = `
    <div class="entry-card-head">
      <p class="entry-title"></p>
      <button type="button" class="remove-entry-btn" data-entry-type="experience" data-i18n="removeBtn">حذف</button>
    </div>

    <div class="entry-grid">
      <label>
        <span data-i18n="expRoleLabel">المسمى الوظيفي</span>
        <input type="text" data-field="role" data-i18n-placeholder="expRolePlaceholder">
      </label>

      <label>
        <span data-i18n="expCompanyLabel">الشركة</span>
        <input type="text" data-field="company" data-i18n-placeholder="expCompanyPlaceholder">
      </label>

      <label>
        <span data-i18n="expLocationLabel">الموقع</span>
        <input type="text" data-field="location" data-i18n-placeholder="expLocationPlaceholder">
      </label>

      <label>
        <span data-i18n="expStartLabel">تاريخ البداية</span>
        <input type="text" data-field="start" data-i18n-placeholder="expStartPlaceholder">
      </label>

      <label>
        <span data-i18n="expEndLabel">تاريخ النهاية</span>
        <input type="text" data-field="end" data-i18n-placeholder="expEndPlaceholder">
      </label>

      <label class="full-width">
        <span data-i18n="expAchievementsLabel">الإنجازات (كل سطر إنجاز)</span>
        <textarea rows="4" data-field="achievements" data-i18n-placeholder="expAchievementsPlaceholder"></textarea>
      </label>
    </div>
  `;

  card.querySelector('[data-field="role"]').value = values.role || "";
  card.querySelector('[data-field="company"]').value = values.company || "";
  card.querySelector('[data-field="location"]').value = values.location || "";
  card.querySelector('[data-field="start"]').value = values.start || "";
  card.querySelector('[data-field="end"]').value = values.end || "";
  card.querySelector('[data-field="achievements"]').value = values.achievements || "";

  experienceItems.appendChild(card);
}

function createEducationItem(values = {}) {
  const card = document.createElement("div");
  card.className = "entry-card";
  card.innerHTML = `
    <div class="entry-card-head">
      <p class="entry-title"></p>
      <button type="button" class="remove-entry-btn" data-entry-type="education" data-i18n="removeBtn">حذف</button>
    </div>

    <div class="entry-grid">
      <label>
        <span data-i18n="eduDegreeLabel">الدرجة العلمية</span>
        <input type="text" data-field="degree" data-i18n-placeholder="eduDegreePlaceholder">
      </label>

      <label>
        <span data-i18n="eduInstitutionLabel">الجامعة / المعهد</span>
        <input type="text" data-field="institution" data-i18n-placeholder="eduInstitutionPlaceholder">
      </label>

      <label>
        <span data-i18n="eduLocationLabel">الموقع</span>
        <input type="text" data-field="location" data-i18n-placeholder="eduLocationPlaceholder">
      </label>

      <label>
        <span data-i18n="eduStartLabel">تاريخ البداية</span>
        <input type="text" data-field="start" data-i18n-placeholder="eduStartPlaceholder">
      </label>

      <label>
        <span data-i18n="eduEndLabel">تاريخ النهاية</span>
        <input type="text" data-field="end" data-i18n-placeholder="eduEndPlaceholder">
      </label>

      <label class="full-width">
        <span data-i18n="eduDetailsLabel">تفاصيل إضافية (كل سطر بند)</span>
        <textarea rows="4" data-field="details" data-i18n-placeholder="eduDetailsPlaceholder"></textarea>
      </label>
    </div>
  `;

  card.querySelector('[data-field="degree"]').value = values.degree || "";
  card.querySelector('[data-field="institution"]').value = values.institution || "";
  card.querySelector('[data-field="location"]').value = values.location || "";
  card.querySelector('[data-field="start"]').value = values.start || "";
  card.querySelector('[data-field="end"]').value = values.end || "";
  card.querySelector('[data-field="details"]').value = values.details || "";

  educationItems.appendChild(card);
}

function createProjectItem(values = {}) {
  const card = document.createElement("div");
  card.className = "entry-card";
  card.innerHTML = `
    <div class="entry-card-head">
      <p class="entry-title"></p>
      <button type="button" class="remove-entry-btn" data-entry-type="project" data-i18n="removeBtn">حذف</button>
    </div>

    <div class="entry-grid">
      <label>
        <span data-i18n="projectNameLabel">اسم المشروع</span>
        <input type="text" data-field="name" data-i18n-placeholder="projectNamePlaceholder">
      </label>

      <label>
        <span data-i18n="projectGithubLabel">رابط GitHub</span>
        <input type="url" data-field="github" data-i18n-placeholder="projectGithubPlaceholder">
      </label>

      <label class="full-width">
        <span data-i18n="projectDescLabel">وصف المشروع</span>
        <textarea rows="3" data-field="description" data-i18n-placeholder="projectDescPlaceholder"></textarea>
      </label>
    </div>
  `;

  card.querySelector('[data-field="name"]').value = values.name || "";
  card.querySelector('[data-field="description"]').value = values.description || "";
  card.querySelector('[data-field="github"]').value = values.github || "";

  projectItems.appendChild(card);
}

function buildTemplateEntries() {
  const locale = currentLocale();

  experienceItems.innerHTML = "";
  educationItems.innerHTML = "";
  projectItems.innerHTML = "";

  locale.templates.experience.forEach((item) => createExperienceItem(item));
  locale.templates.education.forEach((item) => createEducationItem(item));
  locale.templates.projects.forEach((item) => createProjectItem(item));
}

function setEntryTitles(locale) {
  experienceItems.querySelectorAll(".entry-card .entry-title").forEach((title, index) => {
    title.textContent = `${locale.strings.expEntryTitle} ${index + 1}`;
  });

  educationItems.querySelectorAll(".entry-card .entry-title").forEach((title, index) => {
    title.textContent = `${locale.strings.eduEntryTitle} ${index + 1}`;
  });

  projectItems.querySelectorAll(".entry-card .entry-title").forEach((title, index) => {
    title.textContent = `${locale.strings.projectEntryTitle} ${index + 1}`;
  });
}

function localizeStaticText(locale) {
  document.documentElement.lang = languageSelect.value;
  document.documentElement.dir = locale.dir;
  document.title = locale.pageTitle;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;

    if (locale.strings[key]) {
      node.textContent = locale.strings[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    const key = node.dataset.i18nPlaceholder;

    if (locale.placeholders[key]) {
      node.placeholder = locale.placeholders[key];
    }
  });

  setEntryTitles(locale);

  if (pdfImportStatus && locale.strings[importStatusKey]) {
    pdfImportStatus.textContent = locale.strings[importStatusKey];
  }
}

function collectExperienceEntries() {
  return Array.from(experienceItems.querySelectorAll(".entry-card"))
    .map((card) => ({
      role: card.querySelector('[data-field="role"]').value.trim(),
      company: card.querySelector('[data-field="company"]').value.trim(),
      location: card.querySelector('[data-field="location"]').value.trim(),
      start: card.querySelector('[data-field="start"]').value.trim(),
      end: card.querySelector('[data-field="end"]').value.trim(),
      achievements: card.querySelector('[data-field="achievements"]').value.trim()
    }))
    .filter((item) => Object.values(item).some(Boolean));
}

function collectEducationEntries() {
  return Array.from(educationItems.querySelectorAll(".entry-card"))
    .map((card) => ({
      degree: card.querySelector('[data-field="degree"]').value.trim(),
      institution: card.querySelector('[data-field="institution"]').value.trim(),
      location: card.querySelector('[data-field="location"]').value.trim(),
      start: card.querySelector('[data-field="start"]').value.trim(),
      end: card.querySelector('[data-field="end"]').value.trim(),
      details: card.querySelector('[data-field="details"]').value.trim()
    }))
    .filter((item) => Object.values(item).some(Boolean));
}

function collectProjectEntries() {
  return Array.from(projectItems.querySelectorAll(".entry-card"))
    .map((card) => ({
      name: card.querySelector('[data-field="name"]').value.trim(),
      description: card.querySelector('[data-field="description"]').value.trim(),
      github: card.querySelector('[data-field="github"]').value.trim()
    }))
    .filter((item) => Object.values(item).some(Boolean));
}

function setTextOrHide(target, value, fallback = "") {
  const cleanValue = (value || "").trim() || fallback;
  target.textContent = cleanValue;
  target.hidden = !cleanValue;
}

function renderSimpleList(target, value, locale) {
  target.innerHTML = "";

  const items = linesFromValue(value);

  if (!items.length) {
    const li = document.createElement("li");
    li.textContent = locale.strings.emptyListItem;
    target.appendChild(li);
    return;
  }

  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    target.appendChild(li);
  });
}

function renderExperience(entries, locale) {
  fields.experience.innerHTML = "";

  if (!entries.length) {
    const p = document.createElement("p");
    p.className = "preview-empty";
    p.textContent = locale.strings.emptyExperience;
    fields.experience.appendChild(p);
    return;
  }

  const list = document.createElement("div");
  list.className = "preview-entry-list";

  entries.forEach((entry) => {
    const article = document.createElement("article");
    article.className = "preview-entry";

    const start = entry.start;
    const end = entry.end || locale.strings.present;
    const dateText = start && end ? `${start} - ${end}` : start || end;
    const orgLine = [entry.company, entry.location].filter(Boolean).join(" | ");

    const heading = document.createElement("div");
    heading.className = "entry-head";

    const role = document.createElement("p");
    role.className = "entry-role";
    role.textContent = entry.role || locale.strings.expRoleLabel;

    const date = document.createElement("p");
    date.className = "entry-date";
    date.textContent = dateText;

    heading.appendChild(role);
    heading.appendChild(date);
    article.appendChild(heading);

    if (orgLine) {
      const org = document.createElement("p");
      org.className = "entry-subline";
      org.textContent = orgLine;
      article.appendChild(org);
    }

    const achievements = linesFromValue(entry.achievements);

    if (achievements.length) {
      const ul = document.createElement("ul");
      ul.className = "entry-detail-list";

      achievements.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });

      article.appendChild(ul);
    }

    list.appendChild(article);
  });

  fields.experience.appendChild(list);
}

function renderEducation(entries, locale) {
  fields.education.innerHTML = "";

  if (!entries.length) {
    const p = document.createElement("p");
    p.className = "preview-empty";
    p.textContent = locale.strings.emptyEducation;
    fields.education.appendChild(p);
    return;
  }

  const list = document.createElement("div");
  list.className = "preview-entry-list";

  entries.forEach((entry) => {
    const article = document.createElement("article");
    article.className = "preview-entry";

    const start = entry.start;
    const end = entry.end;
    const dateText = start && end ? `${start} - ${end}` : start || end;
    const orgLine = [entry.institution, entry.location].filter(Boolean).join(" | ");

    const heading = document.createElement("div");
    heading.className = "entry-head";

    const degree = document.createElement("p");
    degree.className = "entry-role";
    degree.textContent = entry.degree || locale.strings.eduDegreeLabel;

    const date = document.createElement("p");
    date.className = "entry-date";
    date.textContent = dateText;

    heading.appendChild(degree);
    heading.appendChild(date);
    article.appendChild(heading);

    if (orgLine) {
      const org = document.createElement("p");
      org.className = "entry-subline";
      org.textContent = orgLine;
      article.appendChild(org);
    }

    const details = linesFromValue(entry.details);

    if (details.length) {
      const ul = document.createElement("ul");
      ul.className = "entry-detail-list";

      details.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });

      article.appendChild(ul);
    }

    list.appendChild(article);
  });

  fields.education.appendChild(list);
}

function normalizeGithubUrl(url) {
  if (!url) {
    return "";
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://${url}`;
}

function renderProjects(entries, locale) {
  fields.projects.innerHTML = "";

  if (!entries.length) {
    const p = document.createElement("p");
    p.className = "preview-empty";
    p.textContent = locale.strings.emptyProjects;
    fields.projects.appendChild(p);
    return;
  }

  const list = document.createElement("div");
  list.className = "preview-entry-list";

  entries.forEach((entry) => {
    const article = document.createElement("article");
    article.className = "preview-entry";

    const heading = document.createElement("div");
    heading.className = "entry-head";

    const name = document.createElement("p");
    name.className = "entry-role";
    name.textContent = entry.name || locale.strings.projectNameLabel;
    heading.appendChild(name);
    article.appendChild(heading);

    if (entry.description) {
      const desc = document.createElement("p");
      desc.className = "entry-subline";
      desc.textContent = entry.description;
      article.appendChild(desc);
    }

    if (entry.github) {
      const linkWrap = document.createElement("p");
      linkWrap.className = "entry-link";

      const link = document.createElement("a");
      link.href = normalizeGithubUrl(entry.github);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = locale.strings.viewGithub;

      linkWrap.appendChild(link);
      article.appendChild(linkWrap);
    }

    list.appendChild(article);
  });

  fields.projects.appendChild(list);
}

function updatePreview() {
  const locale = currentLocale();
  const data = new FormData(form);

  fields.fullName.textContent = (data.get("fullName") || "").toString().trim() || locale.defaults.fullName;
  fields.jobTitle.textContent = (data.get("jobTitle") || "").toString().trim() || locale.defaults.jobTitle;
  fields.summary.textContent = (data.get("summary") || "").toString().trim() || locale.defaults.summary;

  setTextOrHide(fields.email, (data.get("email") || "").toString(), locale.defaults.contactFallback);
  setTextOrHide(fields.phone, (data.get("phone") || "").toString(), locale.defaults.contactFallback);
  setTextOrHide(fields.address, (data.get("address") || "").toString(), locale.defaults.contactFallback);
  setTextOrHide(fields.website, (data.get("website") || "").toString(), locale.defaults.contactFallback);

  renderExperience(collectExperienceEntries(), locale);
  renderEducation(collectEducationEntries(), locale);
  renderProjects(collectProjectEntries(), locale);
  renderSimpleList(fields.skills, (data.get("skills") || "").toString(), locale);
}

function applyLanguage(language) {
  const locale = i18n[language] || i18n.ar;
  localizeStaticText(locale);
  updatePreview();
}

function setImportStatus(key) {
  importStatusKey = key;
  const locale = currentLocale();
  const message = locale.strings[key] || "";

  if (pdfImportStatus) {
    pdfImportStatus.textContent = message;
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`failed:${src}`));
    document.head.appendChild(script);
  });
}

async function ensurePdfJsLoaded() {
  if (window.pdfjsLib && activePdfWorkerSrc) {
    return;
  }

  if (window.pdfjsLib && !activePdfWorkerSrc) {
    activePdfWorkerSrc = pdfJsCandidates[0].worker;
    return;
  }

  let lastError = null;

  for (const candidate of pdfJsCandidates) {
    try {
      await loadScript(candidate.lib);

      if (window.pdfjsLib) {
        activePdfWorkerSrc = candidate.worker;
        return;
      }
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error("pdf-library-missing");
}

async function extractTextFromPdfFile(file) {
  await ensurePdfJsLoaded();

  if (!window.pdfjsLib) {
    throw new Error("pdf-library-missing");
  }

  window.pdfjsLib.GlobalWorkerOptions.workerSrc = activePdfWorkerSrc;

  const data = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data }).promise;
  const pages = [];

  for (let pageNo = 1; pageNo <= pdf.numPages; pageNo += 1) {
    const page = await pdf.getPage(pageNo);
    const content = await page.getTextContent();
    const lines = [];
    let currentLine = "";
    let currentY = null;

    content.items.forEach((item) => {
      const text = (item.str || "").trim();

      if (!text) {
        return;
      }

      const y = Math.round(item.transform[5]);

      if (currentY !== null && Math.abs(y - currentY) > 2) {
        if (currentLine) {
          lines.push(currentLine.trim());
        }

        currentLine = text;
      } else {
        currentLine = currentLine ? `${currentLine} ${text}` : text;
      }

      currentY = y;
    });

    if (currentLine) {
      lines.push(currentLine.trim());
    }

    pages.push(lines.join("\n"));
  }

  return pages.join("\n");
}

function splitCleanLines(text) {
  return text
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function stripListPrefix(line) {
  return line.replace(/^[-*•●▪◦]+\s*/, "").trim();
}

function isLikelyContactLine(line) {
  return /@|linkedin|github|https?:\/\/|www\.|(\+?\d[\d\s().-]{7,}\d)/i.test(line);
}

function getSectionKey(line) {
  const clean = line.replace(/[:|•\-]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  const isShortHeading = clean.split(" ").length <= 5;

  if (
    /^(summary|profile|about|objective|professional summary|ملخص|نبذة|نبذة مختصرة)$/.test(clean) ||
    (isShortHeading && /(summary|profile|objective|ملخص|نبذة)/.test(clean))
  ) {
    return "summary";
  }

  if (
    /^(experience|work experience|professional experience|employment history|الخبرات|الخبرة)$/.test(clean) ||
    (isShortHeading && /(experience|employment|الخبرات|الخبرة)/.test(clean))
  ) {
    return "experience";
  }

  if (
    /^(education|academic background|التعليم|المؤهلات)$/.test(clean) ||
    (isShortHeading && /(education|academic|التعليم|المؤهلات)/.test(clean))
  ) {
    return "education";
  }

  if (
    /^(skills|technical skills|core skills|المهارات)$/.test(clean) ||
    (isShortHeading && /(skills|technical skills|المهارات)/.test(clean))
  ) {
    return "skills";
  }

  if (
    /^(projects|project|selected projects|المشروعات|المشاريع)$/.test(clean) ||
    (isShortHeading && /(projects|project|المشروعات|المشاريع)/.test(clean))
  ) {
    return "projects";
  }

  return "";
}

function extractSections(lines) {
  const markers = [];

  lines.forEach((line, index) => {
    const key = getSectionKey(line);

    if (key) {
      markers.push({ key, index });
    }
  });

  const sections = {
    summary: [],
    experience: [],
    education: [],
    skills: [],
    projects: []
  };

  if (!markers.length) {
    return {
      sections,
      firstHeadingIndex: lines.length
    };
  }

  markers.forEach((marker, idx) => {
    const start = marker.index + 1;
    const end = idx + 1 < markers.length ? markers[idx + 1].index : lines.length;
    sections[marker.key] = lines.slice(start, end).filter(Boolean);
  });

  return {
    sections,
    firstHeadingIndex: markers[0].index
  };
}

function parseSkills(sectionLines) {
  const tokens = [];

  sectionLines.forEach((line) => {
    stripListPrefix(line)
      .split(/[,|/]/)
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach((token) => tokens.push(token));
  });

  return Array.from(new Set(tokens)).slice(0, 20);
}

function extractDateRange(line) {
  const dateRangePattern =
    /((?:\d{4}|[A-Za-z]{3,9}\s+\d{4}|(?:يناير|فبراير|مارس|إبريل|ابريل|مايو|يونيو|يوليو|أغسطس|اغسطس|سبتمبر|أكتوبر|اكتوبر|نوفمبر|ديسمبر)\s+\d{4})\s*(?:-|–|—|to|الى|إلى)\s*(?:\d{4}|present|current|now|الآن|حتى الآن|[A-Za-z]{3,9}\s+\d{4}|(?:يناير|فبراير|مارس|إبريل|ابريل|مايو|يونيو|يوليو|أغسطس|اغسطس|سبتمبر|أكتوبر|اكتوبر|نوفمبر|ديسمبر)\s+\d{4}))/i;
  const match = line.match(dateRangePattern);

  if (!match) {
    return {
      start: "",
      end: "",
      cleanLine: line
    };
  }

  const range = match[0];
  const [start = "", end = ""] = range.split(/\s*(?:-|–|—|to|الى|إلى)\s*/i);

  return {
    start: start.trim(),
    end: end.trim(),
    cleanLine: line.replace(range, "").replace(/\(\s*\)/g, "").replace(/\s{2,}/g, " ").trim()
  };
}

function looksLikeTitle(line) {
  return !isLikelyContactLine(line) && stripListPrefix(line).split(" ").length <= 10;
}

function splitIntoBlocks(lines) {
  const cleaned = lines.map((line) => stripListPrefix(line)).filter(Boolean);

  if (!cleaned.length) {
    return [];
  }

  const blocks = [];
  let current = [];

  cleaned.forEach((line) => {
    const hasDate = Boolean(extractDateRange(line).start);
    const currentHasDate = current.some((entry) => Boolean(extractDateRange(entry).start));
    const startNewBlock =
      current.length > 0 &&
      (
        (hasDate && currentHasDate) ||
        (looksLikeTitle(line) && current.length >= 3 && !line.startsWith("http"))
      );

    if (startNewBlock) {
      blocks.push(current);
      current = [line];
      return;
    }

    current.push(line);
  });

  if (current.length) {
    blocks.push(current);
  }

  return blocks;
}

function splitRoleCompany(text) {
  const patterns = [/\s+\|\s+/, /\s+-\s+/, /\s+@\s+/i, /\s+at\s+/i, /\s+في\s+/];

  for (const pattern of patterns) {
    if (pattern.test(text)) {
      const parts = text.split(pattern).map((part) => part.trim()).filter(Boolean);

      if (parts.length >= 2) {
        return {
          first: parts[0],
          second: parts[1]
        };
      }
    }
  }

  return {
    first: text.trim(),
    second: ""
  };
}

function parseExperience(sectionLines) {
  const blocks = splitIntoBlocks(sectionLines);

  return blocks
    .map((block) => {
      const firstLine = block[0] || "";
      const dateInfo = extractDateRange(firstLine);
      const roleCompany = splitRoleCompany(dateInfo.cleanLine || firstLine);
      const fallbackSecond = block[1] && !isLikelyContactLine(block[1]) ? block[1] : "";
      const achievementsStart = fallbackSecond ? 2 : 1;

      return {
        role: roleCompany.first,
        company: roleCompany.second || fallbackSecond,
        location: "",
        start: dateInfo.start,
        end: dateInfo.end,
        achievements: block.slice(achievementsStart).join("\n")
      };
    })
    .filter((item) => Object.values(item).some(Boolean));
}

function parseEducation(sectionLines) {
  const blocks = splitIntoBlocks(sectionLines);

  return blocks
    .map((block) => {
      const firstLine = block[0] || "";
      const dateInfo = extractDateRange(firstLine);
      const degreeInstitution = splitRoleCompany(dateInfo.cleanLine || firstLine);
      const fallbackInstitution = block[1] && !isLikelyContactLine(block[1]) ? block[1] : "";
      const detailsStart = fallbackInstitution ? 2 : 1;

      return {
        degree: degreeInstitution.first,
        institution: degreeInstitution.second || fallbackInstitution,
        location: "",
        start: dateInfo.start,
        end: dateInfo.end,
        details: block.slice(detailsStart).join("\n")
      };
    })
    .filter((item) => Object.values(item).some(Boolean));
}

function extractUrl(line) {
  const match = line.match(/(https?:\/\/[^\s]+|www\.[^\s]+|linkedin\.com\/[^\s]+|github\.com\/[^\s]+)/i);
  return match ? match[0] : "";
}

function parseProjects(sectionLines) {
  const blocks = splitIntoBlocks(sectionLines);

  return blocks
    .map((block) => {
      const urlLine = block.find((line) => /github|https?:\/\/|www\./i.test(line)) || "";
      const github = extractUrl(urlLine);
      const nonUrlLines = block.filter((line) => line !== urlLine);
      const name = nonUrlLines[0] || "";
      const description = nonUrlLines.slice(1).join("\n");

      return {
        name,
        description,
        github
      };
    })
    .filter((item) => Object.values(item).some(Boolean));
}

function parseCvText(rawText) {
  const lines = splitCleanLines(rawText);
  const fullText = lines.join(" \n ");
  const { sections, firstHeadingIndex } = extractSections(lines);
  const topLines = lines.slice(0, Math.min(firstHeadingIndex, 10));

  const emailMatch = fullText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
  const phoneMatch = fullText.match(/(\+?\d[\d\s().-]{7,}\d)/);
  const websiteMatch = fullText.match(/((https?:\/\/)?(www\.)?(linkedin\.com\/[^\s|,]+|github\.com\/[^\s|,]+|[a-z0-9-]+\.[a-z]{2,}(\/[^\s|,]*)?))/i);
  const nameCandidates = topLines.filter((line) => {
    const wordCount = line.split(" ").length;
    return wordCount >= 2 && wordCount <= 5 && !isLikelyContactLine(line) && !getSectionKey(line);
  });
  const fullName = nameCandidates[0] || "";
  const jobTitle = topLines.find((line) => line !== fullName && !isLikelyContactLine(line) && !getSectionKey(line)) || "";
  const summary = (sections.summary.length ? sections.summary : lines.slice(2, 6)).slice(0, 5).join("\n");
  const address =
    topLines.find((line) => /,|،/.test(line) && !isLikelyContactLine(line) && line.split(" ").length <= 8) || "";
  const skills = parseSkills(sections.skills);
  const experience = parseExperience(sections.experience);
  const education = parseEducation(sections.education);
  const projects = parseProjects(sections.projects);

  return {
    fullName,
    jobTitle,
    summary,
    email: emailMatch[0] || "",
    phone: phoneMatch ? phoneMatch[0] : "",
    website: websiteMatch ? websiteMatch[0] : "",
    address,
    skills,
    experience,
    education,
    projects
  };
}

function setFormValue(name, value) {
  const input = form.elements.namedItem(name);

  if (input) {
    input.value = value || "";
  }
}

function fillEntriesFromParsedData(container, entries, creator) {
  container.innerHTML = "";

  if (entries.length) {
    entries.forEach((entry) => creator(entry));
    return;
  }

  creator();
}

function fillFormFromParsedCv(parsed) {
  setFormValue("fullName", parsed.fullName);
  setFormValue("jobTitle", parsed.jobTitle);
  setFormValue("summary", parsed.summary);
  setFormValue("email", parsed.email);
  setFormValue("phone", parsed.phone);
  setFormValue("address", parsed.address);
  setFormValue("website", parsed.website);
  setFormValue("skills", (parsed.skills || []).join("\n"));

  fillEntriesFromParsedData(experienceItems, parsed.experience || [], createExperienceItem);
  fillEntriesFromParsedData(educationItems, parsed.education || [], createEducationItem);
  fillEntriesFromParsedData(projectItems, parsed.projects || [], createProjectItem);

  applyLanguage(languageSelect.value);
}

function addEmptyExperience() {
  createExperienceItem();
  applyLanguage(languageSelect.value);
}

function addEmptyEducation() {
  createEducationItem();
  applyLanguage(languageSelect.value);
}

function addEmptyProject() {
  createProjectItem();
  applyLanguage(languageSelect.value);
}

addExperienceBtn.addEventListener("click", addEmptyExperience);
addEducationBtn.addEventListener("click", addEmptyEducation);
addProjectBtn.addEventListener("click", addEmptyProject);

form.addEventListener("click", (event) => {
  const removeBtn = event.target.closest(".remove-entry-btn");

  if (!removeBtn) {
    return;
  }

  const type = removeBtn.dataset.entryType;
  const card = removeBtn.closest(".entry-card");

  if (card) {
    card.remove();
  }

  if (type === "experience" && experienceItems.children.length === 0) {
    createExperienceItem();
  }

  if (type === "education" && educationItems.children.length === 0) {
    createEducationItem();
  }

  if (type === "project" && projectItems.children.length === 0) {
    createProjectItem();
  }

  applyLanguage(languageSelect.value);
});

form.addEventListener("input", updatePreview);

form.addEventListener("reset", () => {
  window.setTimeout(() => {
    buildTemplateEntries();
    applyLanguage(languageSelect.value);
  }, 0);
});

languageSelect.addEventListener("change", (event) => {
  applyLanguage(event.target.value);
});

importPdfBtn.addEventListener("click", async () => {
  const file = pdfUploadInput.files && pdfUploadInput.files[0];

  if (!file) {
    setImportStatus("importPdfStatusNoFile");
    return;
  }

  if (!/\.pdf$/i.test(file.name) && file.type !== "application/pdf") {
    setImportStatus("importPdfStatusInvalidType");
    return;
  }

  setImportStatus("importPdfStatusReading");

  try {
    const text = await extractTextFromPdfFile(file);

    if (!text.trim()) {
      setImportStatus("importPdfStatusNoText");
      return;
    }

    const parsed = parseCvText(text);
    fillFormFromParsedCv(parsed);
    setImportStatus("importPdfStatusDone");
  } catch (error) {
    if (error && error.message === "pdf-library-missing") {
      setImportStatus("importPdfStatusUnsupported");
      return;
    }

    setImportStatus("importPdfStatusError");
  }
});

printBtn.addEventListener("click", () => {
  window.print();
});

buildTemplateEntries();
applyLanguage(languageSelect.value);
