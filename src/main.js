// ── Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  });
});

// ── Mobile nav toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ── Section reveal on scroll
const revealEls = document.querySelectorAll('.section-reveal');
if (revealEls.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold:.15});
  revealEls.forEach(el => obs.observe(el));
}

// ── Pricing toggle
const toggle = document.getElementById('billing-toggle');
const monthlyPrices = document.querySelectorAll('.price-monthly');
const annualPrices  = document.querySelectorAll('.price-annual');
if (toggle) {
  toggle.addEventListener('change', () => {
    monthlyPrices.forEach(el => el.classList.toggle('hidden', toggle.checked));
    annualPrices.forEach(el  => el.classList.toggle('hidden', !toggle.checked));
  });
}

// ── Animated counters
function animCounter(el, target, suffix='') {
  if (!el) return;
  const cObs = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    let start = 0;
    const step = Math.ceil(target / 80);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = start.toLocaleString('hr-HR') + suffix;
    }, 20);
    cObs.unobserve(el);
  },{threshold:.5});
  cObs.observe(el);
}
animCounter(document.getElementById('c1'),4521);
animCounter(document.getElementById('c2'),2847);
animCounter(document.getElementById('c3'),97,'%');