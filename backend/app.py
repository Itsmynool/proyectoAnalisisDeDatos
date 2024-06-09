from flask import Flask, jsonify, request
from helpers import validate_csv, preprocessing, pcaOne, elbowGraph, silhouetteScore, kmeans, pca_kmeans, generate_graph_image
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
                normalized_data, columns = preprocessing(uploaded_file)
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
                columns.sort()

                return jsonify({'pcaImg': pcaImg, 'elbowImg': elbowImg, 'silhouetteImg': silhouetteImg,'optimalClusters': optimalClusters, 'data': data, 'pcaClusterImg': pcaClusterImg, 'columns': columns}), 200
            
            except pd.errors.ParserError:
                return jsonify({"error": "Error al analizar el archivo CSV"}), 400
            
            except Exception as e:
                return jsonify({"error": "Ha ocurrido un error"}), 500
    else:
        return jsonify({'error': 'No se seleccionó ningún archivo'}), 400
    
@app.route('/generate_graph', methods=['POST'])
def generate_graph():
    try:
        data = request.json
        array_data = data.get('data')
        variableX = data.get('variableX')
        variableY = data.get('variableY')

        #print('X: ', variableX)
        #print('Y: ', variableY)
        #print('COLUMNS: ', columns)

        # Convert the array to a DataFrame
        df = pd.DataFrame(array_data)

        #print(df.head())

        graph_img = generate_graph_image(df, variableX, variableY)

        return jsonify({"graph_img": graph_img}), 200

    except:
        return jsonify({'error': 'Algo ha ocurrido'}), 400



if __name__ == '__main__':
    app.run(debug=True)