import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
import auth from '../firebase/firebase.config';
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);

const googleAuthProvider = new GoogleAuthProvider();
const gitHubAuthProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Set user's email when signed in
                setUserEmail(email);
            });
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider);
    }

    const signInWithGithub = () => {
        setLoading(true);
        return signInWithPopup(auth, gitHubAuthProvider)
            .then(result => {
                // Set user's email when signed in
                setUserEmail(result.user.email);
            });
    }

    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Save user function with existence check
    const saveUser = async (user) => {
        if (!user) return;

        const currentUser = {
            email: user.email,
            image: user.photoURL,
            name: user.displayName,
            role: 'User',
            status: 'Verified',
        };

        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/user`, currentUser);
            return data;
        } catch (error) {
            console.error('Error saving user:', error);
        }
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setUserEmail(currentUser ? currentUser.email : null);

            if (currentUser) {
                //get token and store client
                const userInfo = {email : currentUser.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    console.log(res)
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })
                await saveUser(currentUser);
            }
            else{
                localStorage.removeItem('access-token')
            }

            setLoading(false);
        });

        return () => {
            unSubscribe();
        }
    }, []);

    const authInfo = { user, userEmail, loading, createUser, signInUser, signInWithGoogle, logout, signInWithGithub };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

AuthProvider.propTypes = {
    children: PropTypes.node
};
