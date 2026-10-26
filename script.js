/* GANTI DATA ACARA DI BAGIAN KONFIGURASI INI */
const WEDDING = {
  // Format tanggal lokal: YYYY-MM-DDTHH:mm:ss+07:00
  date: "2026-12-20T08:00:00+07:00",
  dateLabel: "Minggu, 20 Desember 2026",
  akad: {
    date: "Minggu, 20 Desember 2026",
    time: "08.00 WIB — selesai",
    place: "[Nama Gedung / Lokasi Akad]",
    address: "[Alamat lengkap]"
  },
  reception: {
    date: "Minggu, 20 Desember 2026",
    time: "11.00–14.00 WIB",
    place: "[Nama Gedung / Lokasi Resepsi]",
    address: "[Alamat lengkap]"
  },
  // Tempel URL Google Maps lokasi acara, misalnya https://maps.app.goo.gl/...
  mapsUrl: "https://maps.google.com/",
  // Isi nomor WhatsApp dengan kode negara tanpa + atau spasi, contoh 6281234567890
  whatsappNumber: "6281234567890"
};

/* Tampilkan detail acara dari konfigurasi */
document.querySelectorAll("[data-event-date]").forEach(el => el.textContent = WEDDING.dateLabel);
document.getElementById("akadDate").textContent = WEDDING.akad.date;
document.getElementById("akadTime").textContent = WEDDING.akad.time;
document.getElementById("akadPlace").innerHTML = `${escapeHtml(WEDDING.akad.place)}<br>${escapeHtml(WEDDING.akad.address)}`;
document.getElementById("receptionDate").textContent = WEDDING.reception.date;
document.getElementById("receptionTime").textContent = WEDDING.reception.time;
document.getElementById("receptionPlace").innerHTML = `${escapeHtml(WEDDING.reception.place)}<br>${escapeHtml(WEDDING.reception.address)}`;
document.getElementById("mapsButton").href = WEDDING.mapsUrl;
document.getElementById("footerYear").textContent = new Date().getFullYear();

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

/* Countdown */
const targetDate = new Date(WEDDING.date).getTime();
const pad = value => String(value).padStart(2, "0");
function updateCountdown() {
  let distance = targetDate - Date.now();
  if (!Number.isFinite(targetDate) || distance <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => document.getElementById(id).textContent = "00");
    return;
  }
  const days = Math.floor(distance / 86400000);
  distance %= 86400000;
  const hours = Math.floor(distance / 3600000);
  distance %= 3600000;
  const minutes = Math.floor(distance / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);
  document.getElementById("days").textContent = String(days).padStart(3, "0");
  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* Scroll reveal */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

/* Efek tilt 3D pada perangkat yang memiliki pointer */
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
if (finePointer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg) translateY(-2px)`;
    });
    card.addEventListener("pointerleave", () => card.style.transform = "");
  });
}

/* Partikel cahaya dekoratif */
const sparkleRoot = document.getElementById("sparkles");
for (let i = 0; i < 42; i++) {
  const particle = document.createElement("span");
  particle.className = "sparkle";
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.top = `${Math.random() * 100}%`;
  particle.style.setProperty("--duration", `${3 + Math.random() * 5}s`);
  particle.style.animationDelay = `${Math.random() * 6}s`;
  sparkleRoot.appendChild(particle);
}

/* Musik: browser mewajibkan interaksi pengguna sebelum audio diputar */
const music = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
musicToggle.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicToggle.classList.add("playing");
      musicLabel.textContent = "Jeda";
    } catch {
      musicLabel.textContent = "Tambah music.mp3";
      document.getElementById("formNote").textContent = "Musik belum tersedia. Tambahkan file assets/music.mp3 milik Anda.";
    }
  } else {
    music.pause();
    musicToggle.classList.remove("playing");
    musicLabel.textContent = "Musik";
  }
});

/* RSVP dikirim melalui WhatsApp, tanpa database eksternal */
document.getElementById("rsvpForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const attendance = String(form.get("attendance") || "");
  const count = String(form.get("count") || "1");
  const message = String(form.get("message") || "").trim();
  const text = [
    "Assalamu'alaikum, konfirmasi undangan pernikahan Hizul & Tania.",
    `Nama: ${name}`,
    `Kehadiran: ${attendance}`,
    `Jumlah tamu: ${count} orang`,
    message ? `Ucapan & doa: ${message}` : ""
  ].filter(Boolean).join("\n");
  const phone = WEDDING.whatsappNumber.replace(/\D/g, "");
  if (!phone || phone === "6281234567890") {
    const note = document.getElementById("formNote");
    note.textContent = "Sebelum digunakan, ganti whatsappNumber di script.js dengan nomor WhatsApp penerima yang benar. Pesan konfirmasi Anda: " + text;
    return;
  }
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
});

/* Menghormati preferensi motion dan menampilkan reveal jika observer tidak tersedia */
if (!("IntersectionObserver" in window)) {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}
