import React, { useState } from 'react';
import {
    Plus,
    Search,
    Edit3,
    Trash2,
    Eye,
    Calendar,
    User as UserIcon,
    ArrowUpDown,
    MoreVertical,
    CheckCircle,
    Clock,
    FileText,
    Filter
} from 'lucide-react';

const BlogManagement = () => {
    const [blogs, setBlogs] = useState(() => {
        const saved = localStorage.getItem('site_blogs');
        return saved ? JSON.parse(saved) : [
            { id: 1, title: 'Top 10 Hidden Gems in Bali', status: 'Published', date: 'Oct 24, 2025', author: 'Arun Kumar', views: '1,240', category: 'Travel Guide' },
            { id: 2, title: 'Umrah 2026: Complete Preparation Guide', status: 'Draft', date: 'Oct 20, 2025', author: 'Admin', views: '0', category: 'Umrah' },
            { id: 3, title: 'European Summer: A 15-Day Itinerary', status: 'Published', date: 'Oct 15, 2025', author: 'Sara Ali', views: '3,850', category: 'Special Tours' },
            { id: 4, title: 'Luxury Stays in the Heart of Dubai', status: 'Scheduled', date: 'Nov 02, 2025', author: 'Arun Kumar', views: '0', category: 'Luxury' },
        ];
    });

    React.useEffect(() => {
        localStorage.setItem('site_blogs', JSON.stringify(blogs));
    }, [blogs]);

    return (
        <div className="admin-blog-redesign">
            {/* Header */}
            <div className="section-header flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Articles & Blogs</h1>
                    <p className="text-muted text-sm mt-1">Write, manage, and optimize your content for SEO.</p>
                </div>
                <button className="premium-btn primary-btn">
                    <Plus size={18} />
                    New Article
                </button>
            </div>

            {/* Statistics Row */}
            <div className="stats-row grid grid-4 gap-6 mb-8">
                {[
                    { label: 'Total Posts', value: '42', icon: <FileText size={20} />, color: '#3b82f6' },
                    { label: 'Published', value: '38', icon: <CheckCircle size={20} />, color: '#10b981' },
                    { label: 'Drafts', value: '3', icon: <Clock size={20} />, color: '#f59e0b' },
                    { label: 'Avg Views', value: '1.8k', icon: <Eye size={20} />, color: '#8b5cf6' },
                ].map((stat, i) => (
                    <div key={i} className="mini-stat-card">
                        <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}15` }}>{stat.icon}</div>
                        <div className="stat-info">
                            <span className="val">{stat.value}</span>
                            <span className="lbl">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div className="table-toolbar flex items-center justify-between py-6">
                <div className="search-box">
                    <Search size={18} />
                    <input type="text" placeholder="Search by title, author..." />
                </div>
                <div className="toolbar-actions flex gap-3">
                    <button className="tool-btn"><Filter size={18} /> Filters</button>
                    <button className="tool-btn"><ArrowUpDown size={18} /> Sort</button>
                </div>
            </div>

            {/* Premium Table */}
            <div className="blog-table-container">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th>Article Title</th>
                            <th>Status</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Views</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map(blog => (
                            <tr key={blog.id}>
                                <td className="title-cell">
                                    <div className="title-wrap">
                                        <span className="main-title">{blog.title}</span>
                                        <span className="sub-date">Last updated {blog.date}</span>
                                    </div>
                                </td>
                                <td>
                                    <span className={`status-badge ${blog.status.toLowerCase()}`}>
                                        <span className="dot" /> {blog.status}
                                    </span>
                                </td>
                                <td><span className="cat-tag">{blog.category}</span></td>
                                <td>
                                    <div className="author-cell">
                                        <div className="mini-avatar">{blog.author[0]}</div>
                                        <span>{blog.author}</span>
                                    </div>
                                </td>
                                <td>{blog.views}</td>
                                <td>
                                    <div className="row-actions justify-center">
                                        <button className="row-btn edit" title="Edit"><Edit3 size={16} /></button>
                                        <button className="row-btn view" title="Preview"><Eye size={16} /></button>
                                        <button className="row-btn delete" title="Delete"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .admin-blog-redesign {
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .mini-stat-card {
                    background: var(--bg-card);
                    padding: 20px;
                    border-radius: var(--radius-lg);
                    border: 1px solid var(--border-color);
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    box-shadow: var(--shadow-sm);
                }

                .stat-icon {
                    width: 44px;
                    height: 44px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .stat-info .val {
                    display: block;
                    font-size: 20px;
                    font-weight: 800;
                    line-height: 1;
                    margin-bottom: 4px;
                }

                .stat-info .lbl {
                    font-size: 13px;
                    color: var(--text-muted);
                    font-weight: 500;
                }

                .search-box {
                    position: relative;
                    width: 350px;
                }

                .search-box svg {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-muted);
                }

                .search-box input {
                    width: 100%;
                    padding: 10px 16px 10px 40px;
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    outline: none;
                    transition: var(--transition);
                }

                .search-box input:focus {
                    border-color: var(--primary-blue);
                    box-shadow: 0 0 0 4px var(--primary-glow);
                }

                .tool-btn {
                    padding: 10px 18px;
                    border-radius: 10px;
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    color: var(--text-main);
                    font-weight: 600;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: var(--transition);
                }

                .tool-btn:hover {
                    background: var(--bg-portal);
                    border-color: var(--text-muted);
                }

                .blog-table-container {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    box-shadow: var(--shadow-sm);
                }

                .premium-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .premium-table th {
                    text-align: left;
                    padding: 16px 24px;
                    background: var(--bg-portal);
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: var(--text-muted);
                    border-bottom: 1px solid var(--border-color);
                }

                .premium-table td {
                    padding: 16px 24px;
                    border-bottom: 1px solid var(--border-color);
                    font-size: 14px;
                }

                .premium-table tr:last-child td { border-bottom: none; }

                .premium-table tr:hover td { background: var(--bg-portal); }

                .title-wrap {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .main-title {
                    font-weight: 700;
                    color: var(--text-main);
                }

                .sub-date {
                    font-size: 12px;
                    color: var(--text-muted);
                }

                .status-badge {
                    padding: 5px 12px;
                    border-radius: 50px;
                    font-size: 11px;
                    font-weight: 700;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    text-transform: uppercase;
                }

                .status-badge.published { background: #dcfce7; color: #166534; }
                .status-badge.draft { background: #f1f5f9; color: #475569; }
                .status-badge.scheduled { background: #eff6ff; color: #1e40af; }

                .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

                .cat-tag {
                    padding: 4px 10px;
                    background: var(--bg-portal);
                    border: 1px solid var(--border-color);
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 600;
                }

                .author-cell {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .mini-avatar {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: var(--primary-blue);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    font-weight: 700;
                }

                .row-actions {
                    display: flex;
                    gap: 8px;
                }

                .row-btn {
                    width: 34px;
                    height: 34px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                    background: var(--bg-card);
                    color: var(--text-muted);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: var(--transition);
                }

                .row-btn:hover {
                    border-color: var(--primary-blue);
                    color: var(--primary-blue);
                }

                .row-btn.delete:hover {
                    border-color: #ef4444;
                    color: #ef4444;
                    background: #fef2f2;
                }

                .text-center { text-align: center; }
                .justify-center { justify-content: center; }
            `}</style>
        </div>
    );
};

export default BlogManagement;
