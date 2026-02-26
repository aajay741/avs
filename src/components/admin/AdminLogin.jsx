import React, { useState } from 'react';
import { Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for real auth logic
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="login-card reveal active">
                <div className="login-header">
                    <div className="icon-circle">
                        <ShieldCheck size={32} />
                    </div>
                    <h1>Admin Portal</h1>
                    <p>Secure access for Aerosafe Management</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <User className="input-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Username"
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Login to Dashboard <ArrowRight size={18} />
                    </button>
                </form>

                <div className="login-footer">
                    <p>© 2026 Aerosafe Travel & Tourism. All rights reserved.</p>
                </div>
            </div>

            <style>{`
                .admin-login-container {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: radial-gradient(circle at 0% 0%, #0a192f 0%, #020617 100%);
                    font-family: 'Inter', sans-serif;
                    padding: 20px;
                }

                .login-card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 40px;
                    border-radius: 24px;
                    width: 100%;
                    max-width: 450px;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .login-header {
                    text-align: center;
                    margin-bottom: 35px;
                }

                .icon-circle {
                    width: 64px;
                    height: 64px;
                    background: linear-gradient(135deg, #1e40af, #3b82f6);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    color: white;
                    box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4);
                }

                .login-header h1 {
                    color: white;
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 8px;
                    letter-spacing: -0.5px;
                }

                .login-header p {
                    color: #94a3b8;
                    font-size: 14px;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .input-group {
                    position: relative;
                }

                .input-icon {
                    position: absolute;
                    left: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #64748b;
                    transition: color 0.3s ease;
                }

                .input-group input {
                    width: 100%;
                    padding: 16px 16px 16px 48px;
                    background: rgba(0, 0, 0, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    color: white;
                    font-size: 15px;
                    transition: all 0.3s ease;
                    outline: none;
                }

                .input-group input:focus {
                    border-color: #3b82f6;
                    background: rgba(0, 0, 0, 0.3);
                    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
                }

                .input-group input:focus + .input-icon {
                    color: #3b82f6;
                }

                .login-button {
                    background: linear-gradient(135deg, #1e40af, #3b82f6);
                    color: white;
                    border: none;
                    padding: 16px;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 16px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: all 0.3s ease;
                    margin-top: 10px;
                }

                .login-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px -5px rgba(59, 130, 246, 0.5);
                }

                .login-footer {
                    margin-top: 35px;
                    text-align: center;
                }

                .login-footer p {
                    color: #475569;
                    font-size: 12px;
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;
