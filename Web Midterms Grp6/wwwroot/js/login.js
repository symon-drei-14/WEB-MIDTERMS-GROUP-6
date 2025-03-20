document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const errorMessage = document.getElementById("error-message");

        if (username === "admin" && password === "password") {
            // Redirect to the PreventiveMaintenance action in HomeController
            window.location.href = "/Home/LandingPage";
        } else {
            errorMessage.textContent = "Invalid username or password.";
        }
    });
});