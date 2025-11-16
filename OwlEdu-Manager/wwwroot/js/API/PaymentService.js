import callApi from "../Utils/callApi.js";
import { getAuthToken } from "../Utils/getCookies.js";

const api_url = "https://localhost:7230";
const token = getAuthToken(); // Định nghĩa token một lần để sử dụng lại

const PaymentService = {
    getAllPayments: function (keyword = "", pageNumber = 1, pageSize = 10, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/Payment?keyword=${encodeURIComponent(keyword)}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getPaymentById: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/Payment/${id}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    addPayment: function (paymentData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/Payment`,
            method: "POST",
            data: paymentData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    updatePayment: function (id, paymentData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/Payment/${id}`,
            method: "PUT",
            data: paymentData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    deletePayment: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/Payment/${id}`,
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    }
};

export default PaymentService;