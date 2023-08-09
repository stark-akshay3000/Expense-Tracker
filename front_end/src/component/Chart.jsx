import React from "react";
import { useState, useEffect, useMemo } from "react";
import ChartBar from "./ChartBar";
import "./Chart.css";
import { useSelector } from "react-redux";
const Chart = (props) => {
    const { expense, selectedYear } = useSelector((state) => state.expense);

    const [data, setData] = useState([]);
    const [chartDataPoints, setChartDataPoints] = useState([
        { label: "Jan", value: 0 },
        { label: "Feb", value: 0 },
        { label: "Mar", value: 0 },
        { label: "Apr", value: 0 },
        { label: "May", value: 0 },
        { label: "Jun", value: 0 },
        { label: "Jul", value: 0 },
        { label: "Aug", value: 0 },
        { label: "Sep", value: 0 },
        { label: "Oct", value: 0 },
        { label: "Nov", value: 0 },
        { label: "Dec", value: 0 },
    ]);

    useEffect(() => {
        let filteredData = expense;

        if (selectedYear !== "ALL") {
            filteredData = expense.filter((item) => {
                const d = new Date(item.date);
                return selectedYear === d.getFullYear().toString();
            });
        }

        setData(filteredData);
    }, [selectedYear, expense]);
    // console.log(chartDataPoints);

    // console.log("chartDataPoints");
    useEffect(() => {
        const updatedChartDataPoints = [
            { label: "Jan", value: 0 },
            { label: "Feb", value: 0 },
            { label: "Mar", value: 0 },
            { label: "Apr", value: 0 },
            { label: "May", value: 0 },
            { label: "Jun", value: 0 },
            { label: "Jul", value: 0 },
            { label: "Aug", value: 0 },
            { label: "Sep", value: 0 },
            { label: "Oct", value: 0 },
            { label: "Nov", value: 0 },
            { label: "Dec", value: 0 },
        ];

        for (let x of data) {
            const d = new Date(x.date);
            const expenseMonth = d.getMonth(); // starting at 0 => January => 0

            updatedChartDataPoints[expenseMonth].value += x.price;
        }

        setChartDataPoints((prev) => {
            return (prev = updatedChartDataPoints);
        });
    }, [data]);

    const totalMaximum = useMemo(() => {
        const maxprice = chartDataPoints.map((items) => items.value);
        return Math.max(...maxprice);
    }, [chartDataPoints, selectedYear]);

    return (
        <div className="chart">
            {chartDataPoints.map((dataPoint, index) => {
                return (
                    <ChartBar
                        key={index}
                        value={dataPoint.value}
                        maxValue={totalMaximum}
                        label={dataPoint.label}
                    />
                );
            })}
        </div>
    );
};

export default Chart;
