
const savedData = sessionStorage.getItem(
    "codingConfRegistration"
);

if (!savedData) {
    window.location.replace("index.html");
} else {
    const registration = JSON.parse(savedData);

    if (
        !registration.name ||
        !registration.email ||
        !registration.github ||
        !registration.avatar
    ) {
        window.location.replace("index.html");
    } else {
        document.getElementById("ticketName").textContent =
            registration.name;

        document.getElementById("ticketEmail").textContent =
            registration.email;

        const githubLink = document.getElementById("ticketGithub");

        githubLink.textContent = registration.github;

        githubLink.href =
            "https://github.com/" + registration.github.slice(1);

        document.getElementById("ticketAvatar").src =
            registration.avatar;

        document.getElementById("ticketHeading").textContent =
            "Congrats, " + registration.name + "! Your ticket is ready.";
    }
}
