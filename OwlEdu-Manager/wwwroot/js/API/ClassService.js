import callApi from "../Utils/callApi.js";
import { getAuthToken } from "../Utils/getCookies.js";

const api_url = "https://localhost:7230";
const token = getAuthToken();
const ClassService = {
    getAllClasses: function (keyword = "", pageNumber = 1, pageSize = 10, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Class?keyword=${encodeURIComponent(keyword)}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getClassById: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Class/${id}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    addClass: function (classData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Class`,
            method: "POST",
            data: classData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    updateClass: function (id, classData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Class/${id}`,
            method: "PUT",
            data: classData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    deleteClass: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Class/${id}`,
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    }
};

export default ClassService;