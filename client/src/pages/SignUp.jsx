import SignUpForm from "../components/SignUpForm";
import React from "react";
import NavBar from "../components/NavBar";

function SignUp(){

    return(
        <div className="min-h-screen bg-slate-50 mt-4 flex items-center justify-center">
            <NavBar />
            <div className="max-w-sm w-full"><SignUpForm /></div>
            
        </div>
    )
}

export default SignUp;