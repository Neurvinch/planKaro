import React from 'react';
import { Users, MapPin, Activity, TrendingUp, BarChart2, PieChart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';

const AdminPage = () => {
    // Mock user
    const user = {
        name: "Admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
    };

    return (
        <div className="min-h-screen bg-text-dark text-white">
            <Navbar user={user} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-700 pb-6">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-white mb-2">Admin Dashboard</h1>
                        <p className="text-gray-400">Overview of platform statistics, user trends, and system health.</p>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-800 border-none rounded-lg py-2 px-4 text-sm text-gray-300 focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    </div>
                </div>

                {/* Filter Bar (Screen 12 Top) */}
                <div className="flex flex-wrap gap-4 mb-10">
                    <Button className="bg-primary hover:bg-primary-dark text-white border-none flex-1 md:flex-none">Manage Users</Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 flex-1 md:flex-none">Popular Cities</Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 flex-1 md:flex-none">Popular Activities</Button>
                    <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 flex-1 md:flex-none">User Trends</Button>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Chart Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Big Chart Card (Screen 12 Center) */}
                        <div className="bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-700 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">User Growth & Activity</h3>
                                    <p className="text-sm text-gray-400">Monthly active users vs. planned trips</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className="w-3 h-3 rounded-full bg-primary inline-block"></span> <span className="text-xs text-gray-400">Users</span>
                                    <span className="w-3 h-3 rounded-full bg-accent inline-block ml-2"></span> <span className="text-xs text-gray-400">Trips</span>
                                </div>
                            </div>

                            {/* Mock Chart Visualization */}
                            <div className="h-64 md:h-80 w-full flex items-end justify-between gap-2 md:gap-4 px-2">
                                {[40, 60, 45, 70, 55, 80, 65, 90, 75, 50, 60, 85].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col justify-end gap-1 h-full group cursor-pointer">
                                        <div
                                            className="w-full bg-primary/80 rounded-t-sm hover:bg-primary transition-all relative"
                                            style={{ height: `${h}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                {h * 12} Users
                                            </div>
                                        </div>
                                        <div
                                            className="w-full bg-accent/80 rounded-t-sm hover:bg-accent transition-all relative"
                                            style={{ height: `${h * 0.6}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                                {Math.floor(h * 6.5)} Trips
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* X-Axis */}
                            <div className="flex justify-between mt-4 text-xs text-gray-500 uppercase tracking-widest">
                                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                            </div>
                        </div>

                        {/* Secondary Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Popular Categories (Pie Chart Mock) */}
                            <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700">
                                <h3 className="text-lg font-bold text-white mb-6">Popular Categories</h3>
                                <div className="flex items-center justify-center relative h-48">
                                    {/* CSS Pie Chart */}
                                    <div
                                        className="w-40 h-40 rounded-full border-[20px]"
                                        style={{
                                            borderColor: 'transparent',
                                            background: 'conic-gradient(var(--color-primary) 0% 40%, var(--color-accent) 40% 70%, var(--color-secondary) 70% 100%)'
                                        }}
                                    ></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center flex-col">
                                            <PieChart className="text-gray-400 mb-1" size={24} />
                                            <span className="text-xs text-gray-400">Data</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-4 mt-6">
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary"></span><span className="text-xs text-gray-400">Adventure</span></div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-accent"></span><span className="text-xs text-gray-400">Relax</span></div>
                                    <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-secondary"></span><span className="text-xs text-gray-400">City</span></div>
                                </div>
                            </div>

                            {/* Bar Chart Mock 2 */}
                            <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 flex flex-col">
                                <h3 className="text-lg font-bold text-white mb-6">Revenue Trend</h3>
                                <div className="flex-1 flex items-end gap-3">
                                    {[30, 45, 35, 60, 50, 75, 65].map((h, i) => (
                                        <div key={i} className="flex-1 bg-gradient-to-t from-gray-700 to-gray-600 rounded-t-lg hover:from-primary hover:to-primary-dark transition-all" style={{ height: `${h}%` }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Info Panel */}
                    <div className="space-y-6">
                        {/* Info Card 1 */}
                        <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700">
                            <h4 className="font-bold text-white mb-4">Manage User Section</h4>
                            <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                This section is responsible for managing users and their actions. Admins can view all trips made by users and disable functionalities if needed.
                            </p>
                            <div className="flex items-center justify-between text-xs font-semibold text-gray-300 bg-gray-700/50 p-3 rounded-xl mb-2">
                                <span>Total Users</span>
                                <span className="text-primary">12,453</span>
                            </div>
                            <div className="flex items-center justify-between text-xs font-semibold text-gray-300 bg-gray-700/50 p-3 rounded-xl">
                                <span>New Today</span>
                                <span className="text-green-400">+128</span>
                            </div>
                        </div>

                        {/* Info Card 2 */}
                        <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700">
                            <h4 className="font-bold text-white mb-4">Popular Cities</h4>
                            <p className="text-xs text-gray-400 leading-relaxed mb-4">
                                Lists all popular cities where users are visiting based on current user trends.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">1</div>
                                        <span className="text-sm text-gray-300">Paris, France</span>
                                    </div>
                                    <span className="text-xs text-gray-500">2.1k visits</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">2</div>
                                        <span className="text-sm text-gray-300">Kyoto, Japan</span>
                                    </div>
                                    <span className="text-xs text-gray-500">1.8k visits</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">3</div>
                                        <span className="text-sm text-gray-300">New York, USA</span>
                                    </div>
                                    <span className="text-xs text-gray-500">1.5k visits</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
