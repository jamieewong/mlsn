import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({ val1: '', val2: '', val3: '', val4: '' });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const values = [
        parseFloat(formData.val1),
        parseFloat(formData.val2),
        parseFloat(formData.val3),
        parseFloat(formData.val4)
      ];

      const response = await axios.post('http://localhost:5000/predict', {
        features: values
      });

      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error fetching prediction", error);
    }
  };

  return (
    <div className="App">
      <h2>Enter values for prediction</h2>
      <form onSubmit={handleSubmit}>
        <input name="val1" value={formData.val1} onChange={handleChange} placeholder="Value 1" />
        <input name="val2" value={formData.val2} onChange={handleChange} placeholder="Value 2" />
        <input name="val3" value={formData.val3} onChange={handleChange} placeholder="Value 3" />
        <input name="val4" value={formData.val4} onChange={handleChange} placeholder="Value 4" />
        <button type="submit">Predict</button>
      </form>

      {prediction !== null && (
        <div>
          <h3>Prediction: {prediction}</h3>
        </div>
      )}
    </div>
  );
}

export default App;