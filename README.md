#   Admin Page

![alt text](https://github.com/Tirtoajin/AdminPage/blob/main/public/adminPage.png?raw=true)

![alt text](https://github.com/Tirtoajin/AdminPage/blob/main/public/notifAdmin.png?raw=true)

##  Memulai Aplikasi

Sebelum menggunakan aplikasi, pastikan semuanya sudah berjalan dengan benar.

## Langkah Awal
1. Pastikan **XAMPP (MySQL)** sudah dijalankan.
2. Buka terminal di folder project ini.
3. Jalankan perintah berikut:
   ```bash
   node app.js
## Panduan Penggunaan

1.  Memulai Aplikasi
Sebelum menggunakan, pastikan aplikasi sudah berjalan.
Pastikan XAMPP (MySQL) sudah di-start.
Buka terminal di folder project dan ketik: node app.js.
Buka browser (Chrome/Edge/Firefox) dan kunjungi: http://localhost:3000

2. Tampilan Dashboard
Dashboard dibagi menjadi 3 area utama:
Kiri (Merah): Area Kasir (Input Penjualan).
Kanan (Biru): Area Gudang (Input Tambah Stok).
Bawah (Tabel): Riwayat Transaksi Terkini.

3. Cara Melakukan Penjualan (Kasir)
Gunakan fitur ini ketika ada pelanggan yang membeli barang.
Lihat pada kotak "Input Pembelian (Kurangi Stok)".
Pilih Produk:
Klik menu dropdown.
Anda akan melihat nama produk beserta sisa stok terkini.
Contoh: Kopi Susu (Sisa: 20).
Masukkan Jumlah:
Ketik jumlah barang yang dibeli pelanggan.
Validasi Stok (Penting!):
Jika Anda memasukkan angka melebihi stok yang tersedia, sistem akan memunculkan peringatan:  "Maksimal pembelian hanya X item!".
Tombol simpan akan terkunci otomatis untuk mencegah stok minus.
Simpan:
Jika jumlah sesuai, klik tombol hijau "Simpan Transaksi".
Stok produk akan berkurang secara otomatis.

4. Cara Menambah Stok (Restock)
Gunakan fitur ini ketika barang baru datang dari supplier atau gudang pusat.
Lihat pada kotak "Input Tambah Stok (Restock)".
Pilih Produk: Pilih produk yang ingin ditambah stoknya.
Masukkan Jumlah: Ketik jumlah barang yang baru masuk (misal: 100).
Simpan:
Klik tombol biru "Tambah Stok".
Stok produk akan bertambah (Stok Lama + Stok Baru).
Catatan: Tindakan ini tidak akan masuk ke tabel riwayat penjualan, tetapi langsung mengupdate database stok.

5. Mengelola Riwayat & Pembatalan
Tabel di bagian bawah menampilkan daftar transaksi terakhir.
Membaca Tabel
Produk: Nama barang yang terjual.

Jml: Jumlah barang yang dibeli.

Total: Nilai uang dari transaksi tersebut (Harga x Jumlah).

Waktu: Tanggal dan jam transaksi terjadi.
Status:

<span style="color:green">SUKSES</span>: Transaksi valid dan selesai.

<span style="color:red">BATAL</span>: Transaksi telah dibatalkan oleh admin.

Membatalkan Transaksi 
Jika terjadi kesalahan input (misal: salah jumlah atau pelanggan batal beli):
Cari transaksi tersebut di tabel.
Klik tombol merah kecil "Batal" (ikon silang) di kolom Aksi.
.
