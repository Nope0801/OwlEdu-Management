import callApi from "../Utils/callApi.js";
import { getAuthToken } from "../Utils/getCookies.js";

const api_url = "https://localhost:7230";
const token = getAuthToken(); // Định nghĩa token một lần để sử dụng lại

const CourseService = {
    getAllCourses: function (keyword = "", pageNumber = 1, pageSize = 10, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Course?keyword=${encodeURIComponent(keyword)}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    getCourseById: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Course/${id}`,
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    },

    addCourse: function (courseData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Course`,
            method: "POST",
            data: courseData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    updateCourse: function (id, courseData, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Course/${id}`,
            method: "PUT",
            data: courseData,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            successCallback,
            errorCallback
        });
    },

    deleteCourse: function (id, successCallback, errorCallback) {
        callApi({
            url: `${api_url}/api/Course/${id}`,
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` },
            successCallback,
            errorCallback
        });
    }
};

export default CourseService;