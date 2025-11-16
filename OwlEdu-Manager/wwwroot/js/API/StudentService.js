import callApi from '../Utils/callApi.js';
import { getAuthToken } from "../Utils/getCookies.js";
const api_url = "https://localhost:7230";
const token = getAuthToken();
const StudentService = {
    getAllStudents: function (pageNumber = 1, pageSize = 10, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Student?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getStudentById: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Student/${id}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    addStudent: function (studentData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Student`,
            method: "POST",
            data: studentData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    updateStudent: function (id, studentData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Student/${id}`,
            method: "PUT",
            data: studentData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    deleteStudent: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Student/${id}`,
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    }
};

export default StudentService;