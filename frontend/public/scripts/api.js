const url = `http://localhost:4000`;

if (url) {
  console.log("Api Connected");
}

async function getApiResponses() {
  const adminDashboardRes = await fetch(url + "/admin");
  const adminDashboard = await adminDashboardRes.json();

  const feedbackMessageRes = await fetch(url + "/feedback-message");
  const feedbackMessage = await feedbackMessageRes.json();

  return { adminDashboard, feedbackMessage };
}

export default getApiResponses;
