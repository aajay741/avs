import React, { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { inquiriesAPI } from '../api';

const Enquiry = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Phone validation - only allow numeric and + - characters
        if (name === 'phone') {
            const cleaned = value.replace(/[^0-9+\-\s]/g, '');
            setFormData(prev => ({ ...prev, [name]: cleaned }));
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');

        try {
            const result = await inquiriesAPI.submit(formData);
            if (result.success) {
                setSubmitted(true);
                setFormData({ full_name: '', email: '', phone: '', message: '' });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                setError(result.errors?.join(', ') || 'Submission failed');
            }
        } catch (err) {
            setError('Unable to submit. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="enquiry" style={{ padding: 'clamp(30px, 6vw, 40px) 0', background: '#f8fbff' }}>
            <div className="container">
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: 'clamp(15px, 3vw, 20px)' }}>
                    <h2 className="hero-title" style={{
                        fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                        color: 'var(--dark-blue)',
                        marginBottom: '8px'
                    }}>
                        Get In Touch
                    </h2>
                    <div style={{ width: '60px', height: '4px', background: 'var(--primary-orange)', margin: '0 auto' }}></div>
                </div>

                {/* Success Message */}
                {submitted && (
                    <div style={{
                        maxWidth: '1000px',
                        margin: '0 auto 20px',
                        background: '#dcfce7',
                        border: '1px solid #bbf7d0',
                        color: '#166534',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '15px',
                        fontWeight: '600'
                    }}>
                        <CheckCircle size={20} />
                        Your inquiry has been submitted successfully! We will get back to you soon.
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div style={{
                        maxWidth: '1000px',
                        margin: '0 auto 20px',
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                {/* Form Card - Two Column Layout */}
                <div className="reveal active" style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    background: '#fff',
                    borderRadius: '20px',
                    padding: 'clamp(25px, 5vw, 35px) clamp(20px, 5vw, 40px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.03)'
                }}>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(20px, 4vw, 30px)' }}>
                        {/* Left Column - Contact Fields */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(15px, 3vw, 18px)' }}>
                            {/* Full Name */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontWeight: '800', fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)', color: 'var(--dark-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    placeholder="Dr. John Doe"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    required
                                    disabled={submitting}
                                    style={{
                                        padding: 'clamp(10px, 2.5vw, 12px) clamp(14px, 3vw, 16px)',
                                        borderRadius: '10px',
                                        border: '1px solid #e0e0e0',
                                        background: '#fafafa',
                                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                        outline: 'none',
                                        color: '#333',
                                        transition: '0.3s'
                                    }}
                                />
                            </div>

                            {/* Email Address */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontWeight: '800', fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)', color: 'var(--dark-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={submitting}
                                    style={{
                                        padding: 'clamp(10px, 2.5vw, 12px) clamp(14px, 3vw, 16px)',
                                        borderRadius: '10px',
                                        border: '1px solid #e0e0e0',
                                        background: '#fafafa',
                                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                        outline: 'none',
                                        color: '#333',
                                        transition: '0.3s'
                                    }}
                                />
                            </div>

                            {/* Phone Number */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontWeight: '800', fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)', color: 'var(--dark-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="+91-0000000000"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    disabled={submitting}
                                    style={{
                                        padding: 'clamp(10px, 2.5vw, 12px) clamp(14px, 3vw, 16px)',
                                        borderRadius: '10px',
                                        border: '1px solid #e0e0e0',
                                        background: '#fafafa',
                                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                        outline: 'none',
                                        color: '#333',
                                        transition: '0.3s'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Right Column - Message & Submit */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(15px, 3vw, 18px)' }}>
                            {/* Message */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                                <label style={{ fontWeight: '800', fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)', color: 'var(--dark-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Message</label>
                                <textarea
                                    name="message"
                                    placeholder="How can we assist you?"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    disabled={submitting}
                                    style={{
                                        padding: 'clamp(10px, 2.5vw, 12px) clamp(14px, 3vw, 16px)',
                                        borderRadius: '10px',
                                        border: '1px solid #e0e0e0',
                                        background: '#fafafa',
                                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                        outline: 'none',
                                        color: '#333',
                                        resize: 'none',
                                        fontFamily: 'inherit',
                                        flex: 1,
                                        minHeight: 'clamp(120px, 20vw, 140px)',
                                        transition: '0.3s'
                                    }}
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={submitting}
                                style={{
                                    background: 'var(--primary-orange)',
                                    color: 'white',
                                    border: 'none',
                                    padding: 'clamp(12px, 3vw, 14px)',
                                    borderRadius: '10px',
                                    fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                                    fontWeight: '800',
                                    cursor: submitting ? 'not-allowed' : 'pointer',
                                    transition: '0.3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    boxShadow: '0 4px 15px rgba(255, 115, 0, 0.2)',
                                    opacity: submitting ? 0.7 : 1
                                }}
                                onMouseOver={(e) => {
                                    if (!submitting) {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(255, 115, 0, 0.3)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 15px rgba(255, 115, 0, 0.2)';
                                }}
                            >
                                {submitting ? (
                                    <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> SENDING...</>
                                ) : (
                                    <><Send size={18} /> SEND MESSAGE</>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <style>{`
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </section>
    );
};

export default Enquiry;
