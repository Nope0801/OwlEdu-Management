import callApi from "../Utils/callApi.js";
import { getAuthToken } from "../Utils/getCookies.js";

const api_url = "https://localhost:7230";
const token = getAuthToken(); // Định nghĩa token một lần để sử dụng lại

const ScheduleService = {
    getAllSchedules: function (keyword = "", pageNumber = 1, pageSize = 10, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Schedule?keyword=${encodeURIComponent(keyword)}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getScheduleById: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Schedule/${id}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    addSchedule: function (scheduleData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Schedule`,
            method: "POST",
            data: scheduleData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    updateSchedule: function (id, scheduleData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Schedule/${id}`,
            method: "PUT",
            data: scheduleData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    deleteSchedule: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Schedule/${id}`,
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    }
};

export default ScheduleService;