const form = document.getElementById("cvForm");
const printBtn = document.getElementById("printBtn");
const languageSelect = document.getElementById("languageSelect");
const addExperienceBtn = document.getElementById("addExperienceBtn");
const addEducationBtn = document.getElementById("addEducationBtn");
const addProjectBtn = document.getElementById("addProjectBtn");
const experienceItems = document.getElementById("experienceItems");
const educationItems = document.getElementById("educationItems");
const projectItems = document.getElementById("projectItems");

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
          github: "https://github.com/your-username/ats-cv-builder"
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

printBtn.addEventListener("click", () => {
  window.print();
});

buildTemplateEntries();
applyLanguage(languageSelect.value);
