import React, { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './providers/AuthProvider';
import { getAuth, updateProfile } from 'firebase/auth'; 
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import swal from 'sweetalert';
import { Helmet } from 'react-helmet';

const Register = () => {
    const { createUser, logout } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const formRef = useRef(null);
    const navigate = useNavigate();

    const handleSignOut = () => {
        logout()
        .then()
        .catch()
    }

    const handleRegister = async (e) => { 
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoURL = e.target.photoURL.value;
        const password = e.target.password.value;
        
        // Password verification rules
        const hasUppercase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasLength = password.length >= 6;

        if (!(hasUppercase && hasSpecialChar && hasLength)) {
            setError('Password must contain at least one uppercase letter, one special character, and be at least 6 characters long.');
            return;
        }
         
        try {
            // Create user in Firebase
            const result = await createUser(email, password);
            // Update user profile 
        await updateProfile(getAuth().currentUser, { displayName: name, photoURL: photoURL });

            // data in MongoDB
            const newUser = {
                name,
                email,
                photoURL,
            };
            const response = await fetch('http://localhost:5000/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            console.log(name, photoURL)

            if (response.ok) {
                swal("Registration successful!");
                handleSignOut();
                formRef.current.reset(); 
                 navigate('/login');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    }

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap');

                .hero {
                    font-family: 'PT Serif', serif;
                }

                .form-control label {
                    color: #d2ad5f;
                }

                .form-control input {
                    font-family: 'PT Serif', serif;
                }

                .btn {
                    font-family: 'PT Serif', serif;
                }

                `}
            </style>
            <Helmet><title>EstateNest | Sign up</title></Helmet>
            <div className="hero min-h-screen bg-center bg-cover bg-[url('https://images.unsplash.com/photo-1695278255455-9afc87008775?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
                <div className="hero-content flex-col mt-20 ">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-[#d2ad5f]">Sign-up now!</h1>
                    </div>
                    <p className='text-[#d2ad5f] text-center font-semibold'>Join EstateNest today! Sign up now to unlock premium properties and exclusive deals. <br /> Let's find your dream home together!🔑</p>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-[#d2ad5f]">
                        <form onSubmit={handleRegister} ref={formRef} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold">Name</span>
                                </label>
                                <input type="text" placeholder="Your name" name='name' className="input input-bordered" required />
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>
                                <input type="email" placeholder="Email" name='email' className="input input-bordered" required />
                                <label className="label">
                                    <span className="label-text font-semibold">Photo URL</span>
                                </label>
                                <input type="url" placeholder="Your photo URL" name='photoURL' className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-semibold">Password</span>
                                </label>
                                <input type={showPassword ? "text" : "password"} placeholder="Password" name='password' className="input input-bordered" required />
                                <span className='absolute top-[50px] right-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-black border-black text-[#d2ad5f]">Sign up</button>
                                {error && <p className="text-white-500 mt-2">{error}</p>}
                            </div>
                        </form>
                        <p className='text-center'>Already have an account? Please<Link to="/login"><button className='btn btn-link'>Sign in</button></Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
