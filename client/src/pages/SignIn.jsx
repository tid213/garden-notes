import SignInForm from "../components/SignInForm";
import NavBar from "../components/NavBar";


function SignIn(){

    return(
        <div className="min-h-screen bg-slate-50 mt-4 flex items-center justify-center">
            <NavBar />
            <div className="max-w-sm w-full lg:mt-4"><SignInForm /></div>
        </div>
    )
}

export default SignIn;