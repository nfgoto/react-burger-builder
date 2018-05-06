import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-burger-builder-cce1e.firebaseio.com/'
});

export default instance;