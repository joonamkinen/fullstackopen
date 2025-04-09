import PropTypes from 'prop-types'

const ErrorNotification = ({ message }) => {
  if (!message) {
    return null
  }

  const content = typeof message === 'object' ? message.message : message

  return (
    <div data-testid="error" className='error'>
      {content}
    </div>
  )
}

const SuccessNotification = ({ message }) => {
  if (!message) {
    return null
  }

  const content = typeof message === 'object' ? message.message : message

  return (
    <div data-testid="success" className='success'>
      {content}
    </div>
  )
}


export { ErrorNotification, SuccessNotification }
