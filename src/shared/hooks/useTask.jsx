import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { 
    getTasks as getTasksRequest, 
    addTask as addTaskRequest, 
    updateTask as updateTaskRequest, 
    deleteTask as deleteTaskRequest, 
    getTaskById as getTaskByIdRequest 
} from '../../services';

export const useTask = () => {
    const [tasks, setTasks] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [deletingTaskId, setDeletingTaskId] = useState(null);

    const getTasks = useCallback(async () => {
        setIsFetching(true);
        const response = await getTasksRequest();

        if (response.error) {
            toast.error(response.e?.response?.data?.message || 'Error al obtener las tareas');
            setIsFetching(false);
            return;
        }

        setTasks(response.tasks || response.data || []);
        setIsFetching(false);
    }, []);

    const createTask = async (taskData) => {
        if (!taskData) {
            toast.error('Los datos de la tarea son obligatorios');
            return false;
        }

        setIsCreating(true);
        try {
            const response = await addTaskRequest(taskData);

            if (response.error) {
                throw new Error(response.e?.response?.data?.message || 'Error al crear la tarea');
            }

            toast.success('Tarea creada correctamente');
            await getTasks();
            return true;
        } catch (err) {
            toast.error(err.message || 'Error al crear la tarea');
            return false;
        } finally {
            setIsCreating(false);
        }
    };

    const updateTask = async (taskId, taskData) => {
        if (!taskId || !taskData) {
            toast.error('ID de tarea y datos son obligatorios');
            return false;
        }

        setIsUpdating(true);
        try {
            const response = await updateTaskRequest(taskId, taskData);

            if (response.error) {
                throw new Error(response.e?.response?.data?.message || 'Error al actualizar la tarea');
            }

            toast.success('Tarea actualizada correctamente');
            await getTasks();
            return true;
        } catch (err) {
            toast.error(err.message || 'Error al actualizar la tarea');
            return false;
        } finally {
            setIsUpdating(false);
        }
    };

    const deleteTask = useCallback(async (taskId) => {
        if (!taskId) {
            toast.error('ID de tarea es obligatorio');
            return;
        }

        setDeletingTaskId(taskId);
        const response = await deleteTaskRequest(taskId);

        if (response.error) {
            toast.error(response.e?.response?.data?.message || 'Error al eliminar la tarea');
            setDeletingTaskId(null);
            return;
        }

        toast.success('Tarea eliminada correctamente');
        setTasks((prev) => prev.filter((task) => task._id !== taskId && task.tid !== taskId));
        setDeletingTaskId(null);
    }, []);

    const getTaskById = async (taskId) => {
        if (!taskId) {
            toast.error('ID de tarea es obligatorio');
            return null;
        }

        try {
            const response = await getTaskByIdRequest(taskId);

            if (response.error) {
                throw new Error(response.e?.response?.data?.message || 'Error al obtener la tarea');
            }

            return response.task || response.data;
        } catch (err) {
            toast.error(err.message || 'Error al obtener la tarea');
            return null;
        }
    };

    const toggleTaskStatus = async (taskId, newStatus) => {
        const updatedData = { 
            status: newStatus 
        };
        
        return await updateTask(taskId, updatedData);
    };

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    return {
        tasks,
        isFetching,
        isCreating,
        isUpdating,
        deletingTaskId,
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        getTaskById,
        toggleTaskStatus
    };
};