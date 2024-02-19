### Automation WEB pemilu2024

<hr>

Tujuan positif yang saya buat untuk membuat automation [pemilu2024](https://pemilu2024.kpu.go.id/) adalah untuk mempermudah pengecekan setiap tps tanpa perlu mengklik setiap component secara manual, sehingga hanya berfokus pada pengecekan manual untuk melihat hasil screen shoot gambar saja sehingga waktu nya menjadi lebih hemat dan efisien.

Teman-teman disini hanya perlu mengganti nilai variable `myTarget` menjadi provinsi yang ingin kita pilih :

```javascript
let myTarget: string = 'PAPUA SELATAN';
```

Dan harap dicatat, tools ini saya buat hanya 1 provinsi saja, mengingat dalam 1 provinsi saja misalkan untuk papua selatan dia memiliki jumlah 1770 TPS, tapi yang menarik dengan automation ini kita bisa menangkap hasil screenshot dengan waktu 17 Menit untuk 1770 TPS, tapi untuk lebih dari belasan ribu tps, kita perlu untuk mengira-ngira untuk menambahkan penambahan timeout pada configurasi playwright.

Dalam configurasi dalam file playwright.config.ts saya set timeout menjadi 60 menit :

```javascript
// for 60 minute
timeout: 3600 * 1000,
```

Dan jika timeout nya melebihi batas waktu yang ditentukan, kita bisa mengganti nilai nya.

Dan hasil screenshot nya seperti ini :

![Hasil SS papua selatan.](image-bukti.png 'This is a sample image.')

untuk menjalankan tools ini jangan lupa di clone terlebih dahulu. lalu jalankan di terminal :

```javascript
npm install
```

jangan lupa untuk mengganti nilai variable yang sesuai target provinsi yang teman-teman inginkan, pada file `pemilu-indonesia.spec.ts`

```javascript
let myTarget: string = 'PAPUA SELATAN';
```

Jika sudah simpan, dan jalankan diterminal:

```javascript
npm test
```

Jika proses running telah selesai jangan khawatir dia akan membuat secara otomatis folder sesuai `nama tanggal:jam:menit:detik`

Automation yang saya buat ini tentu masih banyak kekurangan, besar harapan semoga ini bisa bermanfaat, dan semoga bisa memudahkan teman-teman juga untuk langsung mengecek Screenshot keseluruhannya saja dalam setiap provinsi yang dipilih tanpa perlu mengklik tiap component secara manual.

Semoga Bermanfaat 🙂
Dan mohon maaf bila ada kesalahan dan kekurangan

Wardhana .W
