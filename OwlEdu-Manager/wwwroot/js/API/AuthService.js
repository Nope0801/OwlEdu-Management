import callApi from "../Utils/callApi.js";
const api_url = "https://localhost:7230";
const AuthService = {
    login: function (username, password, successCallback, errorCallback) {
        const url = `${api_url}/api/Auth/login`;
        const method = "POST";
        const data = {
            Username: username,
            Password: password
        };

        callApi({
            url: url,
            method: method,
            data: data,
            headers: { "Content-Type": "application/json" },
            successCallback: function (response) {
                document.cookie = `authToken=${response.token}; path=/; max-age=86400; secure; HttpOnly`;
                document.cookie = `userId=${response.id}; path=/; max-age=86400; secure`;
                document.cookie = `userRole=${response.role}; path=/; max-age=86400; secure`;
                if (successCallback) successCallback(response);
            },
            errorCallback: errorCallback
        });
    }
};

export default AuthService;