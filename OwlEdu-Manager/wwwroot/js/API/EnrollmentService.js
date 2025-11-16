import callApi from "../Utils/callApi.js";
import { getAuthToken } from "../Utils/getCookies.js";

const api_url = "https://localhost:7230";
const token = getAuthToken(); // Định nghĩa token một lần để sử dụng lại

const EnrollmentService = {
    getAllEnrollments: function (keyword = "", pageNumber = 1, pageSize = 10, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/Enrollment?keyword=${encodeURIComponent(keyword)}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getEnrollmentById: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/Enrollment/${id}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    addEnrollment: function (enrollmentData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/Enrollment`,
            method: "POST",
            data: enrollmentData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    updateEnrollment: function (id, enrollmentData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/Enrollment/${id}`,
            method: "PUT",
            data: enrollmentData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    deleteEnrollment: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/Enrollment/${id}`,
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    }
};

export default EnrollmentService;