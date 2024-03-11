"use client"
import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

export const options: any = {
    responsive: true,
    tension: 0.5,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

const labels = ['9am', '12pm', '3pm', '6pm', '8pm', '10pm', '12am', '3am', '6am', '8am'];

export const data: any = {
    labels,
    datasets: [
        // {
        //   label: 'Dataset 2',
        //   type: 'line',
        //   data: [65, 85, 90, 65, 45, 80, 50],
        //   fill: true,
        //   backgroundColor: '#FF718B',
        //   borderColor: '#FF718B',
        //   fillColor: (context:any) => {
        //     const ctx = context.chart.ctx;
        //     const gradient = ctx.createLinearGradient(0, 0, 0, 200);
        //     gradient.addColorStop(0, 'rgba(250,174,50,1)');
        //     gradient.addColorStop(1, 'rgba(250,174,50,0)');
        //     return gradient;
        //   },
        // },
        {
            label: 'Dataset 1',
            type: 'bar',
            data: [60, 80, 90, 70, 40, 75, 3, 20, 4, 52],
            backgroundColor: '#2576EF',
        },
    ],
};

const getBarColor = (value: any) => {
    return value < 5 ? 'rgba(251,0,15)' : 'rgba(39,174,96)';
};

const modifiedData = {
    ...data,

    datasets: [
        {
            ...data.datasets[0],
            backgroundColor: data.datasets[0].data.map(getBarColor),
        },
    ],
};

const Bargraph = () => {
    //   const [selectedDepartment, setSelectedDepartment] = useState('');
    //   const [selectedTimeline, setSelectedTimeline] = useState('');

    //   const handleDepartmentChange = (event:any) => {
    //     setSelectedDepartment(event.target.value);
    //   };

    //   const handleTimelineChange = (event:any) => {
    //     setSelectedTimeline(event.target.value);
    //   };

    return (
        <div className='grid grid-cols-8'>
            <div className="col-span-1 flex items-center">
                <div className='-rotate-90 text-neutral-400 text-xs font-normal leading-none'>
                    Core Cap</div>
            </div>
            <div className='w-full col-span-7'>
                <div className=" text-slate-400 text-xs font-normal whitespace-nowrap leading-none">
                    <h5 >Details</h5>
                    <div>
                    </div>
                    <div className='w-full sm:w-[80%] lg:w-full'>
                    <Bar options={options} data={modifiedData} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Bargraph;