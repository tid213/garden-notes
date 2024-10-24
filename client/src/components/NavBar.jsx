import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'
import { useNavigate, Link } from "react-router-dom";


const NavBar = ({navbarFormToggle, userSignedIn}) => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsTransparent(false);
      } else {
        setIsTransparent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  //{!loadingUserInfo ? userInfo[0].username : " "}
  //This is to set the gardennotes.me to user name
  if(userSignedIn === true){
      return (
        <header className={`fixed top-0 w-full ${isTransparent ? 'bg-white' : 'bg-opacity-90 bg-white'}`}>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            {/* Logo */}
                            <h1 className="text-base font-normal inter text-customBrown">gardennotes<b className="text-customOrange">.</b><b className="text-customMidGreen">me</b></h1>
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1">
                            {/* Navigation Links */}
                            <nav className="flex space-x-4">
                            <span onClick={()=> navbarFormToggle("show weather")} className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Weather</span>
                            <span onClick={()=> navbarFormToggle("add note")} className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Write Note</span>
                            <span onClick={()=> navbarFormToggle("add plant")} className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Add Plant</span>
                            <span onClick={()=> navbarFormToggle("add plot")} className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Add Plot</span>
                            <span onClick={()=> navbarFormToggle("edit account")} className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Account</span>
                            <span onClick={() => handleSignOut()} className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign Out</span>                        
                            </nav>
                        </div>
                        {/* Hamburger Menu for Mobile */}
                        <div className="flex lg:hidden">
                            <button onClick={toggleMenu} className="bg-white p-2 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                            <span className="sr-only">Open main menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            </button>
                        </div>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-md">
                            <span onClick={()=> {navbarFormToggle("show weather"); setIsOpen(false);}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Weather</span>
                            <span onClick={()=> {navbarFormToggle("add plant"); setIsOpen(false);}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Add Plant</span>
                            <span onClick={()=> {navbarFormToggle("add plot");setIsOpen(false);}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Add Plot</span>
                            <span onClick={()=> {navbarFormToggle("add note");setIsOpen(false);}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Write Note</span>
                            <span onClick={()=> {navbarFormToggle("edit account");setIsOpen(false);}} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Account</span>
                            <span onClick={() => handleSignOut()} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Sign Out</span>
                        </div>
                        </div>
                    )}
                    </header>
      );
    } else{
      return(
            <header className={`fixed top-0 w-full ${isTransparent ? 'bg-white' : 'bg-opacity-90 bg-white'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        {/* Logo */}
                        <h1 className="text-base font-normal text-customBrown">gardennotes<b className="text-customOrange">.</b><b className="text-customMidGreen">me</b></h1>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:justify-end lg:flex-1">
                        {/* Navigation Links */}
                        <nav className="flex space-x-4">
                        <Link to="/" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/signup" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign Up</Link>
                        <Link to="/signin" className="text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sign In</Link>
                        </nav>
                    </div>
                    {/* Hamburger Menu for Mobile */}
                    <div className="flex lg:hidden">
                        <button onClick={toggleMenu} className="bg-white p-2 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500">
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        </button>
                    </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-md">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Home</Link>
                        <Link to="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Sign Up</Link>
                        <Link to="/signin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50">Sign In</Link>
                    </div>
                    </div>
                )}
              </header>
      )
    }
};

export default NavBar;
