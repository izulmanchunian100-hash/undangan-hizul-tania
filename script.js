/* ==================== GUEST NAME ==================== */
(function () {
  const p = new URLSearchParams(location.search);
  const to = p.get('to');
  const el = document.getElementById('guest-name');
  el.textContent = to && to.trim() ? to.trim() : 'Tamu Undangan';
})();

/* ==================== STARFIELD ==================== */
(function () {
  const c = document.getElementById('stars-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let stars = [], w, h;
  function resize() {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
    stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.6 + 0.3, a: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    }));
  }
  function animate() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach(s => {
      s.a += s.speed;
      const al = 0.4 + Math.sin(s.a) * 0.4;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,235,180,' + al + ')';
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  addEventListener('resize', resize);
  resize();
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) animate();
})();

/* ==================== OPEN INVITATION ==================== */
const opening = document.getElementById('opening');
const mainContent = document.getElementById('main-content');
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const musicIcon = document.getElementById('music-icon');

document.getElementById('btn-open').addEventListener('click', () => {
  opening.classList.add('fade-out');
  mainContent.classList.remove('hidden');
  musicToggle.classList.remove('hidden');
  bgMusic.volume = 0.6;
  const pr = bgMusic.play();
  if (pr !== undefined) {
    pr.then(() => {
      musicIcon.textContent = '🎵';
      musicToggle.classList.remove('paused');
    }).catch(() => {
      musicIcon.textContent = '🔇';
      musicToggle.classList.add('paused');
      musicToggle.disabled = true;
      musicToggle.title = 'Musik tidak tersedia';
    });
  }
  scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==================== MUSIC TOGGLE ==================== */
musicToggle.addEventListener('click', () => {
  if (bgMusic.paused) {
    bgMusic.play().then(() => {
      musicIcon.textContent = '🎵';
      musicToggle.classList.remove('paused');
    }).catch(() => {});
  } else {
    bgMusic.pause();
    musicIcon.textContent = '🔇';
    musicToggle.classList.add('paused');
  }
});

/* ==================== REVEAL ==================== */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ==================== COUNTDOWN ==================== */
(function () {
  const target = new Date('2026-07-03T09:00:00+07:00').getTime();
  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-mins');
  const sEl = document.getElementById('cd-secs');
  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      dEl.textContent = hEl.textContent = mEl.textContent = sEl.textContent = '00';
      return;
    }
    dEl.textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    hEl.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    mEl.textContent = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    sEl.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
})();

/* ==================== MAPS ==================== */
(function () {
  const addr = 'Karang Bahagia, Kec. Karang Bahagia';
  document.getElementById('btn-maps').href =
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(addr);
})();

/* ==================== CALENDAR (.ics) ==================== */
(function () {
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0',
    'PRODID:-//Hizul & Tania//Wedding//ID',
    'BEGIN:VEVENT','UID:' + Date.now() + '@hizul-tania',
    'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z',
    'DTSTART:20260703T020000Z','DTEND:20260703T060000Z',
    'SUMMARY:Pernikahan Hizul & Tania',
    'DESCRIPTION:Akad Nikah & Resepsi Pernikahan',
    'LOCATION:Karang Bahagia\\, Kec. Karang Bahagia',
    'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  document.getElementById('btn-cal').href = URL.createObjectURL(blob);
})();

/* ==================== LIGHTBOX ==================== */
(function () {
  const box = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cl = document.getElementById('lightbox-close');
  document.querySelectorAll('.gallery-grid figure img').forEach(el => {
    el.addEventListener('click', () => {
      img.src = el.src;
      img.alt = el.alt;
      box.classList.remove('hidden');
    });
  });
  function hide() { box.classList.add('hidden'); img.src = ''; }
  cl.addEventListener('click', hide);
  box.addEventListener('click', e => { if (e.target === box) hide(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
})();

/* ==================== RSVP -> WHATSAPP ==================== */
document.getElementById('rsvp-form').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('rsvp-name').value.trim();
  const count = document.getElementById('rsvp-count').value;
  const status = document.getElementById('rsvp-status').value;
  const msg = document.getElementById('rsvp-msg').value.trim();
  const phone = '6283861747832';
  const text =
    'Halo, saya *' + name + '*%0A' +
    'Konfirmasi kehadiran: *' + status + '*%0A' +
    'Jumlah tamu: *' + count + '*%0A' +
    (msg ? 'Pesan: ' + msg + '%0A' : '') +
    '%0A— Undangan Hizul & Tania';
  window.open('https://wa.me/' + phone + '?text=' + text, '_blank');
});

/* ==================== COPY ACCOUNT ==================== */
document.getElementById('btn-copy').addEventListener('click', async () => {
  const n = document.getElementById('acc-number').textContent.trim();
  const t = document.getElementById('copy-toast');
  try {
    await navigator.clipboard.writeText(n);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = n;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  t.classList.remove('hidden');
  setTimeout(() => t.classList.add('hidden'), 2500);
});
