import React from 'react';
import TestPanel from './TestPanel';
import ResultPlots from './ResultPlots';
import toast, { Toaster } from 'react-hot-toast';
import defaultData  from '../data.json';

function App() {
  const [maxDeltaHue, setMaxDeltaHue] = React.useState(3); //user control not implemented yet
  const [duration, setDuration] = React.useState(2000); //user control not implemented yet
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const browserData = JSON.parse(localStorage.getItem('data'));
    browserData && browserData.length > 0 ? setData(browserData) : setData(defaultData);
  }, [])

  function handleAnswer (correct, hue, deltaHue, confidence) {
    correct ? toast.success('Correct!') : toast.error('Sorry, incorrect.');
    setData((prevData) => [...prevData, 
        {
          correct: correct,
          hue: hue,
          deltaHue: deltaHue,
          confidence: confidence
        }]);
  }

  React.useEffect( () => { // Listen for changes in data and update localStorage
    localStorage.setItem('data', JSON.stringify(data));
    }, [data]
  );

  function exportData() {
    console.log(data);
    toast.success('Data sent to console. Press CTRL + Shift + J to view.')
  }

  function clearData () {
    if (window.confirm("Are you sure you want to clear the data? This is irreversable. You may load the default data by refreshing the page after clearing.")) {
        toast.success('Data cleared');
        localStorage.removeItem('data');
        setData(prev => []);
      }
  }

  return (
    <div className="App">
      <div><Toaster position="top-center" /></div>
      <header>
        <h1 className="page-heading align-left">
          <span className="heading-accent-word">Color</span><br></br>
          Memory &<br></br>
          <span className="heading-unaccent-word">Descrimination</span></h1>
        <hr></hr>
        <h2>&mdash;An informal test with data visualizations&mdash;</h2>
        <TestPanel
            handleAnswer={handleAnswer}
            exportData={exportData}
            clearData={clearData}
            maxDeltaHue={maxDeltaHue}
            duration={duration}
          />
        </header>
        <section>
          <ResultPlots 
          data={data} 
          maxDeltaHue={maxDeltaHue}
          />
        </section>
    </div>
  );
}

export default App;
