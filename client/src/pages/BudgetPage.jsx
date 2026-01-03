import React, { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, AlertCircle, Hotel, Plane, Utensils, Camera, Calendar, PieChart, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Button from '../components/Button';

const BudgetPage = () => {
    // Mock user
    const user = {
        name: "Alex",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    };

    // Mock budget data
    const budgetData = {
        tripName: "Summer in Japan",
        totalBudget: 3500,
        totalSpent: 2845,
        currency: "USD",
        days: 14,
        categories: [
            {
                id: 1,
                name: "Stay",
                icon: Hotel,
                budgeted: 1200,
                spent: 980,
                color: "bg-blue-500",
                lightColor: "bg-blue-50",
                textColor: "text-blue-600"
            },
            {
                id: 2,
                name: "Travel",
                icon: Plane,
                budgeted: 800,
                spent: 750,
                color: "bg-purple-500",
                lightColor: "bg-purple-50",
                textColor: "text-purple-600"
            },
            {
                id: 3,
                name: "Activities",
                icon: Camera,
                budgeted: 900,
                spent: 685,
                color: "bg-primary",
                lightColor: "bg-primary/10",
                textColor: "text-primary"
            },
            {
                id: 4,
                name: "Food",
                icon: Utensils,
                budgeted: 600,
                spent: 430,
                color: "bg-green-500",
                lightColor: "bg-green-50",
                textColor: "text-green-600"
            }
        ],
        dailyBreakdown: [
            { day: 1, date: "Jul 10", spent: 285 },
            { day: 2, date: "Jul 11", spent: 195 },
            { day: 3, date: "Jul 12", spent: 220 },
            { day: 4, date: "Jul 13", spent: 180 },
            { day: 5, date: "Jul 14", spent: 240 },
            { day: 6, date: "Jul 15", spent: 310 },
            { day: 7, date: "Jul 16", spent: 165 },
            { day: 8, date: "Jul 17", spent: 190 },
            { day: 9, date: "Jul 18", spent: 205 },
            { day: 10, date: "Jul 19", spent: 175 },
            { day: 11, date: "Jul 20", spent: 220 },
            { day: 12, date: "Jul 21", spent: 185 },
            { day: 13, date: "Jul 22", spent: 145 },
            { day: 14, date: "Jul 23", spent: 130 }
        ]
    };

    const remaining = budgetData.totalBudget - budgetData.totalSpent;
    const percentageSpent = (budgetData.totalSpent / budgetData.totalBudget) * 100;
    const averagePerDay = budgetData.totalSpent / budgetData.days;
    const maxDailySpent = Math.max(...budgetData.dailyBreakdown.map(d => d.spent));

    // Budget status
    const getBudgetStatus = () => {
        if (percentageSpent >= 90) return { status: 'critical', color: 'text-red-600', bgColor: 'bg-red-50', icon: AlertCircle };
        if (percentageSpent >= 75) return { status: 'warning', color: 'text-orange-600', bgColor: 'bg-orange-50', icon: TrendingUp };
        return { status: 'good', color: 'text-green-600', bgColor: 'bg-green-50', icon: TrendingDown };
    };

    const budgetStatus = getBudgetStatus();
    const StatusIcon = budgetStatus.icon;

    return (
        <div className="min-h-screen bg-cream">
            <Navbar user={user} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/itinerary/1">
                            <button className="p-2 hover:bg-sand/20 rounded-full transition-colors">
                                <ArrowLeft size={24} className="text-text-dark" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-display font-bold text-text-dark">Budget Overview</h1>
                            <p className="text-text-light mt-1">{budgetData.tripName}</p>
                        </div>
                    </div>
                    <Button variant="secondary" className="hidden sm:flex items-center gap-2">
                        <DollarSign size={18} />
                        Add Expense
                    </Button>
                </div>

                {/* Total Budget Card */}
                <Card className="p-6 mb-8 bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h2 className="text-lg font-semibold text-text-light">Total Trip Cost</h2>
                                <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${budgetStatus.bgColor}`}>
                                    <StatusIcon size={14} className={budgetStatus.color} />
                                    <span className={`text-xs font-semibold ${budgetStatus.color} capitalize`}>
                                        {budgetStatus.status}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-baseline gap-3 mb-4">
                                <h3 className="text-4xl font-display font-bold text-text-dark">
                                    ${budgetData.totalSpent.toLocaleString()}
                                </h3>
                                <span className="text-text-light">of ${budgetData.totalBudget.toLocaleString()}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative h-3 bg-sand/30 rounded-full overflow-hidden mb-2">
                                <div
                                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-500 ${percentageSpent >= 90 ? 'bg-red-500' :
                                            percentageSpent >= 75 ? 'bg-orange-500' :
                                                'bg-primary'
                                        }`}
                                    style={{ width: `${Math.min(percentageSpent, 100)}%` }}
                                />
                            </div>
                            <p className="text-sm text-text-light">
                                {percentageSpent.toFixed(1)}% of budget used
                            </p>
                        </div>

                        <div className="flex md:flex-col gap-4 md:gap-3 md:items-end">
                            <div className="text-center md:text-right">
                                <p className="text-sm text-text-light mb-1">Remaining</p>
                                <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    ${Math.abs(remaining).toLocaleString()}
                                </p>
                            </div>
                            <div className="text-center md:text-right">
                                <p className="text-sm text-text-light mb-1">Avg/Day</p>
                                <p className="text-2xl font-bold text-text-dark">
                                    ${averagePerDay.toFixed(0)}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Cost Categories */}
                <div className="mb-8">
                    <h2 className="text-2xl font-display font-semibold text-text-dark mb-6">Cost by Category</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {budgetData.categories.map((category) => {
                            const Icon = category.icon;
                            const categoryPercentage = (category.spent / category.budgeted) * 100;
                            const isOverBudget = category.spent > category.budgeted;

                            return (
                                <Card key={category.id} className="p-5 hover:shadow-medium transition-shadow">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-2xl ${category.lightColor}`}>
                                            <Icon size={24} className={category.textColor} />
                                        </div>
                                        {isOverBudget && (
                                            <div className="bg-red-50 p-1 rounded-full">
                                                <AlertCircle size={16} className="text-red-600" />
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="font-semibold text-text-dark mb-1">{category.name}</h3>
                                    <div className="flex items-baseline gap-2 mb-3">
                                        <span className="text-2xl font-bold text-text-dark">
                                            ${category.spent}
                                        </span>
                                        <span className="text-sm text-text-light">
                                            / ${category.budgeted}
                                        </span>
                                    </div>

                                    {/* Category Progress Bar */}
                                    <div className="relative h-2 bg-sand/30 rounded-full overflow-hidden mb-2">
                                        <div
                                            className={`absolute top-0 left-0 h-full rounded-full transition-all ${category.color}`}
                                            style={{ width: `${Math.min(categoryPercentage, 100)}%` }}
                                        />
                                    </div>
                                    <p className={`text-xs ${isOverBudget ? 'text-red-600 font-semibold' : 'text-text-light'}`}>
                                        {categoryPercentage.toFixed(0)}% {isOverBudget ? 'over budget' : 'used'}
                                    </p>
                                </Card>
                            );
                        })}
                    </div>
                </div>

                {/* Daily Breakdown & Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Cost Per Day */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-display font-semibold text-text-dark">Daily Spending</h2>
                            <Calendar size={20} className="text-primary" />
                        </div>

                        <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                            {budgetData.dailyBreakdown.map((day) => {
                                const barWidth = (day.spent / maxDailySpent) * 100;
                                return (
                                    <div key={day.day} className="group">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-text-dark">
                                                Day {day.day} <span className="text-text-light text-xs">({day.date})</span>
                                            </span>
                                            <span className="text-sm font-semibold text-text-dark">
                                                ${day.spent}
                                            </span>
                                        </div>
                                        <div className="relative h-2 bg-sand/20 rounded-full overflow-hidden">
                                            <div
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-300 group-hover:opacity-80"
                                                style={{ width: `${barWidth}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </Card>

                    {/* Chart Placeholders */}
                    <div className="space-y-8">
                        {/* Pie Chart Placeholder */}
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-display font-semibold text-text-dark">Category Distribution</h2>
                                <PieChart size={20} className="text-primary" />
                            </div>
                            <div className="flex items-center justify-center h-64 bg-gradient-to-br from-sand/10 to-primary/5 rounded-2xl border-2 border-dashed border-sand/50">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-soft mb-3">
                                        <PieChart size={32} className="text-primary" />
                                    </div>
                                    <p className="text-text-light font-medium">Pie Chart</p>
                                    <p className="text-xs text-text-light/70 mt-1">Visual breakdown coming soon</p>
                                </div>
                            </div>
                        </Card>

                        {/* Bar Chart Placeholder */}
                        <Card className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-display font-semibold text-text-dark">Spending Trends</h2>
                                <BarChart3 size={20} className="text-primary" />
                            </div>
                            <div className="flex items-center justify-center h-48 bg-gradient-to-br from-sand/10 to-primary/5 rounded-2xl border-2 border-dashed border-sand/50">
                                <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-soft mb-3">
                                        <BarChart3 size={32} className="text-primary" />
                                    </div>
                                    <p className="text-text-light font-medium">Bar Chart</p>
                                    <p className="text-xs text-text-light/70 mt-1">Trends analysis coming soon</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Mobile Add Expense Button */}
                <div className="sm:hidden fixed bottom-6 right-6">
                    <Button variant="primary" className="rounded-full w-14 h-14 flex items-center justify-center shadow-lg">
                        <DollarSign size={24} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BudgetPage;
