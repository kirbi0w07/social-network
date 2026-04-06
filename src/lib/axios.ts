import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common['X-Requested-With'] = 'Accept: application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
export default axios;