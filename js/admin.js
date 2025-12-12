/**
 * Admin Panel Logic
 */

// Security: Prevent Inspect Element and Context Menu
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function (e) {
    if (e.keyCode == 123) { // F12
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) { // Ctrl+Shift+I
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) { // Ctrl+Shift+C
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) { // Ctrl+Shift+J
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { // Ctrl+U
        return false;
    }
};

// Simple Auth
function checkLogin() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === 'ris123') {
        document.getElementById('login-overlay').classList.add('d-none');
        document.getElementById('admin-app').classList.remove('d-none');
        initAdmin();
    } else {
        document.getElementById('login-msg').textContent = 'Incorrect password.';
    }
}

// Global scope for view
let currentEditId = null;

function initAdmin() {
    renderAdminProducts();
    populateCategories();
    setupFileUpload();

    // Form Submit
    document.getElementById('product-form').addEventListener('submit', handleFormSubmit);
}

// Navigation
// Navigation
window.showSection = function (sectionId) {
    // Hide all
    ['section-products', 'section-add-product', 'section-categories', 'section-banners'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('d-none');
    });

    // Update Nav Active State
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    if (sectionId === 'products') {
        document.getElementById('section-products').classList.remove('d-none');
        renderAdminProducts();
        setActiveNav(sectionId);
    } else if (sectionId === 'add-product') {
        document.getElementById('section-add-product').classList.remove('d-none');
        resetForm(); // Clear form for new entry
        setActiveNav(sectionId);
    } else if (sectionId === 'categories') {
        document.getElementById('section-categories').classList.remove('d-none');
        renderCategoriesTable();
        setActiveNav(sectionId);
    } else if (sectionId === 'banners') {
        document.getElementById('section-banners').classList.remove('d-none');
        renderBannersTable();
        setActiveNav(sectionId);
    }
}

function setActiveNav(id) {
    const el = document.querySelector(`[onclick="showSection('${id}')"]`);
    if (el) el.classList.add('active');
}

function renderAdminProducts() {
    const products = db.getProducts();
    const tbody = document.getElementById('admin-product-table');
    tbody.innerHTML = '';

    const formatPrice = (price) => 'Rs. ' + Number(price).toLocaleString('en-LK');

    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;"></td>
            <td class="fw-bold">${p.name}</td>
            <td><span class="badge bg-secondary">${p.category}</span></td>
            <td>${formatPrice(p.price)}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-2" onclick="editProduct(${p.id})"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${p.id})"><i class="bi bi-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function populateCategories() {
    const dataList = document.getElementById('category-list');
    dataList.innerHTML = '';
    const categories = db.getCategories();
    categories.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c;
        dataList.appendChild(opt);
    });
}

function setupFileUpload() {
    const fileInput = document.getElementById('p-file-upload');
    const urlInput = document.getElementById('p-image');

    if (fileInput) {
        fileInput.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    urlInput.value = e.target.result;
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // Banner File Upload
    const bannerFileInput = document.getElementById('banner-file-upload');
    const bannerurlInput = document.getElementById('banner-image');
    if (bannerFileInput) {
        bannerFileInput.addEventListener('change', function () {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    bannerurlInput.value = e.target.result;
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const product = {
        name: document.getElementById('p-name').value,
        category: document.getElementById('p-category').value,
        price: document.getElementById('p-price').value,
        image: document.getElementById('p-image').value,
        description: document.getElementById('p-desc').value,
    };

    if (currentEditId) {
        product.id = currentEditId;
        db.updateProduct(product);
        alert('Product updated successfully!');
    } else {
        db.addProduct(product);
        alert('Product added successfully!');
    }

    showSection('products');
}

window.deleteProduct = function (id) {
    if (confirm('Are you sure you want to delete this product?')) {
        db.deleteProduct(id);
        renderAdminProducts();
    }
};

window.editProduct = function (id) {
    currentEditId = id;
    const product = db.getProducts().find(p => p.id === id);
    if (!product) return;

    // Fill form
    document.getElementById('p-name').value = product.name;
    document.getElementById('p-category').value = product.category;
    document.getElementById('p-price').value = product.price;
    document.getElementById('p-image').value = product.image;
    document.getElementById('p-desc').value = product.description;

    document.getElementById('form-title').textContent = 'Edit Product';

    // Switch view manually without resetting form
    showSection('add-product');
    // Remove active class from add product and re-add just in case? No, showSection handles it.
};

function resetForm() {
    currentEditId = null;
    document.getElementById('product-form').reset();
    document.getElementById('form-title').textContent = 'Add New Product';
}

// --- Category Management ---

function renderCategoriesTable() {
    const categories = db.getCategories();
    const tbody = document.getElementById('admin-category-table');
    tbody.innerHTML = '';

    categories.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-bold">${c}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteCategory('${c}')">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Add Category via form
const catForm = document.getElementById('add-cat-form');
if (catForm) {
    catForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('new-cat-name');
        const name = input.value.trim();
        if (name) {
            if (db.addCategory(name)) {
                input.value = '';
                renderCategoriesTable();
                populateCategories(); // Update the dropdown in Add/Edit Product
            } else {
                alert('Category already exists!');
            }
        }
    });
}

window.deleteCategory = function (name) {
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
        db.deleteCategory(name);
        renderCategoriesTable();
        populateCategories();
    }
};

// --- Banner Management ---

function renderBannersTable() {
    const banners = db.getBanners();
    const tbody = document.getElementById('admin-banner-table');
    tbody.innerHTML = '';

    banners.forEach(b => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${b.image}" style="width: 100px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
            <td class="fw-bold">${b.title || '<span class="text-muted">No Title</span>'}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteBanner(${b.id})"><i class="bi bi-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

const bannerForm = document.getElementById('add-banner-form');
if (bannerForm) {
    bannerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const banner = {
            title: document.getElementById('banner-title').value,
            description: document.getElementById('banner-desc').value,
            image: document.getElementById('banner-image').value
        };

        db.addBanner(banner);
        alert('Banner added!');
        bannerForm.reset();
        renderBannersTable();
    });
}

window.deleteBanner = function (id) {
    if (confirm('Delete this banner?')) {
        db.deleteBanner(id);
        renderBannersTable();
    }
};
