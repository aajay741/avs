import React, { useState, useEffect } from 'react';
import {
    Image as ImageIcon,
    FileText,
    MessageSquare,
    Eye,
    TrendingUp,
    BarChart3,
    Users,
    AlertCircle,
    ArrowUpRight,
    Clock
} from 'lucide-react';
import { dashboardAPI, authAPI } from '../../api';

const DashboardOverview = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const currentUser = authAPI.getUser();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const result = await dashboardAPI.getStats();
                if (result.success) {
                    setData(result);
                }
            } catch (err) {
                setError('Failed to load dashboard stats: ' + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="dashboard-overview">
                <div className="loading-state" style={{ textAlign: 'center', padding: '80px 0' }}>
                    <div style={{
                        width: 40, height: 40,
                        border: '3px solid var(--border-color)',
                        borderTop: '3px solid var(--primary-blue)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 16px'
                    }} />
                    <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Loading dashboard...</p>
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </div>
            </div>
        );
    }

    const stats = data?.stats || {};
    const recentInquiries = data?.recent_inquiries || [];
    const recentBlogs = data?.recent_blogs || [];

    const statCards = [
        { label: 'Media Files', value: stats.total_media, icon: <ImageIcon size={22} />, color: '#3b82f6', bg: '#eff6ff' },
        { label: 'Blog Posts', value: stats.total_blogs, icon: <FileText size={22} />, color: '#10b981', bg: '#ecfdf5' },
        { label: 'New Inquiries', value: stats.new_inquiries, icon: <MessageSquare size={22} />, color: '#f59e0b', bg: '#fffbeb' },
        { label: 'Total Views', value: stats.total_views, icon: <Eye size={22} />, color: '#8b5cf6', bg: '#f5f3ff' },
    ];

    return (
        <div className="dashboard-overview">
            {/* Welcome */}
            <div className="welcome-section">
                <div>
                    <h1 className="welcome-title">Welcome back, {currentUser?.full_name?.split(' ')[0] || 'Admin'} 👋</h1>
                    <p className="welcome-sub">Here's what's happening with your website today.</p>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, fontSize: 14 }}>
                    <AlertCircle size={16} />
                    <span>{error}</span>
                </div>
            )}

            {/* Stat Cards */}
            <div className="stats-grid">
                {statCards.map((card, i) => (
                    <div key={i} className="stat-card">
                        <div className="stat-card-icon" style={{ background: card.bg, color: card.color }}>
                            {card.icon}
                        </div>
                        <div className="stat-card-info">
                            <span className="stat-card-value">{card.value}</span>
                            <span className="stat-card-label">{card.label}</span>
                        </div>
                        <div className="stat-card-trend">
                            <ArrowUpRight size={16} style={{ color: '#10b981' }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Two Column: Recent Activity */}
            <div className="activity-grid">
                {/* Recent Inquiries */}
                <div className="activity-card">
                    <div className="activity-header">
                        <h3><MessageSquare size={18} /> Recent Inquiries</h3>
                        <span className="badge">{stats.new_inquiries} new</span>
                    </div>
                    <div className="activity-list">
                        {recentInquiries.length === 0 ? (
                            <p className="empty-text">No inquiries yet.</p>
                        ) : recentInquiries.map((inq, i) => (
                            <div key={i} className="activity-item">
                                <div className="activity-avatar" style={{ background: inq.status === 'new' ? '#eff6ff' : '#f1f5f9', color: inq.status === 'new' ? '#3b82f6' : '#64748b' }}>
                                    {inq.name[0]}
                                </div>
                                <div className="activity-details">
                                    <span className="activity-name">{inq.name}</span>
                                    <span className="activity-preview">{inq.message}</span>
                                </div>
                                <div className="activity-meta">
                                    <span className={`status-dot ${inq.status}`} />
                                    <span className="activity-date">{inq.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Blog Posts */}
                <div className="activity-card">
                    <div className="activity-header">
                        <h3><FileText size={18} /> Recent Articles</h3>
                        <span className="badge">{stats.published_blogs} published</span>
                    </div>
                    <div className="activity-list">
                        {recentBlogs.length === 0 ? (
                            <p className="empty-text">No articles yet.</p>
                        ) : recentBlogs.map((blog, i) => (
                            <div key={i} className="activity-item">
                                <div className="activity-avatar" style={{
                                    background: blog.status === 'Published' ? '#dcfce7' : '#f1f5f9',
                                    color: blog.status === 'Published' ? '#166534' : '#64748b'
                                }}>
                                    <FileText size={14} />
                                </div>
                                <div className="activity-details">
                                    <span className="activity-name">{blog.title}</span>
                                    <span className="activity-preview">{blog.views} views • {blog.author}</span>
                                </div>
                                <div className="activity-meta">
                                    <span className={`pub-badge ${blog.status.toLowerCase()}`}>{blog.status}</span>
                                    <span className="activity-date">{blog.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                .dashboard-overview {
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .welcome-section {
                    margin-bottom: 32px;
                }

                .welcome-title {
                    font-size: 1.75rem;
                    font-weight: 800;
                    letter-spacing: -0.5px;
                    margin-bottom: 6px;
                }

                .welcome-sub {
                    color: var(--text-muted);
                    font-size: 15px;
                }

                /* Stat Cards */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 20px;
                    margin-bottom: 32px;
                }

                .stat-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: 24px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    box-shadow: var(--shadow-sm);
                    transition: var(--transition);
                }

                .stat-card:hover {
                    transform: translateY(-2px);
                    box-shadow: var(--shadow-md);
                }

                .stat-card-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .stat-card-info {
                    flex: 1;
                }

                .stat-card-value {
                    display: block;
                    font-size: 24px;
                    font-weight: 800;
                    line-height: 1;
                    margin-bottom: 4px;
                }

                .stat-card-label {
                    font-size: 13px;
                    color: var(--text-muted);
                    font-weight: 500;
                }

                .stat-card-trend {
                    opacity: 0.6;
                }

                /* Activity Grid */
                .activity-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 24px;
                }

                .activity-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: var(--shadow-sm);
                }

                .activity-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px 24px;
                    border-bottom: 1px solid var(--border-color);
                }

                .activity-header h3 {
                    font-size: 15px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .badge {
                    padding: 4px 10px;
                    background: var(--primary-glow);
                    color: var(--primary-blue);
                    border-radius: 30px;
                    font-size: 11px;
                    font-weight: 700;
                }

                .activity-list {
                    padding: 8px 0;
                }

                .activity-item {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 14px 24px;
                    transition: background 0.2s;
                }

                .activity-item:hover {
                    background: var(--bg-portal);
                }

                .activity-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 700;
                    font-size: 13px;
                    flex-shrink: 0;
                }

                .activity-details {
                    flex: 1;
                    min-width: 0;
                }

                .activity-name {
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .activity-preview {
                    display: block;
                    font-size: 12px;
                    color: var(--text-muted);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-top: 2px;
                }

                .activity-meta {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 4px;
                    flex-shrink: 0;
                }

                .activity-date {
                    font-size: 11px;
                    color: var(--text-muted);
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }

                .status-dot.new { background: #3b82f6; }
                .status-dot.read { background: #94a3b8; }
                .status-dot.replied { background: #10b981; }
                .status-dot.archived { background: #f59e0b; }

                .pub-badge {
                    padding: 2px 8px;
                    border-radius: 30px;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                .pub-badge.published { background: #dcfce7; color: #166534; }
                .pub-badge.draft { background: #f1f5f9; color: #475569; }
                .pub-badge.scheduled { background: #eff6ff; color: #1e40af; }

                .empty-text {
                    text-align: center;
                    padding: 32px;
                    color: var(--text-muted);
                    font-size: 14px;
                }

                @media (max-width: 900px) {
                    .activity-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default DashboardOverview;
