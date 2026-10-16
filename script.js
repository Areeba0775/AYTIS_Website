/* AYTI'S Academy — customize your contact details and images here. */
const CONFIG = {
  academyName: "AYTI'S Academy",
  // IMPORTANT: Replace this example with your real WhatsApp number in international format.
  // Pakistan example format: 923001234567 (no +, spaces, or hyphens).
  whatsappNumber: "923001234567",
  email: "youracademy@example.com",
  instagram: "https://www.instagram.com/yourusername/",
  tiktok: "https://www.tiktok.com/@yourusername",
  address: "Add your academy address here",

  // Images: use exact paths and filenames from your GitHub repository.
  images: {
    hero: "./assest/images/Home banner img.jpeg",
    about: "./assest/images/Place to grow.png",
    morning: "./assest/images/Learning Activity - 2.jpeg",

    tuition:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",

    secondary:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=80",

    activity:
      "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=900&q=85",

    computer:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=85",
  },
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [
  ...scope.querySelectorAll(selector),
];

function applyConfiguredImages() {
  const mappings = [
    [".hero-photo", CONFIG.images.hero],
    [".about-visual > img", CONFIG.images.about],
    [".program-card:nth-child(1) .card-image img", CONFIG.images.morning],
    [".program-card:nth-child(2) .card-image img", CONFIG.images.tuition],
    [".program-card:nth-child(3) .card-image img", CONFIG.images.secondary],
    [".exp-large", CONFIG.images.activity],
    [".exp-small", CONFIG.images.computer],
  ];
  mappings.forEach(([selector, url]) => {
    const image = $(selector);
    if (image && url) image.src = url;
  });
}
applyConfiguredImages();

function whatsappUrl(
  message = `Hello ${CONFIG.academyName}! I'd like to know more about your classes.`,
) {
  const number = CONFIG.whatsappNumber.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// Apply the central contact configuration everywhere it is used.
function applyContactConfig() {
  $("#emailText").textContent = CONFIG.email;
  $("#emailLink").href = `mailto:${CONFIG.email}`;
  $("#footerEmailText").href = `mailto:${CONFIG.email}`;
  $("#footerEmailText").innerHTML =
    `<i class="fa-regular fa-envelope"></i> ${CONFIG.email}`;
  $("#footerEmail").href = `mailto:${CONFIG.email}`;
  $("#instagramLink").href = CONFIG.instagram;
  $("#tiktokLink").href = CONFIG.tiktok;
  $("#footerInstagram").href = CONFIG.instagram;
  $("#footerTikTok").href = CONFIG.tiktok;
  $("#addressText").textContent = CONFIG.address;
  $("#footerAddress").textContent = CONFIG.address;
  $("#currentYear").textContent = new Date().getFullYear();

  $$("[data-wa]").forEach((link) => {
    link.href = whatsappUrl(link.dataset.wa);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  [CONFIG.instagram, CONFIG.tiktok].forEach((url) => {
    if (url && url !== "#") {
      const a = [
        $("#instagramLink"),
        $("#tiktokLink"),
        $("#footerInstagram"),
        $("#footerTikTok"),
      ].find((el) => el && el.href === url);
      if (a) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
    }
  });
}
applyContactConfig();

// Mobile navigation.
const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");
function closeMenu() {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  document.body.classList.remove("menu-open");
}
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
  document.body.classList.toggle("menu-open", isOpen);
});
$$(".nav-link, .main-nav .nav-cta").forEach((link) =>
  link.addEventListener("click", closeMenu),
);
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMenu();
});

// Sticky header treatment and active navigation link.
const header = $("#siteHeader");
const sections = $$("main section[id]");
function updateScrollState() {
  header.classList.toggle("scrolled", window.scrollY > 8);
  let current = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  $$(".nav-link").forEach((link) => {
    const active = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}
window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

// Subtle scroll reveal; content remains visible if IntersectionObserver is unavailable.
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  $$(".reveal").forEach((el) => revealObserver.observe(el));
} else {
  $$(".reveal").forEach((el) => el.classList.add("visible"));
}

// Teacher carousel: 10 editable demo profiles (4 male, 6 female).
// Replace names, portrait URLs, roles, and introductions with verified academy information.
const teachers = [
  {
    name: "Ayesha Khan",
    gender: "female",
    role: "Early Learning Educator",
    subject: "Early childhood",
    bio: "Supports young learners through playful, foundational activities.",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Muhammad Ali",
    gender: "male",
    role: "Academic Teacher",
    subject: "Primary education",
    bio: "Helps students strengthen core concepts through regular practice.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Sara Ahmed",
    gender: "female",
    role: "Subject Teacher",
    subject: "English",
    bio: "Encourages confident communication, reading, and writing skills.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Usman Raza",
    gender: "male",
    role: "Academic Teacher",
    subject: "Mathematics",
    bio: "Breaks mathematical topics into clear, manageable steps.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Hina Malik",
    gender: "female",
    role: "Subject Teacher",
    subject: "Science",
    bio: "Makes science concepts easier to explore and understand.",
    img: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Bilal Hassan",
    gender: "male",
    role: "Secondary Teacher",
    subject: "Classes 9–10",
    bio: "Supports exam preparation with concept review and practice.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Mariam Iqbal",
    gender: "female",
    role: "Computer Instructor",
    subject: "Basic computer",
    bio: "Introduces digital tools through approachable, practical tasks.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Fatima Noor",
    gender: "female",
    role: "Design Instructor",
    subject: "Graphic designing",
    bio: "Guides learners through visual design and creative projects.",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Zainab Shah",
    gender: "female",
    role: "Digital Skills Instructor",
    subject: "SEO",
    bio: "Introduces the basics of search visibility and content optimization.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Nimra Javed",
    gender: "female",
    role: "Web Development Instructor",
    subject: "Web development",
    bio: "Helps beginners understand website structure, styling, and code.",
    img: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?auto=format&fit=crop&w=600&q=80",
  },
];
const teacherTrack = $("#teacherTrack");
const teacherViewport = $("#teacherViewport");
const teacherDots = $("#teacherDots");
let teacherIndex = 0;
let teacherTimer = null;
let touchStartX = 0;
let touchEndX = 0;

teacherTrack.innerHTML = teachers
  .map(
    (teacher, index) => `
  <article class="teacher-card">
    <div class="teacher-photo">
      <!-- REPLACE IMAGE: teacher ${String(index + 1).padStart(2, "0")} portrait. Update teachers[] in script.js. -->
      <img src="${teacher.img}" alt="Sample portrait for ${teacher.name}" loading="lazy">
    </div>
    <div class="teacher-info">
      <span class="teacher-specialty">${teacher.subject}</span>
      <h3>${teacher.name}</h3>
      <p><strong>${teacher.role}</strong><br>${teacher.bio}</p>
    </div>
  </article>`,
  )
  .join("");

function cardsPerView() {
  if (window.innerWidth <= 370) return 1;
  if (window.innerWidth <= 640) return 2;
  if (window.innerWidth <= 900) return 3;
  return 4;
}
function maxTeacherIndex() {
  return Math.max(0, teachers.length - cardsPerView());
}
function renderTeacherDots() {
  const pages = maxTeacherIndex() + 1;
  teacherDots.innerHTML = Array.from(
    { length: pages },
    (_, i) =>
      `<button class="carousel-dot ${i === teacherIndex ? "active" : ""}" aria-label="Show teacher position ${i + 1}" data-teacher-index="${i}"></button>`,
  ).join("");
}
function moveTeachers(nextIndex) {
  teacherIndex = Math.max(0, Math.min(nextIndex, maxTeacherIndex()));
  const card = $(".teacher-card", teacherTrack);
  if (!card) return;
  const gap = parseFloat(getComputedStyle(teacherTrack).gap) || 18;
  const step = card.getBoundingClientRect().width + gap;
  teacherTrack.style.transform = `translateX(${-teacherIndex * step}px)`;
  renderTeacherDots();
}
$("#teacherPrev").addEventListener("click", () => {
  moveTeachers(teacherIndex <= 0 ? maxTeacherIndex() : teacherIndex - 1);
  restartTeacherTimer();
});
$("#teacherNext").addEventListener("click", () => {
  moveTeachers(teacherIndex >= maxTeacherIndex() ? 0 : teacherIndex + 1);
  restartTeacherTimer();
});
teacherDots.addEventListener("click", (event) => {
  const dot = event.target.closest("[data-teacher-index]");
  if (dot) {
    moveTeachers(Number(dot.dataset.teacherIndex));
    restartTeacherTimer();
  }
});
window.addEventListener("resize", () =>
  moveTeachers(Math.min(teacherIndex, maxTeacherIndex())),
);
teacherViewport.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].screenX;
  },
  { passive: true },
);
teacherViewport.addEventListener(
  "touchend",
  (event) => {
    touchEndX = event.changedTouches[0].screenX;
    if (Math.abs(touchEndX - touchStartX) > 45)
      moveTeachers(
        touchEndX < touchStartX
          ? teacherIndex >= maxTeacherIndex()
            ? 0
            : teacherIndex + 1
          : teacherIndex <= 0
            ? maxTeacherIndex()
            : teacherIndex - 1,
      );
    restartTeacherTimer();
  },
  { passive: true },
);
function startTeacherTimer() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  teacherTimer = window.setInterval(
    () =>
      moveTeachers(teacherIndex >= maxTeacherIndex() ? 0 : teacherIndex + 1),
    5000,
  );
}
function stopTeacherTimer() {
  if (teacherTimer) window.clearInterval(teacherTimer);
  teacherTimer = null;
}
function restartTeacherTimer() {
  stopTeacherTimer();
  startTeacherTimer();
}
teacherViewport.addEventListener("mouseenter", stopTeacherTimer);
teacherViewport.addEventListener("mouseleave", startTeacherTimer);
teacherViewport.addEventListener("focusin", stopTeacherTimer);
teacherViewport.addEventListener("focusout", startTeacherTimer);
moveTeachers(0);
startTeacherTimer();

// Enquiry picker: open WhatsApp with a prepared message; no form data is stored.
$("#sendEnquiry").addEventListener("click", () => {
  const topic = $("#enquiryType").value;
  const extra = $("#enquiryMessage").value.trim();
  const message = `Hello ${CONFIG.academyName}! I'd like to enquire about ${topic}.${extra ? `\n\nMy message: ${extra}` : ""}`;
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
});

// Gallery lightbox with keyboard support and previous/next controls.
const galleryItems = $$(".gallery-item");
const galleryImages = galleryItems.map((item) => ({
  src: $("img", item).src,
  alt: $("img", item).alt,
  caption: $("span", item)
    .textContent.replace(/[\uE000-\uF8FF]/g, "")
    .trim(),
}));
const lightbox = $("#lightbox");
let galleryIndex = 0;
function showGalleryImage(index) {
  galleryIndex = (index + galleryImages.length) % galleryImages.length;
  const image = galleryImages[galleryIndex];
  $("#lightboxImage").src = image.src;
  $("#lightboxImage").alt = image.alt;
  $("#lightboxCaption").textContent = image.caption;
}
function openLightbox(index) {
  showGalleryImage(index);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  $("#lightboxClose").focus();
}
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
galleryItems.forEach((item, index) =>
  item.addEventListener("click", () => openLightbox(index)),
);
$("#lightboxClose").addEventListener("click", closeLightbox);
$("#lightboxPrev").addEventListener("click", () =>
  showGalleryImage(galleryIndex - 1),
);
$("#lightboxNext").addEventListener("click", () =>
  showGalleryImage(galleryIndex + 1),
);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showGalleryImage(galleryIndex - 1);
  if (event.key === "ArrowRight") showGalleryImage(galleryIndex + 1);
});

// If a sample image URL fails, hide the broken image and keep its container tidy.
document.addEventListener(
  "error",
  (event) => {
    if (event.target instanceof HTMLImageElement) {
      event.target.dataset.imageFailed = "true";
      event.target.style.opacity = "0.15";
      event.target.alt = event.target.alt || "Academy image";
    }
  },
  true,
);
