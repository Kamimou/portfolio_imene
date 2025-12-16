// Année dynamique dans le footer
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------------- */
/* Intersection Observer  */
/* ---------------------- */

const observerOptions = { threshold: 0.15 };

const revealCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
};

const observer = new IntersectionObserver(revealCallback, observerOptions);

// Hero + sections
const heroContent = document.querySelector('.hero-content');
if (heroContent) observer.observe(heroContent);

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

/* ---------------------- */
/* Filtres de projets     */
/* ---------------------- */

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');

    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');

      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* ---------------------- */
/* Modale projets         */
/* ---------------------- */

const modalOverlay = document.getElementById('project-modal');
const modalTitle = modalOverlay.querySelector('.modal-title');
const modalContent = modalOverlay.querySelector('.modal-content');
const modalClose = modalOverlay.querySelector('.modal-close');

const projectDetails = {
  'cantines': {
    title: 'Les Cantines Vertes',
    text: `Webdoc sur la cantine bio : tournage de l’interview du chef, montage vidéo, ajout de sous-titres,
mixage de la bande-son (ambiance cuisine, sons d’ustensiles, bruit du self) et intégration dans un site 
en HTML/CSS/JS. Objectif : rendre la visite immersive et pédagogique.`
  },
  'aerofollow': {
    title: 'AeroFollow – Coque-drone',
    text: `Projet marketing : étude du besoin, création du concept de coque-drone qui suit le téléphone,
réalisation du logo, maquettes du site vitrine, plan média (réseaux sociaux, teasing, vidéo promo)
et présentation orale pitchée en anglais/français.`
  },
  'satiney': {
    title: 'Satiney – Bonnets doublés satin',
    text: `Projet de stage : harmonisation de la charte graphique, refonte des pages produits (mises en avant
des couleurs, photos, tailles et bénéfices du satin pour les cheveux), réflexion UX pour rassurer
l’utilisateur et clarifier le parcours d’achat.`
  },
  'haku': {
    title: 'HAKU – Marque streetwear',
    text: `Création d’une marque inspirée de l’esthétique japonaise et du lapin sur la lune : moodboard,
choix de palette, typographies, logo, mockups de vêtements et visuels pour les réseaux sociaux.
Objectif : construire un univers cohérent, minimaliste mais fort.`
  },
  'zelda-portfolio': {
    title: 'Portfolio jeu Zelda-like',
    text: `Expérience portfolio sous forme de jeu : un personnage se déplace dans un labyrinthe,
affronte des boss et ouvre des coffres. Chaque coffre affiche un projet (lien, visuels, description).
Inclut caméra qui suit le joueur, collisions, mini-map et progression par niveaux.`
  },
  'unity-zombie': {
    title: 'Jeu Unity – Zombies',
    text: `Prototype C# avec un zombie qui suit le joueur (Transform, Vector3.MoveTowards, LookAt),
gestion de la vitesse, animation de marche et logique de scène. But : comprendre la base du
gameplay 3D et de la relation scripts / GameObjects.`
  }
};

document.querySelectorAll('.more-info').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-project');
    const data = projectDetails[key];

    if (data) {
      modalTitle.textContent = data.title;
      modalContent.textContent = data.text;
    } else {
      modalTitle.textContent = 'Détails du projet';
      modalContent.textContent = 'Contenu à compléter.';
    }

    modalOverlay.classList.add('active');
  });
});

modalClose.addEventListener('click', () => {
  modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('active');
  }
});

/* ---------------------- */
/* Smooth scroll nav      */
/* ---------------------- */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    }
  });
});

/* ---------------------- */
/* Formulaire contact     */
/* ---------------------- */

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Merci pour ton message ! Tu pourras connecter ce formulaire à un vrai service plus tard.");
    contactForm.reset();
  });
}

/* ---------------------- */
/* LIGHTBOX (déclarée ici */
/* pour être utilisée     */
/* partout                */
/* ---------------------- */

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

function openLightbox(src) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightbox.classList.add('active');
}

// Fermer en cliquant sur la croix
if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });
}

// Fermer en cliquant à l’extérieur de l’image
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });
}

// Fermer avec la touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightbox.classList.remove('active');
  }
});

/* ---------------------- */
/* GALERIE : miniatures   */
/* ---------------------- */

document.querySelectorAll('.gallery-thumbs').forEach(group => {
  const targetId = group.dataset.target;
  const mainImg = document.getElementById(targetId);

  if (!mainImg) return;

  const thumbs = group.querySelectorAll('.media-thumb img');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      // Change l'image principale
      mainImg.src = thumb.src;

      // Visuellement : miniature active
      group.querySelectorAll('.media-thumb').forEach(t => t.classList.remove('active-thumb'));
      thumb.parentElement.classList.add('active-thumb');

      // Ouvre la lightbox avec cette image
      openLightbox(thumb.src);
    });
  });

  // Active la première miniature par défaut
  if (thumbs.length > 0) {
    thumbs[0].parentElement.classList.add('active-thumb');
  }
});

// Ouvrir la lightbox au clic sur l'image principale
document.querySelectorAll('.project-main-image').forEach(img => {
  img.addEventListener('click', () => {
    openLightbox(img.src);
  });
});
