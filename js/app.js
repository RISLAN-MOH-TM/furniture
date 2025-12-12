/**
 * Main Application Logic for Viewer
 */

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const categoryFilters = document.getElementById('category-filters');

    // Navbar Scroll Logic
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.getElementById('navbarNav');

    if (navbar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            // If menu is open, don't hide
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                return;
            }

            // Hide on scroll down, show on scroll up
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Initialize View
    // Only run if elements exist (e.g. we are on the collection page)
    if (categoryFilters && productGrid) {
        renderCategories();
        renderProducts('all');
    }

    // Always try to render banners (if on home page)
    renderBanners();

    // --- Rendering Functions ---

    function renderBanners() {
        const bannerContainer = document.getElementById('carousel-items-container');
        const bannerSection = document.getElementById('offers-framework');

        if (!bannerContainer || !bannerSection) return;

        const banners = db.getBanners();

        if (banners.length === 0) {
            bannerSection.classList.add('d-none');
            return;
        }

        bannerSection.classList.remove('d-none');
        bannerContainer.innerHTML = '';

        banners.forEach((b, index) => {
            const activeClass = index === 0 ? 'active' : '';
            const item = document.createElement('div');
            item.className = `carousel-item ${activeClass}`;

            // Layout: Full width image? Or contained? Using standard carousel style.
            // Using a darker overlay for text readability
            item.innerHTML = `
                <div style="position: relative; width: 100%; height: 600px; background: #000;">
                   <img src="${b.image}" class="d-block w-100 h-100" style="object-fit: cover; opacity: 0.8;" alt="${b.title || 'Offer'}">
                   <div class="carousel-caption d-block" style="bottom: 20%;">
                        <h2 class="display-4 fw-bold mb-3 animate-up">${b.title || ''}</h2>
                        <p class="lead mb-4 animate-up delay-100">${b.description || ''}</p>
                        ${b.title ? `<a href="https://wa.me/94771234567?text=Hi, I am interested in ${encodeURIComponent(b.title)} offer" target="_blank" class="btn btn-light rounded-pill px-4 animate-up delay-200"><i class="bi bi-whatsapp me-2"></i>Learn More</a>` : ''}
                   </div>
                </div>
            `;
            bannerContainer.appendChild(item);
        });
    }

    function renderCategories() {
        const categories = db.getCategories();

        // Clear buttons except "All"? 
        // Actually, let's keep the html structure simple: Just "All" is there by default.
        // We will append.

        // Remove old dynamic buttons if any (for re-render safety)
        const existingDynamic = categoryFilters.querySelectorAll('button:not([data-category="all"])');
        existingDynamic.forEach(b => b.remove());

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-dark rounded-pill';
            btn.textContent = cat;
            btn.dataset.category = cat;
            btn.onclick = (e) => handleFilterClick(e, cat);
            categoryFilters.appendChild(btn);
        });

        // Add event listener to the "All" button
        const allBtn = categoryFilters.querySelector('[data-category="all"]');
        if (allBtn) {
            allBtn.onclick = (e) => handleFilterClick(e, 'all');
        }
    }

    function renderProducts(filterCategory) {
        if (!productGrid) return;
        const products = db.getProducts();
        productGrid.innerHTML = ''; // Clear grid

        const filtered = filterCategory === 'all'
            ? products
            : products.filter(p => p.category === filterCategory);

        if (filtered.length === 0) {
            productGrid.innerHTML = '<div class="col-12 text-center py-5"><p class="text-muted">No products found in this category.</p></div>';
            return;
        }

        filtered.forEach(product => {
            const col = document.createElement('div');
            col.className = 'col-md-6 col-lg-4';
            col.innerHTML = createProductCard(product);
            productGrid.appendChild(col);
        });
    }

    function formatPrice(price) {
        return 'Rs. ' + Number(price).toLocaleString('en-LK');
    }

    function createProductCard(product) {
        return `
            <div class="card h-100 animate-up">
                <img src="${product.image}" class="card-img-top" alt="${product.name}" loading="lazy">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="category-tag text-muted">${product.category}</span>
                        <span class="product-price">${formatPrice(product.price)}</span>
                    </div>
                    <h5 class="card-title fw-bold mb-3">${product.name}</h5>
                    <p class="card-text text-muted small flex-grow-1">${product.description}</p>
                    <button class="btn btn-primary w-100 mt-3 rounded-pill" onclick="viewDetails(${product.id})">
                        View Details
                    </button>
                </div>
            </div>
        `;
    }

    // --- Event Handlers ---

    function handleFilterClick(event, category) {
        // Remove active class from all
        const buttons = categoryFilters.querySelectorAll('button');
        buttons.forEach(b => b.classList.remove('active'));

        // Add active to clicked
        event.target.classList.add('active');

        // Render products
        renderProducts(category);
    }

    // Expose viewDetails to global scope for the onclick handler
    window.viewDetails = function (id) {
        // For now, simpler to just alert or maybe open a modal. 
        // Let's implement a simple modal if time permits, or just log it.
        // User asked for "Viewers site".
        // Let's just create a quick Modal standard bootstrap way.
        showProductModal(id);
    };

    function showProductModal(id) {
        const product = db.getProducts().find(p => p.id === id);
        if (!product) return;

        // Create modal HTML dynamically or ensure it exists in index.html
        // I'll create it dynamically to keep index.html clean
        let modal = document.getElementById('productModal');
        // If it exists, remove it to ensure fresh render
        if (modal) modal.remove();

        modal = document.createElement('div');
        modal.id = 'productModal';
        modal.className = 'modal fade';
        modal.tabIndex = '-1';
        document.body.appendChild(modal);

        modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content border-0 overflow-hidden">
                    <div class="row g-0">
                        <div class="col-md-6">
                            <img src="${product.image}" class="img-fluid h-100 object-fit-cover" style="min-height: 300px;" alt="${product.name}">
                        </div>
                        <div class="col-md-6">
                            <div class="modal-header border-0">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4 pt-0">
                                <span class="badge bg-secondary mb-2">${product.category}</span>
                                <h2 class="fw-bold mb-3">${product.name}</h2>
                                <h4 class="text-primary fw-bold mb-4">${formatPrice(product.price)}</h4>
                                <p class="text-muted mb-4">${product.description}</p>
                                <a href="https://wa.me/94771234567?text=Hi, I am interested in ${encodeURIComponent(product.name)}" target="_blank" class="btn btn-success w-100 rounded-pill mb-2">
                                    <i class="bi bi-whatsapp me-2"></i>More Details
                                </a>
                                <small class="text-muted d-block text-center">Free shipping on this item</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
    }

    // Admin Panel Shortcut (Ctrl + Shift + Alt + R)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.altKey && (e.key === 'r' || e.key === 'R')) {
            e.preventDefault(); // Prevent any default browser behavior
            window.location.href = 'admin';
        }
    });
});
