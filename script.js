// =============================================
// COUNTDOWN — 1 hora e meia a partir do carregamento
// =============================================
const end = new Date().getTime() + (1.5 * 60 * 60 * 1000);

function updateTimer() {
  const now = new Date().getTime();
  let diff = end - now;
  if (diff <= 0) diff = 0;

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  document.getElementById('hours').textContent   = String(h).padStart(2, '0');
  document.getElementById('minutes').textContent = String(m).padStart(2, '0');
  document.getElementById('seconds').textContent = String(s).padStart(2, '0');

  if (diff > 0) setTimeout(updateTimer, 1000);
}

updateTimer();

// =============================================
// SCROLL ANIMATION (Intersection Observer)
// =============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity   = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.benefit-card, .for-item').forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// =============================================
// BARRA DE PROGRESSO NO TOPO (scroll)
// =============================================
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
  const scrollTop     = window.scrollY;
  const docHeight     = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = scrollPercent + '%';

  // Mostrar/ocultar botão flutuante após rolar 300px
  const floatBtn = document.getElementById('float-btn');
  if (scrollTop > 300) {
    floatBtn.classList.add('visible');
  } else {
    floatBtn.classList.remove('visible');
  }
});

// =============================================
// PARTÍCULAS ANIMADAS NO FUNDO
// =============================================
const canvas = document.getElementById('particles-canvas');
const ctx    = canvas.getContext('2d');

let particles = [];
const PARTICLE_COUNT = 60;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(true); }

  reset(initial = false) {
    this.x       = Math.random() * canvas.width;
    this.y       = initial ? Math.random() * canvas.height : canvas.height + 10;
    this.size    = Math.random() * 2.5 + 0.5;
    this.speedX  = (Math.random() - 0.5) * 0.4;
    this.speedY  = -(Math.random() * 0.5 + 0.2);
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color   = Math.random() > 0.6 ? '#2ecc8f' : '#f5c842';
  }

  update() {
    this.x       += this.speedX;
    this.y       += this.speedY;
    this.opacity -= 0.0015;
    if (this.y < -10 || this.opacity <= 0) this.reset();
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.opacity);
    ctx.fillStyle   = this.color;
    ctx.shadowBlur  = 8;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}

animateParticles();
