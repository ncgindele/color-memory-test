import React from "react";
import TestRectangle from "./TestRectangle";
import ConfidenceSlider from "./ConfidenceSlider";
import ReactiveButton from "reactive-button";

function TestInterface(props) {
  const [confidence, setConfidence] = React.useState(50);

  function handleSliderChange(event) {
    setConfidence(parseInt(event.target.value));
  }

  return (
    <div className="test-panel-ui">
      {/* INSTRUCTIONS */}
      {props.step === "begin" && (
        <p className="align-left">
          This exercise tests color memory and descrimination. You'll be shown a
          color to memorize and then have it occluded. After a given interval,
          in this case 2 seconds, the colored rectangle will reappear. Half of
          the time it will be the same color as before, and half different. Your
          task is to tell which is which, while also marking how confident you
          are of your choice. The data visualizations will update automatically
          with your results. Good luck!
        </p>
      )}
      {props.step === "presentation" && (
        <p className="align-left">
          Memorize this color and click 'continue' when ready.
        </p>
      )}
      {props.step === "answer" && (
        <p className="align-left">
          Is this color the same or different? Use the slider to indicate your
          confidence.
        </p>
      )}
      {/* Color Area */}
      <TestRectangle
        hue={props.hue}
        saturation={props.saturation}
        luminance={props.luminance}
        showRectangle={props.showRectangle}
      />
      {/* Buttons */}
      <div className="btn-container">
        {props.step === "begin" && (
          <>
            <ReactiveButton
              idleText="Begin Test"
              color="dark"
              size="large"
              onClick={props.beginTest}
            />
          </>
        )}
        {props.step === "presentation" && (
          <ReactiveButton
            outline
            idleText="Continue"
            color="dark"
            size="large"
            onClick={props.endPresentation}
          />
        )}
        {props.step === "answer" && (
          <div>
            <ConfidenceSlider 
                confidence={confidence}
                handleSliderChange={handleSliderChange} 
            />
            <ReactiveButton
              outline
              idleText="Same"
              color="dark"
              size="large"
              onClick={(e) => {
                props.submitAnswer("same", confidence);
                setConfidence(50);
              }}
            />
            <div className="btn-spacer"></div>
            <ReactiveButton
              outline
              idleText="Different"
              color="dark"
              size="large"
              onClick={(e) => {
                props.submitAnswer("different", confidence);
                setConfidence(50);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TestInterface;
