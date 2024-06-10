const Requeriments = () => {
    return (
        <div>
            <h2>Columnas requeridas</h2>
            <p><b>BALANCE:</b>El saldo total que un cliente debe en su cuenta de tarjeta de crédito. El saldo de un cliente refleja su nivel de deuda y puede indicar su comportamiento financiero, su capacidad de gasto y su riesgo crediticio.</p>
            <p><b>PURCHASES:</b>El monto total de las compras realizadas desde la cuenta del cliente. El comportamiento de compra es crucial para segmentar a los clientes en función de su actividad comercial. Clientes con diferentes patrones de compra pueden tener diferentes necesidades y comportamientos.</p>
            <p><b>CREDIT_LIMIT:</b>El límite máximo de crédito disponible para el cliente. El límite de crédito indica la capacidad de endeudamiento del cliente. Clientes con límites de crédito más altos pueden tener un comportamiento de gasto diferente en comparación con aquellos con límites más bajos.</p>
            <p><b>PAYMENTS:</b>El monto total de dinero que los clientes han pagado a su tarjeta de crédito en los últimos 12 meses. La cantidad de pagos realizados refleja la capacidad de reembolso del cliente y su responsabilidad financiera. Es útil para identificar a los clientes que pagan sus deudas regularmente frente a aquellos que no lo hacen.</p>
            <p><b>PURCHASES_FREQUENCY:</b>La frecuencia con la que se realizan las compras, puntuado entre 0 y 1 (1 = compras frecuentes, 0 = compras infrecuentes). La frecuencia de compras ayuda a entender la actividad de compra habitual del cliente. Es útil para diferenciar entre clientes que compran regularmente y aquellos que compran esporádicamente.</p>
            <p><b>TENURE:</b>El tiempo que los clientes han estado usando su tarjeta de crédito, medido en meses. La antigüedad del cliente con la tarjeta de crédito puede influir en su comportamiento. Clientes más antiguos pueden tener diferentes patrones de uso y pagos en comparación con clientes nuevos.</p>
            <p><b>MINIMUM_PAYMENTS:</b> El monto mínimo que el cliente debe pagar en su tarjeta de crédito cada mes. El pago mínimo es el menor monto que se requiere para mantener la cuenta en buen estado. Los clientes que solo pagan el mínimo cada mes pueden estar gestionando su deuda de manera diferente a aquellos que pagan más del mínimo. Esta información es importante para evaluar el comportamiento de pago del cliente y su capacidad para manejar su deuda.</p>
        </div>
    )
}

export default Requeriments