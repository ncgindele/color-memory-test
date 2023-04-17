import React from 'react';
import { ResponsiveBar } from '@nivo/bar';


  const customFill = [
    {
      match: { id: 'Incorrect' },
      id: 'stripes'
    }
  ];

  const customDefs = [
    {
      id: 'stripes',
      type: 'patternLines',
      background: 'inherit',
      color: 'rgba(0, 0, 0, 15%)',
      rotation: -45,
      lineWidth: 6,
      spacing: 10
    }
  ];

const Histogram = (props) => {
    const data = [];
    let inRangeData;
    let trueZero = props.trueZero || false; // trueZero === true means values of zero get their own histogram bucket
    let foundZero = false;
    let disregardZero = false;
    const offset = props.offset || 0;
    const numOfGroups = props.groups.length;

    for (let i = 0; i < numOfGroups; i++) {
        inRangeData = props.data.filter(
          (datum) => {
            if (trueZero && !disregardZero && props.groups[i].name === "0" && props.xVal(datum) === 0) { // time to test zero bucket
              foundZero = true;
              return true;
            } else if (trueZero && disregardZero) { // past zero point
              return props.xVal(datum) < i * props.increment - offset && props.xVal(datum) > (i - 1) * props.increment - offset;
            } else { // default data range behavior
              return props.xVal(datum) < (i + 1) * props.increment - offset && props.xVal(datum) >= i * props.increment - offset;
            }
          });
        data.push(
            {
                "group": !disregardZero && foundZero ? "0" : props.groups[i].name,
                "Correct": (inRangeData.filter(datum => datum.correct).length / Math.max(inRangeData.length, 1)).toFixed(2),
                "Incorrect": (inRangeData.filter(datum => !datum.correct).length * -1 / Math.max(inRangeData.length, 1)).toFixed(2)
            }
        );
        if (trueZero && foundZero & !disregardZero) {
          disregardZero = true;
        }
    }   

  return (
    <div style={{ height: 480 }}>
      <ResponsiveBar
        data={data}
        keys={['Correct', 'Incorrect']}
        indexBy="group"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        layout="vertical"
        colors={d => props.groups.find(group => group.name === d.indexValue).color}
        valueFormat="> .0%"
        defs={customDefs}
        fill={customFill}
        maxValue= {1}
        minValue= {-1}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: props.xLabel,
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Accuracy',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default Histogram;