import React from 'react';
import { PrimeReactProvider } from 'primereact/api';
import Footer from './Footer';
import Navbar from './Navbar';

// PrimeReact CSS Imports
import 'primereact/resources/themes/lara-light-indigo/theme.css'; // Choose your theme
import 'primereact/resources/primereact.min.css'; // Core CSS

export default function Layout({ children }) {
    return (
        <PrimeReactProvider >
            <div className='flex flex-col min-h-screen'>
                {/* Navigation Bar */}
                <Navbar></Navbar>

                {/* Main Content Area */}
                <main className="flex-grow container mx-auto p-6">
                    {children}
                </main>

                {/* Footer */}
                <Footer></Footer>
            </div>
        </PrimeReactProvider>
    );
}
