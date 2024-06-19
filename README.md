## Segmentación de Clientes basada en Comportamiento Financiero y de Compra

Este proyecto tiene como objetivo segmentar a los clientes en grupos homogéneos basados en su comportamiento financiero y de compra. La segmentación de clientes es una estrategia importante en marketing que permite identificar diferentes perfiles de clientes y adaptar las estrategias de marketing y ventas para satisfacer mejor sus necesidades y preferencias.

### Descripción de las Columnas Necesarias

- **BALANCE:** El saldo total que un cliente debe en su cuenta de tarjeta de crédito. Este saldo refleja el nivel de deuda del cliente y su comportamiento financiero.

- **PURCHASES:** El monto total de las compras realizadas desde la cuenta del cliente. El comportamiento de compra es crucial para segmentar a los clientes en función de su actividad comercial.

- **CREDIT_LIMIT:** El límite máximo de crédito disponible para el cliente. Indica la capacidad de endeudamiento del cliente y puede influir en su comportamiento de compra.

- **PAYMENTS:** El monto total de dinero que los clientes han pagado a su tarjeta de crédito en los últimos 12 meses. Refleja la capacidad de reembolso del cliente y su responsabilidad financiera.

- **PURCHASES_FREQUENCY:** La frecuencia con la que se realizan las compras, puntuado entre 0 y 1 (1 = compras frecuentes, 0 = compras infrecuentes). Ayuda a entender la actividad de compra habitual del cliente.

- **TENURE:** El tiempo que los clientes han estado usando su tarjeta de crédito, medido en meses. La antigüedad del cliente con la tarjeta de crédito puede influir en su comportamiento.

- **MINIMUM_PAYMENTS:** El monto mínimo que el cliente debe pagar en su tarjeta de crédito cada mes. El pago mínimo es el menor monto que se requiere para mantener la cuenta en buen estado. Los clientes que solo pagan el mínimo cada mes pueden estar gestionando su deuda de manera diferente a aquellos que pagan más del mínimo. Esta información es importante para evaluar el comportamiento de pago del cliente y su capacidad para manejar su deuda.

## Requisitos

- Python 3.12.0

### Instalación y Ejecución del Proyecto

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/tu_usuario/tu_proyecto.git](https://github.com/Itsmynool/proyectoAnalisisDeDatos

2. cd backend
3. pip install -r requirements.txt
4. python app.py
5. El archivo que debes ingresar a la app se encuentra en este mismo repositorio
