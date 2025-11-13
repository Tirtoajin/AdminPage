const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin_stock",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Terhubung ke Database MySQL");
});

app.get("/", (req, res) => {
  const queryProduk = `
        SELECT p.id, p.nama_produk, p.harga, s.stok 
        FROM products p 
        JOIN product_stocks s ON p.id = s.product_id`;

  const queryPembelian = `
        SELECT tr.id, p.nama_produk, tr.jumlah, tr.total_harga, tr.status, tr.tanggal
        FROM purchases tr
        JOIN products p ON tr.product_id = p.id
        ORDER BY tr.tanggal DESC`;

  db.query(queryProduk, (err, products) => {
    if (err) throw err;
    db.query(queryPembelian, (err, purchases) => {
      if (err) throw err;
      res.render("index", { products: products, purchases: purchases });
    });
  });
});

// 2. Proses Input Pembelian (DENGAN VALIDASI STOK)
app.post("/beli", (req, res) => {
  const { product_id, jumlah } = req.body;
  const jumlahBeli = parseInt(jumlah);

  // 1. Cek Stok Dulu
  db.query("SELECT stok, harga FROM products p JOIN product_stocks s ON p.id = s.product_id WHERE p.id = ?", [product_id], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.send('<script>alert("Produk tidak ditemukan!"); window.location.href="/";</script>');
    }

    const sisaStok = result[0].stok;
    const hargaSatuan = result[0].harga;

    // 2. Validasi: Jika stok kurang
    if (sisaStok < jumlahBeli) {
      // Kirim alert pakai Javascript sederhana dan kembali ke halaman utama
      return res.send(`
                <script>
                    alert("GAGAL! Stok tidak mencukupi. Sisa stok: ${sisaStok}, Permintaan: ${jumlahBeli}");
                    window.location.href = "/";
                </script>
            `);
    }

    // 3. Jika Stok Cukup, Lanjut Proses Transaksi
    const totalHarga = hargaSatuan * jumlahBeli;

    // Insert ke tabel pembelian
    const sqlInsert = 'INSERT INTO purchases (product_id, jumlah, total_harga, status) VALUES (?, ?, ?, "sukses")';
    db.query(sqlInsert, [product_id, jumlahBeli, totalHarga], (err, result) => {
      if (err) throw err;

      // Kurangi Stok
      const sqlUpdateStok = "UPDATE product_stocks SET stok = stok - ? WHERE product_id = ?";
      db.query(sqlUpdateStok, [jumlahBeli, product_id], (err) => {
        if (err) throw err;
        res.redirect("/");
      });
    });
  });
});

app.post("/cancel/:id", (req, res) => {
  const purchaseId = req.params.id;

  db.query("SELECT product_id, jumlah FROM purchases WHERE id = ?", [purchaseId], (err, result) => {
    if (err) throw err;

    const { product_id, jumlah } = result[0];

    db.query('UPDATE purchases SET status = "batal" WHERE id = ?', [purchaseId], (err) => {
      if (err) throw err;

      db.query("UPDATE product_stocks SET stok = stok + ? WHERE product_id = ?", [jumlah, product_id], (err) => {
        if (err) throw err;
        res.redirect("/");
      });
    });
  });
});

app.post("/tambah-stok", (req, res) => {
  const { product_id, jumlah } = req.body;

  const sqlUpdateStok = "UPDATE product_stocks SET stok = stok + ? WHERE product_id = ?";

  db.query(sqlUpdateStok, [jumlah, product_id], (err, result) => {
    if (err) throw err;
    console.log(`Berhasil menambah ${jumlah} stok untuk produk ID ${product_id}`);
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
