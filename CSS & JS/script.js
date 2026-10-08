const AVATAR_IMAGE = "images/Ramos_headshot.jpg";

let _nextId = 100;
function nextId() {
  return _nextId++;
}

function setBackgroundImage(el, src) {
  if (!src) return;
  const probe = new Image();
  probe.onload = () => {
    el.style.backgroundImage = `url('${src}')`;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
  };
  probe.onerror = () => {
    el.style.backgroundImage = "";
  };
  probe.src = src;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/* Bebi dito po ikaw sa portfolioItems maglalagay ng mga activities na 
ibibigay ganto format nya

{

 id: no of id,
    type: "", (activity,quiz,exam) exact words po dapat
    title: "Quiz 1: Intro to Web Dev",
    description: "Short quiz covering the basics of HTML, CSS, and JS rules and how browsers render a page.",
    date: "2026-08-12", YYYY/MM/DD 
    score: "9/10",
    images: ["images/Quizzes/Quiz1_DCIT26_front.jpg", "images/Quizzes/Quiz1_DCIT26_back.jpg"]

}

TAKE NOTE!!!: sa title bebi exactly words lang na 
(activity,quiz,exam)
ayan lang po exact words for the ano kundi di sya magload oki?

TAKE NOTE!!!: about sa images array sya kahit mag-isa lang may bracket pa din po
[]

ex.

images: ["images/Quizzes/Quiz1_DCIT26_front.jpg"]

TAKE NOTE!!!!: format ng date YYYY/MM/DD

*/ 

const portfolioItems = [
  {
    id: 1,
    type: "quiz",
    title: "Quiz 1: Emerging Technologies",
    description: "Short quiz about Emerging Technologies",
    date: "2026-08-25",
    score: "19/20",
    images: ["images/Quizzes/Quiz1_DCIT26_front.jpg", "images/Quizzes/Quiz1_DCIT26_back.jpg" ]
<<<<<<< HEAD
  },

  {
    id: 2,
    type: "quiz",
    title: "Quiz 2: Requirements Analysis & Unified Modeling Language",
    description: "Online Quiz about Requirements Analysis & Unified Modeling Language",
    date: "2026-08-25",
    score: "20/20",
    images: ["images/Quizzes/RAMOS_DCIT26_QUIZ2_MIDTERM.jpg"]
  },

  {
    id: 3,
    type: "quiz",
    title: "Quiz 3: The SOLID Principles",
    description: "Online Quiz about The SOLID Principles",
    date: "2026-10-08",
    score: "20/20",
    images: ["images/Quizzes/RAMOS_DCIT26_QUIZ3_MIDTERM.jpg"]
  },

  {
    id: 4,
    type: "quiz",
    title: "Long Quiz: Emerging Technologies, Requirements Analysis, SOLID Principles & Design Patterns",
    description: "Long Quiz that serves as a preparation for Midterm Examination.",
    date: "2026-10-05",
    score: "43/45",
    images: ["images/Quizzes/RAMOS_DCIT26_LONGQUIZ_MIDTERM.jpg"]
  },

  {
    id: 5,
    type: "exam",
    title: "Midterm Examination",
    description: "Midterm exam about Emerging Technologies, Requirements Analysis, SOLID Principles & Design Patterns",
    date: "2026-08-25",
    score: "68/70",
    images: ["images/Exams/RAMOS_DCIT26_MIDTERMS_EXAM.jpg"]
  },

=======
  }
>>>>>>> 3a88c2cc575fdaee58b2c451aa37951164060a10
];

let currentView = "quiz";
let lightboxIndex = 0;
let photoIndex = 0;
let currentPhotoSrc = "";

const grid = document.getElementById("grid");
const emptyState = document.getElementById("empty-state");
const portfolioTitle = document.getElementById("portfolio-title");
const aboutCard = document.getElementById("about");

const viewLabels = {
  quiz: "Quizzes",
  activity: "Activities",
  exam: "Examinations"
};

const badgeLabels = {
  quiz: "Quiz",
  activity: "Activity",
  exam: "Exam"
};

function currentItems() {
  return portfolioItems
    .filter(item => item.type === currentView)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function renderGrid() {
  const items = currentItems();

  grid.innerHTML = "";
  emptyState.hidden = items.length > 0;

  items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <button class="card-thumb thumb-${item.type}" aria-label="Open ${item.title} photo"></button>
      <div class="card-body">
        <div class="card-top">
          <span class="badge badge-${item.type}">${badgeLabels[item.type]}</span>
          <span class="card-date">${formatDate(item.date)}</span>
        </div>
        <p class="card-title">${item.title}</p>
        <p class="card-desc">${item.description}</p>
        <div class="card-bottom">
          <span class="score-pill">Score: ${item.score}</span>
        </div>
      </div>
    `;

    const thumb = card.querySelector(".card-thumb");
    if (item.images && item.images.length) {
      setBackgroundImage(thumb, item.images[0]);
    }
    thumb.addEventListener("click", () => openLightbox(index));

    grid.appendChild(card);
  });
}

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(btn => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;

    navItems.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (view === "about") {
      aboutCard.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    currentView = view;
    portfolioTitle.textContent = viewLabels[view];
    renderGrid();
    document.querySelector(".portfolio").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const lightboxOverlay = document.getElementById("lightbox-overlay");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxEyebrow = document.getElementById("lightbox-eyebrow");
const lightboxDate = document.getElementById("lightbox-date");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxScore = document.getElementById("lightbox-score");

function openLightbox(index) {
  lightboxIndex = index;
  photoIndex = 0;
  renderLightbox();
  lightboxOverlay.classList.add("open");
}

function renderLightbox() {
  const items = currentItems();
  const item = items[lightboxIndex];
  if (!item) return;

  const images = item.images || [];

  lightboxEyebrow.textContent = viewLabels[item.type];
  lightboxTitle.textContent = item.title;
  lightboxDate.textContent = formatDate(item.date);

  lightboxImage.className = `lightbox-image thumb-${item.type}`;
  lightboxImage.style.backgroundImage = "";
  currentPhotoSrc = "";
  if (images.length) {
    currentPhotoSrc = images[photoIndex];
    setBackgroundImage(lightboxImage, currentPhotoSrc);
  }

  const showNav = images.length > 1;
  lightboxPrev.hidden = !showNav;
  lightboxNext.hidden = !showNav;
  lightboxCounter.hidden = !showNav;
  if (showNav) {
    lightboxCounter.textContent = `${photoIndex + 1} / ${images.length}`;
  }

  lightboxScore.textContent = `Score: ${item.score}`;
}

function closeLightbox() {
  lightboxOverlay.classList.remove("open");
}

function showPrevPhoto() {
  const items = currentItems();
  const item = items[lightboxIndex];
  const images = (item && item.images) || [];
  if (images.length < 2) return;
  photoIndex = (photoIndex - 1 + images.length) % images.length;
  renderLightbox();
}

function showNextPhoto() {
  const items = currentItems();
  const item = items[lightboxIndex];
  const images = (item && item.images) || [];
  if (images.length < 2) return;
  photoIndex = (photoIndex + 1) % images.length;
  renderLightbox();
}

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", showPrevPhoto);
lightboxNext.addEventListener("click", showNextPhoto);

lightboxOverlay.addEventListener("click", e => {
  if (e.target === lightboxOverlay) closeLightbox();
});

const fullimageOverlay = document.getElementById("fullimage-overlay");
const fullimageImg = document.getElementById("fullimage-img");
const fullimageClose = document.getElementById("fullimage-close");

lightboxImage.addEventListener("click", () => {
  if (!currentPhotoSrc) return;
  fullimageImg.src = currentPhotoSrc;
  fullimageOverlay.classList.add("open");
});

fullimageClose.addEventListener("click", () => {
  fullimageOverlay.classList.remove("open");
});

fullimageOverlay.addEventListener("click", e => {
  if (e.target === fullimageOverlay) fullimageOverlay.classList.remove("open");
});

document.addEventListener("keydown", e => {
  if (fullimageOverlay.classList.contains("open")) {
    if (e.key === "Escape") fullimageOverlay.classList.remove("open");
    return;
  }
  if (!lightboxOverlay.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showPrevPhoto();
  if (e.key === "ArrowRight") showNextPhoto();
});

const avatarImg = document.getElementById("avatar-img");
const avatarFallback = document.getElementById("avatar-fallback");

function loadAvatarFromConfig() {
  if (!AVATAR_IMAGE) return;
  avatarImg.onload = () => {
    avatarImg.style.display = "block";
    avatarFallback.style.display = "none";
  };
  avatarImg.onerror = () => {
    avatarImg.style.display = "none";
    avatarFallback.style.display = "flex";
  };
  avatarImg.src = AVATAR_IMAGE;
}

renderGrid();
loadAvatarFromConfig();