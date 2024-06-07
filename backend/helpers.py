import pandas as pd
from sklearn.preprocessing import StandardScaler
import io
import matplotlib.pyplot as plt
import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler
import base64
from io import BytesIO
from sklearn.decomposition import PCA
import seaborn as sns

def validate_csv(file):
    try:
        df = pd.read_csv(file)
        required_columns = ['BALANCE', 'PURCHASES', 'CREDIT_LIMIT', 'PAYMENTS', 'PURCHASES_FREQUENCY', 'TENURE']

        if not set(required_columns).issubset(df.columns):
            return False, 'El archivo CSV no contiene las columnas requeridas'
        
        for column in required_columns:
            if not pd.api.types.is_numeric_dtype(df[column]):
                return False, f'Las columnas requeridas deben ser numericas'
        
        return True, 'El archivo CSV es válido.'
    except Exception as e:
        return False, f'Error al validar el archivo CSV: {str(e)}'

def dataframeToDictionary(df):
    df.fillna(-1, inplace=True)
    df = df.infer_objects()
    df.replace(-1, None, inplace=True)

    return df.to_dict(orient='records')

def preprocessing(file):
    file.seek(0) 
    df = pd.read_csv(file)

    selected_columns = ['BALANCE', 'PURCHASES', 'CREDIT_LIMIT', 'PAYMENTS', 'PURCHASES_FREQUENCY', 'MINIMUM_PAYMENTS', 'TENURE']

    data = df[selected_columns].copy()
    #print('SEPARA DATA')
    data.fillna(data.mean(), inplace=True)
    #print('LLENA NULOS')

    scaler = StandardScaler()
    #print('SCALER')
    normalized_data = scaler.fit_transform(data)
    #print('NORMALIZA')

    return normalized_data

def pcaOne(normalized_data):
    plt.switch_backend('Agg')
    pca_simple = PCA(n_components=2)
    pca_data_simple = pca_simple.fit_transform(normalized_data)

    pca_normal = BytesIO()
    plt.figure(figsize=(10, 6))
    sns.scatterplot(x=pca_data_simple[:, 0], y=pca_data_simple[:, 1])
    plt.title('Visualización de datos usando PCA')
    plt.xlabel('Componente Principal 1')
    plt.ylabel('Componente Principal 2')
    plt.savefig(pca_normal, format='png')
    plt.close()
    pca_normal.seek(0)
    pca_img = base64.b64encode(pca_normal.getvalue()).decode('utf-8')

    return pca_img

def elbowGraph(data):
    plt.switch_backend('Agg')
    # Generar el gráfico del codo
    sse = []
    for k in range(1, 11):
        kmeans = KMeans(n_clusters=k, init='k-means++', max_iter=300, n_init=10, random_state=0)
        kmeans.fit(data)
        sse.append(kmeans.inertia_)

    elbow_buffer = BytesIO()
    plt.figure(figsize=(10, 6))
    plt.plot(range(1, 11), sse, marker='o')
    plt.title('Método del Codo')
    plt.xlabel('Número de clusters')
    plt.ylabel('Inertia')
    plt.savefig(elbow_buffer, format='png')
    plt.close()
    elbow_buffer.seek(0)
    elbow_img = base64.b64encode(elbow_buffer.getvalue()).decode('utf-8')

    return elbow_img

def silhouetteScore(normalized_data):
    plt.switch_backend('Agg')
    silhouette_scores = []
    K = range(2, 11)

    for k in K:
        kmeans = KMeans(n_clusters=k, init='k-means++', max_iter=300, n_init=10, random_state=0)
        kmeans.fit(normalized_data)
        score = silhouette_score(normalized_data, kmeans.labels_)
        silhouette_scores.append(score)

    optimal_clusters = K[silhouette_scores.index(max(silhouette_scores))]

    silhouette_buffer = BytesIO()
    plt.figure(figsize=(10, 6))
    plt.plot(K, silhouette_scores, marker='o')
    plt.title('Método de la Silueta')
    plt.xlabel('Número de clusters')
    plt.ylabel('Puntuación de la Silueta')
    plt.savefig(silhouette_buffer, format='png')
    plt.close()
    silhouette_buffer.seek(0)
    silhouette_img = base64.b64encode(silhouette_buffer.getvalue()).decode('utf-8')

    return silhouette_img, optimal_clusters

def kmeans(normalized_data, optimal_clusters, df):
    df.seek(0) 
    df = pd.read_csv(df)
    #print('Lee DF')

    kmeans = KMeans(n_clusters=optimal_clusters, init='k-means++', max_iter=300, n_init=10, random_state=0)
    #print('KMEANS')
    clusters = kmeans.fit_predict(normalized_data)
    #print('Clusters')

    df['Cluster'] = clusters

    df = dataframeToDictionary(df)
    #print('Dictionary')

    return df, clusters

def pca_kmeans(normalized_data, clusters):
    plt.switch_backend('Agg')
    pca_kmeans = BytesIO()
    pca = PCA(n_components=2)
    pca_data = pca.fit_transform(normalized_data)

    plt.figure(figsize=(10, 6))
    sns.scatterplot(x=pca_data[:, 0], y=pca_data[:, 1], hue=clusters, palette='Set1')
    plt.title('Clusters visualizados usando PCA')
    plt.xlabel('PCA Componente 1')
    plt.ylabel('PCA Componente 2')
    plt.savefig(pca_kmeans, format='png')
    plt.close()
    pca_kmeans.seek(0)
    pca_two = base64.b64encode(pca_kmeans.getvalue()).decode('utf-8')

    return pca_two
