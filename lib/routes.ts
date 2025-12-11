/**
 * Centralized API routes for a Next.js project.
 * Supports versioning, nested endpoints, and dynamic parameters.
 */

// const API_VERSION = "v1";
// const API_BASE = `/api/${API_VERSION}`;
const API_BASE = `/api`;

export const API_ROUTES = {
    // Generate endpoints
    generate: {
        base: `${API_BASE}/generate`,
    },

    // // Chat endpoints
    // chat: {
    //     base: `${API_BASE}/chat`,
    //     stream: `${API_BASE}/chat/stream`,
    //     history: `${API_BASE}/chat/history`,
    // },

    // // Authentication endpoints
    // auth: {
    //     login: `${API_BASE}/auth/login`,
    //     logout: `${API_BASE}/auth/logout`,
    //     refreshToken: `${API_BASE}/auth/refresh`,
    // },

    // // User endpoints
    // user: {
    //     me: `${API_BASE}/user/me`,
    //     update: `${API_BASE}/user/update`,
    //     byId: (id: string) => `${API_BASE}/user/${id}`,
    //     settings: {
    //         get: `${API_BASE}/user/settings`,
    //         update: `${API_BASE}/user/settings/update`,
    //     },
    // },

    // // Posts / Content endpoints
    // posts: {
    //     list: `${API_BASE}/posts`,
    //     byId: (id: string) => `${API_BASE}/posts/${id}`,
    //     create: `${API_BASE}/posts/create`,
    //     update: (id: string) => `${API_BASE}/posts/${id}/update`,
    //     delete: (id: string) => `${API_BASE}/posts/${id}/delete`,
    // },

    // // Admin endpoints
    // admin: {
    //     dashboard: `${API_BASE}/admin/dashboard`,
    //     users: `${API_BASE}/admin/users`,
    //     posts: `${API_BASE}/admin/posts`,
    // },

    // // File / Media endpoints
    // files: {
    //     upload: `${API_BASE}/files/upload`,
    //     download: (fileId: string) => `${API_BASE}/files/${fileId}/download`,
    //     delete: (fileId: string) => `${API_BASE}/files/${fileId}/delete`,
    // },

    // // Utility / Debug
    // health: `${API_BASE}/health`,
};
