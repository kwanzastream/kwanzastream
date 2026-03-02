import api from './api';

// ============== AUTH ==============
export const authService = {
    requestOtp: (phone: string) =>
        api.post('/api/auth/request-otp', { phone }),

    verifyOtp: (phone: string, code: string) =>
        api.post('/api/auth/verify-otp', { phone, code }),

    register: (data: { displayName: string; username: string; phone: string; email: string; password: string; termsAccepted: boolean; ageConfirmed: boolean }) =>
        api.post('/api/auth/register', data),

    login: (identifier: string, password: string) =>
        api.post('/api/auth/login', { identifier, password }),

    refresh: (refreshToken: string) =>
        api.post('/api/auth/refresh', { refreshToken }),

    logout: () =>
        api.post('/api/auth/logout'),

    getMe: () =>
        api.get('/api/auth/me'),
};

// ============== USERS ==============
export const userService = {
    getProfile: (id: string) =>
        api.get(`/api/users/${id}`),

    updateProfile: (data: any) =>
        api.put('/api/users/me', data),

    follow: (userId: string) =>
        api.post(`/api/users/${userId}/follow`),

    unfollow: (userId: string) =>
        api.delete(`/api/users/${userId}/follow`),

    getFollowers: (userId: string, page = 1, limit = 20) =>
        api.get(`/api/users/${userId}/followers`, { params: { page, limit } }),

    getFollowing: (userId: string, page = 1, limit = 20) =>
        api.get(`/api/users/${userId}/following`, { params: { page, limit } }),

    generateStreamKey: () =>
        api.post('/api/users/me/stream-key'),

    // Phase 1: Onboarding & Identity
    completeOnboarding: (data: { displayName: string; username: string; bio?: string; interests: string[] }) =>
        api.post('/api/users/onboarding', data),

    checkUsername: (username: string) =>
        api.get(`/api/users/check-username/${username}`),

    uploadAvatar: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/api/upload/avatar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },

    uploadBanner: (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/api/upload/banner', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

// ============== STREAMS ==============
export const streamService = {
    getLive: (page = 1, limit = 20, category?: string, filter?: 'following') =>
        api.get('/api/streams/live', { params: { page, limit, category, filter } }),

    getById: (id: string) =>
        api.get(`/api/streams/${id}`),

    create: (data: { title: string; description?: string; category?: string }) =>
        api.post('/api/streams', data),

    update: (id: string, data: any) =>
        api.put(`/api/streams/${id}`, data),

    end: (id: string) =>
        api.post(`/api/streams/${id}/end`),

    getUserStreams: (userId: string, page = 1, limit = 20) =>
        api.get(`/api/streams/user/${userId}`, { params: { page, limit } }),
};

// ============== DONATIONS ==============
export const donationService = {
    getSaloTypes: () =>
        api.get('/api/donations/salo-types'),

    send: (data: { receiverId: string; saloType: string; message?: string; streamId?: string }) =>
        api.post('/api/donations', data),

    getLeaderboard: (params: { streamId?: string; receiverId?: string; limit?: number }) =>
        api.get('/api/donations/leaderboard', { params }),

    getHistory: (page = 1, limit = 20, type?: 'sent' | 'received') =>
        api.get('/api/donations/history', { params: { page, limit, type } }),
};

// ============== WALLET ==============
export const walletService = {
    getWallet: () =>
        api.get('/api/wallet'),

    deposit: (data: { amount: number; paymentMethod: string }) =>
        api.post('/api/wallet/deposit', data),

    withdraw: (data: { amount: number; bankAccount: { bank: string; accountNumber: string; accountName: string } }) =>
        api.post('/api/wallet/withdraw', data),

    getTransactions: (page = 1, limit = 20, type?: string, status?: string) =>
        api.get('/api/wallet/transactions', { params: { page, limit, type, status } }),
};

// ============== ADMIN ==============
export const adminService = {
    getStats: () =>
        api.get('/api/admin/stats'),

    listUsers: (params: { page?: number; limit?: number; role?: string; search?: string }) =>
        api.get('/api/admin/users', { params }),

    updateUser: (id: string, data: any) =>
        api.put(`/api/admin/users/${id}`, data),

    banUser: (id: string, reason: string) =>
        api.post(`/api/admin/users/${id}/ban`, { reason }),

    listStreams: (params: { page?: number; limit?: number; status?: string }) =>
        api.get('/api/admin/streams', { params }),

    forceEndStream: (id: string, reason: string) =>
        api.post(`/api/admin/streams/${id}/end`, { reason }),

    listTransactions: (params: { page?: number; limit?: number; type?: string; status?: string }) =>
        api.get('/api/admin/transactions', { params }),

    approveWithdrawal: (id: string) =>
        api.post(`/api/admin/transactions/${id}/approve`),

    rejectWithdrawal: (id: string, reason: string) =>
        api.post(`/api/admin/transactions/${id}/reject`, { reason }),
};

// ============== NOTIFICATIONS (Phase 2) ==============
export const notificationService = {
    getAll: (cursor?: string, limit = 20) =>
        api.get('/api/notifications', { params: { cursor, limit } }),

    getUnreadCount: () =>
        api.get('/api/notifications/unread-count'),

    markAsRead: (id: string) =>
        api.patch(`/api/notifications/${id}/read`),

    markAllAsRead: () =>
        api.patch('/api/notifications/read-all'),
};

// ============== FAVORITES (Phase 2) ==============
export const favoriteService = {
    // Creators
    getCreators: () =>
        api.get('/api/favorites/creators'),

    addCreator: (creatorId: string) =>
        api.post(`/api/favorites/creators/${creatorId}`),

    removeCreator: (creatorId: string) =>
        api.delete(`/api/favorites/creators/${creatorId}`),

    checkCreator: (creatorId: string) =>
        api.get(`/api/favorites/creators/${creatorId}/check`),

    // Streams
    getStreams: () =>
        api.get('/api/favorites/streams'),

    addStream: (streamId: string) =>
        api.post(`/api/favorites/streams/${streamId}`),

    removeStream: (streamId: string) =>
        api.delete(`/api/favorites/streams/${streamId}`),
};

// ============== REPORTS (Phase 5) ==============
export const reportService = {
    create: (data: { reason: string; details?: string; targetId?: string; targetType?: 'USER' | 'STREAM' | 'MESSAGE' }) =>
        api.post('/api/reports', data),

    getMine: () =>
        api.get('/api/reports/mine'),
};

// ============== SEARCH (Phase 7) ==============
export const searchService = {
    search: (q: string, type: 'all' | 'users' | 'streams' = 'all', page = 1, limit = 10) =>
        api.get('/api/search', { params: { q, type, page, limit } }),
};
