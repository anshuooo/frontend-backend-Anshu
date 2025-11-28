import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import { getUserProfile } from '../services/userService';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';

const DashboardPage = () => {
    const { user, updateUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // all, completed, pending

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('create'); // create or edit
    const [currentTask, setCurrentTask] = useState(null);
    const [taskForm, setTaskForm] = useState({
        title: '',
        description: '',
        status: 'pending',
    });
    const [taskErrors, setTaskErrors] = useState({});
    const [taskLoading, setTaskLoading] = useState(false);

    // Fetch user profile and tasks on mount
    useEffect(() => {
        fetchData();
    }, []);

    // Filter tasks when search or filter changes
    useEffect(() => {
        filterTasks();
    }, [tasks, searchQuery, filterStatus]);

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            // Fetch user profile
            const profileData = await getUserProfile();
            updateUser(profileData.user);

            // Fetch tasks
            const tasksData = await getTasks();
            setTasks(tasksData.tasks || []);
        } catch (err) {
            setError(err.message || 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const filterTasks = () => {
        let filtered = [...tasks];

        // Apply search filter
        if (searchQuery) {
            filtered = filtered.filter(
                (task) =>
                    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    task.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply status filter
        if (filterStatus !== 'all') {
            filtered = filtered.filter((task) => task.status === filterStatus);
        }

        setFilteredTasks(filtered);
    };

    const openCreateModal = () => {
        setModalMode('create');
        setTaskForm({ title: '', description: '', status: 'pending' });
        setTaskErrors({});
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setModalMode('edit');
        setCurrentTask(task);
        setTaskForm({
            title: task.title,
            description: task.description,
            status: task.status,
        });
        setTaskErrors({});
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
        setTaskForm({ title: '', description: '', status: 'pending' });
        setTaskErrors({});
    };

    const handleTaskFormChange = (e) => {
        const { name, value } = e.target;
        setTaskForm((prev) => ({ ...prev, [name]: value }));
        if (taskErrors[name]) {
            setTaskErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateTaskForm = () => {
        const errors = {};
        if (!taskForm.title.trim()) {
            errors.title = 'Title is required';
        }
        if (!taskForm.description.trim()) {
            errors.description = 'Description is required';
        }
        setTaskErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!validateTaskForm()) return;

        setTaskLoading(true);
        try {
            const newTask = await createTask(taskForm);
            setTasks((prev) => [newTask.task, ...prev]);
            closeModal();
        } catch (err) {
            setTaskErrors({ submit: err.message || 'Failed to create task' });
        } finally {
            setTaskLoading(false);
        }
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        if (!validateTaskForm()) return;

        setTaskLoading(true);
        try {
            const updatedTask = await updateTask(currentTask._id, taskForm);
            setTasks((prev) =>
                prev.map((task) => (task._id === currentTask._id ? updatedTask.task : task))
            );
            closeModal();
        } catch (err) {
            setTaskErrors({ submit: err.message || 'Failed to update task' });
        } finally {
            setTaskLoading(false);
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            await deleteTask(taskId);
            setTasks((prev) => prev.filter((task) => task._id !== taskId));
        } catch (err) {
            setError(err.message || 'Failed to delete task');
        }
    };

    const toggleTaskStatus = async (task) => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        try {
            const updatedTask = await updateTask(task._id, { ...task, status: newStatus });
            setTasks((prev) =>
                prev.map((t) => (t._id === task._id ? updatedTask.task : t))
            );
        } catch (err) {
            setError(err.message || 'Failed to update task status');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 animate-fade-in">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Welcome back, {user?.name}!</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-slide-up">
                        {error}
                    </div>
                )}

                {/* User Profile Card */}
                <Card className="mb-8 animate-slide-up">
                    <h2 className="text-2xl font-semibold mb-4">Profile</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-600">Name</p>
                            <p className="text-lg font-medium">{user?.name}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="text-lg font-medium">{user?.email}</p>
                        </div>
                    </div>
                </Card>

                {/* Task Management Section */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <h2 className="text-2xl font-semibold">My Tasks</h2>
                    <Button variant="primary" onClick={openCreateModal}>
                        + Add Task
                    </Button>
                </div>

                {/* Search and Filter */}
                <Card className="mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="all">All Tasks</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Tasks List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">No tasks found. Create your first task!</p>
                        </div>
                    ) : (
                        filteredTasks.map((task) => (
                            <Card key={task._id} className="animate-slide-up">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900 flex-1">{task.title}</h3>
                                    <input
                                        type="checkbox"
                                        checked={task.status === 'completed'}
                                        onChange={() => toggleTaskStatus(task)}
                                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                                    />
                                </div>
                                <p className="text-gray-600 mb-4">{task.description}</p>
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${task.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {task.status === 'completed' ? 'Completed' : 'Pending'}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(task)}
                                            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="text-red-600 hover:text-red-800 font-medium transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))
                    )}
                </div>
            </div>

            {/* Task Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={modalMode === 'create' ? 'Create New Task' : 'Edit Task'}
            >
                <form onSubmit={modalMode === 'create' ? handleCreateTask : handleUpdateTask}>
                    {taskErrors.submit && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {taskErrors.submit}
                        </div>
                    )}

                    <Input
                        label="Title"
                        type="text"
                        name="title"
                        value={taskForm.title}
                        onChange={handleTaskFormChange}
                        placeholder="Enter task title"
                        error={taskErrors.title}
                        required
                    />

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={taskForm.description}
                            onChange={handleTaskFormChange}
                            placeholder="Enter task description"
                            rows="4"
                            className={`w-full px-4 py-2.5 border ${taskErrors.description ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
                        />
                        {taskErrors.description && (
                            <p className="mt-1 text-sm text-red-500">{taskErrors.description}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                            name="status"
                            value={taskForm.status}
                            onChange={handleTaskFormChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <Button type="button" variant="secondary" onClick={closeModal}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" loading={taskLoading}>
                            {modalMode === 'create' ? 'Create Task' : 'Update Task'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default DashboardPage;
