import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { authAPI } from '../../api';

const ProtectedRoute = ({ children }) => {
    const [checking, setChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            if (!authAPI.isAuthenticated()) {
                setChecking(false);
                return;
            }

            try {
                const result = await authAPI.check();
                setIsAuthenticated(result.success);
            } catch (err) {
                setIsAuthenticated(false);
            } finally {
                setChecking(false);
            }
        };

        verifyAuth();
    }, []);

    if (checking) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8fafc',
                fontFamily: 'Inter, sans-serif'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 40, height: 40,
                        border: '3px solid #e2e8f0',
                        borderTop: '3px solid #3b82f6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }} />
                    <p style={{ color: '#64748b', fontSize: 14 }}>Verifying authentication...</p>
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
