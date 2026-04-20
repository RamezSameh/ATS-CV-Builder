const form = document.getElementById("cvForm");
const printBtn = document.getElementById("printBtn");
const languageSelect = document.getElementById("languageSelect");
const addExperienceBtn = document.getElementById("addExperienceBtn");
const addEducationBtn = document.getElementById("addEducationBtn");
const addProjectBtn = document.getElementById("addProjectBtn");
const addLanguageBtn = document.getElementById("addLanguageBtn");
const importPdfBtn = document.getElementById("importPdfBtn");
const downloadWordBtn = document.getElementById("downloadWordBtn");
const pdfUploadInput = document.getElementById("pdfUploadInput");
const pdfImportStatus = document.getElementById("pdfImportStatus");
const experienceItems = document.getElementById("experienceItems");
const educationItems = document.getElementById("educationItems");
const projectItems = document.getElementById("projectItems");
const languageItems = document.getElementById("languageItems");
let importStatusKey = "importPdfStatusReady";
const pdfJsCandidates = [
  {
    lib: "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js",
    worker: "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"
  },
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
    languages: document.getElementById("previewLanguages"),
  hardSkills: document.getElementById("previewHardSkills"),
  softSkills: document.getElementById("previewSoftSkills")
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
      languagesSection: "اللغات",
      languagesHint: "أضف اللغات التي تتقنها مع تحديد المستوى.",
      addLanguageBtn: "+ إضافة لغة",
      skillsSection: "المهارات",
      hardSkillsLabel: "المهارات التقنية (Hard Skills)",
      softSkillsLabel: "المهارات الشخصية (Soft Skills)",
      skillsHint: "كل سطر مهارة مستقلة",
      importPdfSection: "استيراد CV من PDF",
      importPdfHint: "ارفع ملف PDF وسيتم محاولة استخراج البيانات وملء الحقول تلقائيًا.",
      importPdfBtn: "استيراد من PDF",
      importPdfStatusReady: "جاهز لاستيراد ملف PDF.",
      importPdfStatusReading: "جاري تحليل ملف PDF واستخراج البيانات...",
      importPdfStatusDone: "تم استيراد البيانات بنجاح. يمكنك الآن التعديل والطباعة.",
      importPdfStatusError: "حدث خطأ غير متوقع أثناء قراءة ملف PDF.",
      importPdfStatusErrorLoad: "فشل تحميل ملف PDF. قد يكون الملف تالفاً أو محمياً بكلمة مرور.",
      importPdfStatusErrorLib: "فشل تحميل مكتبة المعالجة. يرجى التأكد من استقرار الإنترنت.",
      importPdfStatusNoFile: "اختر ملف PDF أولًا.",
      importPdfStatusInvalidType: "الملف المختار ليس PDF صالحًا.",
      importPdfStatusNoText: "لم يتم العثور على نص قابل للاستخراج داخل هذا الملف.",
      importPdfStatusUnsupported: "مكتبة PDF غير متاحة. تأكد من الاتصال بالإنترنت ثم أعد المحاولة.",
      printBtn: "طباعة / حفظ PDF",
      downloadWordBtn: "تحميل Word",
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
      langNameLabel: "اللغة",
      langLevelLabel: "المستوى",
      langEntryTitle: "لغة",
      emptyProjects: "أضف مشاريعك من النموذج لتظهر هنا.",
      emptyLanguages: "أضف اللغات من النموذج لتظهر هنا.",
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
      hardSkillsPlaceholder: "مثال: React, Node.js, SQL",
      softSkillsPlaceholder: "مثال: التواصل، العمل الجماعي، القيادة",
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
      projectGithubPlaceholder: "https://github.com/username/repository",
      langNamePlaceholder: "مثال: الإنجليزية",
      langLevelPlaceholder: "مثال: ممتاز / طلق / B2"
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
      ],
      languages: [
        { name: "العربية", level: "اللغة الأم" },
        { name: "الإنجليزية", level: "طلاقة" }
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
      languagesSection: "Languages",
      languagesHint: "Add languages you speak and your proficiency level.",
      addLanguageBtn: "+ Add Language",
      skillsSection: "Skills",
      hardSkillsLabel: "Hard Skills",
      softSkillsLabel: "Soft Skills",
      skillsHint: "One skill per line",
      importPdfSection: "Import CV from PDF",
      importPdfHint: "Upload a PDF file and the app will try to extract and map your data automatically.",
      importPdfBtn: "Import from PDF",
      importPdfStatusReady: "Ready to import a PDF file.",
      importPdfStatusReading: "Analyzing PDF and extracting data...",
      importPdfStatusDone: "Data imported successfully. You can edit and print now.",
      importPdfStatusError: "An unexpected error occurred while reading the PDF file.",
      importPdfStatusErrorLoad: "Failed to load PDF file. The file might be corrupted or password protected.",
      importPdfStatusErrorLib: "Failed to load the processing library. Please check your internet connection.",
      importPdfStatusNoFile: "Please choose a PDF file first.",
      importPdfStatusInvalidType: "The selected file is not a valid PDF.",
      importPdfStatusNoText: "No extractable text was found in this file.",
      importPdfStatusUnsupported: "PDF library is unavailable. Check your internet connection and try again.",
      printBtn: "Print / Save PDF",
      downloadWordBtn: "Download Word",
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
      langNameLabel: "Language",
      langLevelLabel: "Proficiency",
      langEntryTitle: "Language",
      emptyProjects: "Add your projects from the form.",
      emptyLanguages: "Add your languages from the form.",
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
      hardSkillsPlaceholder: "e.g. React, Node.js, SQL",
      softSkillsPlaceholder: "e.g. Communication, Teamwork, Leadership",
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
      projectGithubPlaceholder: "https://github.com/username/repository",
      langNamePlaceholder: "Example: English",
      langLevelPlaceholder: "Example: Native / Fluent / B2"
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
      ],
      languages: [
        { name: "English", level: "Native" },
        { name: "Arabic", level: "Fluent" }
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

function createLanguageItem(values = {}) {
  const card = document.createElement("div");
  card.className = "entry-card";
  card.innerHTML = `
    <div class="entry-card-head">
      <p class="entry-title"></p>
      <button type="button" class="remove-entry-btn" data-entry-type="language" data-i18n="removeBtn">حذف</button>
    </div>

    <div class="entry-grid">
      <label>
        <span data-i18n="langNameLabel">اللغة</span>
        <input type="text" data-field="name" data-i18n-placeholder="langNamePlaceholder">
      </label>

      <label>
        <span data-i18n="langLevelLabel">المستوى</span>
        <input type="text" data-field="level" data-i18n-placeholder="langLevelPlaceholder">
      </label>
    </div>
  `;

  card.querySelector('[data-field="name"]').value = values.name || "";
  card.querySelector('[data-field="level"]').value = values.level || "";

  languageItems.appendChild(card);
}

function buildTemplateEntries() {
  const locale = currentLocale();

  experienceItems.innerHTML = "";
  educationItems.innerHTML = "";
  projectItems.innerHTML = "";
  languageItems.innerHTML = "";

  locale.templates.experience.forEach((item) => createExperienceItem(item));
  locale.templates.education.forEach((item) => createEducationItem(item));
  locale.templates.projects.forEach((item) => createProjectItem(item));
  
  if (locale.templates.languages) {
    locale.templates.languages.forEach((item) => createLanguageItem(item));
  } else {
    createLanguageItem();
  }
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

  languageItems.querySelectorAll(".entry-card .entry-title").forEach((title, index) => {
    title.textContent = `${locale.strings.langEntryTitle} ${index + 1}`;
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

function collectLanguageEntries() {
  return Array.from(languageItems.querySelectorAll(".entry-card"))
    .map((card) => ({
      name: card.querySelector('[data-field="name"]').value.trim(),
      level: card.querySelector('[data-field="level"]').value.trim()
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

function renderLanguages(entries, locale) {
  fields.languages.innerHTML = "";

  if (!entries.length) {
    const p = document.createElement("p");
    p.className = "preview-empty";
    p.textContent = locale.strings.emptyLanguages;
    fields.languages.appendChild(p);
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
    name.textContent = entry.name || locale.strings.langNameLabel;

    const level = document.createElement("p");
    level.className = "entry-date";
    level.textContent = entry.level;

    heading.appendChild(name);
    heading.appendChild(level);
    article.appendChild(heading);

    list.appendChild(article);
  });

  fields.languages.appendChild(list);
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
  renderSimpleList(fields.hardSkills, (data.get("hardSkills") || "").toString(), locale);
  renderSimpleList(fields.softSkills, (data.get("softSkills") || "").toString(), locale);
  renderLanguages(collectLanguageEntries(), locale);
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

  let lastError = null;

  for (const candidate of pdfJsCandidates) {
    try {
      console.log(`Attempting to load PDF.js from: ${candidate.lib}`);
      await loadScript(candidate.lib);

      if (window.pdfjsLib) {
        activePdfWorkerSrc = candidate.worker;
        // Verify if the library is actually functional
        if (typeof window.pdfjsLib.getDocument === 'function') {
          console.log("PDF.js loaded successfully");
          return;
        }
      }
    } catch (error) {
      console.warn(`Failed to load from ${candidate.lib}:`, error);
      lastError = error;
    }
  }

  throw lastError || new Error("pdf-library-missing");
}

async function extractTextFromPdfFile(file) {
  try {
    await ensurePdfJsLoaded();
  } catch (err) {
    console.error("PDF.js initialization failed:", err);
    throw new Error("pdf-library-missing");
  }

  if (!window.pdfjsLib) {
    throw new Error("pdf-library-missing");
  }

  // Set worker source
  if (activePdfWorkerSrc && window.pdfjsLib.GlobalWorkerOptions) {
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = activePdfWorkerSrc;
  }

  let pdf;
  try {
    const data = await file.arrayBuffer();
    // Use a simpler approach first, then fall back if needed
    const loadingTask = window.pdfjsLib.getDocument({ 
      data,
      disableWorker: false,
      isEvalSupported: true,
      useSystemFonts: true // Added for better font compatibility
    });
    pdf = await loadingTask.promise;
  } catch (err) {
    console.error("PDF extraction failed at loading level:", err);
    throw new Error("pdf-load-failed");
  }

  const pages = [];

  for (let pageNo = 1; pageNo <= pdf.numPages; pageNo += 1) {
    try {
      const page = await pdf.getPage(pageNo);
      const content = await page.getTextContent();
      
      // Group by Y coordinate (using a small threshold for alignment)
      const itemsByY = {};
      const threshold = 5; 

      content.items.forEach((item) => {
        const text = (item.str || "").trim();
        if (!text) return;

        const yRaw = item.transform[5];
        // Find an existing group within threshold
        let foundY = Object.keys(itemsByY).find(y => Math.abs(Number(y) - yRaw) < threshold);
        
        if (!foundY) {
          foundY = yRaw.toString();
          itemsByY[foundY] = [];
        }
        itemsByY[foundY].push(item);
      });

      // Sort Y coordinates descending (top of page to bottom)
      const sortedY = Object.keys(itemsByY)
        .map(Number)
        .sort((a, b) => b - a);

      const pageLines = [];
      sortedY.forEach((y) => {
        const lineItems = itemsByY[y];
        
        // Sort items within a line by X coordinate
        lineItems.sort((a, b) => a.transform[4] - b.transform[4]);
        
        // Check if the line contains any RTL characters
        const fullLineText = lineItems.map(item => item.str).join("");
        const isRtl = /[\u0600-\u06FF]/.test(fullLineText);

        let lineText = "";
        if (isRtl) {
          // Sort fragments by X descending for logical Arabic order
          lineItems.sort((a, b) => b.transform[4] - a.transform[4]);
          
          for (let i = 0; i < lineItems.length; i++) {
            const item = lineItems[i];
            const nextItem = lineItems[i + 1];
            lineText += item.str;
            
            if (nextItem) {
              const currentX = item.transform[4];
              const nextX = nextItem.transform[4];
              const gap = Math.abs(currentX - nextX);
              if (gap > 3) lineText += " ";
            }
          }
        } else {
          // LTR joining
          for (let i = 0; i < lineItems.length; i++) {
            const item = lineItems[i];
            const nextItem = lineItems[i + 1];
            lineText += item.str;
            
            if (nextItem) {
              const currentX = item.transform[4];
              const nextX = nextItem.transform[4];
              const gap = Math.abs(nextX - currentX);
              if (gap > 3) lineText += " ";
            }
          }
        }

        const cleanLine = lineText.replace(/\s{2,}/g, " ").trim();
        if (cleanLine) {
          pageLines.push(cleanLine);
        }
      });

      pages.push(pageLines.join("\n"));
    } catch (pageErr) {
      console.warn(`Could not process page ${pageNo}:`, pageErr);
      continue; // Skip failed page instead of failing entire document
    }
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
  return line.replace(/^[-*•●▪◦\u2022\u2023\u25E6\u2043\u2219]+\s*/, "").trim();
}

function isLikelyContactLine(line) {
  return /@|linkedin|github|https?:\/\/|www\.|(\+?\d[\d\s().-]{7,}\d)|(phone|tel|email|mail|البريد|الهاتف|رقم|موقع|العنوان|address):/i.test(line);
}

function getSectionKey(line) {
  const clean = line.replace(/[:|•\-]/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  const isShortHeading = clean.split(" ").length <= 5;

  if (
    /^(summary|profile|about|objective|professional summary|ملخص|نبذة|نبذة مختصرة|عني|من أنا)$/.test(clean) ||
    (isShortHeading && /(summary|profile|objective|ملخص|نبذة|عني)/.test(clean))
  ) {
    return "summary";
  }

  if (
    /^(experience|work experience|professional experience|employment history|الخبرات|الخبرة|الخبرة العملية|التاريخ الوظيفي|سيرة مهنية)$/.test(clean) ||
    (isShortHeading && /(experience|employment|الخبرات|الخبرة|وظيفي|مهنية)/.test(clean))
  ) {
    return "experience";
  }

  if (
    /^(education|academic background|academic qualifications|التعليم|المؤهلات|المؤهلات العلمية|الدراسة)$/.test(clean) ||
    (isShortHeading && /(education|academic|التعليم|المؤهلات|الدراسة)/.test(clean))
  ) {
    return "education";
  }

  if (
    /^(skills|technical skills|core skills|competencies|المهارات|المهارات التقنية|المهارات الشخصية|أبرز المهارات)$/.test(clean) ||
    (isShortHeading && /(skills|technical skills|المهارات|قدرات)/.test(clean))
  ) {
    return "skills";
  }

  if (
    /^(projects|project|selected projects|portfolio|المشروعات|المشاريع|أعمالي|معرض الأعمال)$/.test(clean) ||
    (isShortHeading && /(projects|project|المشروعات|المشاريع|أعمالي)/.test(clean))
  ) {
    return "projects";
  }

  if (
    /^(languages|language proficiency|اللغات|اللغة)$/.test(clean) ||
    (isShortHeading && /(languages|اللغات)/.test(clean))
  ) {
    return "languages";
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
    projects: [],
    languages: []
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
    
    // Add lines to the section, but skip subsequent markers if they are within the range
    // Actually the current logic is fine as it uses the next marker index as 'end'
    sections[marker.key] = sections[marker.key].concat(lines.slice(start, end).filter(Boolean));
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
  const monthsAr = "يناير|فبراير|مارس|إبريل|ابريل|مايو|يونيو|يوليو|أغسطس|اغسطس|سبتمبر|أكتوبر|اكتوبر|نوفمبر|ديسمبر";
  const monthsEn = "january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec";
  const separators = "-|–|—|to|الى|إلى|حتى|until|till";
  const presentTerms = "present|current|now|الآن|حتى الآن|الوقت الحالي|الحاضر|حتى الوقت الحالي|ongoing";
  
  const datePattern = `(?:\\d{4}|(?:${monthsAr}|${monthsEn})\\s+\\d{4}|(?:${monthsAr}|${monthsEn})\\s*\\d{2,4})`;
  const dateRangePattern = new RegExp(
    `(${datePattern}\\s*(?:${separators})\\s*(?:${datePattern}|${presentTerms}))|(${datePattern})`,
    "i"
  );
  
  const match = line.match(dateRangePattern);

  if (!match) {
    return {
      start: "",
      end: "",
      cleanLine: line
    };
  }

  const range = match[0];
  const parts = range.split(new RegExp(`\\s*(?:${separators})\\s*`, "i"));
  const start = parts[0] || "";
  const end = parts[1] || "";

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
    const dateInfo = extractDateRange(line);
    const hasDate = Boolean(dateInfo.start);
    const isHeaderCandidate = looksLikeTitle(line) && line.split(" ").length <= 8;
    
    // Logic to start a new block:
    // 1. Current line has a date AND current block already has a date.
    // 2. Current line looks like a title AND current block is already quite long.
    const currentHasDate = current.some((entry) => Boolean(extractDateRange(entry).start));
    
    const startNewBlock =
      current.length > 0 &&
      (
        (hasDate && currentHasDate) ||
        (isHeaderCandidate && current.length >= 2 && !line.startsWith("http"))
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
  // Common separators including Arabic comma
  const patterns = [/\s+\|\s+/, /\s+-\s+/, /\s+–\s+/, /\s+—\s+/, /\s+@\s+/i, /\s+at\s+/i, /\s+في\s+/, /\s+،\s+/, /\s+,\s+/, /\s*:\s*/];

  for (const pattern of patterns) {
    if (pattern.test(text)) {
      const parts = text.split(pattern).map((part) => part.trim()).filter(Boolean);

      if (parts.length >= 2) {
        return {
          first: parts[0],
          second: parts.slice(1).join(" | ")
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
      // Find the line that likely contains the title/company
      // Often it's the first line or the line with the date
      let headerLineIndex = block.findIndex(line => extractDateRange(line).start) || 0;
      if (headerLineIndex === -1) headerLineIndex = 0;
      
      const headerLine = block[headerLineIndex];
      const dateInfo = extractDateRange(headerLine);
      const roleCompany = splitRoleCompany(dateInfo.cleanLine || headerLine);
      
      // If company is empty, check if the next line looks like a company name
      let company = roleCompany.second;
      let achievementsStart = headerLineIndex + 1;
      
      if (!company && block[headerLineIndex + 1] && looksLikeTitle(block[headerLineIndex + 1])) {
        company = block[headerLineIndex + 1];
        achievementsStart = headerLineIndex + 2;
      }

      return {
        role: roleCompany.first,
        company: company,
        location: "",
        start: dateInfo.start,
        end: dateInfo.end,
        achievements: block.filter((_, i) => i !== headerLineIndex && (company ? i !== headerLineIndex + 1 : true)).join("\n")
      };
    })
    .filter((item) => Object.values(item).some(Boolean));
}

function parseEducation(sectionLines) {
  const blocks = splitIntoBlocks(sectionLines);

  return blocks
    .map((block) => {
      let headerLineIndex = block.findIndex(line => extractDateRange(line).start) || 0;
      if (headerLineIndex === -1) headerLineIndex = 0;

      const headerLine = block[headerLineIndex];
      const dateInfo = extractDateRange(headerLine);
      const degreeInstitution = splitRoleCompany(dateInfo.cleanLine || headerLine);
      
      let institution = degreeInstitution.second;
      let detailsStart = headerLineIndex + 1;

      if (!institution && block[headerLineIndex + 1] && looksLikeTitle(block[headerLineIndex + 1])) {
        institution = block[headerLineIndex + 1];
        detailsStart = headerLineIndex + 2;
      }

      return {
        degree: degreeInstitution.first,
        institution: institution,
        location: "",
        start: dateInfo.start,
        end: dateInfo.end,
        details: block.filter((_, i) => i !== headerLineIndex && (institution ? i !== headerLineIndex + 1 : true)).join("\n")
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

function parseLanguages(sectionLines) {
  const tokens = [];

  sectionLines.forEach((line) => {
    const parts = line.split(/[:\-–—،,]/).map(p => p.trim()).filter(Boolean);
    if (parts.length >= 2) {
      tokens.push({ name: parts[0], level: parts.slice(1).join(" ") });
    } else if (parts.length === 1) {
      tokens.push({ name: parts[0], level: "" });
    }
  });

  return tokens.slice(0, 10);
}

function parseCvText(rawText) {
  const lines = splitCleanLines(rawText);
  const fullText = lines.join(" \n ");
  const { sections, firstHeadingIndex } = extractSections(lines);
  const topLines = lines.slice(0, Math.min(firstHeadingIndex, 10));

  const emailMatch = fullText.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
  const phoneMatch = fullText.match(/(\+?\d[\d\s().-]{7,}\d)/);
  const websiteMatch = fullText.match(/((https?:\/\/)?(www\.)?(linkedin\.com\/[^\s|,]+|github\.com\/[^\s|,]+|[a-z0-9-]+\.[a-z]{2,}(\/[^\s|,]*)?))/i);
  
  const nameBlacklist = /^(curriculum vitae|resume|cv|سيرة ذاتية|صفحة|page|contact|email|phone|address|linkedin|github|portfolio)$/i;
  const nameCandidates = topLines.filter((line) => {
    const wordCount = line.split(" ").length;
    return wordCount >= 2 && wordCount <= 5 && !isLikelyContactLine(line) && !getSectionKey(line) && !nameBlacklist.test(line);
  });
  
  const fullName = nameCandidates[0] || "";
  const jobTitle = topLines.find((line) => 
    line !== fullName && 
    !isLikelyContactLine(line) && 
    !getSectionKey(line) && 
    !nameBlacklist.test(line) &&
    line.split(" ").length <= 8
  ) || "";
  
  const summary = (sections.summary.length ? sections.summary : lines.slice(2, 8))
    .filter(line => !isLikelyContactLine(line) && line !== fullName && line !== jobTitle)
    .slice(0, 5)
    .join("\n");
    
  const address =
    topLines.find((line) => 
      /,|،/.test(line) && 
      !isLikelyContactLine(line) && 
      line.split(" ").length <= 10 &&
      line !== fullName &&
      line !== jobTitle
    ) || "";

  // Split skills into hard and soft
  const allSkills = parseSkills(sections.skills);
  const softSkillsKeywords = /communication|leadership|teamwork|problem solving|time management|adaptability|creativity|work ethic|التواصل|القيادة|العمل الجماعي|حل المشكلات|إدارة الوقت|التكيف|الإبداع/i;
  
  const softSkills = allSkills.filter(s => softSkillsKeywords.test(s));
  const hardSkills = allSkills.filter(s => !softSkillsKeywords.test(s));

  const experience = parseExperience(sections.experience);
  const education = parseEducation(sections.education);
  const projects = parseProjects(sections.projects);
  const languages = parseLanguages(sections.languages);

  return {
    fullName,
    jobTitle,
    summary,
    email: emailMatch[0] || "",
    phone: phoneMatch ? phoneMatch[0] : "",
    website: websiteMatch ? websiteMatch[0] : "",
    address,
    hardSkills,
    softSkills,
    experience,
    education,
    projects,
    languages
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
  setFormValue("hardSkills", (parsed.hardSkills || parsed.skills || []).join("\n"));
  setFormValue("softSkills", (parsed.softSkills || []).join("\n"));

  fillEntriesFromParsedData(experienceItems, parsed.experience || [], createExperienceItem);
  fillEntriesFromParsedData(educationItems, parsed.education || [], createEducationItem);
  fillEntriesFromParsedData(projectItems, parsed.projects || [], createProjectItem);
  fillEntriesFromParsedData(languageItems, parsed.languages || [], createLanguageItem);

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

function addEmptyLanguage() {
  createLanguageItem();
  applyLanguage(languageSelect.value);
}

addExperienceBtn.addEventListener("click", addEmptyExperience);
addEducationBtn.addEventListener("click", addEmptyEducation);
addProjectBtn.addEventListener("click", addEmptyProject);
addLanguageBtn.addEventListener("click", addEmptyLanguage);

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

  if (type === "language" && languageItems.children.length === 0) {
    createLanguageItem();
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
  importPdfBtn.disabled = true;
  pdfUploadInput.disabled = true;

  try {
    const text = await extractTextFromPdfFile(file);

    if (!text.trim()) {
      setImportStatus("importPdfStatusNoText");
      importPdfBtn.disabled = false;
      pdfUploadInput.disabled = false;
      return;
    }

    const parsed = parseCvText(text);
    if (!parsed) throw new Error("parsing-failed");
    
    fillFormFromParsedCv(parsed);
    setImportStatus("importPdfStatusDone");
  } catch (error) {
    console.error("PDF Import Error:", error);
    if (error && error.message === "pdf-library-missing") {
      setImportStatus("importPdfStatusErrorLib");
    } else if (error && error.message === "pdf-load-failed") {
      setImportStatus("importPdfStatusErrorLoad");
    } else if (error && error.message === "parsing-failed") {
      setImportStatus("importPdfStatusError");
    } else {
      // For any other runtime errors (like property access on undefined)
      setImportStatus("importPdfStatusError");
    }
  } finally {
    importPdfBtn.disabled = false;
    pdfUploadInput.disabled = false;
  }
});

printBtn.addEventListener("click", () => {
  window.print();
});

downloadWordBtn.addEventListener("click", () => {
  exportToWord();
});

async function exportToWord() {
  const locale = currentLocale();
  const data = new FormData(form);
  
  const fullName = (data.get("fullName") || "").toString().trim() || locale.defaults.fullName;
  const jobTitle = (data.get("jobTitle") || "").toString().trim() || locale.defaults.jobTitle;
  const email = (data.get("email") || "").toString().trim();
  const phone = (data.get("phone") || "").toString().trim();
  const address = (data.get("address") || "").toString().trim();
  const website = (data.get("website") || "").toString().trim();
  const summary = (data.get("summary") || "").toString().trim();
  const hardSkills = linesFromValue((data.get("hardSkills") || "").toString());
  const softSkills = linesFromValue((data.get("softSkills") || "").toString());
  
  const experience = collectExperienceEntries();
  const education = collectEducationEntries();
  const projects = collectProjectEntries();
  const languages = collectLanguageEntries();
  const certifications = collectCertificationEntries();

  // Create HTML content for Word
  const htmlContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${fullName} - CV</title>
      <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.4; color: #333; }
        .header { border-bottom: 2px solid #444; padding-bottom: 10px; margin-bottom: 20px; }
        h1 { font-size: 24pt; margin: 0; color: #000; }
        .job-title { font-size: 14pt; font-weight: bold; color: #444; margin-top: 5px; }
        .contact { font-size: 10pt; color: #666; margin-top: 5px; }
        .section-title { font-size: 14pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #ccc; margin-top: 20px; margin-bottom: 10px; color: #000; }
        .entry { margin-bottom: 15px; }
        .entry-head { font-weight: bold; display: flex; justify-content: space-between; }
        .entry-sub { color: #555; font-style: italic; margin-bottom: 5px; }
        ul { margin-top: 5px; margin-bottom: 5px; }
        li { margin-bottom: 3px; }
      </style>
    </head>
    <body style="${locale.dir === 'rtl' ? 'direction: rtl;' : 'direction: ltr;'}">
      <div class="header">
        <h1>${fullName}</h1>
        <div class="job-title">${jobTitle}</div>
        <div class="contact">
          ${[email, phone, address, website].filter(Boolean).join(" | ")}
        </div>
      </div>

      ${summary ? `
        <div class="section">
          <div class="section-title">${locale.strings.summarySection}</div>
          <p>${summary}</p>
        </div>
      ` : ''}

      ${experience.length ? `
        <div class="section">
          <div class="section-title">${locale.strings.experienceSection}</div>
          ${experience.map(exp => `
            <div class="entry">
              <div class="entry-head">
                <span>${exp.role}</span>
                <span style="float: ${locale.dir === 'rtl' ? 'left' : 'right'}">${exp.start} - ${exp.end || locale.strings.present}</span>
              </div>
              <div class="entry-sub">${[exp.company, exp.location].filter(Boolean).join(" | ")}</div>
              <ul>
                ${linesFromValue(exp.achievements).map(a => `<li>${a}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${education.length ? `
        <div class="section">
          <div class="section-title">${locale.strings.educationSection}</div>
          ${education.map(edu => `
            <div class="entry">
              <div class="entry-head">
                <span>${edu.degree}</span>
                <span style="float: ${locale.dir === 'rtl' ? 'left' : 'right'}">${edu.start} - ${edu.end}</span>
              </div>
              <div class="entry-sub">${[edu.institution, edu.location].filter(Boolean).join(" | ")}</div>
              <ul>
                ${linesFromValue(edu.details).map(d => `<li>${d}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${projects.length ? `
        <div class="section">
          <div class="section-title">${locale.strings.projectsSection}</div>
          ${projects.map(proj => `
            <div class="entry">
              <div class="entry-head">${proj.name}</div>
              <div class="entry-sub">${proj.description}</div>
              ${proj.github ? `<div style="font-size: 9pt; color: blue;">${proj.github}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${hardSkills.length ? `
        <div class="section">
          <div class="section-title">Hard Skills</div>
          <ul>
            ${hardSkills.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${softSkills.length ? `
        <div class="section">
          <div class="section-title">Soft Skills</div>
          <ul>
            ${softSkills.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      ${languages.length ? `
        <div class="section">
          <div class="section-title">${locale.strings.languagesSection}</div>
          <ul>
            ${languages.map(l => `<li><strong>${l.name}:</strong> ${l.level}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff', htmlContent], {
    type: 'application/msword'
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${fullName.replace(/\s+/g, '_')}_CV.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

buildTemplateEntries();
applyLanguage(languageSelect.value);
