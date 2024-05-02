import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import landingImage from '../images/landing-image.svg';
import noteAndPencil from '../images/note-with-pencil.svg'
import plantIcon from '../images/plant-black.svg';
import imgIcon from '../images/img-icon.svg';
import weatherIcon from '../images/weather-icon.svg';
import wateringPlantImg from '../images/person-watering-plant.svg';

function Home () {

    const [isOpen, setIsOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(true);

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
      }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

      return (
        <main className="min-h-screen flex flex-col bg-customLightBrown">
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
            <section className=" min-h-screen flex flex-col mt-16">
                <div className="lg:flex lg:items-center items-center">
                    <div className="lg:w-6/12">
                        <img className="mb-4 lg:mt-4 lg:mb-0 lg:mr-8  max-w-sm mx-auto lg:max-w-lg" src={landingImage} alt="Landing Image" />
                    </div>
                    <div className="lg:w-6/12">
                    <p className="inter font-normal mb-4 max-w-prose px-8 text-2xl text-customDarkGreen text-center ">Welcome to</p>
                    <h1 className="text-5xl text-customDarkGreen inter font-bold mb-4 lg:mb-8 text-center">gardennotes<b className="text-customOrange">.</b><b className="text-customMidGreen">me</b></h1>
                    <p className="inter font-light max-w-prose px-8 text-lg text-black text-center ">
                    Your all-in-one solution for plant lovers. Whether you're a seasoned gardener or just starting out, gardennotes.me helps you keep track of all your plants effortlessly.
                    </p>
                    <div className="flex flex-col w-full lg:justify-center items-center mt-6 lg:flex-row">
                        <Link to="/signin" className="inline-block inter bg-customMidGreen w-8/12 lg:w-3/12 hover:bg-customDarkGreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</Link>
                        <Link to="/signup" className="inline-block inter mt-2 lg:mt-0 lg:ml-4 bg-customOrange w-8/12 lg:w-3/12 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</Link>
                    </div>
                    </div>
                </div>
            </section>
            <section className="container mx-auto py-8 ">
                {/* Top row */}
                <div className="flex justify-center">
                    <div className="text-center"><h1 className="text-5xl text-customDarkGreen inter font-bold mb-4 lg:mb-8 text-center">here to help<b className="text-customOrange">.</b></h1></div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 lg:mx-24 mx-4 mt-4">
                    <div className="bg-white p-4 flex items-center rounded-lg shadow-md">
                    <img src={noteAndPencil} alt="Note and Pencil" className="mr-4 max-h-8" />
                    <p className="inter font-light max-w-prose text-lg text-black text-left">
                        <b className="font-bold">Take Notes:</b> Capture your plant care routines, growth milestones, and observations in one convenient place. With GreenNotes, you'll never forget a watering schedule or pruning tip again
                    </p>
                    </div>
                    <div className="bg-white p-4 flex items-center rounded-lg shadow-md">
                    <img src={plantIcon} alt="Note and Pencil" className="mr-4 max-h-8" />
                    <p className="inter font-light max-w-prose text-lg text-black text-left">
                        <b className="font-bold">Track Your Plants:</b> Organize and manage your plant collection with ease. Keep track of each plant's species, location, and important details to ensure they thrive.
                    </p>
                    </div>
                    <div className="bg-white p-4 flex items-center rounded-lg shadow-md">
                    <img src={imgIcon} alt="Note and Pencil" className="mr-4 max-h-8" />
                    <p className="inter font-light max-w-prose text-lg text-black text-left">
                        <b className="font-bold">Upload Pictures:</b> Share your plant journey visually by uploading photos of your plants. Document their growth progress and showcase your green thumb skills to friends and fellow plant enthusiasts.
                    </p>
                    </div>
                    <div className="bg-white p-4 flex items-center rounded-lg shadow-md">
                    <img src={weatherIcon} alt="Note and Pencil" className="mr-4 max-h-8" />
                    <p className="inter font-light max-w-prose text-lg text-black text-left">
                        <b className="font-bold">Weather tracking:</b> Provides real-time local weather updates, including temperature and precipitation forecasts, to help you make informed decisions about watering, planting, and caring for your plants, ensuring they thrive in every season.
                    </p>
                    </div>
                </div>  
            </section>
            <section className="container  mx-auto py-8 mt-12">
                <div className="flex justify-center"><div className="text-center"><h1 className="text-5xl text-customDarkGreen inter font-bold mb-4 lg:mb-8 text-center">benefits<b className="text-customOrange">.</b></h1></div></div>
                <div className="px-4 flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-4 lg:mx-12">
                    <div className="bg-customMidGreen mt-4 p-4 flex lg:flex-row flex-col items-center flex-col-reverse rounded-lg shadow-md">
                        <p className="text-lg inter lg:mt-0 mt-4 text-white px-4 font-normal">
                        Keeping notes for plant care can be highly beneficial as it allows gardeners to track their plant's progress, understand their unique needs, and make informed decisions for optimal growth. Research has shown that keeping detailed records of plant care activities can lead to healthier and more productive plants.
                        </p>
                    </div>
                    <div className="lg:order-none order-3 row-span-2">
                        <img className="mb-4 lg:mt-4 lg:mb-0  max-w-sm mx-auto lg:max-w-md" src={wateringPlantImg} alt="Person watering a plant" />
                    </div>
                    <div className="bg-customMidGreen mt-4 p-4 flex flex-col items-center rounded-lg shadow-md">
                    <p className="text-lg inter px-4 text-white font-normal">Additionally, notes can help identify patterns, track growth milestones, and troubleshoot problems more effectively. By documenting watering schedules, fertilizer applications, pruning routines, and observations, gardeners can create personalized care plans tailored to each plant's specific requirements, ultimately fostering a thriving and beautiful garden.
                    </p>
                    </div>
                </div>
            </section>
            <section className="container w-screen flex flex-col mx-auto py-8 mt-12">
                <div className="flex justify-center"><div className="text-center"><h1 className="text-5xl text-customDarkGreen inter font-bold mb-4 lg:mb-8 text-center">let's get started<b className="text-customOrange">.</b></h1></div></div>
                <div className="flex flex-col items-center">
                <div className="lg:mt-4 p-4 flex lg:w-8/12 lg:flex-row flex-col items-center">
                    <p className="text-lg inter lg:mt-0 text-black px-4 font-normal">
                    Join our growing community of plant enthusiasts today! Sign up now to start keeping track of your plant care routines, milestones, and observations effortlessly. With GardenNotes.me, you'll never forget a watering schedule or pruning tip again. Plus, gain access to local weather forecasts to help your plants thrive in any season.

                    Get started on your journey to greener thumbs today!
                    <br/>
                    <br/>
                    Sign up now and let your gardening adventures begin!
                    </p>
                </div>
                <div className="flex flex-col w-full lg:justify-center items-center mt-6 lg:flex-row">
                        <Link to="/signin" className="inline-block inter bg-customMidGreen w-8/12 lg:w-3/12 hover:bg-customDarkGreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</Link>
                        <Link to="/signup" className="inline-block inter mt-2 lg:mt-0 lg:ml-4 bg-customOrange w-8/12 lg:w-3/12 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</Link>
                    </div>
                </div>
            </section>
        </main>
      );


}

export default React.memo(Home);