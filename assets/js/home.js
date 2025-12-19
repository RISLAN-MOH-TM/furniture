// Home Page JavaScript
document.addEventListener('DOMContentLoaded', async function () {
    await loadHomePage();
});

async function loadHomePage() {
    const mainContent = document.getElementById('main-content');

    // Fetch data
    let banners = [];
    let categories = [];
    let products = [];
    let testimonials = [];

    try {
        const [bannerRes, categoryRes, productRes, testimonialRes] = await Promise.all([
            getBanners(),
            getCategories(),
            getProducts(),
            getTestimonials(true) // Get featured testimonials
        ]);

        banners = bannerRes.data || [];
        categories = categoryRes.data || [];
        products = (productRes.data || []).filter(p => p.featured == 1).slice(0, 4);
        testimonials = testimonialRes.data || [];
    } catch (error) {
        console.error('Error fetching home page data:', error);
    }

    mainContent.innerHTML = `
        <!-- Hero Section -->
        <header class="hero-section d-flex align-items-center">
            <div class="container text-center text-white">
                <h1 class="display-3 fw-bold mb-4 animate-up">Redefine Your Space</h1>
                <p class="lead mb-5 animate-up delay-100">Curated collection of premium furniture for modern living in Sri Lanka.</p>
                <div class="animate-up delay-200 d-flex gap-3 justify-content-center">
                    <a href="collection.html" class="btn btn-light btn-lg rounded-pill px-5">Shop Collection</a>
                    <a href="#categories" class="btn btn-outline-light btn-lg rounded-pill px-5">Categories</a>
                </div>
            </div>
        </header>

        <!-- Why Choose Us -->
        <section class="py-5 bg-light">
            <div class="container py-5">
                <div class="text-center mb-5">
                    <h2 class="fw-bold mb-3">Experience the Exceptional</h2>
                    <p class="text-muted">More than just furniture, we offer a lifestyle.</p>
                </div>
                <div class="row g-4 text-center">
                    <div class="col-md-4">
                        <div class="p-4 glass-card liquid-hover h-100">
                            <div class="display-5 text-primary mb-3"><i class="bi bi-gem"></i></div>
                            <h4 class="fw-bold mb-3">Premium Materials</h4>
                            <p class="text-muted">Sourced from the finest craftsman around the globe to ensure durability and style.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="p-4 glass-card liquid-hover h-100">
                            <div class="display-5 text-success mb-3"><i class="bi bi-tree"></i></div>
                            <h4 class="fw-bold mb-3">Eco-Friendly</h4>
                            <p class="text-muted">Sustainable woods and fabrics that look good and feel good for the planet.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="p-4 glass-card liquid-hover h-100">
                            <div class="display-5 text-warning mb-3"><i class="bi bi-lightbulb"></i></div>
                            <h4 class="fw-bold mb-3">Modern Innovation</h4>
                            <p class="text-muted">Designs that blend classic artisan techniques with modern ergonomic needs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories Section -->
        <section id="categories" class="py-5 bg-white">
            <div class="container py-5">
                <div class="text-center mb-5">
                    <h2 class="fw-bold">Browse by Category</h2>
                    <p class="text-muted">Find exactly what you're looking for</p>
                </div>
                <div class="row g-4 justify-content-center">
                    ${categories.map(cat => `
                        <div class="col-6 col-md-3">
                            <a href="collection.html?category=${cat.id}" class="text-decoration-none text-dark">
                                <div class="category-card p-4 text-center glass-card liquid-hover">
                                    <div class="mb-3 text-primary"><i class="bi bi-layers display-6"></i></div>
                                    <h5 class="fw-bold mb-0">${cat.name}</h5>
                                </div>
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        ${banners.length > 0 ? `
        <!-- Sliding Banner -->
        <section id="offers-framework" class="w-100 bg-light py-5">
            <div id="mainCarousel" class="carousel slide carousel-fade shadow-lg rounded-4 overflow-hidden mx-auto" style="max-width: 1200px" data-bs-ride="carousel" data-bs-interval="2000" data-bs-touch="true">
                <div class="carousel-indicators">
                    ${banners.map((_, index) => `
                        <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="${index}" 
                            class="${index === 0 ? 'active' : ''}" 
                            aria-current="${index === 0 ? 'true' : 'false'}" 
                            aria-label="Slide ${index + 1}"></button>
                    `).join('')}
                </div>
                <div class="carousel-inner">
                    ${banners.map((b, index) => `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <div class="banner-container">
                                <img src="${b.image_path.startsWith('http') ? b.image_path : IMAGE_BASE_URL + b.image_path.replace('backend/', '')}" 
                                    class="d-block w-100 h-100" 
                                    style="object-fit: cover; opacity: 0.8" 
                                    alt="${b.title || 'Offer'}">
                                <div class="carousel-caption d-block banner-caption">
                                    <h2 class="banner-title fw-bold mb-3 animate-up">${b.title}</h2>
                                    <p class="banner-description mb-4 animate-up delay-100">${b.description}</p>
                                    ${b.title ? `
                                        <a href="https://wa.me/94741010337?text=Hi, I am interested in ${encodeURIComponent(b.title)} offer" 
                                            target="_blank" 
                                            class="btn btn-light rounded-pill px-4 animate-up delay-200">
                                            <i class="bi bi-whatsapp me-2"></i>Learn More
                                        </a>
                                    ` : ''}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </section>
        ` : ''}



        <!-- Featured Products -->
        <section class="py-5 bg-white">
            <div class="container py-5">
                <div class="d-flex justify-content-between align-items-end mb-5">
                    <div>
                        <h2 class="fw-bold mb-2">Trending Collections</h2>
                        <p class="text-muted mb-0">Discover our most loved pieces</p>
                    </div>
                    <a href="collection.html" class="btn btn-outline-dark rounded-pill px-4">View All</a>
                </div>
                <div class="row g-3 g-md-4">
                    ${products.map(p => `
                        <div class="col-6 col-md-3">
                            <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-item animate-up">
                                <div class="position-relative">
                                    <img src="${p.image_path.startsWith('http') ? p.image_path : IMAGE_BASE_URL + p.image_path.replace('backend/', '')}" 
                                        class="card-img-top" style="height: 200px; object-fit: cover;" alt="${p.name}">
                                    ${p.on_sale ? '<span class="position-absolute top-0 start-0 m-2 badge bg-danger rounded-pill">SALE</span>' : ''}
                                </div>
                                <div class="card-body p-3">
                                    <p class="text-muted extra-small mb-1">${p.category_name || 'Furniture'}</p>
                                    <h6 class="fw-bold mb-2 text-truncate font-size-mobile">${p.name}</h6>
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                        <span class="fw-bold text-primary small">${formatPrice(p.on_sale ? p.sale_price : p.price)}</span>
                                        <button type="button" class="btn btn-dark btn-sm rounded-circle p-0 d-flex align-items-center justify-content-center" style="width: 30px; height: 30px;" onclick="event.preventDefault(); addToCartHandler(${JSON.stringify(p).replace(/"/g, '&quot;')})">
                                            <i class="bi bi-plus"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>

        <!-- Our Process -->
        <section class="py-5 bg-light">
            <div class="container py-5">
                <div class="text-center mb-5">
                    <h2 class="fw-bold mb-3">Our Path to Your Living Room</h2>
                    <p class="text-muted">How we create and deliver your dream pieces</p>
                </div>
                <div class="row g-4 text-center">
                    <div class="col-md-4">
                        <div class="process-step">
                            <div class="step-icon mb-4 mx-auto bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 100px; height: 100px;">
                                <i class="bi bi-chat-dots display-6 text-primary"></i>
                            </div>
                            <h4 class="fw-bold">1. Design Consultation</h4>
                            <p class="text-muted px-4">Identify your needs and style preferences with our experts.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="process-step">
                            <div class="step-icon mb-4 mx-auto bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 100px; height: 100px;">
                                <i class="bi bi-hammer display-6 text-primary"></i>
                            </div>
                            <h4 class="fw-bold">2. Pure Craftsmanship</h4>
                            <p class="text-muted px-4">Our artisans build your furniture with precision and care.</p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="process-step">
                            <div class="step-icon mb-4 mx-auto bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 100px; height: 100px;">
                                <i class="bi bi-truck display-6 text-primary"></i>
                            </div>
                            <h4 class="fw-bold">3. White-Glove Delivery</h4>
                            <p class="text-muted px-4">Relax as we deliver and assemble your new furniture at home.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        ${testimonials.length > 0 ? `
        <!-- Testimonials -->
        <section class="py-5 bg-white">
            <div class="container py-5">
                <div class="text-center mb-5">
                    <h2 class="fw-bold">Loved by Customers</h2>
                    <div class="d-flex justify-content-center gap-1 text-warning mb-2">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                    </div>
                </div>
                <div class="row g-4 justify-content-center">
                    ${testimonials.map(t => `
                        <div class="col-md-4">
                            <div class="p-4 glass-card liquid-hover h-100">
                                <i class="bi bi-quote display-1 text-light position-absolute top-0 end-0 opacity-25"></i>
                                <p class="mb-4 position-relative z-1 fst-italic">"${t.message}"</p>
                                <div class="d-flex align-items-center">
                                    <div class="bg-primary rounded-circle text-white d-flex align-items-center justify-content-center fw-bold me-3" style="width: 45px; height: 45px;">
                                        ${t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h6 class="fw-bold mb-0">${t.name}</h6>
                                        <small class="text-muted">${t.position || 'Verified Customer'}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
        ` : ''}

        <!-- Trust & Legacy -->
        <section class="py-5 bg-light">
            <div class="container py-5">
                <div class="row g-4 text-center">
                    <div class="col-md-3 col-6">
                        <div class="p-4 glass-card h-100">
                            <h2 class="fw-bold text-primary mb-1">10+</h2>
                            <p class="text-muted mb-0">Years Experience</p>
                        </div>
                    </div>
                    <div class="col-md-3 col-6">
                        <div class="p-4 glass-card h-100">
                            <h2 class="fw-bold text-primary mb-1">500+</h2>
                            <p class="text-muted mb-0">Projects Completed</p>
                        </div>
                    </div>
                    <div class="col-md-3 col-6">
                        <div class="p-4 glass-card h-100">
                            <h2 class="fw-bold text-primary mb-1">200+</h2>
                            <p class="text-muted mb-0">Happy Clients</p>
                        </div>
                    </div>
                    <div class="col-md-3 col-6">
                        <div class="p-4 glass-card h-100">
                            <h2 class="fw-bold text-primary mb-1">100%</h2>
                            <p class="text-muted mb-0">Satisfaction</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter Section -->
        <section class="py-5">
            <div class="container py-5">
                <div class="newsletter-card bg-dark text-white p-5 rounded-5 overflow-hidden position-relative">
                    <div class="position-absolute top-0 end-0 p-5 opacity-25 d-none d-lg-block">
                        <i class="bi bi-send display-1"></i>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-lg-8 text-center">
                            <h2 class="fw-bold mb-4">Stay Inspired</h2>
                            <p class="mb-4 opacity-75">Subscribe to our newsletter for design tips, new collection updates, and exclusive offers.</p>
                            <form class="d-flex gap-2 p-1 bg-white rounded-pill max-width-600 mx-auto" id="newsletter-form">
                                <input type="email" class="form-control border-0 rounded-pill px-4" placeholder="Your email address" required>
                                <button type="submit" class="btn btn-primary rounded-pill px-4">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;

    // Handle Newsletter Submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input').value;
            try {
                await subscribeNewsletter({ email });
                alert('Thank you for subscribing!');
                newsletterForm.reset();
            } catch (error) {
                alert('An error occurred. Please try again.');
            }
        });
    }
}

// Add to Cart global handler
window.addToCartHandler = async (product) => {
    const sessionId = getSessionId();
    try {
        await addToCart({
            session_id: sessionId,
            product_id: product.id,
            quantity: 1
        });

        // Use global showToast for a modern look
        showToast(`${product.name} added to cart!`, 'success', { url: 'cart.html', text: 'View Cart' });

        // Update cart count
        if (typeof updateCartCount === 'function') {
            updateCartCount();
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        showToast('Failed to add product to cart', 'error');
    }
};
