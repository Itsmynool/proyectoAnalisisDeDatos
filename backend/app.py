from flask import Flask, jsonify, request
from helpers import validate_csv, preprocessing, generate_plots_and_optimal_clusters, kmeans
from flask_cors import CORS

import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files.get('file')
    if uploaded_file:
        df = pd.read_csv(uploaded_file)
        data = df.to_dict(orient='records')
        return jsonify({'archivo': data}), 200
    #    is_valid, message = validate_csv(uploaded_file)
    #    if not is_valid:
    #        return jsonify({'error': message}), 400
    #    
    #    else:
    #        df, data_head, normalized_data = preprocessing(uploaded_file)
    #        #elbow_img, silhouette_img, optimal_clusters = generate_plots_and_optimal_clusters(normalized_data)
    #        #df_kmeas = kmeans(normalized_data, optimal_clusters, df)
    #
    #        return jsonify({'mensaje': 'Todo melo'})
    else:
        return jsonify({'error': 'No se seleccionó ningún archivo'}), 400

if __name__ == '__main__':
    app.run(debug=True)