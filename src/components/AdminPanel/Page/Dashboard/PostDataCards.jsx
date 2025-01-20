import React, { useEffect, useRef, useMemo, useState } from 'react';
import ApexCharts from "apexcharts";
import axios from 'axios';
import axiosInstance from '../../../AxiosInstance';

const PostDataCharts = () => {
    const [seriesData, setSeriesData] = useState([0, 0, 0]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/api/posts/data');
                const pagodaCount = response.data.pagoda.count;
                const foodCount = response.data.food.count;
                const hotelCount = response.data.hotel.count;
                setSeriesData([pagodaCount, foodCount, hotelCount]); 
            } catch (error) {
                console.error('Error fetching post data')
            }
        };
        fetchData();
    }, []);

    const PostChartData = useMemo(() => {
        return {
            series: seriesData,
            colors: ["#1C64F2", "#16BDCA", "#9061F9"],
            chart: {
                height: 420,
                width: "100%",
                type: "pie",
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }, // Remove extra padding
            },
            stroke: {
                colors: ["white"],
            },
            plotOptions: {
                pie: {
                    size: "100%",
                    dataLabels: {
                        offset: -25,
                    },
                },
            },
            labels: ["Pagoda", "Food", "Hotel"],
            dataLabels: {
                enabled: true,
                formatter: function (val, opts) {
                    return opts.w.globals.series[opts.seriesIndex];
                },
                style: {
                    fontFamily: "Inter, sans-serif",
                    fontSize: '12px',
                },
            },
            legend: {
                position: "bottom",
                fontFamily: "Inter, sans-serif",
            },
        };
    }, [seriesData]);

    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current && typeof ApexCharts !== "undefined") {
            const chart = new ApexCharts(chartRef.current, PostChartData);
            chart.render();

            return () => {
                chart.destroy();
            };
        }
    }, [PostChartData]);

    return (
        <div className="max-w-sm  w-[250px] h-[310px] bg-white rounded-lg shadow-md dark:bg-gray-800 p-4 md:p-6 mt-3">
            <div className="mb-3 border-b border-gray-200 dark:border-gray-700 font-bold text-xl">
                Post Data
            </div>
            <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="postdropdown"
                data-dropdown-placement="bottom"
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 inline-flex items-center dark:hover:text-white"
                type="button"
            >
                Last 7 days
                <svg
                    className="w-2.5 h-2.5 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
           {/* <!-- Dropdown menu --> */}
           <div id="postdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
                    </li>
                </ul>
            </div>

            {/* Pie Chart */}
            <div ref={chartRef} className="mt-4" id="pie-chart"></div>
        </div>
    );
};


export default PostDataCharts;
