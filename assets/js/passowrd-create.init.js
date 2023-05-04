Array.from(document.querySelectorAll("form .auth-pass-inputgroup")).forEach(function(s) {
    Array.from(s.querySelectorAll(".password-addon")).forEach(function(t) {
        t.addEventListener("click", function(t) {
            var e = s.querySelector(".password-input");
            "password" === e.type ? e.type = "text" : e.type = "password"
        })
    })
});
var password = document.getElementById("password-input"),
    confirm_password = document.getElementById("confirm-password-input");

function validatePassword() {
    password.value != confirm_password.value ? confirm_password.setCustomValidity("Passwords Don't Match") : confirm_password.setCustomValidity("")
}
password.onchange = validatePassword;
var myInput = document.getElementById("password-input"),
    letter = document.getElementById("pass-lower"),
    capital = document.getElementById("pass-upper"),
    number = document.getElementById("pass-number"),
    length = document.getElementById("pass-length");
myInput.onfocus = function() {
    document.getElementById("password-contain").style.display = "block"
}, myInput.onblur = function() {
    document.getElementById("password-contain").style.display = "none"
};