# Use a base image with PHP, Node.js, and common tools
FROM php:8.2-fpm-alpine

# Set working directory for the application
WORKDIR /var/www/html

# Install system dependencies, including oniguruma-dev for mbstring
RUN apk add --no-cache \
    git \
    curl \
    libpng-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    nodejs \
    npm \
    oniguruma-dev \
    netcat-openbsd

# Install PHP extensions
RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Copy the entire application codebase into the container
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Install NPM dependencies
RUN npm install

# Build the frontend assets for production (optional, can be done in a separate service)
# RUN npm run build

# Expose ports for various services
EXPOSE 8000 5173 8080

# Run the application using a custom start script
CMD ["sh", "docker-entrypoint.sh"]
