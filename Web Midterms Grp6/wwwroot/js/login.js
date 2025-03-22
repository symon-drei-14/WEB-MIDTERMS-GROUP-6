document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");

    loginButton.addEventListener("click", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorMessage = document.getElementById("error-message");

        // Client-side validation
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

        // Get the anti-forgery token
        const token = document.querySelector('input[name="__RequestVerificationToken"]').value;

        // Send data to server for validation
        fetch('/Login/Validate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': token
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = data.redirectUrl;
                } else {
                    errorMessage.textContent = data.message;
                }
            })
            .catch(error => {
                errorMessage.textContent = "An error occurred. Please try again.";
                console.error('Error:', error);
            });
    });
});