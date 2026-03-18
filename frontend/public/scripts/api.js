const url =
    window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://school-essential-website-e-commerce.onrender.com";

if (url) {
    console.log("Api Connected");
}
async function authButtonToggle() {
    const res = await fetch(url + "/auth");
    return res.json();
}

const buttonData = authButtonToggle()

async function loadAdminDashboard() {
    const res = await fetch(url + "/admin");
    if (res.json === false) {
        console.log("No admin found ");
    }
    return res.json();
}

// export the promise
const adminData = loadAdminDashboard();

async function getApiResponses() {
    const feedbackMessageRes = await fetch(url + "/feedback-message");
    const feedbackMessage = await feedbackMessageRes.json();

    const businessMessageRes = await fetch(url + "/business-message");
    const businessMessage = await businessMessageRes.json();

    return { feedbackMessage, businessMessage };
}

let now = new Date();
const refreshToken = async () => {
    try {
        const response = await fetch(`${url}/refresh_token`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            // console.log("Failed to refresh token:", response.status);
            // console.log("User not logged in!!")
            return;
        }
        console.log("Token session refreshed successfully at:",now.toLocaleTimeString());
    } catch (err) {
        console.error("Error refreshing token:", err);
    }
};

const keepServicelive = async() => {
    try {
        const res = await fetch('/healthz')
        console.log(res.statusText,now.toLocaleTimeString());
    } catch (err) {
        console.error("check api.js")
        console.error(err)
    }
}

keepServicelive();

setInterval(keepServicelive,5000);

refreshToken();

setInterval(refreshToken, 9 * 60 * 1000);


const apiCall = {
    adminData,
    buttonData,
};

export default apiCall;
