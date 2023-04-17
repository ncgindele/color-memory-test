import React from 'react';
import Histogram from './Histogram';

const deltaHueGroups = [
    { index: 0, name: "-3", color: "#777" },
    { index: 1, name: "-2.5", color: "#999" },
    { index: 2, name: "-2", color: "#aaa" },
    { index: 3, name: "-1.5", color: "#ccc" },
    { index: 4, name: "-1", color: "#ddd" },
    { index: 5, name: "-0.5", color: "#eee" },
    { index: 6, name: "0", color: "#e1e1e1" },
    { index: 7, name: "0.5", color: "#eee" },
    { index: 8, name: "1", color: "#ddd" },
    { index: 9, name: "1.5", color: "#ccc" },
    { index: 10, name: "2", color: "#aaa" },
    { index: 11, name: "2.5", color: "#999" },
    { index: 12, name: "3", color: "#777" },
  ];  

const colorGroups = [
    { index: 0, name: "Red", color: "#FF0000" },
    { index: 1, name: "Orange", color: "#FFA500" },
    { index: 2, name: "Yellow", color: "#FFFF00" },
    { index: 3, name: "Green", color: "#008000" },
    { index: 4, name: "Blue", color: "#0000FF" },
    { index: 5, name: "Indigo", color: "#4B0082" },
    { index: 6, name: "Violet", color: "#EE82EE" },
  ];

const confidenceGroups = [
    { index: 0, name: "< 20%", color: "#777" },
    { index: 1, name: "< 40%", color: "#999" },
    { index: 2, name: "< 60%", color: "#aaa" },
    { index: 3, name: "< 80%", color: "#ccc" },
    { index: 4, name: "< 100%", color: "#eee" }
]

function HistogramPanel (props) {

    const deltaHueIncrement = 2 * props.maxDeltaHue / deltaHueGroups.length;

    /* rgba colors not rendering with Nivo properly */

    // const deltaHueGroups = [];
    // let groupValue;
    // let groupColor;
    // for (let i = 8; i >= 0; i--)
    // {
    //     groupValue = props.maxDeltaHue * 2 - (i * deltaHueIncrement) - props.maxDeltaHue;
    //     groupColor = `rgba(0, 0, 0, ${ Math.abs(groupValue) * 0.2 + 0.1 })`;
    //     deltaHueGroups.push( { index: Math.abs(8 - i), name: groupValue, color: groupColor });
    // }

    return (
        <>
            <div className="histogram-container">
                <Histogram 
                    data={props.data}
                    groups={deltaHueGroups}
                    xLabel="Delta Hue"
                    xVal={(datum) => datum.deltaHue}
                    increment={ deltaHueIncrement }
                    offset={ props.maxDeltaHue }
                    trueZero={true}
                />
            </div>
            <div className="histogram-container">
                <Histogram 
                    data={props.data}
                    groups={colorGroups}
                    xVal={(datum) => datum.hue}
                    increment={ 360 / colorGroups.length}
                />
            </div>
            <div className="histogram-container">
                <Histogram 
                    data={props.data}
                    groups={confidenceGroups}
                    xLabel="Confidence"
                    xVal={(datum) => datum.confidence}
                    increment={ 100 / confidenceGroups.length } // percent
                />
            </div>
        </>
    )
}

export default HistogramPanel;