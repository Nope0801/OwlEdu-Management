function getAuthToken() {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find(row => row.startsWith("authToken="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
}
function getUserID() {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find(row => row.startsWith("userId="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
} function getUserRole() {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find(row => row.startsWith("userRole="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
}
export { getAuthToken, getUserID, getUserRole };