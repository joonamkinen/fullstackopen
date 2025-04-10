import propTypes from 'prop-types'

const Notification = ({ notification }) => {
    if (!notification) {
        return null
    }

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    }
    return (
        <div style={style}>
            {notification}
        </div>
    )
}

export default Notification
Notification.propTypes = {
    notification: propTypes.string,
}