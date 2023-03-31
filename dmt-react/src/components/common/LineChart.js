import React from 'react'
import { Line } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

const LineChart = ({ chartData }) => {
    const options = {
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    }
    return (
        <Line data={chartData} options={options} />
    )
}

export default LineChart