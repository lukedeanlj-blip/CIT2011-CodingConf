const form = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");

const github = document.getElementById("github");
const githubError = document.getElementById("githubError");

const avatar = document.getElementById("avatar");
const avatarError = document.getElementById("avatarError");

// Check the form ourselves before making the ticket.
form.addEventListener("submit", function(event) {
    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    githubError.textContent = "";
    avatarError.textContent = "";

    if (fullName.value.trim() === "") {
        nameError.textContent = "Please enter your full name.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = "Please enter a valid email.";
    }

    if (!/^@[a-zA-Z0-9-]+$/.test(github.value.trim())) {
        githubError.textContent =
            "Enter a valid GitHub username starting with @.";
    }

    const file = avatar.files[0];

    if (!file) {
        avatarError.textContent =
            "Please upload a profile picture.";
    } else if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg"
    ) {
        avatarError.textContent =
            "Only PNG and JPEG images are allowed.";
    } else if (file.size >= 500 * 1024) {
        avatarError.textContent =
            "Image must be smaller than 500 KB.";
    }
    
    if (
        nameError.textContent ||
        emailError.textContent ||
        githubError.textContent ||
        avatarError.textContent
    ) {
        return;
    }

    // Read the chosen picture so it can appear on the next page.
    const reader = new FileReader();

    reader.onload = function() {
        const registration = {
            name: fullName.value.trim(),
            email: email.value.trim(),
            github: github.value.trim(),
            avatar: reader.result
        };

        sessionStorage.setItem(
            "codingConfRegistration",
            JSON.stringify(registration)
        );

        window.location.href = "ticket.html";
    };

    reader.onerror = function() {
        avatarError.textContent = "Could not read the picture. Please try another file.";
    };

    reader.readAsDataURL(file);
});
