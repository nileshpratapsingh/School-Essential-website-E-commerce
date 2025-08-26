const url = `http://localhost:4000`;

if (url) {
  console.log("Api Connected");
}

async function getApiResponses() {
  const adminDashboardRes = await fetch(url + "/admin");
  const adminData = await adminDashboardRes.json();

  const feedbackMessageRes = await fetch(url + "/feedback-message");
  const feedbackMessage = await feedbackMessageRes.json();

  const businessMessageRes = await fetch(url + "/business-message");
  const businessMessage = await businessMessageRes.json();

  return { adminData, feedbackMessage, businessMessage };
}

let refreshInterval;

function startTokenRefresh() {
  refreshInterval = setInterval(async () => {
    try {
      const response = await fetch(`${url}/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.error("Failed to refresh token:", response.status);
        return;
      }

      const data = await response.json();
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        console.log(
          "Access token refreshed:",
          new Date().toLocaleTimeString()
        );
      }
    } catch (err) {
      console.error("Error refreshing token:", err);
    }
  }, 9 * 60 * 1000); 
}

function stopTokenRefresh() {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
}
