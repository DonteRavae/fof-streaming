CREATE TABLE auth (
    id VARCHAR(300) NOT NULL PRIMARY KEY,
    ref VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    hash VARCHAR(255) NOT NULL,
    refresh_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE profiles (
    id VARCHAR(300) NOT NULL PRIMARY KEY,
    name VARCHAR(75) DEFAULT 'Me',
    auth_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (auth_id) REFERENCES auth(ref) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE stripe (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    customer_id VARCHAR(50) UNIQUE,
    subscription_id VARCHAR(100) UNIQUE,
    billing_interval ENUM('month', 'year'),
    next_billing_date BIGINT,
    subscription_start_date BIGINT,
    payment_method_brand VARCHAR(10),
    payment_method_last_four SMALLINT,
    status ENUM('created', 'active', 'paused', 'trialing', 'incomplete', 'past_due', 'unpaid', 'canceled', 'incomplete_expired') DEFAULT 'created',
    auth_id VARCHAR(255),
    FOREIGN KEY (auth_id) REFERENCES auth(ref) ON UPDATE CASCADE ON DELETE SET NULL
);