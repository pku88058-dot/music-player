// Toggle Password
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
if (password && togglePassword) {
    togglePassword.onclick = function () {
        if (password.type === "password") {
            password.type = "text";
            this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            password.type = "password";
            this.innerHTML = '<i class="fa-solid fa-eye"></i>';
        }
    };
}
// Toggle Confirm Password
const confirmPassword = document.getElementById("confirmPassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
if (confirmPassword && toggleConfirmPassword) {
    toggleConfirmPassword.onclick = function () {
        if (confirmPassword.type === "password") {
            confirmPassword.type = "text";
            this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            confirmPassword.type = "password";
            this.innerHTML = '<i class="fa-solid fa-eye"></i>';
        }
    };
}
// Login Redirect
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        window.location.href = "home.html";
    });
}
// Signup Redirect
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
        e.preventDefault();
        if (password.value !== confirmPassword.value) {
            alert("Passwords do not match!");
            return;
        }
        alert("Account Created Successfully!");
        window.location.href = "login.html";
    });
}