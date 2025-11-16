import callApi from "../Utils/callApi.js";
import { getAuthToken } from "../Utils/getCookies.js";

const api_url = "https://localhost:7230";
const token = getAuthToken();
const TeacherService = {
    getAllTeachers: function (pageNumber = 1, pageSize = 10, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Teacher?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getTeacherById: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Teacher/${id}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    addTeacher: function (teacherData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Teacher`,
            method: "POST",
            data: teacherData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    updateTeacher: function (id, teacherData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Teacher/${id}`,
            method: "PUT",
            data: teacherData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    deleteTeacher: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Teacher/${id}`,
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    }
};

export default TeacherService;