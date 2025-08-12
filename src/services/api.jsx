import axios from 'axios';

import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:3018/ToDoList/v1/",
    timeout: 3000,
    httpsAgent: false
});