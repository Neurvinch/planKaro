import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface BudgetChartProps {
    data: {
        accommodation: number;
        transport: number;
        meals: number;
        activities: number;
    };
}

const BudgetChart: React.FC<BudgetChartProps> = ({ data }) => {
    const chartData = [
        { name: 'Accommodation', value: data.accommodation },
        { name: 'Transport', value: data.transport },
        { name: 'Meals', value: data.meals },
        { name: 'Activities', value: data.activities },
    ].filter(item => item.value > 0);

    const COLORS = ['#6366f1', '#ec4899', '#f59e0b', '#10b981'];

    if (chartData.length === 0) {
        return <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', padding: '20px' }}>No budget data to display</p>;
    }

    return (
        <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            background: 'var(--background)',
                            border: '1px solid var(--border)',
                            borderRadius: '8px',
                            fontSize: '12px'
                        }}
                    />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BudgetChart;
