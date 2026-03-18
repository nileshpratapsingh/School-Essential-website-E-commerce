
const url =
  window.location.hostname === "localhost"
    ? "http://localhost:4000"
    : "https://school-essential-website-e-commerce.onrender.com";

if (url) {
  console.log("Api Connected");
}
async function addAdmin(user) {
    console.log("Adding admin for user:", user);
};
