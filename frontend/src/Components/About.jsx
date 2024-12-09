import React from 'react'

const About = () => {
    return (
        <div id='about' className='flex flex-col bg-gray-100 justify-center gap-5 md:px-24 px-7 md:py-20 py-10'>
            <h1 className='md:text-8xl text-5xl text-center'>About</h1>
            <p className='text-justify'>
                Welcome to Your <span className='font-semibold'>AI-Powered Kitchen Assistant,</span> a revolutionary tool that bridges the gap between creativity and convenience in cooking. Whether you're a seasoned chef, an experimental foodie, or someone just starting their culinary journey, this platform is here to transform the way you approach the kitchen.
            </p>
            <h2 className='text-xl font-bold'>With cutting-edge AI technology, our platform offers two powerful features:</h2>
            <ol className='list-disc'>
                <li className='ms-8'><span className='font-semibold'>Photo-to-Recipe Conversion:</span> Have a picture of a dish but don't know how to make it? Simply upload the image, and our AI will analyze it to identify the dish and provide a detailed recipe so you can recreate it effortlessly.</li>
                <li className='ms-8'><span className='font-semibold'>Recipe Search by Name:</span> If you already know what you want to cook, type in the name of the recipe, and we'll fetch the step-by-step instructions to help you get started right away.</li>
            </ol>
            <h2 className='text-xl font-bold'>Why Choose This Platform?</h2>
            <ul className='list-disc'>
                <li className='ms-8'><span className='font-semibold'>Time-Saving:</span> Forget endless online searches—get accurate recipes in seconds.</li>
                <li className='ms-8'><span className='font-semibold'>Explore New Cuisines:</span> Expand your culinary skills by trying recipes from all over the world.</li>
                <li className='ms-8'><span className='font-semibold'>Personalized Experience:</span> Designed to make cooking accessible for everyone, regardless of experience level.</li>
                <li className='ms-8'><span>Seamless Design:</span> A user-friendly interface ensures that you can focus on cooking rather than navigating through complexities.</li>
            </ul>
            <p className='text-justify'>
                This platform is more than a recipe generator—it's your personal sous-chef, powered by artificial intelligence. Whether you're inspired by a dish you saw at a restaurant, or you want to explore new recipes from the comfort of your home, this tool makes it possible. Embark on a culinary adventure today with your <span className='font-semibold'>AI-Powered Kitchen Assistant</span>—where technology meets taste!
            </p>
        </div>
    )
}

export default About