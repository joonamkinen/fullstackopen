import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: "Notifications",
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return ""
        }
    }
})



export const setNotification = (message, time) => {
    return async (dispatch) => {
        dispatch(notificationSlice.actions.setNotification(message))
        setTimeout(() => {
            dispatch(notificationSlice.actions.clearNotification())
        }, time * 1000)
    }
}
export default notificationSlice.reducer