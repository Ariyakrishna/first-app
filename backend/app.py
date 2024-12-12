from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS  # Import CORS
import os

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Get MongoDB URI from environment variable
# mongo_uri = os.getenv('MONGO_URI', 'mongodb://mongo:27017/mydatabase')
mongo_uri = os.getenv('MONGO_URI', 'mongodb://mongo:27017/mydatabase')
# Set up MongoDB connection
client = MongoClient(mongo_uri)
db = client['mydatabase']
collection = db['mycollection']

# Route to post data
@app.route('/post', methods=['POST'])
def post_data():
    try:
        # Get data from the request body
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Insert data into MongoDB collection
        result = collection.insert_one(data)
        
        # Return a success message with the inserted document ID
        return jsonify({'message': 'Data inserted successfully', 'id': str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
