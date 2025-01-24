import React, { useEffect, useRef, useMemo, useState } from 'react'
import ApexCharts from "apexcharts";
import axiosInstance from '../../../AxiosInstance';

const UserActiveCharts = () => {

    const [userData,setUserData] = useState([]);

    const fetchData = async () => {
        try {
          const response = await axiosInstance.get('/api/weeklyuserdata');
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
    };
    
    const options = useMemo(() => ({
        colors: ["#1A56DB", "#FDBA8C"],
        series: [
            {
                name: "Active",
                color: "#1A56DB",
                /*data: [
                    { x: "Mon", y: 231 },
                    { x: "Tue", y: 122 },
                    { x: "Wed", y: 63 },
                    { x: "Thu", y: 421 },
                    { x: "Fri", y: 122 },
                    { x: "Sat", y: 323 },
                    { x: "Sun", y: 111 },
                ],*/
                data: userData.map(item => ({
                    x: item.x,
                    y: item.y,
                  })),
            },
            /*{
                name: "Dis",
                color: "#FDBA8C",
                data: [
                    { x: "Mon", y: 232 },
                    { x: "Tue", y: 113 },
                    { x: "Wed", y: 341 },
                    { x: "Thu", y: 224 },
                    { x: "Fri", y: 522 },
                    { x: "Sat", y: 411 },
                    { x: "Sun", y: 243 },
                ],
            },*/
        ],
        chart: {
            type: "bar",
            height: "320px",
            fontFamily: "Inter, sans-serif",
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "70%",
                borderRadiusApplication: "end",
                borderRadius: 8,
            },
        },
        tooltip: {
            shared: true,
            intersect: false,
            style: {
                fontFamily: "Inter, sans-serif",
            },
        },
        states: {
            hover: {
                filter: {
                    type: "darken",
                    value: 1,
                },
            },
        },
        stroke: {
            show: true,
            width: 0,
            colors: ["transparent"],
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
                left: 2,
                right: 2,
                top: -14
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        xaxis: {
            floating: false,
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssclass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                }
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            show: false,
        },
        fill: {
            opacity: 1,
        },
    }), [userData]);

    useEffect(()=>{
        fetchData()
    },[]);

    useEffect(() => {
        if (chartRef.current && typeof ApexCharts !== "undefined") {
            const chart = new ApexCharts(chartRef.current, options);
            chart.render();

            return () => {
                chart.destroy();
            };
    }
    }, [options]);  

    const chartRef = useRef(null);
    const weekly_register = userData.reduce((sum, item) => sum + item.y, 0);

    return (
        <div className="max-w-sm w-[320px] h-[440px] bg-white rounded-lgdark:bg-gray-800 p-4 md:p-6 shadow-md">
            <div className='mb-3 border-b border-gray-200 dark:border-gray-700 font-bold text-xl'>
                User Active
            </div>
            <div className="flex justify-between">
                <div className="flex">
                    <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 19">
                            <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                            <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
                        </svg>
                    </div>
                    <div className="flex justify-center items-center">
                        <h5 className="leading-none text-1xl font-bold text-gray-900 dark:text-white ">{weekly_register}</h5>
                        {/* <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Leads generated per week</p> */}
                    </div>
                    <div>
                        <span className="bg-green-100 ml-2 text-green-800 text-xs font-medium inline-flex px-2.5 py-0.5 items-center rounded-md dark:bg-green-900 dark:text-green-300">
                            <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13V1m0 0L1 5m4-4 4 4" />
                            </svg>
                            42.5%
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 items-center border-gray-200 dark:border-gray-700 justify-between">
                    <div className="flex justify-between items-center">
                        {/* <!-- Button --> */}
                        <button
                            id="dropdownDefaultButton"
                            data-dropdown-toggle="lastDaysdropdown"
                            data-dropdown-placement="bottom"
                            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                            type="button">
                            Last 7 days
                            <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
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
                    </div>
                </div>
            </div>

            <div ref={chartRef} id="data-series-chart"></div>
        </div>
    );
};

export default UserActiveCharts