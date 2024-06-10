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
        required_columns = ['BALANCE', 'PURCHASES', 'CREDIT_LIMIT', 'PAYMENTS', 'PURCHASES_FREQUENCY', 'MINIMUM_PAYMENTS', 'TENURE']

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
    columns_list = df.columns.tolist()

    data = df[selected_columns].copy()
    #print('SEPARA DATA')
    data.fillna(data.mean(), inplace=True)
    #print('LLENA NULOS')

    scaler = StandardScaler()
    #print('SCALER')
    normalized_data = scaler.fit_transform(data)
    #print('NORMALIZA')

    return normalized_data, columns_list, selected_columns

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

def kmeans(normalized_data, optimal_clusters, df, numero):
    if numero == 0:
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

    score = silhouette_score(normalized_data, kmeans.fit_predict(normalized_data))

    return df, clusters, score

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

def generate_graph_image(df, variable1, variable2):
    plt.switch_backend('Agg')
    graph = BytesIO()
    
    # Crear la figura y los ejes con el color de fondo deseado
    fig, ax = plt.subplots(facecolor='#282c34')
    
    # Crear el gráfico de dispersión
    scatter = ax.scatter(df[variable1], df[variable2], c=df['Cluster'], cmap='coolwarm', alpha=1, s=100, edgecolor='black')
    ax.set_xlabel(variable1, color='white')
    ax.set_ylabel(variable2, color='white')
    ax.set_title('Gráfico de dispersión', color='white')
    
    # Establecer colores de los ejes
    ax.spines['bottom'].set_color('white')
    ax.spines['left'].set_color('white')
    ax.spines['top'].set_color('white')
    ax.spines['right'].set_color('white')
    
    # Establecer colores de las etiquetas de los ejes
    ax.tick_params(axis='x', colors='white')
    ax.tick_params(axis='y', colors='white')
    
    # Obtener los límites del eje x e y
    xlim = ax.get_xlim()
    ylim = ax.get_ylim()
    
    # Obtener los colores de los clusters
    cluster_colors = [scatter.cmap(scatter.norm(cluster)) for cluster in df['Cluster'].unique()]
    
    # Agregar la leyenda de clusters en la esquina superior derecha
    legend_elements = [plt.Line2D([0], [0], marker='o', color='w', label=f'Cluster {cluster}', markersize=10, markerfacecolor=color) for cluster, color in zip(df['Cluster'].unique(), cluster_colors)]
    legend = ax.legend(handles=legend_elements, loc='upper right', facecolor='#282c34', edgecolor='white', fontsize='large', framealpha=1)
    
    # Cambiar el color del texto de la leyenda
    for text in legend.get_texts():
        text.set_color('white')

    # Guardar el gráfico en el buffer de bytes
    plt.savefig(graph, format='png', facecolor='#282c34')
    plt.close()

    # Convertir el buffer de bytes en una cadena base64
    graph.seek(0)
    graph_img = base64.b64encode(graph.getvalue()).decode('utf-8')

    return graph_img

def change_clusters(df, optimalclusters):
    selected_columns = ['BALANCE', 'PURCHASES', 'CREDIT_LIMIT', 'PAYMENTS', 'PURCHASES_FREQUENCY', 'MINIMUM_PAYMENTS', 'TENURE']
    data = df[selected_columns].copy()
    data.fillna(data.mean(), inplace=True)

    scaler = StandardScaler()
    normalized_data = scaler.fit_transform(data)
    
    df, clusters, score = kmeans(normalized_data, optimalclusters, df, 1)
    pca_two = pca_kmeans(normalized_data, optimalclusters)

    return df, score, pca_two