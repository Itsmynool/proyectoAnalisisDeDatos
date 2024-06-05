const Notification = ({ message, type }) => {
    const className = `notification ${type}`

    if (message === null) {
      return null
    }
  
    return (
      <div className={className}>
        {message}
      </div>
    )
  }

  export default Notification