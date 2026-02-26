import React from 'react';
import { Camera, FileText, BookOpen, UserCheck, ShieldCheck, Globe } from 'lucide-react';

const MediaAndPanels = () => {
    const [dynamicMedia, setDynamicMedia] = React.useState([]);

    React.useEffect(() => {
        const savedMedia = localStorage.getItem('site_media');
        if (savedMedia) {
            setDynamicMedia(JSON.parse(savedMedia));
        }
    }, []);

    const mediaItems = [
        {
            icon: <Camera size={28} />,
            title: "Photos & Videos",
            description: "Visual documentation of Prof (Dr) Krishnan Sampath's corporate leadership, site visits, and international business engagements.",
            color: "#4A90E2",
            link: "https://www.linkedin.com/in/krishsam/recent-activity/images/"
        },
        {
            icon: <FileText size={28} />,
            title: "Articles & Case Stories",
            description: "Insights on SCM requirements, CaaS (Construction As A Service), and Succession Case Stories in Equipment Rental.",
            color: "#50E3C2",
            link: "https://www.linkedin.com/in/krishsam/recent-activity/articles/"
        },
        {
            icon: <BookOpen size={28} />,
            title: "Reactions",
            description: "Published works on Construction SCM Risk Factors, Responsive Bidding, and Global Production Challenges.",
            color: "#F5A623",
            link: "https://www.linkedin.com/in/krishsam/recent-activity/reactions/"
        }
    ];

    const panels = [
        {
            icon: <UserCheck size={32} />,
            title: "Executive Panels",
            description: "Guided by Dr. Sampath's expertise as a PhD, IIM Calcutta Alumnus, and Fellow of IIMM.",
            count: "Strategic Leadership"
        },
        {
            icon: <ShieldCheck size={32} />,
            title: "Advisory & Boards",
            description: "Providing high-level counsel for organization transformation and resources realignment.",
            count: "The Business Doctor"
        },
        {
            icon: <Globe size={32} />,
            title: "Global Network",
            description: "Member of Institute of Supply Management and Eurasia Research (TERA).",
            count: "Global Insights"
        }
    ];

    const memberships = [
        "Fellow, Indian Institute of Materials Management (IIMM)",
        "Alumnus, IIM Calcutta (Senior Management Program)",
        "Life Member, All India Management Association (AIMA)",
        "Life Member, Madras Management Association (MMA)",
        "Member, Institute of Supply Management",
        "Former Charter Member, RICS & CILT India",
        "Life Member, Institute of Rail Transport (Govt. of India)"
    ];

    const publications = [
        { title: "SCM – The unanswered requirements yet..", platform: " click to Open Read", link: "https://www.linkedin.com/pulse/scm-unanswered-requirements-yet-cesl-training/" },
        { title: "CaaS - Construction As A Service", platform: "click to Open Read", link: "https://www.linkedin.com/pulse/caas-construction-service-e-and-t-construction-krishnan/?trackingId=eGc2Yq4wQ0uA0ZIWBc0z1g%3D%3D/" },
        { title: "Risk Management in Construction Supply Process", platform: "click to Open Read", link: "https://www.linkedin.com/pulse/risk-management-construction-supply-process-dr-krishnan-/" },
        { title: "Leadership Storyboard for Business Enterprises Lessons", platform: "click to Open Read", link: "https://www.linkedin.com/pulse/leadership-storyboard-business-enterprises-lessons-from-sampath-h9flc/?trackingId=eGc2Yq4wQ0uA0ZIWBc0z1g%3D%3D/" },
        { title: "Case Study: Navigating Digital Transformation at", platform: "click to Open Read", link: "https://www.linkedin.com/pulse/case-study-navigating-digital-transformation-krishnan-mbhjc/?trackingId=eGc2Yq4wQ0uA0ZIWBc0z1g%3D%3D/" },
        { title: "Succession Case Story - Construction Equipment Rental", platform: "click to Open Read", link: "https://www.linkedin.com/pulse/succession-case-story-construction-equipment-rental-krishnan-oq0mc/?trackingId=eGc2Yq4wQ0uA0ZIWBc0z1g%3D%3D/" }
    ];

    return (
        <section id="media" style={{ padding: '40px 0', background: '#ffffff' }}>
            <div className="container">
                {/* Media Section */}
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                    <p style={{
                        color: 'var(--primary-orange)',
                        fontWeight: '800',
                        fontSize: '0.9rem',
                        letterSpacing: '3px',
                        marginBottom: '10px'
                    }}>
                        KNOWLEDGE HUB
                    </p>
                    <h2 className="hero-title" style={{ fontSize: '2.8rem', marginBottom: '10px' }}>
                        Media & Resources
                    </h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--primary-orange)', margin: '0 auto 25px auto' }}></div>

                    <div className="grid grid-3" style={{ gap: '25px', marginTop: '20px' }}>
                        {mediaItems.map((item, index) => (
                            item.link ? (
                                <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="reveal active" style={{
                                    background: '#f8fbff',
                                    borderRadius: '25px',
                                    padding: '30px 25px',
                                    textAlign: 'center',
                                    transition: 'var(--transition)',
                                    border: '1px solid rgba(0,0,0,0.03)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'block',
                                    textDecoration: 'none'
                                }} onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                                }} onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>
                                    <div style={{
                                        width: '70px',
                                        height: '70px',
                                        borderRadius: '20px',
                                        background: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 30px auto',
                                        color: 'var(--primary-orange)',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--dark-blue)', fontWeight: '800' }}>
                                        {item.title}
                                    </h4>
                                    <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                        {item.description}
                                    </p>
                                </a>
                            ) : (
                                <div key={index} className="reveal active" style={{
                                    background: '#f8fbff',
                                    borderRadius: '25px',
                                    padding: '30px 25px',
                                    textAlign: 'center',
                                    transition: 'var(--transition)',
                                    border: '1px solid rgba(0,0,0,0.03)',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }} onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
                                }} onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}>
                                    <div style={{
                                        width: '70px',
                                        height: '70px',
                                        borderRadius: '20px',
                                        background: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 30px auto',
                                        color: 'var(--primary-orange)',
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                                    }}>
                                        {item.icon}
                                    </div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--dark-blue)', fontWeight: '800' }}>
                                        {item.title}
                                    </h4>
                                    <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>
                                        {item.description}
                                    </p>
                                </div>
                            )
                        ))}
                    </div>

                    {/* Enhanced Publications List */}
                    <div style={{ marginTop: '25px', textAlign: 'left', background: '#eff4f8', padding: '30px', borderRadius: '25px' }}>
                        <h4 style={{ marginBottom: '20px', color: 'var(--dark-blue)', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <FileText style={{ color: 'var(--primary-orange)' }} size={24} /> Publications & Featured Articles
                        </h4>
                        <div className="grid grid-2" style={{ gap: '25px' }}>
                            {[...publications, ...(JSON.parse(localStorage.getItem('site_blogs')) || [])
                                .filter(b => b.status === 'Published')
                                .map(b => ({ title: b.title, platform: b.category, link: '#' }))
                            ].map((pub, i) => (
                                <a key={i} href={pub.link} target="_blank" rel="noopener noreferrer" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderLeft: '3px solid var(--primary-orange)',
                                    background: 'white',
                                    padding: '15px 20px',
                                    borderRadius: '12px',
                                    boxShadow: '0 5px 15px rgba(0,0,0,0.02)',
                                    textDecoration: 'none',
                                    transition: '0.3s'
                                }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-3px)';
                                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.05)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.02)';
                                    }}
                                >
                                    <span style={{ color: 'var(--dark-blue)', fontWeight: '700', fontSize: '1rem', marginBottom: '5px' }}>{pub.title}</span>
                                    <span style={{ color: 'var(--primary-orange)', fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase' }}>{pub.platform}</span>
                                </a>
                            ))}
                        </div>

                        {/* More Articles Button */}
                        <div style={{ textAlign: 'center', marginTop: '30px' }}>
                            <a
                                href="https://www.linkedin.com/in/krishsam/recent-activity/articles/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: 'var(--primary-orange)',
                                    color: 'white',
                                    padding: '12px 30px',
                                    borderRadius: '50px',
                                    textDecoration: 'none',
                                    fontWeight: '800',
                                    fontSize: '0.9rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    boxShadow: '0 4px 15px rgba(255, 115, 0, 0.3)',
                                    transition: '0.3s'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 115, 0, 0.4)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 115, 0, 0.3)';
                                }}
                            >
                                More Articles
                            </a>
                        </div>
                    </div>
                </div>

                {/* Dynamic Media Gallery from Admin */}
                <div style={{ marginTop: '80px', textAlign: 'center' }}>
                    <p style={{
                        color: 'var(--primary-orange)',
                        fontWeight: '800',
                        fontSize: '0.9rem',
                        letterSpacing: '3px',
                        marginBottom: '10px'
                    }}>
                        EXPLORE GALLERY
                    </p>
                    <h2 className="hero-title" style={{ fontSize: '2.8rem', marginBottom: '10px' }}>
                        Recent Photos & Videos
                    </h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--primary-orange)', margin: '0 auto 40px auto' }}></div>

                    <div className="grid grid-4" style={{ gap: '20px' }}>
                        {dynamicMedia.length > 0 ? (
                            dynamicMedia.map((item) => (
                                <div key={item.id} className="reveal active" style={{
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    background: '#f8fafc',
                                    border: '1px solid #e2e8f0',
                                    transition: '0.3s',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{ height: '180px', overflow: 'hidden', background: '#e2e8f0' }}>
                                        {item.type === 'image' ? (
                                            <img src={item.url} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : item.type === 'video' ? (
                                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--dark-blue)', color: 'white' }}>
                                                <Camera size={40} />
                                            </div>
                                        ) : (
                                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', color: 'var(--primary-orange)' }}>
                                                <FileText size={40} />
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: '15px', textAlign: 'left' }}>
                                        <p style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--dark-blue)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--primary-orange)', fontWeight: '800', textTransform: 'uppercase' }}>{item.tag}</span>
                                            <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>{item.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', padding: '40px', background: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1', color: '#64748b' }}>
                                <p>No recent media items found. Upload images in the Admin Panel to show them here.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Professional Memberships Section */}
                <div style={{ marginTop: '80px', textAlign: 'center' }}>
                    <p style={{
                        color: 'var(--primary-orange)',
                        fontWeight: '800',
                        fontSize: '0.9rem',
                        letterSpacing: '3px',
                        marginBottom: '10px'
                    }}>
                        OUR NETWORK
                    </p>
                    <h2 className="hero-title" style={{ fontSize: '2.8rem', marginBottom: '10px' }}>
                        Professional Associations
                    </h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--primary-orange)', margin: '0 auto 30px auto' }}></div>

                    <div className="grid grid-3" style={{ gap: '25px', marginBottom: '40px' }}>
                        {panels.map((panel, index) => (
                            <div key={index} className="reveal active" style={{
                                background: 'var(--dark-blue)',
                                borderRadius: '30px',
                                padding: '35px 30px',
                                color: 'white',
                                position: 'relative',
                                textAlign: 'left',
                                overflow: 'hidden',
                                boxShadow: '0 20px 40px rgba(10, 29, 55, 0.15)'
                            }}>
                                <div style={{ color: 'var(--primary-orange)', marginBottom: '20px' }}>
                                    {panel.icon}
                                </div>
                                <h4 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '15px', fontWeight: '800' }}>
                                    {panel.title}
                                </h4>
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                    {panel.description}
                                </p>
                                <div style={{
                                    marginTop: '20px',
                                    display: 'inline-block',
                                    padding: '6px 15px',
                                    background: 'rgba(255, 115, 0, 0.1)',
                                    borderRadius: '100px',
                                    fontSize: '0.8rem',
                                    fontWeight: '700',
                                    color: 'var(--primary-orange)',
                                    border: '1px solid rgba(255, 115, 0, 0.2)'
                                }}>
                                    {panel.count}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detailed Memberships List */}
                    <div style={{ background: '#f8fbff', padding: '35px', borderRadius: '30px', border: '1px solid rgba(10, 29, 55, 0.05)' }}>
                        <div className="grid grid-2" style={{ gap: '20px', textAlign: 'left' }}>
                            {memberships.map((member, i) => (
                                <div key={i} style={{ display: 'flex', gap: '12px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-orange)', marginTop: '6px', flexShrink: 0 }}></div>
                                    <span style={{ color: 'var(--dark-blue)', fontSize: '0.9rem', fontWeight: '600', lineHeight: '1.4' }}>{member}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MediaAndPanels;
