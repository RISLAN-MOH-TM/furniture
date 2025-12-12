/**
 * Data Manager for Furniture Website
 * Handles storage in localStorage to simulate a database.
 */

const DEFAULT_DATA = {
    categories: ["Living Room", "Bedroom", "Dining", "Office"],
    products: [
        {
            id: 1,
            name: "Modern Velvet Sofa",
            category: "Living Room",
            price: 165000,
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Luxurious velvet sofa with gold legs, perfect for modern living rooms."
        },
        {
            id: 2,
            name: "Minimalist Oak Table",
            category: "Dining",
            price: 85000,
            image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Solid oak dining table with a minimalist design."
        },
        {
            id: 3,
            name: "Ergonomic Office Chair",
            category: "Office",
            price: 45000,
            image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "High-comfort office chair with lumbar support."
        },
        {
            id: 4,
            name: "King Size Bed Frame",
            category: "Bedroom",
            price: 210000,
            image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Elegant wooden bed frame with a padded headboard."
        },
        {
            id: 5,
            name: "Lounge Armchair",
            category: "Living Room",
            price: 55000,
            image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Comfortable armchair with specific textile finish."
        },
        {
            id: 6,
            name: "Wooden Bookshelf",
            category: "Office",
            price: 32000,
            image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Tall wooden bookshelf for your library."
        },
        {
            id: 7,
            name: "Modern Leather Sofa",
            category: "Living Room",
            price: 180000,
            image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Premium leather sofa with adjustable headrests."
        },
        {
            id: 8,
            name: "Glass Coffee Table",
            category: "Living Room",
            price: 45000,
            image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Contemporary glass coffee table with chrome legs."
        },
        {
            id: 9,
            name: "Queen Size Bed",
            category: "Bedroom",
            price: 150000,
            image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Comfortable queen size bed with memory foam mattress."
        },
        {
            id: 10,
            name: "Bedside Lamp",
            category: "Bedroom",
            price: 12000,
            image: "https://images.unsplash.com/photo-1507473888900-52a1b2d0743b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Modern nightstand lamp with warm LED light."
        },
        {
            id: 11,
            name: "Dining Chair Set",
            category: "Dining",
            price: 65000,
            image: "https://images.unsplash.com/photo-1517705008128-361805f42e88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Set of 4 modern dining chairs in grey fabric."
        },
        {
            id: 12,
            name: "Executive Desk",
            category: "Office",
            price: 75000,
            image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Spacious executive desk with built-in cable management."
        },
        {
            id: 13,
            name: "Filing Cabinet",
            category: "Office",
            price: 28000,
            image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "3-drawer steel filing cabinet with lock."
        },
        {
            id: 14,
            name: "Bookshelf Tower",
            category: "Office",
            price: 35000,
            image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Narrow vertical bookshelf for small spaces."
        },
        {
            id: 15,
            name: "Rattan Outdoor Chair",
            category: "Living Room",
            price: 22000,
            image: "https://images.unsplash.com/photo-1596162955779-9c8f7b2d59ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Stylish rattan chair suitable for patios or living areas."
        },
        {
            id: 16,
            name: "Wardrobe Mirror",
            category: "Bedroom",
            price: 45000,
            image: "https://images.unsplash.com/photo-1512918580421-b2feee3b85a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Full-length standing mirror with wooden frame."
        },
        {
            id: 17,
            name: "TV Unit Stand",
            category: "Living Room",
            price: 55000,
            image: "https://images.unsplash.com/photo-1595188882583-9b925b449174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Low-profile media console station."
        },
        {
            id: 18,
            name: "Recliner Chair",
            category: "Living Room",
            price: 85000,
            image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Plush recliner chair for ultimate relaxation."
        },
        {
            id: 19,
            name: "Vanity Table",
            category: "Bedroom",
            price: 60000,
            image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Elegant vanity table with round mirror."
        },
        {
            id: 20,
            name: "Shoe Rack",
            category: "Bedroom",
            price: 15000,
            image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Bamboo shoe rack with 3 tiers."
        },
        {
            id: 21,
            name: "Kitchen Island Stool",
            category: "Dining",
            price: 18000,
            image: "https://images.unsplash.com/photo-1503602642458-2321114453ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Adjustable height bar stool for kitchen islands."
        },
        {
            id: 22,
            name: "L-Shaped Desk",
            category: "Office",
            price: 95000,
            image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Corner desk maximizing workspace efficiency."
        },
        {
            id: 23,
            name: "Conference Table",
            category: "Office",
            price: 120000,
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Large meeting table for professional environments."
        },
        {
            id: 24,
            name: "Pendant Light",
            category: "Dining",
            price: 15000,
            image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Modern hanging light fixture for dining areas."
        },
        {
            id: 25,
            name: "Floor Lamp",
            category: "Living Room",
            price: 18000,
            image: "https://images.unsplash.com/photo-1513506003013-19c6cc5a3eb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Arc floor lamp to illuminate your reading nook."
        },
        {
            id: 26,
            name: "Bean Bag",
            category: "Living Room",
            price: 8500,
            image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            description: "Cozy extra seating for casual lounging."
        }
    ],

    banners: [
        {
            id: 101,
            title: "Summer Sale",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
            description: "Up to 50% off on all living room items."
        },
        {
            id: 102,
            title: "New Collection",
            image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
            description: "Discover our latest modern designs."
        },
        {
            id: 103,
            title: "Exclusive Offers",
            image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
            description: "Special prices for premium members."
        }
    ]
};

class DataManager {
    constructor() {
        this.dbKey = 'furniture_db';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.dbKey)) {
            this.saveData(DEFAULT_DATA);
        } else {
            const data = this.getData();
            let updated = false;

            // Migration: Ensure banners exist
            if (!data.banners) {
                data.banners = DEFAULT_DATA.banners;
                updated = true;
            }

            // Migration: Add new products from DEFAULT_DATA if they are missing
            const existingIds = new Set(data.products.map(p => p.id));
            DEFAULT_DATA.products.forEach(defP => {
                if (!existingIds.has(defP.id)) {
                    data.products.push(defP);
                    updated = true;
                }
            });

            // Fix broken image for ID 4 in local storage if old broken link is present
            const bed = data.products.find(p => p.id === 4);
            // We check if it matches the known broken URL snippet or just force update to be safe
            // Broken URL had '1505693416388'
            if (bed && (bed.image.includes('1505693416388') || bed.image.includes('images.unsplash.com/photo-404'))) {
                // Just replacing with the new valid one from DEFAULT_DATA
                const defaultBed = DEFAULT_DATA.products.find(p => p.id === 4);
                if (defaultBed) {
                    bed.image = defaultBed.image;
                    updated = true;
                }
            }

            // Fixed price migration logic
            data.products.forEach(p => {
                if (p.price < 5000) {
                    const match = DEFAULT_DATA.products.find(def => def.id === p.id);
                    if (match) {
                        p.price = match.price;
                        updated = true;
                    } else {
                        p.price = p.price * 300;
                        updated = true;
                    }
                }
            });

            if (updated) {
                this.saveData(data);
            }
        }
    }

    getData() {
        return JSON.parse(localStorage.getItem(this.dbKey));
    }

    saveData(data) {
        localStorage.setItem(this.dbKey, JSON.stringify(data));
    }

    getProducts() {
        return this.getData().products;
    }

    addProduct(product) {
        const data = this.getData();
        product.id = Date.now();
        if (!data.categories.includes(product.category)) {
            data.categories.push(product.category);
        }
        data.products.push(product);
        this.saveData(data);
    }

    updateProduct(updatedProduct) {
        const data = this.getData();
        if (!data.categories.includes(updatedProduct.category)) {
            data.categories.push(updatedProduct.category);
        }
        const index = data.products.findIndex(p => p.id === updatedProduct.id);
        if (index !== -1) {
            data.products[index] = updatedProduct;
            this.saveData(data);
        }
    }

    deleteProduct(id) {
        const data = this.getData();
        data.products = data.products.filter(p => p.id !== id);
        this.saveData(data);
    }

    getCategories() {
        return this.getData().categories;
    }

    addCategory(newCategory) {
        const data = this.getData();
        if (!data.categories.includes(newCategory)) {
            data.categories.push(newCategory);
            this.saveData(data);
            return true;
        }
        return false;
    }

    deleteCategory(categoryName) {
        const data = this.getData();
        data.categories = data.categories.filter(c => c !== categoryName);
        this.saveData(data);
    }

    // Banner Methods
    getBanners() {
        return this.getData().banners || [];
    }

    addBanner(banner) {
        const data = this.getData();
        if (!data.banners) data.banners = [];
        banner.id = Date.now();
        data.banners.push(banner);
        this.saveData(data);
    }

    deleteBanner(id) {
        const data = this.getData();
        if (data.banners) {
            data.banners = data.banners.filter(b => b.id !== id);
            this.saveData(data);
        }
    }
}

const db = new DataManager();
