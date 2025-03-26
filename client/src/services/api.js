// api.js
// Konfigurerar Axios med en bas-URL för alla HTTP-anrop till backend (API-servern)
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000'; // Backend-serverns adress

export default axios;