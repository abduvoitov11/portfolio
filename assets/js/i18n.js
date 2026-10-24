// ============ i18n Translation System (Uzbek & English) ============
const translations = {
  uz: {
    // Lock Screen
    ls_unlock_hint: "Ochish uchun istalgan joyga bosing",
    ls_name: "Torabek portfoliyasi",
    lang_btn_label: "🇺🇿 UZ",
    lang_toggle_title: "Tilni o'zgartirish (O'zbekcha / English)",

    // Top Bar & Menus
    menu_apple_about: "Torabek haqida",
    menu_apple_settings: "Tizim sozlamalari…",
    menu_file: "Fayl",
    menu_edit: "Tahrir",
    menu_view: "Ko'rinish",
    menu_window: "Oyna",
    menu_help: "Yordam",
    spotlight_placeholder: "Spotlight Qidiruv",

    // Home / Widgets
    services_title: "Nimalar qila olaman",
    service_ai_title: "AI & Machine Learning",
    service_ai_desc: "Neyron tarmoqlar, LLM agentlar va sun'iy intellekt modellarini PyTorch va TensorFlow'da noldan yig'ish va deploy qilish.",
    service_web_title: "Veb & API Tizimlari",
    service_web_desc: "React, Next.js va FastAPI'da tezkor, xavfsiz va chiroyli interfeysli zamonaviy tizimlarni yaratish.",
    service_sec_title: "Linux & Xavfsizlik",
    service_sec_desc: "Linux serverlarni sozlash, Docker containerlar, xavfsizlik auditi (pentesting) va avtomatlashtirish.",

    about_widget_title: "Men haqimda",
    about_widget_p1: "Salom! Men Torabek Abduvoitov — AI dasturchiman. Toshkentdanman. Sun'iy intellekt, LLM modellar va tezkor backend tizimlar yaratish jon-u dilim.",
    about_widget_p2: "Har bir proyektga arxitektura va xavfsizlik tomonidan jiddiy qarayman. Maqsadim — AI va dasturlash kuchini birlashtirib, odamlarga real foyda keltiradigan zo'r mahsulotlar yaratish.",

    // App Names & Tooltips
    app_mail: "Pochta",
    app_telegram: "Telegram",
    app_github: "GitHub",
    app_linkedin: "LinkedIn",
    app_instagram: "Instagram",
    app_projects: "Proyektlar",
    app_resume: "Rezyume",
    app_about: "Men haqimda",
    app_experience: "Tajriba",
    app_skills: "Ko'nikmalar",
    app_contact: "Bog'lanish",
    app_wallpaper: "Fon rasmi",
    menu_portfolio: "Portfolio",
    btn_close: "Yopish",

    // Wallpaper Picker
    wp_title: "Fon rasmini tanlang",
    wp_upload: "Rasm yuklash",
    wp_theme: "Mavzu",
    wp_done: "Tayyor",

    // About Page Modal
    about_page_title: "Men haqimda",
    about_intro_p1: "Qalay! Men <strong>Torabek Abduvoitovman</strong> — Toshkentlik AI dasturchi. Yangi texnologiyalar, sun'iy intellekt va murakkab masalalarga aqlli yechimlar yaratish jon-u dilim.",
    about_intro_p2: "Python'da LLM va kompyuter ko'rishi (CV) modellarini o'rgatishdan tortib, FastAPI va Docker'da chaqqon, xavfsiz tizimlargacha tayyorlayman. Proyektlarimda ham funksionallik, ham tezlik va xavfsizlikka alohida e'tibor beraman.",
    about_competencies_title: "Asosiy yo'nalishlarim:",
    about_comp_1: "Katta til modellari (LLMs), AI agentlar va RAG tizimlari",
    about_comp_2: "Yuqori tezlikdagi backend (FastAPI, Python, Django)",
    about_comp_3: "Zamonaviy frontend (React, Next.js, TypeScript, Tailwind)",
    about_comp_4: "Ma'lumotlar bazasi (PostgreSQL, MongoDB, MySQL, Redis)",
    about_comp_5: "Algoritmlar va sport dasturlash (C++)",
    about_comp_6: "Linux tizimlarini boshqarish va Docker devops",
    about_outro_1: "Kodni toza yozish, tizimni qulay va xavfsiz qilish — birinchi o'rinda. Bo'sh vaqtlarda esa Informatika olimpiadalarida qatnashaman va kiberxavfsizlik bo'yicha tadqiqotlar qilaman.",
    about_stack_title: "Asosiy Texnologiyalar",

    // Projects Page Modal
    projects_page_title: "Proyektlar",
    badge_featured: "Alohida",
    badge_production: "Prodakshn",
    badge_backend: "AI & Backend",
    badge_web: "Veb",
    badge_security: "Xavfsizlik",

    p1_title: "macOS Web Environment (Ushbu Portfolio!)",
    p1_subtitle: "Brauzerda to'liq interaktiv operatsion tizim nusxasi",
    p1_desc: "Brauzer ichida to'liq ishlaydigan macOS Sonoma interfeysi. Ko'p oynali boshqaruv, lock screen, fon rasmlari dvijogi, spotlight qidiruvi va musiqa pleyeri bilan jihozlangan.",

    p2_title: "Kiloli OPTOM Platformasi ↗",
    p2_subtitle: "Ulgurji savdo (B2B) va logistika veb-platformasi",
    p2_desc: "Xitoydan kiyim-kechaklarni ulgurji (kilogramm hisobida) sotib olish uchun yirik B2B platforma. React frontend va FastAPI backend asosida qurilgan bo'lib, og'irlik bo'yicha dinamik narxlash va avtomatlashtirilgan buyurtma tizimiga ega.",

    p3_title: "AvtoEmaktab Tizimi ↗",
    p3_subtitle: "Avtomaktab boshqaruvi va onlayn imtihon simulyatori",
    p3_desc: "Avtomaktablar uchun to'liq avtomatlashtirilgan o'quv va onlayn imtihon simulyatori. Real vaqtdagi ballar statistikasi, talabalar davomati va nazorat panellarini o'z ichiga oladi.",

    p4_title: "Focus Media Tashkent ↗",
    p4_subtitle: "Raqamli media agentlik va prodaction studiya sayti",
    p4_desc: "Katta media agentlik va video prodaction studiyasining premium korporativ sayti. Juda ravon animatsiyalar, fluid moslashuvchan tartib va mobile-first dizayn.",

    p5_title: "GrayHat Kiberxavfsizlik Vositalari ↗",
    p5_subtitle: "Avtomatlashtirilgan tarmoq skaneri va pentest vositalari",
    p5_desc: "Linux muhiti uchun mo'ljallangan avtomatlashtirilgan kirib borish testlari (pentesting) va tarmoq diagnostikasi vositalari to'plami. Portlarni tekshirish, zaifliklarni qidirish va protokol sinovlarini bajaradi.",

    // Experience Page Modal
    exp_page_title: "Tajriba",
    exp1_role: "AI Dasturchi",
    exp1_place: "Frilans / Mustaqil loyihalar • Toshkent, O'zbekiston",
    exp1_date: "2023 - Hozirgacha",
    exp1_intro: "Mijozlar va turli loyihalar uchun aqlli tizimlar hamda sun'iy intellekt integratsiyalarini ishlab chiqish:",
    exp1_p1: "Python, PyTorch va Hugging Face yordamida neyron tarmoqlar va LLM agent tizimlarini yaratish.",
    exp1_p2: "FastAPI, PostgreSQL va Docker asosida tezkor, asinxron REST API'lar yozish.",

    exp2_role: "Dasturchi va Avtomatlashtirish Muhandisi",
    exp2_place: "Turli texnologik loyihalar • Toshkent, O'zbekiston",
    exp2_date: "2022 - 2023",
    exp2_intro: "Avtomatlashtirilgan ish jarayonlari, veb-skraping va biznes Telegram-bot infratuzilmalari:",
    exp2_p1: "Katta yuklamaga bardoshli, to'lovlar va bildirishnomalarni boshqaruvchi Telegram botlar yaratish.",
    exp2_p2: "Python (asyncio, Beautiful Soup) yordamida ma'lumotlarni yig'ish va qayta ishlashni avtomatlashtirish.",
    exp2_p3: "Linux VPS serverlarni sozlash, xavfsizlik va monitoring jarayonlarini boshqarish.",

    exp3_role: "Sport Dasturlash & Xavfsizlik Auditi",
    exp3_place: "Informatika fani bo'yicha Asosiy fan olimpiadasi • Algoritmik dasturlash bo'yicha tuman ishtirokchisi va finalchi",
    exp3_date: "2021 - Hozirgacha",
    exp3_intro: "Algoritmik musobaqalar va veb-xavfsizlik tadqiqotlari bilan shug'ullanish:",
    exp3_p1: "O'zbekiston Asosiy fan olimpiadalarida C++ va Python tillarida faol ishtirok etish.",
    exp3_p2: "Murakkab algoritmlar: Ikkilik qidiruv, Graflar, Dinamik dasturlash va Sonlar nazariyasini amalda qo'llash.",
    exp3_p3: "Veb-ilovalarda OWASP Top 10 zaifliklarini tahlil qilish va bartaraf etish.",

    // Skills Page Modal
    skills_page_title: "Ko'nikmalar",
    skills_core_title: "Asosiy bilimlarim",
    skill_ai: "Sun'iy intellekt & ML (PyTorch, LLMs)",
    skill_backend: "Python & Backend dasturlash (FastAPI, Django)",
    skill_frontend: "Zamonaviy Web (React, Next.js, TypeScript)",
    skill_linux: "Linux, Bash & Docker DevOps",
    skill_db: "Ma'lumotlar bazasi (PostgreSQL, MongoDB, Redis)",
    skill_algo: "Algoritmlar & Masala yechish (C++)",
    skills_tech_title: "Texnologiyalar",

    // Resume Page Modal
    resume_page_title: "Rezyume",
    resume_contact_btn: "Email orqali bog'lanish",
    resume_summary_title: "Qisqacha Ma'lumot",
    resume_summary_text: "Sun'iy intellekt, chuqur o'rganish (LLM) tizimlari va yuqori samarali backend platformalar yaratishga qiziquvchi AI Developer. Algoritmik fikrlash (Informatika olimpiadalari), Linux tizimlari va xavfsiz arxitekturada mustahkam tajribaga ega.",
    resume_exp_title: "Ish Tajribasi",
    resume_edu_title: "Ta'lim va Yutuqlar",
    resume_edu_2: "Informatika fani bo'yicha Asosiy fan olimpiadasi",
    resume_edu_2_sub: "Algoritmik dasturlash bo'yicha tuman ishtirokchisi va finalchi",
    resume_skills_title: "Texnik Ko'nikmalar",

    // Contact Page Modal
    contact_page_title: "Bog'lanish",
    contact_get_in_touch: "Aloqaga chiqing",
    contact_label_email: "Email",
    contact_label_telegram: "Telegram",
    contact_label_github: "GitHub",
    contact_label_location: "Manzil",
    contact_location_val: "Toshkent, O'zbekiston",
    contact_connect_title: "Keling, gaplashamiz!",
    contact_connect_desc: "Biror qiziq loyiha, AI g'oya bormi yoki shunchaki dasturlash haqida fikr almashmoqchimisiz? Menga bemalol Telegram yoki pochtadan yozing, bafurja gaplashamiz!",
    contact_btn_tg: "Telegram'dan yozish ↗",
    contact_btn_mail: "Email yuborish ↗"
  },

  en: {
    // Lock Screen
    ls_unlock_hint: "Click anywhere to unlock",
    ls_name: "Torabek's Portfolio",
    lang_btn_label: "🇬🇧 EN",
    lang_toggle_title: "Switch Language (English / O'zbekcha)",

    // Top Bar & Menus
    menu_apple_about: "About This Mac",
    menu_apple_settings: "System Settings…",
    menu_file: "File",
    menu_edit: "Edit",
    menu_view: "View",
    menu_window: "Window",
    menu_help: "Help",
    spotlight_placeholder: "Spotlight Search",

    // Home / Widgets
    services_title: "What I'm doing",
    service_ai_title: "AI & Machine Learning",
    service_ai_desc: "Building neural networks, LLM agents, and computer vision models in PyTorch & TensorFlow.",
    service_web_title: "Web & API Systems",
    service_web_desc: "Modern web applications and APIs with React, Next.js, FastAPI, TypeScript and secure architecture.",
    service_sec_title: "Linux & Security",
    service_sec_desc: "Linux administration, Docker containerization, security hardening and automation.",

    about_widget_title: "About me",
    about_widget_p1: "Hi, I’m Torabek Abduvoitov, an AI Developer from Tashkent, Uzbekistan. I specialize in Artificial Intelligence, Deep Learning (LLMs), and scalable backend architectures.",
    about_widget_p2: "I bring engineering rigor to every project, ensuring robust architecture while delivering high reliability. My aim is to combine artificial intelligence and software engineering to transform ideas into impactful, scalable solutions.",

    // App Names & Tooltips
    app_mail: "Mail",
    app_telegram: "Telegram",
    app_github: "GitHub",
    app_linkedin: "LinkedIn",
    app_instagram: "Instagram",
    app_projects: "Projects",
    app_resume: "Resume",
    app_about: "About",
    app_experience: "Experience",
    app_skills: "Skills",
    app_contact: "Contact",
    app_wallpaper: "Wallpaper",
    menu_portfolio: "Portfolio",
    btn_close: "Close",

    // Wallpaper Picker
    wp_title: "Choose Wallpaper",
    wp_upload: "Upload",
    wp_theme: "Theme",
    wp_done: "Done",

    // About Page Modal
    about_page_title: "About Me",
    about_intro_p1: "Hi, I'm <strong>Torabek Abduvoitov</strong>, an ambitious AI Developer based in Tashkent, Uzbekistan. I specialize in building intelligent systems, Deep Learning models, and modern software architectures.",
    about_intro_p2: "My passion lies in Artificial Intelligence, robust backend architectures, and efficient software systems. From engineering fine-tuned LLM workflows and Computer Vision pipelines in Python to building secure APIs with FastAPI and Docker, I create software that delivers real impact.",
    about_competencies_title: "My core competencies:",
    about_comp_1: "LLMs, AI Agents & RAG Architecture",
    about_comp_2: "High-Performance Backend (FastAPI, Python, Django)",
    about_comp_3: "Modern Frontend (React, Next.js, TypeScript, Tailwind)",
    about_comp_4: "Database Systems (PostgreSQL, MongoDB, MySQL, Redis)",
    about_comp_5: "Competitive Programming (Algorithms & Data Structures in C++)",
    about_comp_6: "Linux System Administration & Docker DevOps",
    about_outro_1: "I place immense emphasis on clean code, modular architecture, and high security. When I'm not developing AI platforms, I compete in Informatics Olympiads and research cybersecurity vulnerabilities.",
    about_stack_title: "Core Tech Stack",

    // Projects Page Modal
    projects_page_title: "Projects",
    badge_featured: "Featured",
    badge_production: "Production",
    badge_backend: "AI & Backend",
    badge_web: "Web",
    badge_security: "Security",

    p1_title: "macOS Web Environment (This Portfolio!)",
    p1_subtitle: "Interactive Multi-Window OS Experience",
    p1_desc: "Architected a fully functional, interactive macOS replica in the browser. Features custom multi-window manager, lock screen with live clock, glassmorphism UI, interactive audio player, dynamic wallpaper engine, and spotlight search.",

    p2_title: "Kiloli OPTOM Platform ↗",
    p2_subtitle: "B2B Wholesale E-Commerce & Logistics Platform",
    p2_desc: "Comprehensive online wholesale marketplace for purchasing imported apparel by weight (kg). Built with React frontend and FastAPI backend, featuring dynamic weight-based pricing, interactive order processing, catalog search, and automated checkout.",

    p3_title: "AvtoEmaktab Platform ↗",
    p3_subtitle: "Driving Academy Management & Exam Simulator",
    p3_desc: "Comprehensive driving academy education and examination system. Implements interactive testing engine with real-time score analytics, student progress tracking, and administrative control panels.",

    p4_title: "Focus Media Tashkent ↗",
    p4_subtitle: "Digital Media Agency & Production Studio",
    p4_desc: "High-impact digital agency website showcasing video production, marketing campaigns, and brand identity design. Built with ultra-smooth animations, fluid responsive layout, and mobile-first aesthetics.",

    p5_title: "GrayHat Security Toolkit ↗",
    p5_subtitle: "Cybersecurity & Automated Reconnaissance Suite",
    p5_desc: "Collection of custom automated penetration testing tools and network diagnostics designed for Linux environments. Includes port auditing, vulnerability scanning, and protocol fuzzing modules.",

    // Experience Page Modal
    exp_page_title: "Experience",
    exp1_role: "AI Developer",
    exp1_place: "Independent / Freelance • Tashkent, Uzbekistan",
    exp1_date: "2023 - Present",
    exp1_intro: "Leading the development of intelligent web systems and machine learning integrations for enterprise clients:",
    exp1_p1: "Designed neural network architectures and LLM agent pipelines using Python, PyTorch, and Hugging Face.",
    exp1_p2: "Built scalable, async REST APIs using FastAPI, PostgreSQL, and Docker containerization.",

    exp2_role: "Software Engineer & Automation Specialist",
    exp2_place: "Various Tech Projects • Tashkent, Uzbekistan",
    exp2_date: "2022 - 2023",
    exp2_intro: "Built automated software pipelines, web scraping engines, and business Telegram bot infrastructures:",
    exp2_p1: "Engineered high-concurrency Telegram bots handling automated user flows, payments, and notifications.",
    exp2_p2: "Automated data extraction and ETL workflows using Python, Beautiful Soup, and asynchronous asyncio.",
    exp2_p3: "Managed Linux production VPS environments, security policies, and system monitoring.",

    exp3_role: "Competitive Programming & Security Auditing",
    exp3_place: "National Informatics Olympiad (Asosiy fan olimpiadasi) • District Participant & Finalist",
    exp3_date: "2021 - Present",
    exp3_intro: "Participating in algorithmic programming competitions and web security research:",
    exp3_p1: "Competed in Uzbekistan's National Informatics Olympiad (Asosiy fan olimpiadasi) with C++ and Python.",
    exp3_p2: "Mastered advanced algorithms: Binary Search, Graph traversal, Dynamic Programming, and Number Theory.",
    exp3_p3: "Conducting authorized white-box penetration testing and OWASP vulnerability mitigations.",

    // Skills Page Modal
    skills_page_title: "My Skills",
    skills_core_title: "Core Expertise",
    skill_ai: "Artificial Intelligence & ML (PyTorch, LLMs)",
    skill_backend: "Python & Backend Engineering (FastAPI, Django)",
    skill_frontend: "Modern Web (React, Next.js, TypeScript)",
    skill_linux: "Linux, Bash & Docker DevOps",
    skill_db: "Database Systems (PostgreSQL, MongoDB, Redis)",
    skill_algo: "Competitive Programming & Algorithms (C++)",
    skills_tech_title: "Technologies",

    // Resume Page Modal
    resume_page_title: "Resume",
    resume_contact_btn: "Contact via Email",
    resume_summary_title: "Professional Summary",
    resume_summary_text: "Passionate AI Developer and Software Engineer with expertise in building deep learning systems, LLM agent architectures, and high-performance backend platforms. Strong background in algorithmic problem solving (Informatics Olympiads), Linux system administration, and modern software design patterns.",
    resume_exp_title: "Work Experience",
    resume_edu_title: "Education & Honors",
    resume_edu_2: "National Informatics Olympiad (Asosiy Fan Olimpiadasi)",
    resume_edu_2_sub: "Algorithmic Programming District Participant & Finalist",
    resume_skills_title: "Technical Skills",

    // Contact Page Modal
    contact_page_title: "Contact Me",
    contact_get_in_touch: "Get In Touch",
    contact_label_email: "Email",
    contact_label_telegram: "Telegram",
    contact_label_github: "GitHub",
    contact_label_location: "Location",
    contact_location_val: "Tashkent, Uzbekistan",
    contact_connect_title: "Let's Connect",
    contact_connect_desc: "Whether you have an inquiry about AI solutions, backend architectures, business collaborations, or just want to say hi, feel free to drop me a message on Telegram or email!",
    contact_btn_tg: "Message on Telegram ↗",
    contact_btn_mail: "Send an Email ↗"
  }
};

let currentLang = localStorage.getItem('torabek_lang') || 'uz';

function setLanguage(lang) {
  if (!translations[lang]) lang = 'uz';
  currentLang = lang;
  localStorage.setItem('torabek_lang', lang);

  const dict = translations[lang];

  // Update text content
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  // Update HTML content
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key] !== undefined) {
      el.innerHTML = dict[key];
    }
  });

  // Update input placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.placeholder = dict[key];
    }
  });

  // Update tooltips and data-name
  document.querySelectorAll('[data-i18n-name]').forEach((el) => {
    const key = el.getAttribute('data-i18n-name');
    if (dict[key] !== undefined) {
      el.setAttribute('data-name', dict[key]);
      const tooltip = el.querySelector('.dock-tooltip');
      if (tooltip) tooltip.textContent = dict[key];
    }
  });

  // Update language toggle buttons in Menubar & Lock screen
  const toggleBtn = document.getElementById('langToggleBtn');
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'uz' ? '🇺🇿 UZ' : '🇺🇸 US';
    toggleBtn.title = dict.lang_toggle_title;
  }

  const lockLang = document.getElementById('lsLangIndicator');
  if (lockLang) {
    lockLang.textContent = lang === 'uz' ? 'UZ' : 'US';
  }

  // Update date format on lockscreen & menubar
  if (typeof updateClockAndDate === 'function') {
    updateClockAndDate();
  }
}

function toggleLanguage() {
  const nextLang = currentLang === 'uz' ? 'en' : 'uz';
  setLanguage(nextLang);
}

// Auto-init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);

  const toggleBtn = document.getElementById('langToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLanguage();
    });
  }

  const lockLang = document.getElementById('lsLangIndicator');
  if (lockLang) {
    lockLang.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLanguage();
    });
  }
});
