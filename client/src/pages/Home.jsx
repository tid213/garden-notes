import React from "react";
import { Link } from 'react-router-dom';
import landingImageSmall from '../images/landing-image-small.webp'
import noteAndPencil from '../images/note-with-pencil.svg'
import plantIcon from '../images/plant-black.svg';
import imgIcon from '../images/img-icon.svg';
import weatherIcon from '../images/weather-icon.svg';
import wateringPlantImg from '../images/person-watering-plant.svg';
import NavBar from "../components/NavBar";


function Home () {
      return (
        <main className="min-h-screen min-w-screen flex flex-col bg-slate-50">
            <NavBar />
            <section className=" min-w-screen  flex flex-col lg:mt-4">
                <div className="lg:flex lg:items-center flex flex-col justify-center items-center w-full min-h-screen">
                <img
                    className="mb-4 max-w-[384px]"
                    src={landingImageSmall}
                    alt="Two people gardening"
                    height={264}
                    width={264}
                />
                <div className="w-full lg:w-6/12 mx-auto text-center">
                    <p className="font-normal mb-4 px-8 text-2xl text-customDarkGreen">Welcome to</p>
                    <h1 className="text-5xl text-customDarkGreen font-bold mb-4 lg:mb-8">gardennotes<b className="text-customOrange">.</b><b className="text-customMidGreen">me</b></h1>
                    <p className="font-light px-8 text-lg text-black">Your all-in-one solution for plant lovers. Whether you're a seasoned gardener or just starting out, gardennotes.me helps you keep track of all your plants effortlessly.</p>
                    <div className="flex flex-col w-full lg:justify-center items-center mt-6 lg:flex-row">
                        <Link to="/signin" className="inline-block bg-customMidGreen w-8/12 lg:w-3/12 hover:bg-customDarkGreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</Link>
                        <Link to="/signup" className="inline-block mt-2 lg:mt-0 lg:ml-4 bg-customOrange w-8/12 lg:w-3/12 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</Link>
                    </div>
                </div>

                </div>
            </section>
            <section className="container mx-auto py-8 ">
                <div className="flex justify-center">
                    <div className="text-center"><h1 className="text-5xl text-customDarkGreen font-bold mb-4 lg:mb-8 text-center">here to help<b className="text-customOrange">.</b></h1></div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 lg:mx-24 mx-4 mt-4">
                    <div className="bg-white p-4 flex items-center rounded-lg shadow-md">
                    <img src={noteAndPencil} alt="Note and Pencil" className="mr-4 max-h-8" />
                    <p className="font-light max-w-prose text-lg text-black text-left">
                        <b className="font-bold">Take Notes:</b> Capture your plant care routines, growth milestones, and observations in one convenient place. With GreenNotes, you'll never forget a watering schedule or pruning tip again
                    </p>
                    </div>
                    <div className="bg-white p-4 flex items-center rounded-lg shadow-md">
                    <img src={plantIcon} alt="Note and Pencil" className="mr-4 max-h-8" />
                    <p className="font-light max-w-prose text-lg text-black text-left">
                        <b className="font-bold">Track Your Plants:</b> Organize and manage your plant collection with ease. Keep track of each plant's species, location, and important details to ensure they thrive.
                    </p>
                    </div>
                    <div className="bg-white p-4 flex items-center rounded-lg shadow-md">
                    <img src={imgIcon} alt="Note and Pencil" className="mr-4 max-h-8" />
                    <p className="font-light max-w-prose text-lg text-black text-left">
                        <b className="font-bold">Upload Pictures:</b> Share your plant journey visually by uploading photos of your plants. Document their growth progress and showcase your green thumb skills to friends and fellow plant enthusiasts.
                    </p>
                    </div>
                    <div className="bg-white p-4 flex items-center rounded-lg shadow-md">
                    <img src={weatherIcon} alt="Note and Pencil" className="mr-4 max-h-8" />
                    <p className="font-light max-w-prose text-lg text-black text-left">
                        <b className="font-bold">Weather tracking:</b> Provides real-time local weather updates, including temperature and precipitation forecasts, to help you make informed decisions about watering, planting, and caring for your plants, ensuring they thrive in every season.
                    </p>
                    </div>
                </div>  
            </section>
            <section className="container  mx-auto py-8 mt-12">
                <div className="flex justify-center"><div className="text-center"><h1 className="text-5xl text-customDarkGreen font-bold mb-4 lg:mb-8 text-center">benefits<b className="text-customOrange">.</b></h1></div></div>
                <div className="px-4 flex flex-col lg:flex-none lg:grid lg:grid-cols-2 gap-4 lg:mx-12">
                    <div className="bg-customMidGreen mt-4 p-4 flex lg:flex-row flex-col items-center flex-col-reverse rounded-lg shadow-md">
                        <p className="text-lg lg:mt-0 mt-4 text-white px-4 font-normal">
                        Keeping notes for plant care can be highly beneficial as it allows gardeners to track their plant's progress, understand their unique needs, and make informed decisions for optimal growth. Research has shown that keeping detailed records of plant care activities can lead to healthier and more productive plants.
                        </p>
                    </div>
                    <div className="lg:order-none order-3 row-span-2">
                        <img className="mb-4 lg:mt-4 lg:mb-0  max-w-sm mx-auto lg:max-w-md" src={wateringPlantImg} alt="Person watering a plant" />
                    </div>
                    <div className="bg-customMidGreen mt-4 p-4 flex flex-col items-center rounded-lg shadow-md">
                    <p className="text-lg px-4 text-white font-normal">Additionally, notes can help identify patterns, track growth milestones, and troubleshoot problems more effectively. By documenting watering schedules, fertilizer applications, pruning routines, and observations, gardeners can create personalized care plans tailored to each plant's specific requirements, ultimately fostering a thriving and beautiful garden.
                    </p>
                    </div>
                </div>
            </section>
            <section className="container w-screen flex flex-col mx-auto py-8 mt-12">
                <div className="flex justify-center"><div className="text-center"><h1 className="text-5xl text-customDarkGreen font-bold mb-4 lg:mb-8 text-center">let's get started<b className="text-customOrange">.</b></h1></div></div>
                <div className="flex flex-col items-center">
                <div className="lg:mt-4 p-4 flex lg:w-8/12 lg:flex-row flex-col items-center">
                    <p className="text-lg lg:mt-0 text-black px-4 font-normal">
                    Join our growing community of plant enthusiasts today! Sign up now to start keeping track of your plant care routines, milestones, and observations effortlessly. With GardenNotes.me, you'll never forget a watering schedule or pruning tip again. Plus, gain access to local weather forecasts to help your plants thrive in any season.

                    Get started on your journey to greener thumbs today!
                    <br/>
                    <br/>
                    Sign up now and let your gardening adventures begin!
                    </p>
                </div>
                <div className="flex flex-col w-full lg:justify-center items-center mt-6 lg:flex-row">
                        <Link to="/signin" className="inline-block bg-customMidGreen w-8/12 lg:w-3/12 hover:bg-customDarkGreen text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</Link>
                        <Link to="/signup" className="inline-block mt-2 lg:mt-0 lg:ml-4 bg-customOrange w-8/12 lg:w-3/12 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign Up</Link>
                    </div>
                </div>
            </section>
        </main>
      );


}

export default React.memo(Home);