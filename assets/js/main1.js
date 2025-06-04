// main.js - GSAP animations, Lenis smooth scroll, custom cursor, dark mode toggle

// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;



// Ensure default theme is set
if (!html.classList.contains('light') && !html.classList.contains('dark')) {
  html.classList.add('dark'); // default to dark mode
}

function updateThemeIcon() {
  if (html.classList.contains('light')) {
    themeToggle.textContent = '🌙';
  } else {
    themeToggle.textContent = '☀️';
  }
}

themeToggle.addEventListener('click', () => {
  html.classList.toggle('light');
  html.classList.toggle('dark');
  updateThemeIcon();
});

updateThemeIcon();

// GSAP animations for entrance
gsap.registerPlugin(ScrollTrigger);

// Stylish text animation for hero heading
gsap.from('#hero h1 span', {
  opacity: 0,
  y: 30,
  stagger: 0.1,
  duration: 1.2,
  ease: 'power3.out',
  delay: 0.3,
  yoyo: true,
  repeat: -1
});

gsap.from('#hero p', {opacity: 0, y: 50, duration: 1, ease: 'power3.out', stagger: 0.2});
gsap.from('#hero h1', {opacity: 0, y: 50, duration: 1, delay: 0.3, ease: 'power3.out'});
gsap.from('#hero a', {opacity: 0, y: 50, duration: 1, delay: 0.6, ease: 'power3.out'});

// Scroll down and up animations for sections
gsap.utils.toArray('section').forEach(section => {
  gsap.fromTo(section, 
    {opacity: 0, y: 50}, 
    {
      opacity: 1, 
      y: 0, 
      duration: 1, 
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play reverse play reverse',
        scrub: 0.5
      }
    }
  );
});

// Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: t => t * (2 - t),
  smooth: true,
  direction: 'vertical',
  gestureDirection: 'vertical',
  smoothTouch: true,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Custom animated cursor
const cursor = document.getElementById('cursor');

window.addEventListener('mousemove', e => {
  if(cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});

const hoverElements = document.querySelectorAll('a, button, .project-card');

hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2)';
    cursor.style.backgroundColor = 'rgba(0, 207, 255, 0.3)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.backgroundColor = 'transparent';
  });
});

// Fade-in sections on scroll
const faders = document.querySelectorAll('.fade-in-section');

const appearOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('is-visible');
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Fade-in on scroll for sections
function handleFadeInSections() {
  const sections = document.querySelectorAll('.fade-in-section');
  const trigger = window.innerHeight * 0.85;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < trigger) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleFadeInSections);
window.addEventListener('DOMContentLoaded', handleFadeInSections);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('Service Worker registered:', reg.scope))
      .catch(err => console.error('Service Worker error:', err));
  });
}
