const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("togglePassword");

const lengthRule = document.getElementById("rule-length");
const uppercaseRule = document.getElementById("rule-uppercase");
const numberRule = document.getElementById("rule-number");
const specialRule = document.getElementById("rule-special");

toggleBtn.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleBtn.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        toggleBtn.textContent = "Show";
    }
});

passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;

    updateRule(
        lengthRule,
        password.length >= 8
    );

    updateRule(
        uppercaseRule,
        /[A-Z]/.test(password)
    );

    updateRule(
        numberRule,
        /\d/.test(password)
    );

    updateRule(
        specialRule,
        /[@$!%*?&]/.test(password)
    );
});

passwordInput.addEventListener("focus", () => {
    document.querySelector(".password-rules").style.display = "block";
});

function updateRule(element, isValid) {
    if (isValid) {
        element.style.color = "#16a34a";
        element.innerHTML = "✔ " + element.textContent.replace(/^✔|✖/, "").trim();
    } else {
        element.style.color = "#dc2626";
        element.innerHTML = "✖ " + element.textContent.replace(/^✔|✖/, "").trim();
    }
}

passwordInput.addEventListener("blur", () => {
    if (passwordInput.value.length === 0) {
        document.querySelector(".password-rules").style.display = "none";
    }
});