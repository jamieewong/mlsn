from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import sklearn

app = Flask(__name__)
CORS(app)

# Load model
model = joblib.load('bike_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_data = data['input']  # Adjust based on your expected input
    prediction = model.predict([input_data])
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)