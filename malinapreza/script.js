// Scroll animations для About section
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, {
  threshold: 0.5,
});

// Наблюдаем за About section
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  observer.observe(aboutSection);
}

// Smooth scroll для внутренних ссылок
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Простой scroll reveal для карточек
const revealCards = () => {
  const cards = document.querySelectorAll('.feature-card');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '-100px 0px',
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${index * 150}ms`;
        entry.target.style.animationPlayState = 'running';
      }
    });
  }, observerOptions);

  cards.forEach((card) => {
    card.style.animationPlayState = 'paused';
    cardObserver.observe(card);
  });
};

revealCards();
