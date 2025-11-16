import callApi from "../Utils/callApi.js";
import { getAuthToken } from "../Utils/getCookies.js";

const api_url = "https://localhost:7230";
const token = getAuthToken(); // Định nghĩa token một lần để sử dụng lại

const ScoreService = {
    getAllScores: function (pageNumber = 1, pageSize = 10, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Score?pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getScoresByClass: function (classId, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Score/Class/${classId}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getScoresByStudent: function (studentId, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Score/Student/${studentId}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getScoresByTeacher: function (teacherId, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Score/Teacher/${teacherId}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    addScore: function (scoreData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Score`,
            method: "POST",
            data: scoreData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    updateScore: function (studentId, classId, teacherId, title, scoreData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Score/${studentId}/${classId}/${teacherId}/${title}`,
            method: "PUT",
            data: scoreData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    deleteScore: function (studentId, classId, teacherId, title, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Score/${studentId}/${classId}/${teacherId}/${title}`,
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    }
};

export default ScoreService;