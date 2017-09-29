import axios from 'axios';
import apiConfig from '../../config/api.config';

const service = axios.create({
    baseURL: apiConfig.baseUrl
        // baseURL: 'api/'
})

Vue.prototype.$http = service
export default service