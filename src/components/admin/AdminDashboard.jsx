import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Package,
    FileText,
    Image as ImageIcon,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    Bell,
    ChevronDown,
    Search,
    Sun,
    Moon,
    User,
    Grid,
    Users
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import MediaLibrary from './MediaLibrary';
import BlogManagement from './BlogManagement';
import InquiriesPanel from './InquiriesPanel';
import DashboardOverview from './DashboardOverview';
import { authAPI } from '../../api';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [darkMode, setDarkMode] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const currentUser = authAPI.getUser();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await authAPI.logout();
        navigate('/admin/login');
    };

    const navItems = [
        { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={20} />, section: 'MAIN' },
        { id: 'packages', label: 'Packages', icon: <Package size={20} />, section: 'MAIN' },
        { id: 'blogs', label: 'Articles', icon: <FileText size={20} />, section: 'CONTENT' },
        { id: 'media', label: 'Media Library', icon: <ImageIcon size={20} />, section: 'CONTENT' },
        { id: 'inquiries', label: 'Inquiries', icon: <MessageSquare size={20} />, section: 'MANAGEMENT' },
        { id: 'users', label: 'Team Members', icon: <Users size={20} />, section: 'MANAGEMENT' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'media':
                return <MediaLibrary />;
            case 'blogs':
                return <BlogManagement />;
            case 'inquiries':
                return <InquiriesPanel />;
            case 'overview':
            default:
                return <DashboardOverview />;
        }
    };

    const getBreadcrumb = () => {
        const item = navItems.find(i => i.id === activeTab);
        return item ? item.label : 'Overview';
    };

    return (
        <div className={`admin-portal ${darkMode ? 'dark' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}>
            {/* Sidebar */}
            <aside className="portal-sidebar">
                <div className="sidebar-header">
                    <div className="brand-logo">
                        <div className="logo-icon">A</div>
                        <span className="brand-name">AVS <span>Admin</span></span>
                    </div>
                </div>

                <div className="sidebar-content">
                    {['MAIN', 'CONTENT', 'MANAGEMENT'].map(section => (
                        <div key={section} className="nav-group">
                            {!sidebarCollapsed && <p className="group-label">{section}</p>}
                            <div className="group-items">
                                {navItems.filter(item => item.section === section).map(item => (
                                    <button
                                        key={item.id}
                                        className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(item.id)}
                                        title={item.label}
                                    >
                                        <span className="icon-wrap">{item.icon}</span>
                                        {!sidebarCollapsed && <span className="label">{item.label}</span>}
                                        {activeTab === item.id && !sidebarCollapsed && <div className="active-glow" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="sidebar-footer">
                    <button className="nav-button settings-btn" title="Settings">
                        <span className="icon-wrap"><Settings size={20} /></span>
                        {!sidebarCollapsed && <span className="label">Settings</span>}
                    </button>
                    <button className="nav-button logout-btn" title="Logout" onClick={handleLogout}>
                        <span className="icon-wrap"><LogOut size={20} /></span>
                        {!sidebarCollapsed && <span className="label">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="portal-main">
                <header className={`portal-navbar ${scrolled ? 'scrolled' : ''}`}>
                    <div className="navbar-left">
                        <button
                            className="toggle-sidebar"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        >
                            <Menu size={20} />
                        </button>
                        <div className="breadcrumb">
                            <span className="root">Admin</span>
                            <span className="separator">/</span>
                            <span className="current">{getBreadcrumb()}</span>
                        </div>
                    </div>

                    <div className="navbar-center">
                        <div className="nav-search">
                            <Search size={18} className="search-icon" />
                            <input type="text" placeholder="Search for files, posts, packages..." />
                        </div>
                    </div>

                    <div className="navbar-right">
                        <button className="nav-action-btn" onClick={() => setDarkMode(!darkMode)}>
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="nav-action-btn notification">
                            <Bell size={20} />
                            <span className="badge" />
                        </button>
                        <div className="user-dropdown">
                            <div className="avatar">{currentUser?.full_name?.[0] || 'A'}</div>
                            <div className="user-info">
                                <span className="name">{currentUser?.full_name || 'Admin'}</span>
                                <span className="role">{currentUser?.role === 'super_admin' ? 'Super Admin' : currentUser?.role || 'Admin'}</span>
                            </div>
                            <ChevronDown size={14} className="dropdown-arrow" />
                        </div>
                    </div>
                </header>

                <div className="content-viewport">
                    {renderContent()}
                </div>
            </main>

            <style>{`
                :root {
                    --bg-portal: #f8fafc;
                    --bg-card: #ffffff;
                    --sidebar-w: 260px;
                    --sidebar-collapsed-w: 80px;
                    --primary-blue: #3b82f6;
                    --primary-glow: rgba(59, 130, 246, 0.15);
                    --text-main: #1e293b;
                    --text-muted: #64748b;
                    --border-color: #e2e8f0;
                    --nav-h: 70px;
                    --radius-lg: 16px;
                    --radius-md: 12px;
                    --shadow-sm: 0 1px 3px rgba(0,0,0,0.05);
                    --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03);
                    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
                    --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .dark {
                    --bg-portal: #0f172a;
                    --bg-card: #1e293b;
                    --text-main: #f1f5f9;
                    --text-muted: #94a3b8;
                    --border-color: #334155;
                    --shadow-sm: 0 1px 3px rgba(0,0,0,0.2);
                    --shadow-md: 0 4px 12px rgba(0,0,0,0.3);
                }

                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                body {
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    -webkit-font-smoothing: antialiased;
                }

                .admin-portal {
                    display: flex;
                    min-height: 100vh;
                    background-color: var(--bg-portal);
                    color: var(--text-main);
                    transition: var(--transition);
                }

                /* Sidebar Styles */
                .portal-sidebar {
                    width: var(--sidebar-w);
                    background: var(--bg-card);
                    border-right: 1px solid var(--border-color);
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    height: 100vh;
                    z-index: 100;
                    transition: var(--transition);
                }

                .admin-portal.collapsed .portal-sidebar {
                    width: var(--sidebar-collapsed-w);
                }

                .sidebar-header {
                    height: var(--nav-h);
                    display: flex;
                    align-items: center;
                    padding: 0 24px;
                    border-bottom: 1px solid var(--border-color);
                }

                .brand-logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    overflow: hidden;
                }

                .logo-icon {
                    width: 36px;
                    height: 36px;
                    background: linear-gradient(135deg, #1e40af, #3b82f6);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 10px;
                    font-weight: 800;
                    flex-shrink: 0;
                }

                .brand-name {
                    font-size: 18px;
                    font-weight: 700;
                    white-space: nowrap;
                    color: var(--text-main);
                }

                .brand-name span { color: var(--primary-blue); }

                .sidebar-content {
                    flex: 1;
                    padding: 24px 16px;
                    overflow-y: auto;
                }

                .nav-group {
                    margin-bottom: 32px;
                }

                .group-label {
                    font-size: 11px;
                    font-weight: 700;
                    color: var(--text-muted);
                    letter-spacing: 1px;
                    padding: 0 12px 12px;
                }

                .group-items {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .nav-button {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 12px;
                    border-radius: var(--radius-md);
                    border: none;
                    background: transparent;
                    color: var(--text-muted);
                    font-weight: 500;
                    font-size: 14.5px;
                    cursor: pointer;
                    transition: var(--transition);
                    position: relative;
                    width: 100%;
                }

                .nav-button:hover {
                    background: var(--border-color);
                    color: var(--text-main);
                }

                .nav-button.active {
                    background: var(--primary-glow);
                    color: var(--primary-blue);
                }

                .icon-wrap {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .active-glow {
                    position: absolute;
                    right: 8px;
                    width: 4px;
                    height: 18px;
                    background: var(--primary-blue);
                    border-radius: 2px;
                    box-shadow: 0 0 10px var(--primary-blue);
                }

                .sidebar-footer {
                    padding: 16px;
                    border-top: 1px solid var(--border-color);
                }

                /* Main Content Styles */
                .portal-main {
                    flex: 1;
                    margin-left: var(--sidebar-w);
                    transition: var(--transition);
                    display: flex;
                    flex-direction: column;
                }

                .admin-portal.collapsed .portal-main {
                    margin-left: var(--sidebar-collapsed-w);
                }

                .portal-navbar {
                    height: var(--nav-h);
                    background: var(--bg-card);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 32px;
                    position: sticky;
                    top: 0;
                    z-index: 90;
                    border-bottom: 1px solid var(--border-color);
                    transition: var(--transition);
                }

                .portal-navbar.scrolled {
                    box-shadow: var(--shadow-md);
                    backdrop-filter: blur(8px);
                    background: rgba(255, 255, 255, 0.85);
                }

                .dark .portal-navbar.scrolled {
                    background: rgba(30, 41, 59, 0.85);
                }

                .navbar-left {
                    display: flex;
                    align-items: center;
                    gap: 24px;
                }

                .toggle-sidebar {
                    background: transparent;
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    width: 36px;
                    height: 36px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: var(--text-muted);
                    transition: var(--transition);
                }

                .toggle-sidebar:hover {
                    border-color: var(--primary-blue);
                    color: var(--primary-blue);
                }

                .breadcrumb {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 14px;
                    color: var(--text-muted);
                }

                .breadcrumb .current {
                    color: var(--text-main);
                    font-weight: 600;
                }

                .nav-search {
                    position: relative;
                    width: 400px;
                }

                .search-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-muted);
                }

                .nav-search input {
                    width: 100%;
                    padding: 10px 16px 10px 44px;
                    background: var(--bg-portal);
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-lg);
                    outline: none;
                    font-size: 14px;
                    transition: var(--transition);
                    color: var(--text-main);
                }

                .nav-search input:focus {
                    border-color: var(--primary-blue);
                    box-shadow: 0 0 0 4px var(--primary-glow);
                    background: var(--bg-card);
                }

                .navbar-right {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                }

                .nav-action-btn {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: none;
                    background: transparent;
                    color: var(--text-muted);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: var(--transition);
                    position: relative;
                }

                .nav-action-btn:hover {
                    background: var(--border-color);
                    color: var(--text-main);
                }

                .notification .badge {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 8px;
                    height: 8px;
                    background: #ef4444;
                    border: 2px solid var(--bg-card);
                    border-radius: 50%;
                }

                .user-dropdown {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 6px 12px;
                    border-radius: var(--radius-lg);
                    cursor: pointer;
                    transition: var(--transition);
                }

                .user-dropdown:hover {
                    background: var(--border-color);
                }

                .avatar {
                    width: 36px;
                    height: 36px;
                    background: #e2e8f0;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    color: #475569;
                    flex-shrink: 0;
                }

                .user-info {
                    display: flex;
                    flex-direction: column;
                }

                .user-info .name {
                    font-size: 14px;
                    font-weight: 600;
                }

                .user-info .role {
                    font-size: 11px;
                    color: var(--text-muted);
                }

                .dropdown-arrow {
                    color: var(--text-muted);
                }

                .content-viewport {
                    padding: 32px;
                    flex: 1;
                }

                .placeholder-section {
                    text-align: center;
                    padding: 100px 0;
                }

                .placeholder-section h1 {
                    font-size: 24px;
                    margin-bottom: 12px;
                }

                .placeholder-section p {
                    color: var(--text-muted);
                }

                @media (max-width: 1024px) {
                    .nav-search {
                        width: 250px;
                    }
                }

                @media (max-width: 768px) {
                    .portal-sidebar {
                        transform: translateX(-100%);
                    }
                    .admin-portal.mobile-open .portal-sidebar {
                        transform: translateX(0);
                    }
                    .portal-main {
                        margin-left: 0 !important;
                    }
                    .nav-search {
                        display: none;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
