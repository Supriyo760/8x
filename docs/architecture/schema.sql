-- ====================================================================
-- SQL Schema — Amazon Re-imagined Relational Database Model
-- Compatible with PostgreSQL 15+ / SQLite 3
-- ====================================================================

CREATE TABLE categories (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    icon VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    category_id VARCHAR(50) REFERENCES categories(id) ON DELETE RESTRICT,
    price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2),
    discount_percentage INT DEFAULT 0,
    rating DECIMAL(2, 1) DEFAULT 0.0,
    review_count INT DEFAULT 0,
    is_prime BOOLEAN DEFAULT TRUE,
    is_best_seller BOOLEAN DEFAULT FALSE,
    is_amazon_choice BOOLEAN DEFAULT FALSE,
    in_stock BOOLEAN DEFAULT TRUE,
    stock_count INT DEFAULT 50,
    delivery_days INT DEFAULT 2,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0
);

CREATE TABLE product_variants (
    id VARCHAR(50) PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    variant_type VARCHAR(50) NOT NULL, -- 'color', 'storage', 'size'
    label VARCHAR(100) NOT NULL,
    value VARCHAR(100) NOT NULL,
    price_modifier DECIMAL(10, 2) DEFAULT 0.00,
    image_url TEXT
);

CREATE TABLE product_specifications (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE CASCADE,
    spec_key VARCHAR(100) NOT NULL,
    spec_value VARCHAR(255) NOT NULL
);

CREATE TABLE ai_review_digests (
    product_id VARCHAR(50) PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
    verdict TEXT NOT NULL,
    pros JSONB NOT NULL, -- Array of string pros
    cons JSONB NOT NULL, -- Array of string cons
    best_for VARCHAR(255) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id VARCHAR(50) PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ordered', -- 'ordered', 'processing', 'out_for_delivery', 'delivered', 'cancelled'
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) NOT NULL,
    shipping DECIMAL(10, 2) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    delivery_speed VARCHAR(50) NOT NULL,
    shipping_address JSONB NOT NULL,
    tracking_number VARCHAR(100) NOT NULL,
    estimated_delivery_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(50) REFERENCES products(id) ON DELETE RESTRICT,
    variant_id VARCHAR(50) REFERENCES product_variants(id) ON DELETE SET NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10, 2) NOT NULL
);
