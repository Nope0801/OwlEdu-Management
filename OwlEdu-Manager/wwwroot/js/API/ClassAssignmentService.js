import callApi from "../Utils/callApi.js";
import { getAuthToken } from "../Utils/getCookies.js";

const api_url = "https://localhost:7230";
const token = getAuthToken(); // Định nghĩa token một lần để sử dụng lại

const ClassAssignmentService = {
    getAllClassAssignments: function (keyword = "", pageNumber = 1, pageSize = 10, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/ClassAssignment?keyword=${encodeURIComponent(keyword)}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getClassAssignmentById: function (classId, studentId, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/ClassAssignment/${classId}/${studentId}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    addClassAssignment: function (classAssignmentData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/ClassAssignment`,
            method: "POST",
            data: classAssignmentData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    updateClassAssignment: function (classId, studentId, classAssignmentData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/ClassAssignment/${classId}/${studentId}`,
            method: "PUT",
            data: classAssignmentData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    deleteClassAssignment: function (classId, studentId, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/ClassAssignment/${classId}/${studentId}`,
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    }
};

export default ClassAssignmentService;