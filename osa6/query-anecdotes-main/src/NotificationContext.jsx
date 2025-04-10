import { createContext, useReducer, useContext } from "react";


const notificationReducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return action.payload
        case "CLEAR_NOTIFICATION":
            return ""
        default:
            return state
    }
}




const NotificationContext = createContext()

import PropTypes from "prop-types";

export const NotificationProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, "");

    const setNotification = (message, timeout) => {
        dispatch({ type: "SET_NOTIFICATION", payload: message });
        setTimeout(() => {
            dispatch({ type: "CLEAR_NOTIFICATION" });
        }, timeout);
    };

    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    );
};

NotificationProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useNotify = () => {
    const { setNotification } = useContext(NotificationContext);

    const notify = (message, timeout = 5000) => {
        setNotification(message, timeout);
    };

    return notify;
};


export default NotificationContext;