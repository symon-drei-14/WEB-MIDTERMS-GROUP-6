document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorMessage = document.getElementById("error-message");

        if (username.length === 0) {
            errorMessage.textContent = "Username is required.";
            return;
        } else if (username.length < 4) {
            errorMessage.textContent = "Username must be at least 4 characters.";
            return;
        }

        if (password.length === 0) {
            errorMessage.textContent = "Password is required.";
            return;
        } else if (password.length < 8) {
            errorMessage.textContent = "Password must be at least 8 characters.";
            return;
        }

        if (username === "admin" && password === "password") {
            window.location.href = "/Home/LandingPage";
        } else {
            errorMessage.textContent = "Invalid username or password.";
        }
    });
});
