document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("searchBar");
  const searchButton = document.getElementById("searchButton");

  const baseURL =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://school-essential-website-e-commerce.onrender.com";

  function submitSearch() {
    const searchString = searchBar.value.trim();
    if (!searchString) return alert("Please enter a category to search.");

    window.location.href = `${baseURL}/product?page=1&category=${encodeURIComponent(
      searchString
    )}`;
  }

  searchButton.addEventListener("click", submitSearch);

  searchBar.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      submitSearch();
    }
  });
});
