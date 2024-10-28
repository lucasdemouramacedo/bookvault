# Usando a imagem mais recente do PHP com Apache
FROM php:8.3-fpm

ARG user
ARG uid

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    supervisor \
    nginx \
    build-essential

RUN docker-php-ext-install gd pdo pdo_mysql sockets

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

WORKDIR /var/www

COPY ./api/composer.json ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

COPY ./api ./

RUN chown -R $uid:$uid /var/www

EXPOSE 9000
CMD ["php-fpm"]