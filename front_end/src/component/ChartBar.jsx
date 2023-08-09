import React from "react";

import "./ChartBar.css";

const ChartBar = (props) => {
    // console.log(props);
    let barFillHeight = "0%";

    if (props.maxValue > 0) {
        barFillHeight = Math.round((props.value / props.maxValue) * 100) + "%";
    }

    return (
        <div className="chart-bar" style={{width:"50%", margin:"10px"}}>
            <div className="chart-bar__inner">
                <div
                    className="chart-bar__fill"
                    style={{ height: barFillHeight }}
                ></div>
            </div>
            <div className="chart-bar__label">{props.label}</div>
        </div>
    );
};

export default ChartBar;
