import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './providers/AuthProvider';
import { AiFillGoogleCircle, AiFillGithub } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

const Login = () => {
    const { signInUser, signInWithGoogle, signInWithGithub } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            // Attempt to log in
            await signInUser(email, password);
            toast.success('Login successful!');
            e.target.reset();
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please check your email and password.');
        }
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                toast.success('Google Sign-In successful!');
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                toast.error('Google Sign-In failed.');
            });
    }

    const handleGithubSignIn = () => {
        signInWithGithub()
            .then(result => {
                console.log(result.user);
                toast.success('GitHub Sign-In successful!');
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                toast.error('GitHub Sign-In failed.');
            });
    }

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .hero {
                    font-family: 'PT Serif', serif;
                }

                .text-shadow-lg {
                    text-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                }

                .size-[25px] {
                    font-size: 25px;
                }
                `}
            </style>
            <Helmet><title>EstateNest | Sign in</title></Helmet>
            <div className="hero min-h-screen bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1695278255455-9afc87008775?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                <ToastContainer />
                <div className="hero-content mt-20 flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-shadow-lg text-[#d2ad5f]">Sign in now!</h1>
                    </div>
                    <p className='text-[#d2ad5f] font-semibold text-center'>
                        Welcome back to EstateNest!🔑<br />
                        Sign in to explore amazing properties, manage your listings, and more.
                    </p>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-[#d2ad5f]">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input type="email" placeholder="Your email" name='email' className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input type="password" placeholder="Your password" name='password' className="input input-bordered" required />
                                <label className="label">
                                    <Link to="#" className="label-text-alt link link-hover">Forgot password?</Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-black border-black text-[#d2ad5f]">Sign In</button>
                            </div>
                        </form>
                        <p className='text-center font-semibold text-1xl'>Or, Sign in Using..</p>
                        <div className='flex gap-2 items-center justify-center'>
                            <button onClick={handleGoogleSignIn}><AiFillGoogleCircle className='size-[25px]' /></button>
                            <button onClick={handleGithubSignIn}><AiFillGithub className='size-[25px]' /></button>
                        </div>
                        <p className='text-center'>
                            New here? Please<Link to="/register" className='btn btn-link'>Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
