import React from 'react';
import ScatterPlot from './ScatterPlot';
import HistogramPanel from './HistogramPanel';

function ResultPlots (props) {

		return (
            <div className="results-container">
                <ScatterPlot 
                    data={props.data} 
                    maxDeltaHue={props.maxDeltaHue}
                />
                <HistogramPanel 
                    data={props.data} 
                    maxDeltaHue={props.maxDeltaHue}
                />
            </div>
		);
	}

export default ResultPlots;    