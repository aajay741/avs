import React, { useState, useEffect } from 'react';
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
    Filter,
    X,
    Loader2,
    AlertCircle,
    Save
} from 'lucide-react';
import { blogsAPI } from '../../api';

const BlogManagement = () => {
    const [blogs, setBlogs] = useState([]);
    const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0, avg_views: '0' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newBlog, setNewBlog] = useState({ title: '', content: '', category: 'General', status: 'draft' });
    const [creating, setCreating] = useState(false);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const result = await blogsAPI.list('all', searchTerm);
            if (result.success) {
                setBlogs(result.data);
                setStats(result.stats);
            }
        } catch (err) {
            setError('Failed to load blogs: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [searchTerm]);

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this article?')) return;
        try {
            const result = await blogsAPI.delete(id);
            if (result.success) {
                setBlogs(blogs.filter(b => b.id !== id));
            }
        } catch (err) {
            setError('Delete failed: ' + err.message);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!newBlog.title.trim()) return;
        setCreating(true);
        try {
            const result = await blogsAPI.create(newBlog);
            if (result.success) {
                setShowCreateModal(false);
                setNewBlog({ title: '', content: '', category: 'General', status: 'draft' });
                await fetchBlogs();
            }
        } catch (err) {
            setError('Create failed: ' + err.message);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="admin-blog-redesign">
            {/* Header */}
            <div className="section-header flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Articles & Blogs</h1>
                    <p className="text-muted text-sm mt-1">Write, manage, and optimize your content for SEO.</p>
                </div>
                <button className="premium-btn primary-btn" onClick={() => setShowCreateModal(true)}>
                    <Plus size={18} />
                    New Article
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className="error-banner" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, fontSize: 14 }}>
                    <AlertCircle size={16} />
                    <span>{error}</span>
                    <button onClick={() => setError('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}><X size={14} /></button>
                </div>
            )}

            {/* Statistics Row */}
            <div className="stats-row grid grid-4 gap-6 mb-8">
                {[
                    { label: 'Total Posts', value: stats.total, icon: <FileText size={20} />, color: '#3b82f6' },
                    { label: 'Published', value: stats.published, icon: <CheckCircle size={20} />, color: '#10b981' },
                    { label: 'Drafts', value: stats.drafts, icon: <Clock size={20} />, color: '#f59e0b' },
                    { label: 'Avg Views', value: stats.avg_views, icon: <Eye size={20} />, color: '#8b5cf6' },
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
                    <input
                        type="text"
                        placeholder="Search by title, author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
                        {loading ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>Loading articles...</td></tr>
                        ) : blogs.length === 0 ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center', padding: 40, color: 'var(--text-muted)' }}>No articles found. Create your first one!</td></tr>
                        ) : blogs.map(blog => (
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
                                        <div className="mini-avatar">{blog.author?.[0] || '?'}</div>
                                        <span>{blog.author}</span>
                                    </div>
                                </td>
                                <td>{blog.views}</td>
                                <td>
                                    <div className="row-actions justify-center">
                                        <button className="row-btn edit" title="Edit"><Edit3 size={16} /></button>
                                        <button className="row-btn view" title="Preview"><Eye size={16} /></button>
                                        <button className="row-btn delete" title="Delete" onClick={() => handleDelete(blog.id)}><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Modal */}
            {showCreateModal && (
                <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>New Article</h2>
                            <button onClick={() => setShowCreateModal(false)} className="modal-close"><X size={20} /></button>
                        </div>
                        <form onSubmit={handleCreate}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={newBlog.title}
                                        onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                                        placeholder="Enter article title..."
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Content</label>
                                    <textarea
                                        value={newBlog.content}
                                        onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
                                        placeholder="Write your article content..."
                                        rows={6}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select value={newBlog.category} onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}>
                                            <option>General</option>
                                            <option>Travel Guide</option>
                                            <option>Umrah</option>
                                            <option>Special Tours</option>
                                            <option>Luxury</option>
                                            <option>Tips & Tricks</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select value={newBlog.status} onChange={(e) => setNewBlog({ ...newBlog, status: e.target.value })}>
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                            <option value="scheduled">Scheduled</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="premium-btn secondary-btn" onClick={() => setShowCreateModal(false)}>Cancel</button>
                                <button type="submit" className="premium-btn primary-btn" disabled={creating}>
                                    {creating ? <><Loader2 size={16} className="spin-icon" /> Creating...</> : <><Save size={16} /> Create Article</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                    color: var(--text-main);
                    font-size: 14px;
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

                /* Modal */
                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.5);
                    backdrop-filter: blur(4px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    animation: fadeIn 0.2s ease;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .modal-content {
                    background: var(--bg-card);
                    border-radius: var(--radius-lg);
                    width: 100%;
                    max-width: 600px;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .modal-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 24px 24px 0;
                }

                .modal-header h2 {
                    font-size: 20px;
                    font-weight: 700;
                }

                .modal-close {
                    background: none;
                    border: none;
                    color: var(--text-muted);
                    cursor: pointer;
                    padding: 4px;
                }

                .modal-body {
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-group label {
                    font-size: 13px;
                    font-weight: 700;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .form-group input,
                .form-group textarea,
                .form-group select {
                    padding: 10px 14px;
                    background: var(--bg-portal);
                    border: 1px solid var(--border-color);
                    border-radius: 10px;
                    font-size: 14px;
                    outline: none;
                    color: var(--text-main);
                    transition: var(--transition);
                    font-family: inherit;
                }

                .form-group input:focus,
                .form-group textarea:focus,
                .form-group select:focus {
                    border-color: var(--primary-blue);
                    box-shadow: 0 0 0 4px var(--primary-glow);
                }

                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                .modal-footer {
                    padding: 16px 24px 24px;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                }

                .spin-icon {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default BlogManagement;
