import React from 'react';
import {
    Users, RefreshCw, Lightbulb, CheckCircle2,
    Target, Share2, GraduationCap, Building2,
    Globe, Truck, Camera, Plane, Mic
} from 'lucide-react';

const About = () => {
    const serviceExcellence = [
        {
            icon: <Users size={24} />,
            title: "Business Consulting & Mentorship",
            features: [
                "Personalized coaching and strategic guidance for entrepreneurs and businesses.",
                "Leadership development and corporate mentorship for long-term growth."
            ]
        },
        {
            icon: <RefreshCw size={24} />,
            title: "Organization Transformation & Resources Realignment",
            features: [
                "Restructuring for maximum efficiency and profitability.",
                "Workforce and operational realignment for peak performance."
            ]
        },
        {
            icon: <Lightbulb size={24} />,
            title: "New Business Development & Private Equity",
            features: [
                "Identifying new business opportunities and investment avenues.",
                "Private equity and venture capital advisory for funding and expansion."
            ]
        },
        {
            icon: <Target size={24} />,
            title: "Fund Raising & CxO Placement",
            features: [
                "Connecting businesses with the right investors.",
                "Executive search and leadership hiring for top management roles."
            ]
        },
        {
            icon: <Share2 size={24} />,
            title: "Digital Marketing & Content Creation",
            features: [
                "High-impact digital marketing strategies for brand visibility.",
                "Engaging content creation for social media, blogs, and websites."
            ]
        },
        {
            icon: <GraduationCap size={24} />,
            title: "Training as a Business",
            features: [
                "Corporate training programs and skill development workshops.",
                "Specialized training for leadership, business growth, and industry insights."
            ]
        },
        {
            icon: <Building2 size={24} />,
            title: "Construction Business Opportunities & PMC Services",
            features: [
                "Connecting businesses with lucrative construction projects.",
                "Project Management Consultancy (PMC) services for seamless execution."
            ]
        },
        {
            icon: <Globe size={24} />,
            title: "Sourcing from China & Strategic Sourcing",
            features: [
                "Expert guidance on sourcing high-quality products from China.",
                "Cost-effective strategic sourcing for various industries."
            ]
        },
        {
            icon: <Truck size={24} />,
            title: "Logistics Services & EXIM Trade Disputes Management",
            features: [
                "End-to-end logistics solutions for smooth operations.",
                "Resolving trade disputes and ensuring hassle-free import/export transactions."
            ]
        },
        {
            icon: <Camera size={24} />,
            title: "Divine Event Management & Photo/Video Services",
            features: [
                "Organizing spiritual and divine events with perfection.",
                "Professional photography and videography services for all occasions."
            ]
        },
        {
            icon: <Plane size={24} />,
            title: "Airport-to-Airport Spiritual Services",
            features: [
                "Exclusive spiritual travel services for devotees and pilgrims.",
                "Hassle-free arrangements from departure to destination."
            ]
        },
        {
            icon: <Mic size={24} />,
            title: "Visiting Faculty & Corporate Training",
            features: [
                "Expert faculty for academic institutions and corporate training programs.",
                "Industry-focused insights to enhance learning and professional growth."
            ]
        }
    ];

    return (
        <section id="about" style={{ padding: '40px 0', background: '#f8fbff' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                {/* Section Heading */}
                <h2 className="hero-title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '10px', textTransform: 'uppercase' }}>
                    About Us
                </h2>
                <div style={{ width: '60px', height: '4px', background: 'var(--primary-orange)', margin: '0 auto 15px auto' }}></div>

                {/* Nature of Business */}
                <p style={{
                    color: 'var(--primary-orange)',
                    fontWeight: '800',
                    fontSize: 'clamp(0.85rem, 2.5vw, 1.1rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    marginBottom: '25px'
                }}>
                    Nature of Business: Consultancy Services
                </p>

                {/* Main Card */}
                <div className="reveal active" style={{
                    maxWidth: '1200px',
                    margin: '0 auto 40px auto',
                    background: '#fff',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                    padding: 'clamp(25px, 5vw, 40px) clamp(20px, 5vw, 45px)',
                    position: 'relative',
                    borderTop: '6px solid var(--primary-orange)',
                    textAlign: 'left'
                }}>
                    <div className="grid grid-2" style={{ gap: '30px', alignItems: 'center' }}>
                        <div>
                            <h3 className="hero-title" style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', marginBottom: '8px' }}>
                                AVS BUSINESS MANAGEMENT CONSULTANTS
                            </h3>
                            <div style={{
                                color: 'var(--primary-orange)',
                                fontSize: '0.9rem',
                                fontWeight: '900',
                                letterSpacing: '2px',
                                marginBottom: '20px',
                                textTransform: 'uppercase'
                            }}>The Business Doctor</div>
                            <p style={{
                                color: '#555',
                                fontSize: '1rem',
                                lineHeight: '1.7',
                                marginBottom: '20px'
                            }}>
                                Led by <strong>Dr. Krishnan Sampath</strong>, a CxO level professional and <strong>Indian Air Force Veteran</strong> with over 40 years of multi-domain experience. We specialize in driving business success through expert consulting, mentorship, and strategic transformation.
                            </p>
                            <p style={{
                                color: '#555',
                                fontSize: '1rem',
                                lineHeight: '1.7'
                            }}>
                                From managing procurement budgets of over <strong>9000 Crores</strong> to leading organizational transformations in the construction and capital equipment industries, our expertise is built on a foundation of ethical practices and operational excellence.
                            </p>
                        </div>
                        <div style={{ background: '#f8fbff', padding: '25px', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)' }}>
                            <h4 style={{ color: 'var(--dark-blue)', marginBottom: '15px', fontSize: '1.2rem' }}>Academic & Professional Excellence</h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <li style={{ display: 'flex', gap: '12px', fontSize: '0.95rem' }}>
                                    <CheckCircle2 size={18} style={{ color: 'var(--primary-orange)', flexShrink: 0 }} />
                                    <span><strong>PhD</strong> in Construction Supply Chain Management</span>
                                </li>
                                <li style={{ display: 'flex', gap: '12px', fontSize: '0.95rem' }}>
                                    <CheckCircle2 size={18} style={{ color: 'var(--primary-orange)', flexShrink: 0 }} />
                                    <span><strong>IIM Calcutta Alumnus</strong> (Senior Management Program)</span>
                                </li>
                                <li style={{ display: 'flex', gap: '12px', fontSize: '0.95rem' }}>
                                    <CheckCircle2 size={18} style={{ color: 'var(--primary-orange)', flexShrink: 0 }} />
                                    <span><strong>Fellow</strong>, Indian Institute of Materials Management</span>
                                </li>
                                <li style={{ display: 'flex', gap: '12px', fontSize: '0.95rem' }}>
                                    <CheckCircle2 size={18} style={{ color: 'var(--primary-orange)', flexShrink: 0 }} />
                                    <span><strong>MBA, M.Phil, M.A</strong> - Multi-disciplinary Academic Background</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Personal Journey Section */}
                <div id="journey" className="reveal active" style={{
                    marginTop: '60px',
                    textAlign: 'left',
                    maxWidth: '1200px',
                    margin: '40px auto 0 auto',
                    padding: '0 20px'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                        <h3 className="hero-title" style={{ fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)', color: 'var(--dark-blue)', marginBottom: '8px' }}>
                            A Journey of a Soldier
                        </h3>
                        <p style={{ color: 'var(--primary-orange)', fontWeight: '800', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
                            Once a Soldier... Always a Soldier
                        </p>
                        <div style={{ width: '50px', height: '4px', background: 'var(--primary-orange)', margin: '15px auto' }}></div>
                    </div>

                    <div className="grid grid-2" style={{ gap: '30px' }}>
                        <div style={{ background: '#fff', padding: 'clamp(20px, 4vw, 30px)', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                            <h4 style={{ color: 'var(--primary-orange)', marginBottom: '15px', fontWeight: '800', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>MY AIRFORCE CAREER</h4>
                            <p style={{ color: '#444', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '15px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                                "Some journeys begin with ambition. Mine began with duty. At eighteen, I wore a uniform. Not knowing where life would take me. Only knowing that service came first."
                            </p>
                            <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '15px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                                I spent sixteen years in the <strong>Indian Air Force</strong>. As an airman, a logistician—worked with stores, inventory, audits, and procurement—the unseen work that keeps everything else moving.
                            </p>
                            <p style={{ color: '#555', lineHeight: '1.7', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                                The Air Force shaped how I think. <strong>Be precise. Be accountable. Do the job — even when no one is watching.</strong>
                            </p>
                        </div>

                        <div style={{ background: '#fff', padding: 'clamp(20px, 4vw, 30px)', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                            <h4 style={{ color: 'var(--primary-orange)', marginBottom: '15px', fontWeight: '800', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)' }}>THE TRANSITION & BUILDING SCALE</h4>
                            <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '15px', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                                Civilian life—no ranks to rely on. I began in stores at Axles India, then TVS Logistics. Construction changed my perspective. At <strong>Leighton Contractors, M+W, L&W, E&T, Mtandt, and Swastik</strong>... the stakes grew larger, but responsibility mattered more than numbers.
                            </p>
                            <p style={{ color: '#555', lineHeight: '1.7', fontSize: 'clamp(0.85rem, 2vw, 0.95rem)' }}>
                                Procurement was no longer just about materials. It was about trust, judgement, and decisions that shaped outcomes. <strong>The uniform changed. The purpose did not.</strong>
                            </p>
                        </div>
                    </div>

                    {/* LinkedIn Style Insights Section */}
                    <div style={{ marginTop: '40px', textAlign: 'center' }}>
                        <h3 className="hero-title" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', marginBottom: '30px' }}>LinkedIn Post</h3>
                        <div className="grid grid-3" style={{ gap: '30px' }}>
                            {/* AI Post */}
                            <a href="https://www.linkedin.com/feed/update/urn:li:activity:7425377584265428993/?originTrackingId=MTZ2Qmu85j%2FiQXKIB2r2Ew%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: '#fff',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    textAlign: 'left',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                                }}>
                                <img src="/src/assets/Ai image.jpg" alt="AI Reflection" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                                <div style={{ padding: '25px', flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                        <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'var(--primary-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800' }}>K</div>
                                        <div>
                                            <p style={{ margin: 0, fontWeight: '700', fontSize: '0.9rem', color: 'var(--dark-blue)' }}>Prof (Dr) Krishnan Sampath</p>
                                            <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>LinkedIn Insight</p>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: '1.6', fontWeight: '600' }}>
                                        AI - what more damages you will do??!!
                                    </p>
                                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.6' }}>
                                        Scary. But will human mind and its survival instinct overcome this challenge?
                                    </p>
                                </div>
                            </a>

                            {/* Tragedy of Commons Post */}
                            <a href="https://www.linkedin.com/feed/update/urn:li:activity:7426939329421393920/?originTrackingId=MjCDRcy082ENMGTArtpTAg%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    display: 'block',
                                    background: '#fff',
                                    borderRadius: '15px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    textAlign: 'left',
                                    padding: '25px',
                                    borderTop: '4px solid #0077b5',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                                }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                    <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: '#0077b5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800' }}>K</div>
                                    <div>
                                        <p style={{ margin: 0, fontWeight: '700', fontSize: '0.9rem', color: 'var(--dark-blue)' }}>The Business Doctor</p>
                                        <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>Leadership Series</p>
                                    </div>
                                </div>
                                <h5 style={{ fontSize: '0.95rem', marginBottom: '12px', color: 'var(--dark-blue)', fontWeight: '800', lineHeight: '1.4' }}>
                                    Protecting What We Share – A Team Reflection Inspired by Hardin’s “Tragedy of the Commons”
                                </h5>
                                <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: '1.5', marginBottom: '10px' }}>
                                    "When individuals act only in their self-interest, the shared resource gets depleted—broken trust, burnout, and missed opportunities."
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#555', fontWeight: '700', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                                    Question: "What am I doing that strengthens our shared field?"
                                </p>
                            </a>

                            {/* Shared Field Reflection Post */}
                            <a href="https://www.linkedin.com/feed/update/urn:li:activity:7423915938762350592/?originTrackingId=ohYu%2FZ9vdzpsaKBdn1XGfg%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    textDecoration: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    background: '#fff',
                                    borderRadius: '15px',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                                    textAlign: 'left',
                                    padding: '25px',
                                    borderTop: '4px solid var(--primary-orange)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                                }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                    <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'var(--primary-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800' }}>K</div>
                                    <div>
                                        <p style={{ margin: 0, fontWeight: '700', fontSize: '0.9rem', color: 'var(--dark-blue)' }}>Prof (Dr) Krishnan Sampath</p>
                                        <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>Leadership Series</p>
                                    </div>
                                </div>
                                <h5 style={{ fontSize: '0.95rem', marginBottom: '12px', color: 'var(--dark-blue)', fontWeight: '800', lineHeight: '1.4' }}>
                                    Protecting What We Share – A Team Reflection Inspired by Hardin’s “Tragedy of the Commons”
                                </h5>
                                <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: '1.6', marginBottom: '10px' }}>
                                    🌾 <strong>Imagine This:</strong> We’re all part of a team, working in a shared field. This field isn’t made of grass—it’s made of trust, time, energy, and opportunity.
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#555', lineHeight: '1.6' }}>
                                    Every day, we bring our “cattle”—our ideas, our efforts, our ambitions—and let them graze.
                                </p>
                            </a>
                        </div>

                        {/* View More Button */}
                        <div style={{ textAlign: 'center', marginTop: '35px' }}>
                            <a
                                href="https://www.linkedin.com/in/krishsam/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: '#0077b5',
                                    color: 'white',
                                    padding: '14px 30px',
                                    borderRadius: '12px',
                                    textDecoration: 'none',
                                    fontWeight: '800',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    boxShadow: '0 4px 15px rgba(0, 119, 181, 0.3)',
                                    transition: '0.3s'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 119, 181, 0.4)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 119, 181, 0.3)';
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                                View More on LinkedIn
                            </a>
                        </div>
                    </div>

                    <div style={{ background: 'var(--dark-blue)', color: 'white', padding: 'clamp(25px, 5vw, 35px) clamp(20px, 5vw, 30px)', borderRadius: '30px', marginTop: '30px', position: 'relative', overflow: 'hidden' }}>
                        <div className="grid grid-2" style={{ gap: '30px' }}>
                            <div>
                                <h4 style={{ color: 'var(--primary-orange)', marginBottom: '15px', fontWeight: '800', fontSize: 'clamp(0.85rem, 2.2vw, 1rem)' }}>THE ENTREPRENEURIAL REALITY</h4>
                                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '0', fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>
                                    Along the way, I attempted eleven startups. <strong>None of them worked.</strong> But failure has a way of teaching what success never can—humility, sharpens judgement, and strengthens character.
                                </p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--primary-orange)', marginBottom: '15px', fontWeight: '800', fontSize: 'clamp(0.85rem, 2.2vw, 1rem)' }}>TODAY</h4>
                                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', fontSize: 'clamp(0.85rem, 2vw, 0.9rem)' }}>
                                    Today, I don't measure life by designations. I have been an airman, a logistics professional, a corporate leader, and an entrepreneur. <strong>Each phase added something. None of them were wasted.</strong>
                                </p>
                            </div>
                        </div>

                        <div style={{ marginTop: '25px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                            <h4 style={{ textAlign: 'center', color: 'var(--primary-orange)', marginBottom: '15px', fontWeight: '800', fontSize: '0.9rem' }}>GRATITUDE & CONTINUED SERVICE 🇮🇳</h4>
                            <div className="grid grid-3" style={{ gap: '20px', textAlign: 'center' }}>
                                <div>
                                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>TO THE FOUNDATION</p>
                                    <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Parents & Indian Air Force</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>TO THE MENTORS</p>
                                    <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Prof Panchanatham Natarajan & Academic Institutions</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>TO THE ANCHORS</p>
                                    <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Wife, Friends & Colleagues</p>
                                </div>
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '35px' }}>
                                <p style={{ fontStyle: 'italic', fontSize: '1.2rem', color: 'white', marginBottom: '8px' }}>
                                    "I am a fighter. And once a soldier… always a soldier."
                                </p>
                                <p style={{ fontWeight: '900', color: 'var(--primary-orange)', fontSize: '1.1rem', letterSpacing: '2px' }}>
                                    Prof (Dr) Krishnan Sampath
                                </p>
                                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginTop: '5px', textTransform: 'uppercase', letterSpacing: '4px' }}>
                                    A Soldier For Life..
                                </p>
                                <div style={{
                                    marginTop: '20px',
                                    padding: '10px 20px',
                                    border: '1px solid var(--primary-orange)',
                                    display: 'inline-block',
                                    borderRadius: '4px',
                                    color: 'var(--primary-orange)',
                                    fontWeight: '800',
                                    fontSize: '0.8rem',
                                    letterSpacing: '2px'
                                }}>
                                    THE BUSINESS DOCTOR
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Service Excellence Section */}
                <div style={{ marginTop: '40px' }}>
                    <h3 className="hero-title" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.1rem)', marginBottom: '40px' }}>
                        Our Service Excellence
                    </h3>

                    <div className="grid grid-3" style={{ gap: '30px' }}>
                        {serviceExcellence.map((service, index) => (
                            <div key={index} className="reveal active" style={{
                                background: '#fff',
                                borderRadius: '25px',
                                padding: '25px',
                                textAlign: 'left',
                                boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '15px',
                                height: '100%'
                            }}>
                                {/* Icon Container */}
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: 'var(--dark-blue)',
                                    color: 'white',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h4 className="font-serif" style={{
                                    fontSize: '1.25rem',
                                    color: 'var(--dark-blue)',
                                    lineHeight: '1.3',
                                    fontWeight: '800',
                                    minHeight: '3.4rem'
                                }}>
                                    {service.title}
                                </h4>

                                {/* Features List */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    {service.features.map((feature, fIndex) => (
                                        <div key={fIndex} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                            <CheckCircle2 size={18} style={{ color: 'var(--primary-orange)', flexShrink: 0, marginTop: '2px' }} />
                                            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.4' }}>
                                                {feature}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Banner */}
                <div className="reveal active" style={{
                    marginTop: '40px',
                    background: 'var(--dark-blue)',
                    borderRadius: '25px',
                    padding: 'clamp(30px, 6vw, 45px) clamp(20px, 5vw, 30px)',
                    textAlign: 'center',
                    boxShadow: '0 20px 50px rgba(10, 29, 55, 0.2)'
                }}>
                    <p style={{
                        color: 'white',
                        fontSize: '1.1rem',
                        lineHeight: '1.6',
                        maxWidth: '900px',
                        margin: '0 auto 30px auto',
                        fontWeight: '400'
                    }}>
                        At AVS BUSINESS MANAGEMENT CONSULTANTS, we believe in innovation, excellence, and strategic growth to
                        help businesses thrive in a competitive landscape. Let's collaborate and take your business to the next level!
                    </p>
                    <p style={{
                        color: 'var(--primary-orange)',
                        fontSize: '1.4rem',
                        fontWeight: '800',
                        marginBottom: '40px',
                        fontFamily: 'Playfair Display, serif'
                    }}>
                        Contact us today to explore endless possibilities!
                    </p>
                    <a href="#enquiry" className="nav-btn-orange" style={{
                        padding: '15px 40px',
                        fontSize: '1rem'
                    }}>
                        GET IN TOUCH
                    </a>
                </div>
            </div>
        </section>
    );
};

export default About;
