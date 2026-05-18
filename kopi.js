// 1. Data Database Menu
const dataMenu = [
    { id: 1, nama: "Espresso", harga: 20000, img: "Espreso.png" },
    { id: 2, nama: "Cappuccino", harga: 28000, img: "Capucino.png" },
    { id: 3, nama: "Latte", harga: 32000, img: "Cofelate.png" },
    { id: 4, nama: "Americano", harga: 32000, img: "Americano.png" },
    { id: 5, nama: "Afogato", harga: 32000, img: "Afog.png" },
    { id: 6, nama: "Caramel Machiato", harga: 32000, img: "Crmaci.png" },
    { id: 7, nama: "V60", harga: 32000, img: "V60.png" },
    { id: 8, nama: "Vietnam Drip", harga: 32000, img: "Viet.png" },
];

let cart = [];

// 2. Tampilkan Menu ke Layar
const menuGrid = document.getElementById("menu-container");
dataMenu.forEach(item => {
    menuGrid.innerHTML += `
        <div class="card">
            <img src="${item.img}">
            <h4>${item.nama}</h4>
            <p>Rp ${item.harga.toLocaleString()}</p>
            <button class="btn-add" onclick="addToCart(${item.id})">Tambah</button>
        </div>
    `;
});

// 3. Fungsi Tambah ke Keranjang
function addToCart(id) {
    const item = dataMenu.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
}

function updateCartUI() {
    const list = document.getElementById("cart-list");
    const totalEl = document.getElementById("total-price");
    list.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.harga;
        list.innerHTML += `<li class="cart-item"><span>${item.nama}</span> <span>Rp ${item.harga.toLocaleString()}</span></li>`;
    });

    if (cart.length === 0) list.innerHTML = '<li class="empty-text">Belum ada item</li>';
    totalEl.innerText = "Rp " + total.toLocaleString();
}

// 4. Fungsi Modal
function openModal() {
    if (cart.length === 0) return alert("Pilih menu terlebih dahulu!");
    document.getElementById("orderModal").style.display = "block";
}

function closeModal() {
    document.getElementById("orderModal").style.display = "none";
}

// 5. Fungsi Proses Pesanan & Buat Struk
function processOrder() {
    const nama = document.getElementById("name").value;
    const meja = document.getElementById("noMeja").value;
    const hp = document.getElementById("noHP").value;
    const payment = document.getElementById("paymentMethod").value;

    if (!nama || !meja || !hp) return alert("Harap isi semua data!");

    let total = 0;
    let itemsHtml = "";
    cart.forEach(item => {
        total += item.harga;
        itemsHtml += `<div style="display:flex; justify-content:space-between"><span>${item.nama}</span> <span>${item.harga.toLocaleString()}</span></div>`;
    });

    // Simulasi Instruksi Pembayaran
    let payDetail = payment === "QRIS" ? "<p>Scan QR di Kasir</p>" : payment === "Transfer Bank" ? "<p>BRI: 444212345678</p> Perlihatkan Bukti Bayar Ke Kasir" : "<p>Bayar di Kasir</p>";

    const receiptHtml = `
        <h3 style="text-align:center">AROMA COFFE</h3>
        <p>Nama: ${nama} | Meja: ${meja} | HP: ${hp}</p>
        <p>Metode: ${payment}</p>
        <hr>
        ${itemsHtml}
        <hr>
        <strong style="display:flex; justify-content:space-between"><span>TOTAL:</span> <span>Rp ${total.toLocaleString()}</span></strong>
        <div style="margin-top:15px; text-align:center; background:#f0f0f0; padding:5px; font-size:12px;">
            ${payDetail}
        </div>
    `;

    document.getElementById("receipt-content").innerHTML = receiptHtml;
    document.getElementById("form-area").style.display = "none";
    document.getElementById("receipt-area").style.display = "block";
}