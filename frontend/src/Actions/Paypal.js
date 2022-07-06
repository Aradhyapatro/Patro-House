import axios from "axios";
import { PAYPAL_FAILURE, PAYPAL_REQUEST, PAYPAL_SUCCESS } from "../Constants/Paypal"

export const getClientID = () => async (dispatch) => {
    try {
        dispatch({ type: PAYPAL_REQUEST });

        const { data } = await axios.get(
            `http://localhost:5000/api/config/paypal`,
        );

        dispatch({
            type: PAYPAL_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: PAYPAL_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
