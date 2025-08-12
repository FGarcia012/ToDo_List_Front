import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://to-do-list-back-xi.vercel.app/ToDoList/v1/",
    timeout: 3000,
    httpsAgent: false
});

export const addTask = async (data) => {
    try {
        const response = await apiClient.post('/tasks/addTask', data);
        return response.data;
    }catch(e) {
        return {
            error: true,
            e
        };
    }w
};

export const getTasks = async () => {
    try {
        const response = await apiClient.get('/tasks/getTasks');
        return response.data;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const getTaskById = async (tid) => {
    try {
        const response = await apiClient.get(`/tasks/getTask/${tid}`);
        return response.data;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const updateTask = async (id, data) => {
    try {
        const response = await apiClient.put(`/tasks/updateTask/${id}`, data);
        return response.data;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await apiClient.delete(`/tasks/deleteTask/${id}`);
        return response.data;
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};
