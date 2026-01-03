import React, { useState } from 'react';
import { Calendar, Image as ImageIcon, Upload, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Card from '../components/Card';
import api from '../services/api';

const CreateTripPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        tripName: '',
        startDate: '',
        endDate: '',
        description: '',
        coverPhoto: null,
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock User for Navbar
    const user = {
        name: "Alex",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, coverPhoto: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData({ ...formData, coverPhoto: null });
        setPreviewUrl(null);
    };

    const handleCancel = () => {
        navigate('/dashboard');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Create FormData for file upload
            const tripData = new FormData();
            tripData.append('name', formData.tripName);
            tripData.append('startDate', formData.startDate);
            tripData.append('endDate', formData.endDate);
            tripData.append('description', formData.description);

            if (formData.coverPhoto) {
                tripData.append('coverPhoto', formData.coverPhoto);
            }

            const response = await api.post('/trips', tripData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Trip created:', response.data);

            // Navigate to my-trips after successful save
            navigate('/my-trips');
        } catch (error: any) {
            console.error('Failed to create trip:', error);
            alert(error.response?.data?.message || 'Failed to create trip. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream pb-12">
            <Navbar user={user} />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-display font-bold text-text-dark">Plan a New Trip</h1>
                    <p className="mt-2 text-text-light">Start your adventure by filling in the details below.</p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Step 1: Trip Details */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">1</div>
                                <h3 className="text-lg font-semibold text-text-dark">Trip Details</h3>
                            </div>

                            <div>
                                <label htmlFor="tripName" className="block text-sm font-medium text-text-dark mb-1">
                                    Trip Name
                                </label>
                                <input
                                    type="text"
                                    id="tripName"
                                    name="tripName"
                                    required
                                    placeholder="e.g. Summer in Kerala"
                                    value={formData.tripName}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2.5 bg-sand/30 border border-sand rounded-[16px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm placeholder-text-light/50"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-text-dark mb-1">
                                        Start Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            required
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2.5 bg-sand/30 border border-sand rounded-[16px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm text-text-light"
                                        />
                                        <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-text-light pointer-events-none" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="endDate" className="block text-sm font-medium text-text-dark mb-1">
                                        End Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            id="endDate"
                                            name="endDate"
                                            required
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            className="block w-full px-4 py-2.5 bg-sand/30 border border-sand rounded-[16px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm text-text-light"
                                        />
                                        <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-text-light pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-text-dark mb-1">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={4}
                                    placeholder="What are you planning? (optional)"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-2.5 bg-sand/30 border border-sand rounded-[16px] focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm resize-none placeholder-text-light/50"
                                />
                            </div>
                        </div>

                        <div className="border-t border-slate-100 dark:border-slate-700" />

                        {/* Step 2: Cover Photo */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">2</div>
                                <h3 className="text-lg font-semibold text-text-dark">Cover Photo</h3>
                            </div>

                            <div className="flex justify-center rounded-[20px] border-2 border-dashed border-sand bg-sand/10 px-6 py-10 hover:border-primary/50 transition-colors relative group">
                                {previewUrl ? (
                                    <div className="relative w-full h-64">
                                        <img
                                            src={previewUrl}
                                            alt="Cover Preview"
                                            className="w-full h-full object-cover rounded-[16px] shadow-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-md text-text-light hover:text-accent transition-colors"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="mx-auto h-12 w-12 text-sand-dark">
                                            <ImageIcon className="h-12 w-12 text-text-light/50" />
                                        </div>
                                        <div className="mt-4 flex text-sm leading-6 text-text-light justify-center">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none hover:text-primary-dark"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="file-upload"
                                                    name="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs leading-5 text-text-light/70">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-sand flex justify-end gap-3">
                            <Button
                                variant="ghost"
                                type="button"
                                className="hover:bg-sand/30"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Saving...' : 'Save Trip'}
                            </Button>
                        </div>

                    </form>
                </Card>
            </div>
        </div>
    );
};

export default CreateTripPage;
