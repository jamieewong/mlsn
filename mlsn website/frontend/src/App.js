import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        input: [parseFloat(input)]  // Adapt this to your model input
      });
      setResult(response.data.prediction);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>ML Prediction</h1>
      <input type="text" value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Predict</button>
      {result && <h2>Result: {result}</h2>}
    </div>
  );
}

export default App;