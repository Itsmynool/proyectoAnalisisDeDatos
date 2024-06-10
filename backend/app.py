from helpers import validate_csv, preprocessing, pcaOne, elbowGraph, silhouetteScore, kmeans, pca_kmeans, generate_graph_image, change_clusters

import pandas as pd

from flask import Flask, jsonify, request, send_from_directory

app = Flask(__name__, static_folder='build/static', template_folder='build')

@app.route('/')
def serve():
    return send_from_directory(app.template_folder, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_static(path):
    # Check if the requested file is in the static folder
    if path.startswith('static'):
        return send_from_directory(app.static_folder, path)
    # Otherwise, serve the requested file from the build folder
    return send_from_directory(app.template_folder, path)

@app.route('/upload', methods=['POST'])
def upload_file():
    uploaded_file = request.files.get('file')
    if uploaded_file:
        is_valid, message = validate_csv(uploaded_file)
        if not is_valid:
            return jsonify({'error': message}), 400
        else:
            try:
                normalized_data, columsList, columns = preprocessing(uploaded_file)
                pcaImg = pcaOne(normalized_data)
                elbowImg = elbowGraph(normalized_data)
                silhouetteImg, optimalClusters = silhouetteScore(normalized_data)
                data, clusters, score = kmeans(normalized_data, optimalClusters, uploaded_file, 0)
                pcaClusterImg = pca_kmeans(normalized_data, clusters)
                columns.sort()

                return jsonify({
                    'pcaImg': pcaImg, 'elbowImg': elbowImg, 'silhouetteImg': silhouetteImg,
                    'optimalClusters': optimalClusters, 'data': data, 'pcaClusterImg': pcaClusterImg,
                    'columns': columns, 'columsList': columsList, 'score': score
                }), 200
            
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

        df = pd.DataFrame(array_data)
        graph_img = generate_graph_image(df, variableX, variableY)

        return jsonify({"graph_img": graph_img}), 200

    except:
        return jsonify({'error': 'Algo ha ocurrido'}), 400

@app.route('/change_optimal_clusters', methods=['POST'])
def change_optimal_clusters():
    try:
        data = request.json
        array_data = data.get('data')
        clusters = data.get('clusters')

        df = pd.DataFrame(array_data)
        data, score, pcaClusterImg = change_clusters(df, clusters)

        return jsonify({"data": data, "score": score, "pcaClusterImg": pcaClusterImg}), 200

    except:
        return jsonify({'error': 'Algo ha ocurrido'}), 400

#if __name__ == '__main__':
#    app.run(debug=True)

if __name__ == '__main__':
    app.run() 
