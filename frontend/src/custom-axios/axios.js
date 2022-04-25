import axios from "axios";

const instance = axios.create({
    baseURL: 'https://library-lab-emt.herokuapp.com/api',
    headers: {
        'Access-Control-Allow-Origin' : '*',
        // 'Authorization': localStorage.getItem("JWT")
    }
})

export default instance;
