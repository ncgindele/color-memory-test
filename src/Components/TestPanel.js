import React from "react";
import TestInterface from "./TestInterface";
import '../css/Modal.css';
import ReactiveButton from 'reactive-button';

function TestPanel (props) {
  const luminance = 50;
  const saturation = 100;

  const [hue, setHue] = React.useState(0);
  const [deltaHue, setDeltaHue] = React.useState(0);
  const [step, setStep] = React.useState("begin");
  const [showRectangle, setShowRectangle] = React.useState(false);
  const [isSame, setIsSame] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  function handleOpenModal () {
    setShowModal(true);
  };

  function handleCloseModal () {
    setShowModal(false);
    setStep("begin");
    setShowRectangle(false);
  };
  
  function beginTest () {
    genNewColor();
    setStep("presentation");
    setShowRectangle(true);
  }

  function genNewColor () {
    const newColor = Math.random() * 360;
    setHue(newColor);
  }

  function genDeltaColor () {
    const upOrDown = Math.random() > 0.5 ? 1 : -1;
    setDeltaHue(props.maxDeltaHue * Math.random() * upOrDown);
    return (deltaHue + hue);
  }

  function setTestColor () {
    if (Math.random() > 0.5) {
      setHue(genDeltaColor());
      setIsSame(false)
    } else {
      setIsSame(true);
      setDeltaHue(0);
    }
  }

  function endPresentation () {
    setShowRectangle(false);
    setStep("occlution");
    setTestColor();
    setTimeout(() => {
      setShowRectangle(true)
      setStep("answer");
    }, props.duration);
  }


  function submitAnswer (judgment, confidence) {
    if (isSame && judgment === "same")
      props.handleAnswer(true, hue, deltaHue, confidence);
    else if (!isSame && judgment === "different")
      props.handleAnswer(true, hue, deltaHue, confidence);
    else
      props.handleAnswer(false, hue, deltaHue, confidence);

    beginTest();
  }

  return (
    <div>
      {/* TOP_LEVEL BUTTONS (MODAL CLOSED) */}
      <ReactiveButton 
        idleText="Begin Testing" 
        color="primary" 
        size="large"
        onClick={handleOpenModal} 
      />
      &nbsp;&nbsp;&nbsp;
      <ReactiveButton 
        outline
        idleText="Export Data to Console" 
        color="primary" 
        size="large"
        onClick={props.exportData} 
      />
      &nbsp;&nbsp;&nbsp;
      <ReactiveButton 
        idleText="Clear Data"
        color="red" 
        size="large"
        onClick={props.clearData}
      />
      {/* MODAL OPEN */}
      {showModal ? (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h1 className="align-left">Color Test</h1>
            <TestInterface
                hue={hue}
                saturation={saturation}
                luminance={luminance}
                step={step}
                beginTest={beginTest}
                endPresentation={endPresentation}
                submitAnswer={submitAnswer}
                showRectangle={showRectangle}
              />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TestPanel;