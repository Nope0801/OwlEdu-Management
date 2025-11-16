function callApi({ url, method = "GET", data = null, headers = {}, successCallback, errorCallback }) {
    $.ajax({
        url: url,
        method: method,
        contentType: "application/json",
        data: data ? JSON.stringify(data) : null,
        headers: headers,
        success: function (response) {
            if (successCallback) {
                successCallback(response);
            }
        },
        error: function (xhr) {
            if (errorCallback) {
                errorCallback(xhr);
            } else {
                console.error("API call failed:", xhr);
            }
        }
    });
}
export default callApi;