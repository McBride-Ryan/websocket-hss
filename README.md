<p align="center"><a href="#" ><img src="https://homesourcesystems.com/wp-content/uploads/2025/05/MobileLogo.svg" width="200" alt="home source systems"></a></p>

<p align="center">
<a href="#"><img src="https://img.shields.io/badge/Laravel-black?style=square&logo=laravel" alt="Laravel"></a>
<a href="#"><img src="https://img.shields.io/badge/-React-black?style=square&logo=react" alt="React"></a>
<a href="#"><img src="https://img.shields.io/badge/-Inertia-black?style=square&logo=Inertia" alt="React"></a>
<a href="#"><img src="https://img.shields.io/badge/-Tailwind-black?style=square&logo=Tailwind)" alt="Tailwind"></a>
<a href="#"><img src="https://img.shields.io/badge/-MySQL-black?style=flat-square&logo=mysql" alt="SQL"></a>
</p>

## About HSS

HSS is a web application leveraging the Laravel Framework, React, and InertiaJS. The aim is to run a scheduled job every 30 seconds on the Backend to create a new Transaction. We have set up a Queue and Event running as a docker entry point, so when the job executes, the system will automatically populate the Transactions Table in the DB. Subsequently, we have a React App making an API call every 30 seconds on the client to return any new data, updating the data table, updating summary total, while respecting the selected account type filter. When the docker container completes, migrations are run, and Transactions seeds are run, we can visit 'http://127.0.0.1:8000⁠' to view the dashboard.

## Local Docker Setup...

#### Build Docker in root directory via Main Terminal:
```bash
docker-compose up --build
```

#### Run Migrations & Seeder in seperate terminal:
```bash
docker-compose exec app php artisan migrate
docker-compose exec app php artisan db:seed --class=TransactionSeeder
```

#### APP_URL: 
```bash
http://127.0.0.1:8000⁠
```

## Initial Process...

#### Create a new Laravel Project:
```bash
composer create-project laravel/laravel hss
cd hss
```
#### Install Inertia.js Server-Side Adapter:
```bash
composer require inertiajs/inertia-laravel
```
#### Publish Inertia Middleware:
```bash
php artisan inertia:middleware
```
#### Install Client-Side Dependencies
```bash
npm install react react-dom @inertiajs/react @vitejs/plugin-react
```

#### Install Node Dependencies and Compile Assets::
```bash
npm install
npm run dev
```

#### In a seperate terminal, Laravel Development Server launch:
```bash
composer install
php artisan serve
```

#### Terminal Command to listen for Websocket via Laravel Reverb, open another terminal:
```bash
php artisan reverb:start --debug
```

#### Terminal Command to run scheduled task to populate transactions every 30 seconds:
```bash
php artisan schedule:work
```

#### Terminal Command to process jobs as they come in from the queue:
```bash
php artisan queue:work
```

## Improvements...
The Websocket is implemented. I leveraged Laravel Reverb and have set the functionality in the bootstrap.js file. In a future iteration I would like to reduce the overhead associated with repeated HTTP requests...

### License
The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
