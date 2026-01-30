import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '../Components/Layout';
import dashboard from '../../images/hss_dashboard.png'
import docker from '../../images/docker.png'

export default function About(props) {
    return (
        <div>
            <Head title={props.page} />
            <Layout>
                <div className='max-w-6xl mx-auto card'>
                    <div className='flex justify-center'>
                        <img src="https://img-c.udemycdn.com/course/750x422/5959592_2f31.jpg" alt="" srcset="" />
                    </div>
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-wrap justify-center my-4 space-x-2">
                            <a href="#"><img src="https://img.shields.io/badge/Laravel-black?style=square&logo=laravel" alt="Laravel" /></a>
                            <a href="#"><img src="https://img.shields.io/badge/-React-black?style=square&logo=react" alt="React" /></a>
                            <a href="#"><img src="https://img.shields.io/badge/-Inertia-black?style=square&logo=Inertia" alt="Inertia" /></a>
                            <a href="#"><img src="https://img.shields.io/badge/-Tailwind-black?style=square&logo=Tailwind" alt="Tailwind" /></a>
                            <a href="#"><img src="https://img.shields.io/badge/-MySQL-black?style=flat-square&logo=mysql" alt="SQL" /></a>
                        </div>

                        <hr className="my-8 border-gray-300" />

                        <h2 className="text-2xl font-bold mb-4">About HSS</h2>
                        <p className="mb-6">
                            HSS is a web application leveraging the <strong>Laravel Framework</strong>, <strong>React</strong>, and <strong>InertiaJS</strong>. The aim is to run a scheduled job every 30 seconds on the Backend to create a new Transaction. We have set up a Queue and Event running as a docker entry point, so when the job executes, the system will automatically populate the Transactions Table in the DB. Subsequently, we have a React App making an API call every 30 seconds on the client to return any new data, updating the data table, updating summary total, while respecting the selected account type filter. When the docker container completes, run migrations & seeder, we can visit <strong>'http://127.0.0.1:8000'</strong> to view the dashboard.
                        </p>
                        {/* dashboard */}
                        <div className='mx-10'>
                            <img src={dashboard} alt="" srcset="" />

                        </div>

                        <hr className="my-8 border-gray-300" />

                        <h2 className="text-2xl font-bold mb-4">Local Docker Setup...</h2>
                        <h4 className="text-lg font-semibold mb-2">Build Docker in root directory via Main Terminal:</h4>
                        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                            <pre className="whitespace-pre-wrap"><code>docker-compose up --build</code></pre>
                        </div>

                        <h4 className="text-lg font-semibold mb-2">Run Migrations & Seeder in separate terminal:</h4>
                        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                            <pre className="whitespace-pre-wrap"><code>docker-compose exec app php artisan migrate</code><br />
                            <code>docker-compose exec app php artisan db:seed --className=TransactionSeeder</code></pre>
                        </div>

                        <h4 className="text-lg font-semibold mb-2">APP_URL:</h4>
                        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                            <pre className="whitespace-pre-wrap"><code>http://127.0.0.1:8000</code></pre>
                        </div>

                        {/* DOCKER */}
                        <div className='mx-10'>
                            <img src={docker} alt="" srcset="" />
                        </div>

                        <hr className="my-8 border-gray-300" />

                        {/* Initial Process */}
                        <h2 className="text-2xl font-bold mb-4">Initial Process...</h2>
                        <h4 className="text-lg font-semibold mb-2">Create a new Laravel Project:</h4>
                        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                            <pre className="whitespace-pre-wrap"><code>composer create-project laravel/laravel hss
                </code></pre>
                        </div>

                        <h4 className="text-lg font-semibold mb-2">Install Inertia.js Server-Side Adapter:</h4>
                        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                            <pre className="whitespace-pre-wrap"><code>composer require inertiajs/inertia-laravel</code></pre>
                        </div>

                        <h4 className="text-lg font-semibold mb-2">Publish Inertia Middleware:</h4>
                        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                            <pre className="whitespace-pre-wrap"><code>php artisan inertia:middleware</code></pre>
                        </div>

                        <h4 className="text-lg font-semibold mb-2">Install Client-Side Dependencies:</h4>
                        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                            <pre className="whitespace-pre-wrap"><code>npm install react react-dom @inertiajs/react @vitejs/plugin-react</code></pre>
                        </div>

                        <h4 className="text-lg font-semibold mb-2">Install Node Dependencies and Compile Assets:</h4>
                        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                            <pre className="whitespace-pre-wrap"><code>npm install
                npm run dev</code></pre>
                        </div>

                        <h4 className="text-lg font-semibold mb-2">In a separate terminal, Laravel Development Server launch:</h4>
                        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                            <pre className="whitespace-pre-wrap"><code>composer install
                php artisan serve</code></pre>
                        </div>

                        <h4 className="text-lg font-semibold mb-2">Terminal Command to listen for Websocket via Laravel Reverb, open another terminal:</h4>
                        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                            <pre className="whitespace-pre-wrap"><code>php artisan reverb:start --debug</code></pre>
                        </div>

                        <h4 className="text-lg font-semibold mb-2">Terminal Command to run scheduled task to populate transactions every 30 seconds:</h4>
                        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                            <pre className="whitespace-pre-wrap"><code>php artisan schedule:work</code></pre>
                        </div>

                        <h4 className="text-lg font-semibold mb-2">Terminal Command to process jobs as they come in from the queue:</h4>
                        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto mb-4">
                            <pre className="whitespace-pre-wrap"><code>php artisan queue:work</code></pre>
                        </div>

                        <hr className="my-8 border-gray-300" />

                        {/* Improvements */}
                        <h2 className="text-2xl font-bold mb-4">Improvements...</h2>
                        <p className="mb-6">
                            The Websocket is implemented. I leveraged <strong>Laravel Reverb</strong> and have set the functionality in the bootstrap.js file. In a future iteration I would like to reduce the overhead associated with repeated HTTP requests...
                        </p>

                        <h3 className="text-xl font-semibold mb-2">License</h3>
                        <p>
                            The Laravel framework is open-sourced software licensed under the <a href="https://opensource.org/licenses/MIT" className="text-blue-600 hover:underline">MIT license</a>.
                        </p>
                    </div>
                </div>
            </Layout>
        </div>
    );
}
