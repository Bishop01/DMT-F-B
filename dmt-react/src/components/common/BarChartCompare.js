import React from 'react'
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"

const BarChartCompare = ({ chartData }) => {
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
        <Bar data={chartData} options={options} />
    )
}

export default BarChartCompare