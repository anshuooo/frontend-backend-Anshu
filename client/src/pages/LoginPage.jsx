import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/validation';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login: setAuthUser } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const successMessage = location.state?.message;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
        setApiError('');
    };

    const validateForm = () => {
        const newErrors = {};

        const emailError = validateEmail(formData.email);
        if (emailError) newErrors.email = emailError;

        const passwordError = validatePassword(formData.password);
        if (passwordError) newErrors.password = passwordError;

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const response = await login({
                email: formData.email,
                password: formData.password,
            });
            setAuthUser(response.user);
            navigate('/dashboard');
        } catch (error) {
            setApiError(error.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full animate-fade-in">
                <Card>
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                        <p className="mt-2 text-sm text-gray-600">Login to access your dashboard</p>
                    </div>

                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-slide-up">
                            {successMessage}
                        </div>
                    )}

                    {apiError && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-slide-up">
                            {apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            error={errors.email}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            error={errors.password}
                            required
                        />

                        <Button type="submit" variant="primary" fullWidth loading={loading}>
                            Login
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
