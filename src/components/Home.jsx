import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Testimonials from './Testimonials';
import Enquiry from './Enquiry';
import Footer from './Footer';
import MediaAndPanels from './MediaAndPanels';

const Home = () => {
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="app-wrapper">
            <Navbar />
            <main>
                <Hero />
                <Services />
                <About />
                <MediaAndPanels />
                <Testimonials />
                <Enquiry />
            </main>
            <Footer />
        </div>
    );
};

export default Home;
