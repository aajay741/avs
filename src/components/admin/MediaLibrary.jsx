import React, { useState, useEffect, useRef } from 'react';
import {
    Upload,
    X,
    FileText,
    Image as ImageIcon,
    Video,
    CheckCircle,
    Trash2,
    Edit2,
    Search,
    Filter,
    ArrowUpDown,
    MoreHorizontal,
    ExternalLink,
    Check
} from 'lucide-react';

const MediaLibrary = () => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedItems, setSelectedItems] = useState([]);
    const fileInputRef = useRef(null);

    // Persist media to localStorage
    const [mediaItems, setMediaItems] = useState(() => {
        const saved = localStorage.getItem('site_media');
        return saved ? JSON.parse(saved) : [
            { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2', name: 'bali_beach_sunset.jpg', size: '1.2 MB', date: 'Oct 24, 2025', tag: 'Destinations' },
            { id: 2, type: 'video', url: '#', name: 'dubai_drone_shot.mp4', size: '15.4 MB', date: 'Oct 23, 2025', tag: 'Promotional' },
            { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a', name: 'travel_consultant_team.jpg', size: '0.8 MB', date: 'Oct 22, 2025', tag: 'Staff' },
            { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5', name: 'switzerland_alps.jpg', size: '2.1 MB', date: 'Oct 21, 2025', tag: 'Packages' },
        ];
    });

    useEffect(() => {
        localStorage.setItem('site_media', JSON.stringify(mediaItems));
    }, [mediaItems]);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFiles(e.dataTransfer.files);
    };

    const handleFiles = (newFiles) => {
        setUploading(true);
        const filePromises = Array.from(newFiles).map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve({
                        id: Date.now() + Math.random(),
                        type: file.type.startsWith('image') ? 'image' : (file.type.startsWith('video') ? 'video' : 'document'),
                        url: reader.result, // This will be the Base64 string
                        name: file.name,
                        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
                        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        tag: 'Uncategorized'
                    });
                };
                reader.readAsDataURL(file);
            });
        });

        Promise.all(filePromises).then(newItems => {
            setMediaItems(prev => [...newItems, ...prev]);
            setUploading(false);
        });
    };

    const deleteItem = (id) => setMediaItems(mediaItems.filter(item => item.id !== id));

    const toggleSelect = (id) => {
        if (selectedItems.includes(id)) setSelectedItems(selectedItems.filter(i => i !== id));
        else setSelectedItems([...selectedItems, id]);
    };

    const filteredItems = activeFilter === 'All'
        ? mediaItems
        : mediaItems.filter(item => {
            if (activeFilter === 'Images') return item.type === 'image';
            if (activeFilter === 'Videos') return item.type === 'video';
            return true;
        });

    return (
        <div className="media-library-redesign">
            {/* Library Header */}
            <div className="library-header flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
                    <p className="text-muted text-sm mt-1">Easily manage, upload and organize your visual assets.</p>
                </div>
                <div className="header-actions">
                    <button className="premium-btn secondary-btn mr-3">
                        <ArrowUpDown size={16} />
                        Sort By
                    </button>
                    <button className="premium-btn primary-btn" onClick={() => fileInputRef.current.click()}>
                        <Upload size={16} />
                        Upload Media
                    </button>
                </div>
            </div>

            {/* Upload Area */}
            <div
                className={`modern-dropzone ${dragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
                style={{ cursor: 'pointer' }}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    className="hidden-input"
                    onChange={(e) => handleFiles(e.target.files)}
                />

                {uploading ? (
                    <div className="upload-progress-container">
                        <div className="loader-ring"></div>
                        <h3>Processing Assets...</h3>
                        <div className="progress-bar-bg">
                            <div className="progress-bar-fill"></div>
                        </div>
                    </div>
                ) : (
                    <div className="dropzone-content">
                        <div className="upload-icon-circle">
                            <Upload size={28} />
                        </div>
                        <div className="dropzone-text">
                            <h3>Drag and drop your media here</h3>
                            <p>PNG, JPG, MP4 or WebM up to 50MB</p>
                        </div>
                        <button className="browse-btn">Browse Files</button>
                    </div>
                )}
            </div>

            {/* Filter & Toolbar */}
            <div className="library-toolbar flex items-center justify-between py-6">
                <div className="filter-tabs flex gap-2">
                    {['All', 'Images', 'Videos', 'Documents'].map(tab => (
                        <button
                            key={tab}
                            className={`filter-pill ${activeFilter === tab ? 'active' : ''}`}
                            onClick={() => setActiveFilter(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="toolbar-right flex items-center gap-4">
                    <div className="search-wrap">
                        <Search size={16} />
                        <input type="text" placeholder="Filter by name..." />
                    </div>
                    <div className="tag-filter">
                        <Filter size={16} />
                        <span>All Tags</span>
                    </div>
                </div>
            </div>

            {/* Selection Info */}
            {selectedItems.length > 0 && (
                <div className="selection-bar">
                    <span>{selectedItems.length} items selected</span>
                    <div className="selection-actions">
                        <button className="sel-btn del"><Trash2 size={16} /> Delete</button>
                        <button className="sel-btn"><Edit2 size={16} /> Batch Tag</button>
                        <button className="sel-btn" onClick={() => setSelectedItems([])}>Cancel</button>
                    </div>
                </div>
            )}

            {/* Media Grid */}
            <div className="media-modern-grid">
                {filteredItems.map(item => (
                    <div
                        key={item.id}
                        className={`media-asset-card ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                        onClick={() => toggleSelect(item.id)}
                    >
                        <div className="asset-preview">
                            {item.type === 'image' ? (
                                <img src={item.url} alt={item.name} loading="lazy" />
                            ) : item.type === 'video' ? (
                                <div className="video-thumb">
                                    <Video size={40} />
                                    <span className="duration">01:45</span>
                                </div>
                            ) : (
                                <div className="video-thumb">
                                    <FileText size={40} />
                                    <span className="duration">PDF/DOC</span>
                                </div>
                            )}

                            <div className="asset-overlay">
                                <div className="overlay-top">
                                    <div className={`check-circle ${selectedItems.includes(item.id) ? 'checked' : ''}`}>
                                        <Check size={12} />
                                    </div>
                                </div>
                                <div className="overlay-actions">
                                    <button className="act-btn"><Edit2 size={14} /></button>
                                    <button className="act-btn"><Trash2 size={14} /></button>
                                    <button className="act-btn"><ExternalLink size={14} /></button>
                                </div>
                            </div>

                            <div className="asset-tag-badge">{item.tag}</div>
                        </div>
                        <div className="asset-info">
                            <div className="info-main">
                                <span className="name">{item.name}</span>
                                <span className="date">{item.date}</span>
                            </div>
                            <span className="size">{item.size}</span>
                        </div>
                    </div>
                ))}

                {/* Skeleton Loading State Placeholder */}
                {mediaItems.length === 0 && Array(4).fill(0).map((_, i) => (
                    <div key={i} className="skeleton-asset">
                        <div className="skeleton-img pulse"></div>
                        <div className="skeleton-lines">
                            <div className="line-sm pulse"></div>
                            <div className="line-xs pulse"></div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .media-library-redesign {
                    animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .text-muted { color: var(--text-muted); }
                .flex { display: flex; }
                .items-center { align-items: center; }
                .justify-between { justify-content: space-between; }
                .mb-8 { margin-bottom: 2rem; }
                .mr-3 { margin-right: 0.75rem; }
                .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
                .gap-2 { gap: 0.5rem; }
                .gap-4 { gap: 1rem; }

                /* Buttons */
                .premium-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    border-radius: var(--radius-md);
                    font-weight: 600;
                    font-size: 14px;
                    cursor: pointer;
                    transition: var(--transition);
                    border: 1px solid transparent;
                }

                .primary-btn {
                    background: var(--primary-blue);
                    color: white;
                    box-shadow: 0 4px 10px var(--primary-glow);
                }

                .primary-btn:hover {
                    background: #2563eb;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 15px var(--primary-glow);
                }

                .secondary-btn {
                    background: var(--bg-card);
                    color: var(--text-main);
                    border-color: var(--border-color);
                }

                .secondary-btn:hover {
                    background: var(--border-color);
                }

                /* Dropzone */
                .modern-dropzone {
                    background: var(--bg-card);
                    border: 2px dashed var(--border-color);
                    border-radius: var(--radius-lg);
                    padding: 60px 0;
                    text-align: center;
                    transition: var(--transition);
                    position: relative;
                    box-shadow: var(--shadow-sm);
                }

                .modern-dropzone:hover, .modern-dropzone.active {
                    border-color: var(--primary-blue);
                    background: var(--primary-glow);
                }

                .upload-icon-circle {
                    width: 60px;
                    height: 60px;
                    background: var(--bg-portal);
                    color: var(--primary-blue);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                    transition: var(--transition);
                }

                .modern-dropzone:hover .upload-icon-circle {
                    transform: translateY(-5px);
                    background: var(--primary-blue);
                    color: white;
                }

                .dropzone-text h3 {
                    font-size: 18px;
                    font-weight: 700;
                    margin-bottom: 6px;
                }

                .dropzone-text p {
                    color: var(--text-muted);
                    font-size: 14px;
                    margin-bottom: 24px;
                }

                .browse-btn {
                    background: var(--bg-portal);
                    border: 1px solid var(--border-color);
                    padding: 8px 16px;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 13px;
                    color: var(--text-main);
                    cursor: pointer;
                    transition: var(--transition);
                }

                .browse-btn:hover {
                    border-color: var(--primary-blue);
                    color: var(--primary-blue);
                }

                .hidden-input { display: none; }

                /* Uploading State */
                .upload-progress-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                }

                .loader-ring {
                    width: 32px;
                    height: 32px;
                    border: 3px solid var(--border-color);
                    border-top: 3px solid var(--primary-blue);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin { 100% { transform: rotate(360deg); } }

                .progress-bar-bg {
                    width: 280px;
                    height: 6px;
                    background: var(--border-color);
                    border-radius: 3px;
                    overflow: hidden;
                }

                .progress-bar-fill {
                    width: 65%;
                    height: 100%;
                    background: var(--primary-blue);
                    border-radius: 3px;
                    animation: progressMove 2s ease-in-out infinite;
                }

                @keyframes progressMove {
                    0% { width: 10%; }
                    50% { width: 80%; }
                    100% { width: 95%; }
                }

                /* Toolbar */
                .filter-pill {
                    padding: 8px 18px;
                    border-radius: 50px;
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    color: var(--text-muted);
                    font-size: 13.5px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: var(--transition);
                }

                .filter-pill:hover {
                    border-color: var(--text-muted);
                }

                .filter-pill.active {
                    background: var(--text-main);
                    color: white;
                    border-color: var(--text-main);
                }

                .search-wrap {
                    position: relative;
                }

                .search-wrap svg {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-muted);
                }

                .search-wrap input {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    padding: 7px 12px 7px 36px;
                    font-size: 14px;
                    outline: none;
                    color: var(--text-main);
                }

                .tag-filter {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    padding: 7px 14px;
                    border-radius: 8px;
                    font-size: 14px;
                    color: var(--text-main);
                    cursor: pointer;
                }

                /* Selection Bar */
                .selection-bar {
                    background: var(--primary-blue);
                    color: white;
                    padding: 12px 24px;
                    border-radius: var(--radius-md);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 24px;
                    animation: fadeIn 0.3s ease;
                }

                .selection-actions {
                    display: flex;
                    gap: 12px;
                }

                .sel-btn {
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    padding: 6px 14px;
                    border-radius: 6px;
                    font-size: 13px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .sel-btn:hover { background: rgba(255, 255, 255, 0.3); }
                .sel-btn.del:hover { background: #ef4444; }

                /* Media Grid */
                .media-modern-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                    gap: 24px;
                }

                .media-asset-card {
                    background: var(--bg-card);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    border: 1px solid var(--border-color);
                    transition: var(--transition);
                    cursor: pointer;
                    box-shadow: var(--shadow-sm);
                }

                .media-asset-card:hover {
                    box-shadow: var(--shadow-md);
                    transform: translateY(-4px);
                }

                .media-asset-card.selected {
                    border-color: var(--primary-blue);
                    box-shadow: 0 0 0 2px var(--primary-glow);
                }

                .asset-preview {
                    height: 180px;
                    background: var(--bg-portal);
                    position: relative;
                    overflow: hidden;
                }

                .asset-preview img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .video-thumb {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-muted);
                }

                .duration {
                    position: absolute;
                    bottom: 8px;
                    right: 8px;
                    background: rgba(0,0,0,0.6);
                    color: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 10px;
                    font-weight: 700;
                }

                .asset-tag-badge {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    background: rgba(255, 255, 255, 0.9);
                    color: var(--text-main);
                    padding: 4px 10px;
                    border-radius: 30px;
                    font-size: 11px;
                    font-weight: 700;
                    box-shadow: var(--shadow-sm);
                }

                .asset-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(30, 41, 59, 0.3);
                    backdrop-filter: blur(2px);
                    opacity: 0;
                    transition: var(--transition);
                    display: flex;
                    flex-direction: column;
                    padding: 12px;
                }

                .media-asset-card:hover .asset-overlay {
                    opacity: 1;
                }

                .overlay-top {
                    display: flex;
                    justify-content: flex-start;
                }

                .check-circle {
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    border: 2px solid white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: transparent;
                }

                .check-circle.checked {
                    background: var(--primary-blue);
                    border-color: var(--primary-blue);
                    color: white;
                }

                .overlay-actions {
                    margin-top: auto;
                    display: flex;
                    gap: 8px;
                    justify-content: center;
                }

                .act-btn {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    background: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-main);
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .act-btn:hover { transform: scale(1.1); color: var(--primary-blue); }

                .asset-info {
                    padding: 16px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                }

                .info-main {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    overflow: hidden;
                }

                .info-main .name {
                    font-size: 14px;
                    font-weight: 700;
                    color: var(--text-main);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .info-main .date {
                    font-size: 12px;
                    color: var(--text-muted);
                }

                .asset-info .size {
                    font-size: 11px;
                    color: var(--text-muted);
                    font-weight: 600;
                }

                /* Skeleton */
                .skeleton-asset {
                    background: var(--bg-card);
                    border-radius: var(--radius-lg);
                    height: 250px;
                    border: 1px solid var(--border-color);
                }

                .skeleton-img {
                    height: 180px;
                    background: var(--bg-portal);
                }

                .skeleton-lines {
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .line-sm { height: 12px; width: 80%; background: var(--bg-portal); border-radius: 4px; }
                .line-xs { height: 10px; width: 40%; background: var(--bg-portal); border-radius: 4px; }

                .pulse {
                    animation: pulse 1.5s ease-in-out infinite;
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

export default MediaLibrary;
