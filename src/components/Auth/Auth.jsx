import "./Auth.css"
import Login from './login/Login';
import Register from './register/Register';
import useSearchParamsHook from '../../hooks/UseQueryParams';
const AuthForm = () => {
    const { setParam, getParam } = useSearchParamsHook();
    const handleSignIn = () => {
        setParam("auth", "signIn")

    }

    const handleSignUp = () => {
        setParam("auth", "signUp")
    }


    return (
        <div className="w-full relative overflow-hidden p-8">
            <div className=" flex w-[200%] transition-all duration-700 ease-in-out" style={{ marginLeft: getParam("auth") === "signIn" ? '0%' : '-100%' }}>
                <div className="w-[50%] text-[35px] font-bold text-center text-slate-700" >Sign In </div>
                <div className="w-[50%] text-[35px] font-bold text-center text-slate-700" >Sign Up </div>
            </div>
            <div className="flex justify-between  items-center h-[50px] w-full overflow-hidden mt-8 mb-3 border border-light-gray rounded-[15px] relative">
                <input
                    className='hidden'
                    type="radio"
                    name="slide"
                    id="login"
                    checked={getParam("auth") === "signIn"}
                    readOnly
                />
                <input
                    className='hidden w-full'
                    type="radio"
                    name="slide"
                    id="signup"
                    checked={getParam("auth") === "signUp"}
                    readOnly
                />
                <label htmlFor="login" className=" text-2xl text-center font-medium hover:scale-110 transition-transform flex-1 text-slate-700" onClick={handleSignIn}>to Sign In</label>
                <label htmlFor="signup" className=" text-2xl text-center font-medium hover:scale-110 transition-transform flex-1 text-slate-700" onClick={handleSignUp}>to Signup</label>
                <div className="absolute h-full w-[50%] transition-left duration-500 ease-in-out bg-slate-600 rounded-2xl" style={{ left: getParam("auth") === "signIn" ? '0%' : '50%' }}></div>
            </div>
            <div className="w-full overflow-hidden">
                <div className="w-[200%] flex  transition-margin-left duration-500 ease" style={{ marginLeft: getParam("auth") === "signIn" ? '0%' : '-100% '}}>
                    <Login />
                    <Register />
                </div>
            </div>
        </div>
    )
}

export default AuthForm
