from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS  # Import CORS
import os

app = Flask(__name__)

# Allow CORS for all domains (you can restrict this to specific domains later)
CORS(app, resources={r"/*": {"origins": "*"}})

mongo_uri = os.getenv('MONGO_URI', 'mongodb://mongo:27017/mydatabase')
client = MongoClient(mongo_uri)
db = client['mydatabase']
collection = db['mycollection']

@app.route('/post', methods=['POST'])
def post_data():
    try:
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        result = collection.insert_one(data)
        
        return jsonify({'message': 'Data inserted successfully', 'id': str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
