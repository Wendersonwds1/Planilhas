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
      e.target.style.opacity    = '1';
      e.target.style.transform  = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.benefit-card, .for-item').forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
