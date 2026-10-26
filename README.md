# Undangan Pernikahan Hizul & Tania — Gold Luxury 3D

Website undangan statis yang dapat di-host gratis dengan GitHub Pages.

## Isi folder
- `index.html` — struktur halaman undangan
- `style.css` — desain responsif, animasi, efek 3D, serta bingkai botani bergerak
- `script.js` — konfigurasi acara, countdown, efek 3D, musik, RSVP WhatsApp
- `assets/` — tempat foto dan musik

## Efek visual tambahan
- Bingkai tanaman/sulur pohon di kiri dan kanan halaman.
- Bunga emas bergerak, dua burung animasi, dan kunang-kunang bercahaya.
- Animasi responsif dan menghormati preferensi pengurangan gerakan perangkat.

## Cara mengedit sebelum dipublikasikan
1. Buka `script.js`.
2. Ubah `WEDDING.date` ke tanggal dan jam akad yang sebenarnya dengan format `YYYY-MM-DDTHH:mm:ss+07:00`.
3. Ubah `dateLabel`, data `akad`, `reception`, `mapsUrl`, dan `whatsappNumber`.
4. Di `index.html`, sesuaikan nama lengkap pasangan, nama orang tua, serta teks cerita bila diperlukan.
5. Ganti gambar placeholder di folder `assets/` dengan foto Anda. Gunakan nama file yang sama:
   - `prewedding.jpg`
   - `hizul.jpg`
   - `tania.jpg`
   - `story.jpg`
   - `gallery-1.jpg`
   - `gallery-2.jpg`
   - `gallery-3.jpg`
6. Untuk musik, tambahkan file musik yang Anda punya hak untuk menggunakannya dengan nama `music.mp3` ke folder `assets/`. Tombol musik perlu ditekan oleh pengunjung sebelum musik mulai, karena kebijakan browser.
7. Buka `index.html` secara lokal untuk memeriksa tampilan sebelum publikasi.

## Publikasi gratis dengan GitHub Pages
1. Masuk ke https://github.com dan buat akun jika belum punya.
2. Klik **New repository**. Nama yang disarankan: `undangan-hizul-tania`. Pilih **Public**.
3. Unggah seluruh isi folder ini ke root repository. Pastikan `index.html` berada di root, bukan di dalam folder tambahan.
4. Buka **Settings → Pages**.
5. Pada **Build and deployment**, pilih **Deploy from a branch**.
6. Pilih branch `main`, folder `/(root)`, lalu klik **Save**.
7. Tunggu proses publikasi selesai. URL biasanya berbentuk `https://USERNAME.github.io/undangan-hizul-tania/`.

## Catatan
- GitHub Pages cocok untuk situs statis dan tidak menjalankan server/database.
- Form RSVP pada template ini membuka WhatsApp dengan pesan yang sudah terisi; pengunjung harus menekan tombol kirim di WhatsApp.
- Untuk menyimpan ucapan secara otomatis di website, diperlukan layanan database/backend tambahan.
- Foto harus dioptimalkan agar halaman cepat dibuka di ponsel. Gunakan JPG/WebP dengan ukuran yang wajar.
- Ganti seluruh teks dalam tanda kurung siku `[ ... ]` sebelum undangan dibagikan.
- Pastikan tanggal, jam, alamat, link Maps, dan nomor WhatsApp sudah benar.
