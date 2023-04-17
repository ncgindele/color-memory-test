import React from "react";
import Plot from "react-plotly.js";

const config = {
  displayModeBar: false
};

function ScatterPlot (props) {
    const correctArr = props.data.filter( (datum) => datum.correct);
    const incorrectArr = props.data.filter( (datum) => !datum.correct);
    const layout = {
      width: 1000,
      height: 1000,
      plot_bgcolor: '#fff',
      margin: { l: 0, r: 0, b: 0, t: 0, pad: 0 },
      scene: {
        xaxis: { title: "Delta Hue", range: [-1 * props.maxDeltaHue, props.maxDeltaHue] },
        yaxis: { title: "Hue", range: [0, 360]},
        zaxis: { title: "Confidence", range: [0, 100] },
        camera: { eye: { x: 2, y: 1.25, z: 1.25 }}
      }
    };
   const data = [
      {
        name: "Correct",
        type: "scatter3d",
        mode: "text+markers",
        x: correctArr.map( datum => datum.deltaHue),
        y: correctArr.map( datum => datum.hue),
        z: correctArr.map( datum => datum.confidence),
        marker: {
          size: 10,
          color: correctArr.map( datum => `hsla( ${ datum.hue }, 100%, 50%, 95%)`)
        },
        hovertemplate: "Delta Hue: %{x}<br>Hue: %{y}<br>Confidence: %{z}"
      },
      {
        name: "Incorrect",
        type: "scatter3d",
        mode: "text+markers",
        x: incorrectArr.map( datum => datum.deltaHue),
        y: incorrectArr.map( datum => datum.hue),
        z: incorrectArr.map( datum => datum.confidence),
        marker: {
          size: 15,
          color: incorrectArr.map( datum => `hsla( ${ datum.hue }, 100%, 50%, 65%)`),
          line: { // border
            color: '#111',
            width: 0.5
          }
        },
        hovertemplate: "Delta Hue: %{x}<br>Hue: %{y}<br>Confidence: %{z}"
      }
    ];

  return (
    <div className="scatter-plot-container">
        <Plot
          data={data}
          layout={layout} 
          config={config}
          />
    </div>
  );
};

export default ScatterPlot;