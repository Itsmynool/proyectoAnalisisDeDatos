from flask import Flask, jsonify, request
from helpers import validate_csv, preprocessing, pcaOne, elbowGraph, silhouetteScore, kmeans, pca_kmeans
from flask_cors import CORS

import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files.get('file')
    if uploaded_file:
        #df = pd.read_csv(uploaded_file)
        #data = df.to_dict(orient='records')
        is_valid, message = validate_csv(uploaded_file)
        if not is_valid:
            return jsonify({'error': message}), 400
         
        else:
            try:
                normalized_data = preprocessing(uploaded_file)
                #print('Normaliza')
                pcaImg = pcaOne(normalized_data)
                #print('PCA UNO')
                elbowImg = elbowGraph(normalized_data)
                #print('Eblow')
                silhouetteImg, optimalClusters = silhouetteScore(normalized_data)
                #print('Silhouette')
                data, clusters = kmeans(normalized_data, optimalClusters, uploaded_file)
                #print('Kmeans')
                pcaClusterImg = pca_kmeans(normalized_data, clusters)
                #print('PCA DOS}')

                return jsonify({'pcaImg': pcaImg, 'elbowImg': elbowImg, 'silhouetteImg': silhouetteImg,'optimalClusters': optimalClusters, 'data': data, 'pcaClusterImg': pcaClusterImg}), 200
            
            except pd.errors.ParserError:
                return jsonify({"error": "Error al analizar el archivo CSV"}), 400
            
            except Exception as e:
                return jsonify({"error": str(e)}), 500
    else:
        return jsonify({'error': 'No se seleccionó ningún archivo'}), 400

if __name__ == '__main__':
    app.run(debug=True)