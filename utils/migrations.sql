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
    customer_id VARCHAR(50) NOT NULL UNIQUE,
    status ENUM('active', 'paused', 'trialing', 'incomplete', 'past_due', 'unpaid', 'canceled', 'incomplete_expired'),
    auth_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (auth_id) REFERENCES auth(ref) ON UPDATE CASCADE
);