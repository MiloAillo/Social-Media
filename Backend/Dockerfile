FROM php:8.3.27-cli-alpine3.22

WORKDIR /app/

COPY . .

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN composer install

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]