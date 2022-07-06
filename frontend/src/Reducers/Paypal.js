import { PAYPAL_FAILURE, PAYPAL_REQUEST, PAYPAL_SUCCESS } from '../Constants/Paypal';

export const getPaypalClientId = (state = {}, action) => {
    switch (action.type) {
        case PAYPAL_REQUEST:
            return {
                Loading: true,
            };
        case PAYPAL_SUCCESS:
            return { Loading: false, clientID: action.payload };
        case PAYPAL_FAILURE:
            return { Loading: false, error: action.payload };
        default:
            return state;
    }
};