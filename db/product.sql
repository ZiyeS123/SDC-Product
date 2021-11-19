CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    slogan TEXT,
    description TEXT,
    category TEXT,
    default_price INTEGER
);

CREATE TABLE IF NOT EXISTS related_products (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  related_id INTEGER,
  CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  feature TEXT,
  value TEXT,
  CONSTRAINT fk_features FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS styles (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  name TEXT,
  original_price INTEGER,
  sale_price INTEGER,
  default_style BOOLEAN,
  CONSTRAINT fk_styles FOREIGN KEY(product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  style_id INTEGER,
  url TEXT,
  thumbnail_url TEXT,
  CONSTRAINT fk_photos FOREIGN KEY(style_id) REFERENCES styles(id)
);

CREATE TABLE IF NOT EXISTS inventory (
  id SERIAL PRIMARY KEY,
  style_id INTEGER,
  size TEXT,
  quantity INTEGER,
  CONSTRAINT fk_inventory FOREIGN KEY(style_id) REFERENCES styles(id)
);

-- \copy products FROM '/Users/ziye/HR/SDCdata/product.csv' DELIMITER ',' CSV HEADER
-- \copy related_products FROM '/Users/ziye/HR/SDCdata/related.csv' DELIMITER ',' CSV HEADER
-- \copy features FROM '/Users/ziye/HR/SDCdata/features.csv' DELIMITER ',' CSV
-- \copy styles FROM '/Users/ziye/HR/SDCdata/styles.csv' DELIMITER ',' CSV HEADER
-- \copy photos FROM '/Users/ziye/HR/SDCdata/photos.csv' DELIMITER ',' CSV HEADER
-- \copy inventoru FROM '/Users/ziye/HR/SDCdata/inventory.csv' DELIMITER ',' CSV HEADER