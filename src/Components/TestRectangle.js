import React from 'react';

function TestRectangle (props) {
    const style = {
        backgroundColor: `hsl(${props.hue}, ${props.saturation}%, ${props.showRectangle ? props.luminance : 100}%)`,
        height: props.showRectangle ? 350 : 0
    };

    return (
        <div className="test-rectangle" style={style}>
        </div>
    )
}

export default TestRectangle;