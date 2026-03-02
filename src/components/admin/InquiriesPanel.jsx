import React, { useState, useEffect } from 'react';
import {
    MessageSquare,
    Mail,
    Phone,
    Clock,
    CheckCircle,
    Archive,
    Eye,
    Filter,
    Search,
    X,
    AlertCircle,
    Send
} from 'lucide-react';
import { inquiriesAPI } from '../../api';

const InquiriesPanel = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    const [newCount, setNewCount] = useState(0);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            const result = await inquiriesAPI.list(activeFilter);
            if (result.success) {
                setInquiries(result.data);
                setNewCount(result.new_count);
            }
        } catch (err) {
            setError('Failed to load inquiries: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, [activeFilter]);

    const updateStatus = async (id, status) => {
        try {
            const result = await inquiriesAPI.updateStatus(id, status);
            if (result.success) {
                setInquiries(inquiries.map(inq =>
                    inq.id === id ? { ...inq, status } : inq
                ));
                if (selectedInquiry?.id === id) {
                    setSelectedInquiry({ ...selectedInquiry, status });
                }
            }
        } catch (err) {
            setError('Update failed: ' + err.message);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            new: { bg: '#eff6ff', color: '#1e40af', label: 'New' },
            read: { bg: '#f1f5f9', color: '#475569', label: 'Read' },
            replied: { bg: '#dcfce7', color: '#166534', label: 'Replied' },
            archived: { bg: '#fef3c7', color: '#92400e', label: 'Archived' }
        };
        return colors[status] || colors.new;
    };

    return (
        <div className="inquiries-panel">
            {/* Header */}
            <div className="section-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Inquiries</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>
                        Manage customer inquiries and messages.
                        {newCount > 0 && <span style={{ color: '#3b82f6', fontWeight: 700 }}> {newCount} new</span>}
                    </p>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '12px 16px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, fontSize: 14 }}>
                    <AlertCircle size={16} />
                    <span>{error}</span>
                    <button onClick={() => setError('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}><X size={14} /></button>
                </div>
            )}

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
                {[
                    { key: 'all', label: 'All' },
                    { key: 'new', label: 'New' },
                    { key: 'read', label: 'Read' },
                    { key: 'replied', label: 'Replied' },
                    { key: 'archived', label: 'Archived' }
                ].map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveFilter(tab.key)}
                        style={{
                            padding: '8px 18px',
                            borderRadius: 50,
                            background: activeFilter === tab.key ? 'var(--text-main)' : 'var(--bg-card)',
                            color: activeFilter === tab.key ? 'white' : 'var(--text-muted)',
                            border: `1px solid ${activeFilter === tab.key ? 'var(--text-main)' : 'var(--border-color)'}`,
                            fontSize: 13.5,
                            fontWeight: 500,
                            cursor: 'pointer',
                            transition: 'var(--transition)'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Inquiries List */}
            <div style={{ display: 'grid', gap: 16 }}>
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius-lg)',
                            padding: 24,
                            animation: 'pulse 1.5s ease-in-out infinite'
                        }}>
                            <div style={{ height: 16, width: '40%', background: 'var(--bg-portal)', borderRadius: 4, marginBottom: 12 }} />
                            <div style={{ height: 12, width: '60%', background: 'var(--bg-portal)', borderRadius: 4 }} />
                        </div>
                    ))
                ) : inquiries.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                        <MessageSquare size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
                        <h3 style={{ marginBottom: 8, color: 'var(--text-main)' }}>No inquiries found</h3>
                        <p style={{ fontSize: 14 }}>Inquiries submitted through the contact form will appear here.</p>
                    </div>
                ) : inquiries.map(inq => {
                    const statusStyle = getStatusColor(inq.status);
                    return (
                        <div
                            key={inq.id}
                            onClick={() => {
                                setSelectedInquiry(inq);
                                if (inq.status === 'new') updateStatus(inq.id, 'read');
                            }}
                            style={{
                                background: 'var(--bg-card)',
                                border: `1px solid ${inq.status === 'new' ? '#3b82f6' : 'var(--border-color)'}`,
                                borderRadius: 'var(--radius-lg)',
                                padding: '20px 24px',
                                cursor: 'pointer',
                                transition: 'var(--transition)',
                                boxShadow: 'var(--shadow-sm)',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 16
                            }}
                        >
                            <div style={{
                                width: 44, height: 44, borderRadius: 12,
                                background: statusStyle.bg, color: statusStyle.color,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                <Mail size={20} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <h3 style={{ fontWeight: 700, fontSize: 15 }}>{inq.full_name}</h3>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: 30,
                                        background: statusStyle.bg, color: statusStyle.color,
                                        fontSize: 11, fontWeight: 700, textTransform: 'uppercase'
                                    }}>
                                        {statusStyle.label}
                                    </span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {inq.message}
                                </p>
                                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--text-muted)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Mail size={12} /> {inq.email}</span>
                                    {inq.phone && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Phone size={12} /> {inq.phone}</span>}
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={12} /> {inq.date}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Detail Modal */}
            {selectedInquiry && (
                <div className="modal-overlay" onClick={() => setSelectedInquiry(null)} style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div onClick={(e) => e.stopPropagation()} style={{
                        background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)',
                        width: '100%', maxWidth: 550, boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Inquiry Details</h2>
                            <button onClick={() => setSelectedInquiry(null)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20} /></button>
                        </div>
                        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div><strong>Name:</strong> {selectedInquiry.full_name}</div>
                            <div><strong>Email:</strong> {selectedInquiry.email}</div>
                            {selectedInquiry.phone && <div><strong>Phone:</strong> {selectedInquiry.phone}</div>}
                            <div><strong>Date:</strong> {selectedInquiry.date}</div>
                            <div>
                                <strong>Message:</strong>
                                <p style={{ marginTop: 8, padding: 16, background: 'var(--bg-portal)', borderRadius: 12, fontSize: 14, lineHeight: 1.6 }}>
                                    {selectedInquiry.message}
                                </p>
                            </div>
                        </div>
                        <div style={{ padding: '16px 24px 24px', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                            <button onClick={() => updateStatus(selectedInquiry.id, 'archived')} style={{
                                padding: '8px 16px', border: '1px solid var(--border-color)', borderRadius: 10,
                                background: 'var(--bg-card)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                                fontSize: 13, fontWeight: 600, color: 'var(--text-main)'
                            }}>
                                <Archive size={14} /> Archive
                            </button>
                            <button onClick={() => updateStatus(selectedInquiry.id, 'replied')} style={{
                                padding: '8px 16px', border: 'none', borderRadius: 10,
                                background: '#3b82f6', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                                fontSize: 13, fontWeight: 600
                            }}>
                                <Send size={14} /> Mark as Replied
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .inquiries-panel {
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }
            `}</style>
        </div>
    );
};

export default InquiriesPanel;
