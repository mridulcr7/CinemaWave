import React from 'react';
import mainLogo from "../Utilis/unnamed.png";
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Header = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };
    if (user)
        console.log(user.name);
    return (
        <header className="bg-gray-900 fixed w-full z-10">
            <div className="flex items-center justify-between p-4">
                <img src={mainLogo} alt="Logo" className="h-16" />
                <nav className="flex items-center space-x-4">
                    {user && (
                        <div className="flex items-center">
                            <span className="text-white mr-2">{user.name}</span>
                            <button
                                onClick={handleClick}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                            >
                                Log out
                            </button>
                        </div>
                    )}
                    {!user && (
                        <div className="flex items-center">
                            <Link
                                to="/login"
                                className="text-white hover:underline mr-4"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signup"
                                className="text-white hover:underline"
                            >
                                Signup
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
