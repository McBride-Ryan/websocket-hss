import React, { Component } from 'react'
import { Link } from '@inertiajs/react'; // Use Inertia's Link for client-side navigation

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="shadow-md p-4" style={{backgroundColor: '#1E1E1E'}}>
                    <div className="container mx-auto flex justify-between items-center">
                        <div>
                            <Link href="/" className="hidden md:flex">
                                <img src="https://homesourcesystems.com/wp-content/uploads/2025/04/logo.svg" alt="" />
                            </Link>
                            <Link href="/" className="flex md:hidden">
                                <img src="https://homesourcesystems.com/wp-content/uploads/2025/05/MobileLogo.svg" alt="" />
                            </Link>
                        </div>
                        <div className="space-x-4">
                            <Link href="/" className="text-gray-100 hover:text-indigo-600 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-gray-200">
                            Dashboard
                            </Link>

                            <Link href="/about" className="text-gray-100 hover:text-indigo-600 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-gray-200">
                                About
                            </Link>
                            {/* Conditional links based on authentication status */}
                            {/* {auth && auth.user ? (
                                <Link href="/logout" method="post" as="button" className="text-red-600 hover:text-red-800 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-gray-200">
                                    Logout
                                </Link>
                            ) : (
                                <Link href="/login" className="text-green-600 hover:text-green-800 font-medium transition-colors duration-300 px-3 py-2 rounded-md hover:bg-gray-200">
                                    Login
                                </Link>
                            )} */}
                        </div>
                    </div>
                </nav>
      </div>
    )
  }
}

export default Navbar
