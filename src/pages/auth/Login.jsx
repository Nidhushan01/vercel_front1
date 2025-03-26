import { useRef, useState, useEffect, useContext } from 'react';
import { AuthContext } from "./context/AuthProvider";
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import signin from '../../assets/images/auth/login.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const userRef = useRef(null);
    const errRef = useRef(null);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login({ email, password });
            setEmail('');
            setPassword('');
            navigate("/dashboard");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
                <p 
                    ref={errRef} 
                    className={errMsg ? "text-red-500 mb-4" : "hidden"} 
                    aria-live="assertive"
                >
                    {errMsg}
                </p>

                {/* Left Section - Image */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src={signin}
                        alt="Rehabilitation"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* right Section for Login Form */}
                <div className="w-full lg:w-[458px] p-8 bg-white bg-opacity-10 rounded-2xl">
                    <form onSubmit={handleSubmit} className="mt-8">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-lg font-medium mb-2">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                className="w-full p-2 border-2 border-black rounded-lg"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-lg font-medium mb-2">Password:</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                className="w-full p-2 border-2 border-black rounded-lg"
                            />
                            <div className="flex justify-end">
                                <a
                                href="#"
                                className="text-sm text-[#96C5F1] italic mt-2"
                                >
                                Forgot Password?
                                </a>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black text-white text-lg font-semibold p-3 rounded-lg"
                            >
                            Login
                        </button>
                    </form>

                    <p className="text-center mt-6">
                        No Account? {" "}
                        <span 
                            className="font-medium text-purple-600 cursor-pointer"
                            onClick={() => navigate("/signup")}
                        >
                            Create one
                        </span>
                    </p>
                    <div className="flex items-center justify-center mt-6">
                        <hr className="w-1/3 border-black" />
                        <span className="mx-4 text-sm">Or Login with</span>
                        <hr className="w-1/3 border-black" />
                    </div>
                    <div className="flex justify-center mt-4 gap-6">
                        <FaGoogle className="text-2xl cursor-pointer hover:text-red-500" />
                        <FaGithub className="text-2xl cursor-pointer hover:text-gray-800" />
                        <FaFacebook className="text-2xl cursor-pointer hover:text-blue-600" />
                    </div>
                    <p className="text-center text-sm mt-6">Terms and Policy</p>
                </div>
            </div>
        </div>
    );
};

export default Login;