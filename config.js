// ==========================================
// KONFIGURASI GLOBAL
// ==========================================
// GANTI DENGAN URL WEB APP APPS SCRIPT KAMU
const API_URL = "https://script.google.com/macros/s/AKfycbwjF9vUhZCfRMakxnn1u8LViRHieg8CHGsCv-0igsqdmZHs6iABzKtjfGAQQREFbLCz/exec"; 

// ==========================================
// FUNGSI MEMUAT HEADER & FOOTER
// ==========================================
async function loadLayout() {
    try {
        // 1. Muat Header
        const headerRes = await fetch('header.html');
        const headerHTML = await headerRes.text();
        document.getElementById('header-placeholder').innerHTML = headerHTML;
        
        setupNavigation();
        
        // 2. Muat Footer
        const footerRes = await fetch('footer.html');
        const footerHTML = await footerRes.text();
        document.getElementById('footer-placeholder').innerHTML = footerHTML;

    } catch (error) {
        console.error("Gagal memuat layout:", error);
    }
}

// ==========================================
// FUNGSI MENYUSUN MENU NAVIGASI
// ==========================================
function setupNavigation() {
    const userSession = JSON.parse(localStorage.getItem('user_session'));
    const adminSession = JSON.parse(localStorage.getItem('admin_session'));
    const currentPath = window.location.pathname;
    const navMenu = document.getElementById('nav-menu');

    if (!navMenu) return;

    let menuKanan = '';

    // Cek apakah sedang di halaman Admin
    if (currentPath.includes('admin') || currentPath.includes('dashboard-admin') || currentPath.includes('create-event')) {
        menuKanan = `
            <span class="font-bold text-slate-900 hidden sm:block">${adminSession ? adminSession.nama : 'Admin'}</span>
            <a href="index.html" class="text-slate-500 hover:text-blue-600 transition-colors">Home</a>
            <button onclick="logoutAdmin()" class="text-red-500 hover:text-red-700 font-semibold transition-colors">Logout</button>
        `;
    } else {
        // Menu Khusus User / Umum
        if (userSession) {
            menuKanan = `
                <a href="index.html" class="hover:text-blue-600 transition-colors hidden sm:block">Home</a>
                <a href="dashboard-user.html" class="text-blue-600 font-semibold hover:text-blue-700">Dashboard</a>
                <button onclick="logoutUser()" class="text-slate-500 hover:text-red-500 transition-colors">Logout</button>
            `;
        } else {
            menuKanan = `
                <a href="index.html" class="hover:text-blue-600 transition-colors hidden sm:block">Home</a>
                <a href="#" class="hover:text-blue-600 transition-colors hidden sm:block">Events</a>
                <a href="user-login.html" class="text-slate-700 hover:text-blue-600 transition-colors">Log in</a>
                <a href="register.html" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition-all">Register</a>
            `;
        }
    }

    navMenu.innerHTML = menuKanan;
}

// ==========================================
// FUNGSI LOGOUT GLOBAL
// ==========================================
function logoutUser() {
    localStorage.removeItem('user_session');
    window.location.href = 'index.html';
}

function logoutAdmin() {
    localStorage.removeItem('admin_session');
    window.location.href = 'admin-login.html';
}

// Jalankan saat halaman dimuat
document.addEventListener('DOMContentLoaded', loadLayout);