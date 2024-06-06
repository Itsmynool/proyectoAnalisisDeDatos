import pandas as pd
from sklearn.preprocessing import StandardScaler
import io
import matplotlib.pyplot as plt
import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler

def validate_csv(file):
    try:
        df = pd.read_csv(file)
        required_columns = ['BALANCE', 'PURCHASES', 'CREDIT_LIMIT', 'PAYMENTS', 'PURCHASES_FREQUENCY', 'TENURE']

        if not set(required_columns).issubset(df.columns):
            return False, 'El archivo CSV no contiene las columnas requeridas'
        
        return True, 'El archivo CSV es válido.'
    except Exception as e:
        return False, f'Error al validar el archivo CSV: {str(e)}'
    
def preprocessing(file):
    #print('FILE: ', file)
    file.seek(0) 
    df = pd.read_csv(file)
    #print(df.dtypes)
    
    #print('LEE DATASET')

    df_head = df.head(5)

    #print('5 PRIMEROS DF')

    selected_columns = ['BALANCE', 'PURCHASES', 'CREDIT_LIMIT', 'PAYMENTS', 'PURCHASES_FREQUENCY', 'TENURE']
    #print('SELECCIONA COLUNAS')
    data = df[selected_columns]
    #print('SEPARA DATA')
    data.fillna(data.mean(), inplace=True)
    #print('LLENA NULOS')
    data_head = data.head(5)
    #print('5 PRIMEROS DATA')

    scaler = StandardScaler()
    #print('SCALER')
    normalized_data = scaler.fit_transform(data)
    #print('NORMALIZA')

    return df_head, data_head, normalized_data

def generate_plots_and_optimal_clusters(normalized_data):
    # Generar el gráfico del codo
    sse = []
    for k in range(1, 11):
        kmeans = KMeans(n_clusters=k, init='k-means++', max_iter=300, n_init=10, random_state=0)
        kmeans.fit(normalized_data)
        sse.append(kmeans.inertia_)

    plt.figure(figsize=(10, 6))
    plt.plot(range(1, 11), sse, marker='o')
    plt.title('Método del Codo')
    plt.xlabel('Número de clusters')
    plt.ylabel('SSE')
    
    elbow_img = io.BytesIO()
    plt.savefig(elbow_img, format='png')
    elbow_img.seek(0)
    plt.close()

    # Generar el gráfico de la silueta
    silhouette_scores = []
    K = range(2, 11)

    for k in K:
        kmeans = KMeans(n_clusters=k, init='k-means++', max_iter=300, n_init=10, random_state=0)
        kmeans.fit(normalized_data)
        score = silhouette_score(normalized_data, kmeans.labels_)
        silhouette_scores.append(score)

    optimal_clusters = K[silhouette_scores.index(max(silhouette_scores))]

    plt.figure(figsize=(10, 6))
    plt.plot(K, silhouette_scores, marker='o')
    plt.title('Método de la Silueta')
    plt.xlabel('Número de clusters')
    plt.ylabel('Puntuación de la Silueta')
    
    silhouette_img = io.BytesIO()
    plt.savefig(silhouette_img, format='png')
    silhouette_img.seek(0)
    plt.close()

    return elbow_img, silhouette_img, optimal_clusters

def kmeans(normalized_data, optimal_clusters, df):
    kmeans = KMeans(n_clusters=optimal_clusters, init='k-means++', max_iter=300, n_init=10, random_state=0)
    clusters = kmeans.fit_predict(normalized_data)

    # Añadir las etiquetas de los clusters al dataframe original
    df['Cluster'] = clusters

    return df
