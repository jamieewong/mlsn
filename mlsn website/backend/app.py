from flask import Flask, request, jsonify
import numpy as np
import joblib  # or pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Load your trained model
model = joblib.load('/Users/jamiewong/Documents/mlsn bikes/bike_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'OPTIONS':
        # This is the CORS preflight request
        response = app.make_default_options_response()
        headers = response.headers

        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Headers'] = 'Content-Type'
        headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'

        return response

    data = request.get_json()
    values = data.get('features')
    prediction = model.predict([values])  # assuming model expects a 2D array
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)