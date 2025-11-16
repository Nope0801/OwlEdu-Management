import callApi from "../Utils/callApi.js";
import { getAuthToken } from "../Utils/getCookies.js";

const api_url = "https://localhost:7230";
const token = getAuthToken();
const AttendanceService = {
    getAllAttendances: function (keyword = "", pageNumber = 1, pageSize = 10, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Attendance?keyword=${encodeURIComponent(keyword)}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getAttendanceById: function (scheduleId, studentId, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Attendance/${scheduleId}/${studentId}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    addAttendance: function (attendanceData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Attendance`,
            method: "POST",
            data: attendanceData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    updateAttendance: function (scheduleId, studentId, attendanceData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Attendance/${scheduleId}/${studentId}`,
            method: "PUT",
            data: attendanceData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    deleteAttendance: function (scheduleId, studentId, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Attendance/${scheduleId}/${studentId}`,
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    }
};

export default AttendanceService;