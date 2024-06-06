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
        #df = pd.read_csv(uploaded_file)
        #data = df.to_dict(orient='records')
        is_valid, message = validate_csv(uploaded_file)
        if not is_valid:
            return jsonify({'error': message}), 400
         
        else:
            #print('UPLOADED FILE: ', uploaded_file.filename)
            df_head, data_head, normalized_data = preprocessing(uploaded_file)
            #elbow_img, silhouette_img, optimal_clusters = generate_plots_and_optimal_clusters(normalized_data)
            #df_kmeas = kmeans(normalized_data, optimal_clusters, df)\\
            df_head.fillna(-1, inplace=True)
            object_columns = df_head.select_dtypes(include=['object']).columns
            for col in object_columns:
                df_head[col] = pd.factorize(df_head[col])[0]

            print(df_head.dtypes)
            print('------------------------------------------------')
            print(data_head.dtypes)
    
            return jsonify({'df_head': df_head.to_dict(orient='records')}), 200
    else:
        return jsonify({'error': 'No se seleccionó ningún archivo'}), 400

if __name__ == '__main__':
    app.run(debug=True)