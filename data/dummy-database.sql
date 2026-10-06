-- ====================================================================
-- Database Seed Data — Amazon Re-imagined
-- ====================================================================

INSERT INTO categories (id, name, slug, icon) VALUES
('cat-audio', 'Headphones & Audio', 'audio', 'headphones'),
('cat-computers', 'Computers & Accessories', 'computers', 'laptop'),
('cat-gaming', 'Video Games & Consoles', 'gaming', 'gamepad-2'),
('cat-home', 'Home & Kitchen', 'home', 'coffee'),
('cat-books', 'Kindle & Books', 'books', 'book-open');

INSERT INTO products (id, title, brand, category_id, price, original_price, discount_percentage, rating, review_count, is_prime, in_stock, stock_count, delivery_days, description) VALUES
('prod-001', 'Sony WH-1000XM5 Wireless Noise Canceling Headphones', 'Sony', 'cat-audio', 348.00, 399.99, 13, 4.6, 14280, TRUE, TRUE, 42, 1, 'Industry-leading noise cancellation with 8 microphones and Auto NC Optimizer.'),
('prod-002', 'Apple MacBook Air 15-inch M3 Chip (16GB, 512GB)', 'Apple', 'cat-computers', 1499.00, 1699.00, 12, 4.8, 8940, TRUE, TRUE, 18, 1, 'Impossibly thin and wicked fast with M3 power and Liquid Retina display.'),
('prod-003', 'Kindle Paperwhite (16 GB) 6.8 Display', 'Amazon', 'cat-books', 149.99, 169.99, 12, 4.7, 38100, TRUE, TRUE, 120, 1, 'Glare-free 300 ppi display that reads like real paper with adjustable warm light.'),
('prod-004', 'Sony PlayStation 5 Slim Digital Edition (1TB SSD)', 'Sony', 'cat-gaming', 449.99, 499.99, 10, 4.9, 21540, TRUE, TRUE, 25, 1, 'Lightning-fast loading with custom NVMe SSD and transformative DualSense haptic feedback.'),
('prod-005', 'Breville Barista Touch Espresso Machine', 'Breville', 'cat-home', 999.95, 1199.95, 17, 4.5, 5120, TRUE, TRUE, 9, 2, 'Automated touchscreen cafe favorites with ThermoJet 3-second instant heating.');

INSERT INTO ai_review_digests (product_id, verdict, pros, cons, best_for) VALUES
('prod-001', 'The benchmark for modern active noise cancellation and call clarity.', '["Unrivaled noise reduction", "Featherlight crown comfort", "Crystal clear microphones"]'::jsonb, '["Non-folding hinges result in larger travel case", "Earcups feel warm in hot weather"]'::jsonb, 'Frequent flyers and remote workers'),
('prod-002', 'The ultimate everyday laptop combining large screen productivity and silent fanless thermals.', '["Silent fanless operation", "18-hour battery life", "Crisp 15.3-inch Liquid Retina display"]'::jsonb, '["Limited to two Thunderbolt ports", "Midnight finish shows minor fingerprints"]'::jsonb, 'Professionals, developers, and students');
