/**
 * Admin API Helper
 * Centralized API calls to PHP backend
 */

const API_BASE = '/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('admin_token');

// Set auth token
const setToken = (token) => localStorage.setItem('admin_token', token);

// Remove auth token
const removeToken = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
};

// Set user info
const setUser = (user) => localStorage.setItem('admin_user', JSON.stringify(user));

// Get user info
const getUser = () => {
    const user = localStorage.getItem('admin_user');
    return user ? JSON.parse(user) : null;
};

// Base fetch helper with auth
const apiFetch = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData (browser will set it with boundary)
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
        credentials: 'include'
    });

    const data = await response.json();

    // Handle 401 - redirect to login
    if (response.status === 401) {
        removeToken();
        if (window.location.pathname !== '/admin/login') {
            window.location.href = '/admin/login';
        }
        throw new Error(data.error || 'Authentication failed');
    }

    if (!response.ok) {
        throw new Error(data.error || data.errors?.join(', ') || 'Request failed');
    }

    return data;
};

// ============ AUTH API ============

export const authAPI = {
    login: async (username, password) => {
        const data = await apiFetch('/auth/login.php', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        if (data.success) {
            setToken(data.token);
            setUser(data.user);
        }
        return data;
    },

    logout: async () => {
        try {
            await apiFetch('/auth/logout.php', { method: 'POST' });
        } catch (e) {
            // Ignore errors on logout
        }
        removeToken();
    },

    check: async () => {
        return apiFetch('/auth/check.php');
    },

    isAuthenticated: () => {
        return !!getToken();
    },

    getUser: () => getUser(),
    getToken: () => getToken()
};

// ============ MEDIA API ============

export const mediaAPI = {
    list: (filter = 'all', search = '') => {
        const params = new URLSearchParams({ filter, search });
        return apiFetch(`/media/list.php?${params}`);
    },

    getPublicList: (filter = 'all', search = '') => {
        const params = new URLSearchParams({ filter, search });
        return fetch(`${API_BASE}/media/public_list.php?${params}`).then(res => res.json());
    },


    upload: (files, tag = 'Uncategorized') => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }
        formData.append('tag', tag);

        return apiFetch('/media/upload.php', {
            method: 'POST',
            body: formData
        });
    },

    delete: (id) => {
        return apiFetch('/media/delete.php', {
            method: 'POST',
            body: JSON.stringify({ id })
        });
    }
};

// ============ BLOGS API ============

export const blogsAPI = {
    list: (status = 'all', search = '') => {
        const params = new URLSearchParams({ status, search });
        return apiFetch(`/blogs/list.php?${params}`);
    },

    getPublicList: (search = '') => {
        const params = new URLSearchParams({ search });
        return fetch(`${API_BASE}/blogs/public_list.php?${params}`).then(res => res.json());
    },


    create: (blogData) => {
        return apiFetch('/blogs/create.php', {
            method: 'POST',
            body: JSON.stringify(blogData)
        });
    },

    update: (blogData) => {
        return apiFetch('/blogs/update.php', {
            method: 'POST',
            body: JSON.stringify(blogData)
        });
    },

    delete: (id) => {
        return apiFetch('/blogs/delete.php', {
            method: 'POST',
            body: JSON.stringify({ id })
        });
    }
};

// ============ INQUIRIES API ============

export const inquiriesAPI = {
    list: (status = 'all') => {
        const params = new URLSearchParams({ status });
        return apiFetch(`/inquiries/list.php?${params}`);
    },

    submit: (data) => {
        // Public endpoint - no auth needed
        return fetch(`${API_BASE}/inquiries/submit.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    updateStatus: (id, status) => {
        return apiFetch('/inquiries/update.php', {
            method: 'POST',
            body: JSON.stringify({ id, status })
        });
    }
};

// ============ DASHBOARD API ============

export const dashboardAPI = {
    getStats: () => {
        return apiFetch('/dashboard/stats.php');
    }
};

export default { authAPI, mediaAPI, blogsAPI, inquiriesAPI, dashboardAPI };
