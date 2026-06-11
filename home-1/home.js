/* ===== HEART & WINE — HOME JS ===== */
'use strict';

/* ─── THEME TOGGLE ─── */
const html = document.documentElement;

document.addEventListener("DOMContentLoaded", () => {

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");

  const savedTheme =
    localStorage.getItem("mashaletheme") ||
    (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

  setTheme(savedTheme);

  function setTheme(t) {
    html.setAttribute("data-theme", t);
    if (themeIcon) {
      themeIcon.className = t === "dark" ? "fa fa-moon" : "fa fa-sun";
    }
    localStorage.setItem("mashaletheme", t);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      setTheme(html.getAttribute("data-theme") === "dark" ? "light" : "dark");
    });
  }

});

/* ─── NAVBAR SCROLL ─── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── MOBILE MENU ─── */
const navBurger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
navBurger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  navBurger.setAttribute('aria-expanded', open);
  mobileMenu.setAttribute('aria-hidden', !open);
});

/* ─── REVEAL ON SCROLL ─── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ─── BEER BUBBLE CANVAS ─── */
// const canvas = document.getElementById('beerCanvas');
// const ctx = canvas.getContext('2d');
// let W, H, bubbles = [];

// function resizeCanvas() {
//   W = canvas.width = window.innerWidth;
//   H = canvas.height = window.innerHeight;
// }
// resizeCanvas();
// window.addEventListener('resize', resizeCanvas, { passive: true });

// const BUBBLE_COLORS = [
//   'rgba(242,193,78,',
//   'rgba(212,160,48,',
//   'rgba(232,146,26,',
//   'rgba(255,217,112,',
//   'rgba(184,107,26,',
// ];

// class Bubble {
//   constructor() { this.reset(true); }
//   reset(init = false) {
//     this.x = Math.random() * W;
//     this.y = init ? Math.random() * H : H + 20;
//     this.r = Math.random() * 7 + 2;
//     this.speed = Math.random() * 0.6 + 0.2;
//     this.drift = (Math.random() - 0.5) * 0.4;
//     this.opacity = Math.random() * 0.5 + 0.1;
//     this.color = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
//     this.wobble = Math.random() * Math.PI * 2;
//     this.wobbleSpeed = (Math.random() - 0.5) * 0.04;
//   }
//   update() {
//     this.y -= this.speed;
//     this.wobble += this.wobbleSpeed;
//     this.x += Math.sin(this.wobble) * 0.4 + this.drift;
//     if (this.y < -20) this.reset();
//   }
//   draw() {
//     ctx.save();
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
//     const grad = ctx.createRadialGradient(
//       this.x - this.r * 0.3, this.y - this.r * 0.3, this.r * 0.1,
//       this.x, this.y, this.r
//     );
//     grad.addColorStop(0, this.color + (this.opacity * 1.4) + ')');
//     grad.addColorStop(0.6, this.color + this.opacity + ')');
//     grad.addColorStop(1, this.color + '0)');
//     ctx.fillStyle = grad;
//     ctx.fill();
//     // shine
//     ctx.beginPath();
//     ctx.arc(this.x - this.r * 0.35, this.y - this.r * 0.35, this.r * 0.25, 0, Math.PI * 2);
//     ctx.fillStyle = `rgba(255,255,255,${this.opacity * 0.6})`;
//     ctx.fill();
//     ctx.restore();
//   }
// }

// // Foam particle on top
// class FoamDot {
//   constructor() { this.reset(true); }
//   reset(init = false) {
//     this.x = Math.random() * W;
//     this.y = init ? Math.random() * H * 0.3 : -10;
//     this.r = Math.random() * 5 + 1;
//     this.vx = (Math.random() - 0.5) * 1;
//     this.vy = Math.random() * 0.5 + 0.2;
//     this.life = 1;
//     this.decay = Math.random() * 0.003 + 0.001;
//   }
//   update() {
//     this.x += this.vx;
//     this.y += this.vy;
//     this.life -= this.decay;
//     if (this.life <= 0 || this.y > H) this.reset();
//   }
//   draw() {
//     ctx.save();
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
//     ctx.fillStyle = `rgba(255,248,231,${this.life * 0.3})`;
//     ctx.fill();
//     ctx.restore();
//   }
// }

// // Init bubbles
// for (let i = 0; i < 80; i++) bubbles.push(new Bubble());
// const foamDots = [];
// for (let i = 0; i < 30; i++) foamDots.push(new FoamDot());

// function animateBubbles() {
//   ctx.clearRect(0, 0, W, H);
//   bubbles.forEach(b => { b.update(); b.draw(); });
//   foamDots.forEach(f => { f.update(); f.draw(); });
//   requestAnimationFrame(animateBubbles);
// }
// animateBubbles();

/* ─── FOAM CURSOR ─── */
// const foamCursor = document.getElementById('foamCursor');
// let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
// document.addEventListener('mousemove', e => {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
//   foamCursor.style.opacity = '1';
//   // Spawn extra bubble at cursor
//   if (Math.random() < 0.15) {
//     const b = new Bubble();
//     b.x = mouseX + (Math.random() - 0.5) * 30;
//     b.y = mouseY;
//     b.speed = Math.random() * 1.5 + 0.5;
//     b.r = Math.random() * 5 + 2;
//     bubbles.push(b);
//     if (bubbles.length > 120) bubbles.shift();
//   }
// });
// document.addEventListener('mouseleave', () => { foamCursor.style.opacity = '0'; });

// function animateCursor() {
//   cursorX += (mouseX - cursorX) * 0.12;
//   cursorY += (mouseY - cursorY) * 0.12;
//   foamCursor.style.left = cursorX + 'px';
//   foamCursor.style.top = cursorY + 'px';
//   requestAnimationFrame(animateCursor);
// }
// animateCursor();

/* ─── BEER GLASS FILL ─── */
function fillBeerGlass() {
  const fill = document.getElementById('beerFill');
  if (!fill) return;
  setTimeout(() => { fill.style.height = '82%'; }, 600);
}
fillBeerGlass();

/* ─── GLASS BUBBLES ─── */
function spawnGlassBubble() {
  const container = document.getElementById('glassBubbles');
  if (!container) return;
  const b = document.createElement('div');
  const size = Math.random() * 5 + 2;
  const left = 10 + Math.random() * 80;
  const duration = 1.5 + Math.random() * 2;
  b.style.cssText = `
    position:absolute;
    bottom:${Math.random() * 20}%;
    left:${left}%;
    width:${size}px;height:${size}px;
    border-radius:50%;
    background:radial-gradient(circle at 35% 35%, rgba(255,255,255,0.7), rgba(242,193,78,0.3));
    animation: glassBubbleRise ${duration}s ease-in forwards;
    pointer-events:none;
  `;
  container.appendChild(b);
  setTimeout(() => b.remove(), duration * 1000);
}

// Inject keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes glassBubbleRise {
    from { transform: translateY(0) translateX(0); opacity: 0.8; }
    50%  { opacity: 0.5; }
    to   { transform: translateY(-260px) translateX(${(Math.random()-0.5)*20}px); opacity: 0; }
  }
`;
document.head.appendChild(style);
setInterval(spawnGlassBubble, 400);

/* ─── COUNT-UP STATS ─── */
function countUp(el, target) {
  let start = 0;
  const dur = 1800;
  const step = 16;
  const increment = target / (dur / step);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = target >= 1000
      ? Math.floor(start).toLocaleString()
      : Math.floor(start);
  }, step);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        countUp(el, parseInt(el.dataset.count));
      });
      statObserver.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statObserver.observe(statsEl);

/* ─── METER BAR ANIMATE ─── */
const meterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.meter-fill').forEach(bar => {
        const target = bar.style.getPropertyValue('--fill');
        bar.style.setProperty('--fill', '0%');
        setTimeout(() => bar.style.setProperty('--fill', target), 200);
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.brew-card').forEach(c => meterObserver.observe(c));

/* ─── TESTIMONIAL SLIDER ─── */
const track = document.getElementById('testTrack');
const dotsEl = document.getElementById('testDots');
const cards = track ? [...track.querySelectorAll('.test-card')] : [];
let currentDot = 0;

if (cards.length && dotsEl) {
  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'test-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `Testimonial ${i + 1}`);
    d.addEventListener('click', () => goToSlide(i));
    dotsEl.appendChild(d);
  });

  function goToSlide(i) {
    currentDot = i;
    const dotBtns = dotsEl.querySelectorAll('.test-dot');
    dotBtns.forEach((d, j) => d.classList.toggle('active', j === i));
    const visible = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${i * cardW}px)`;
    track.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
  }

  // Auto-advance
  setInterval(() => {
    const next = (currentDot + 1) % Math.max(1, cards.length - 2);
    goToSlide(next);
  }, 5000);
}

/* ─── BOOKING FORM VALIDATION ─── */
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('bookName');
    const nameErr = document.getElementById('bookNameError');
    if (!name.value.trim()) {
      nameErr.textContent = 'Please enter your name.';
      name.style.borderColor = '#e84040';
      valid = false;
    } else { nameErr.textContent = ''; name.style.borderColor = ''; }

    const email = document.getElementById('bookEmail');
    const emailErr = document.getElementById('bookEmailError');
    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      emailErr.textContent = 'Please enter a valid email address.';
      email.style.borderColor = '#e84040';
      valid = false;
    } else { emailErr.textContent = ''; email.style.borderColor = ''; }

    const date = document.getElementById('bookDate');
    const dateErr = document.getElementById('bookDateError');
    if (!date.value) {
      dateErr.textContent = 'Please select a date.';
      date.style.borderColor = '#e84040';
      valid = false;
    } else { dateErr.textContent = ''; date.style.borderColor = ''; }

    if (valid) {
      document.getElementById('formSuccess').classList.add('show');
      bookingForm.reset();
      // Burst bubbles on success
      for (let i = 0; i < 20; i++) {
        const b = new Bubble();
        b.x = W / 2 + (Math.random() - 0.5) * 200;
        b.y = H / 2;
        b.speed = Math.random() * 3 + 1;
        b.r = Math.random() * 10 + 4;
        bubbles.push(b);
      }
    }
  });
}

/* ─── NEWSLETTER FORM ─── */
const nlForm = document.getElementById('nlForm');
if (nlForm) {
  nlForm.addEventListener('submit', e => {
    e.preventDefault();
    const input = document.getElementById('nlEmail');
    const btn = nlForm.querySelector('button');
    if (input.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      btn.textContent = '✓ You\'re in!';
      btn.style.background = 'linear-gradient(135deg,#1a9e3a,#2dd962)';
      btn.style.color = '#fff';
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        btn.style.color = '';
      }, 3000);
    }
  });
}

/* ─── POUR EFFECT ON SCROLL ─── */
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const delta = Math.abs(window.scrollY - lastScroll);
  if (delta > 30 && Math.random() < 0.4) {
    const b = new Bubble();
    b.x = Math.random() * W;
    b.y = H + 10;
    b.speed = Math.random() * 2 + 1;
    bubbles.push(b);
    if (bubbles.length > 130) bubbles.shift();
  }
  lastScroll = window.scrollY;
}, { passive: true });

/* ─── BREW CARD TILT ─── */
document.querySelectorAll('.brew-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    card.style.transition = 'none';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s, border-color 0.4s';
  });
});

/* ─── BEER RIPPLE ON CLICK ─── */
document.addEventListener('click', e => {
  const ripple = document.createElement('div');
  ripple.style.cssText = `
    position:fixed;left:${e.clientX}px;top:${e.clientY}px;
    width:0;height:0;border-radius:50%;
    border:2px solid rgba(242,193,78,0.6);
    transform:translate(-50%,-50%);
    animation:beerRipple .8s ease-out forwards;
    pointer-events:none;z-index:9998;
  `;
  document.body.appendChild(ripple);
  setTimeout(() => ripple.remove(), 800);
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes beerRipple {
    to { width: 80px; height: 80px; opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

document.querySelectorAll(".mob-drop-toggle").forEach(btn => {
  btn.addEventListener("click", () => {
    const parent = btn.parentElement;
    parent.classList.toggle("active");
  });
});


