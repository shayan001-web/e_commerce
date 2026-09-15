import axios from 'axios';
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://e-commerce-backend1-m4hk2misu-shayan001-web.vercel.app/api' });
api.interceptors.request.use(config => { const token = localStorage.getItem('nexa_token'); if (token) config.headers.Authorization = `Bearer ${token}`; return config; });
export default api;
