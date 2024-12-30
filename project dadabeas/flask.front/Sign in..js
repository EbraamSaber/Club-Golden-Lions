document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const userId = document.getElementById("userId").value;
    const password = document.getElementById("password").value;

    if (userId === "123" && password === "ebraam123") {
        window.location.href = "index.html";
    } else {
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.textContent = "Invalid User ID or Password.";
    }
});
