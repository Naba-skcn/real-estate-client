import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <section className="flex bg-black bg-cover items-center min-h-screen p-16  text-[#d2ad5f]">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
            <div className="max-w-md text-center">
                <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                    <span className="sr-only">Error</span>404
                </h2>
                <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                <p className="mt-4 mb-8 dark:text-gray-600">But dont worry, you can find plenty of other things on our homepage.</p>
                <Link to="/"><button className='btn bg-black text-[#d2ad5f]'>Go Back</button></Link>
            </div>
        </div>
    </section>
    );
};

export default Error;