import callApi from '../Utils/callApi.js';
import { getAuthToken } from "../Utils/getCookies.js";

const api_url = "https://localhost:7230";
const token = getAuthToken();
const AccountService = {
    getAllAccounts: function (pageNumber = 1, pageSize = 10, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Account?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getAccountById: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Account/${id}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    addAccount: function (accountData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Account`,
            method: "POST",
            data: accountData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    updateAccount: function (id, accountData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Account/${id}`,
            method: "PUT",
            data: accountData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    deleteAccount: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Account/${id}`,
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    }
};

export default AccountService;