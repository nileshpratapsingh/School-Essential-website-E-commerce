//========= Importing Data Sets ==========

import { stateCityData, schoolHouseData } from "./data-sets.js";

//========= DOMContentLoaded ==========

document.addEventListener("DOMContentLoaded", async function () {
  
  //========= Sidebar Toggle ==========

  const sidebar = document.querySelector(".sidebar");
  const menuToggleButton = document.querySelector(".menu-toggle");
  const closeButton = document.querySelector(".close-btn");

  function toggleMenu() {
    if (sidebar) sidebar.classList.toggle("active");
  }

  if (menuToggleButton) menuToggleButton.addEventListener("click", toggleMenu);
  if (closeButton) closeButton.addEventListener("click", toggleMenu);

  //==========Admin Control Triggers============
  
  try {
    const getAdminData = await apiCall.adminData; // apiCall

    if (getAdminData === true) {
      if (!document.querySelector(".sidebar-main-li .dashboard-item")) {
        document.querySelector(".sidebar-main-li big").insertAdjacentHTML(
          "beforeend",
          `
          <li class="dashboard-item">
            <a href="/admin-dashboard"><ion-icon name="speedometer"></ion-icon> Dashboard</a>
          </li>
        `
        );
      }
    } else {
      const dashboardItem = document.querySelector(
        ".sidebar-main-li .dashboard-item"
      );
      if (dashboardItem) dashboardItem.remove();
    }
  } catch (err) {
    console.error("Error fetching admin data:", err);
  }

  //==========Auth Button Triggers============
  try {
    const isLoggedIn = await apiCall.buttonData;

    if (isLoggedIn) {
      document
        .querySelectorAll(
          ".Auth-login-btn, .Auth-signup-btn, .login-btn, .signup-btn"
        )
        .forEach((el) => (el.closest("a").style.display = "none"));
      document
        .querySelectorAll(".Auth-logout-btn, .logout-btn")
        .forEach((el) => (el.closest("a").style.display = "inline-block"));
    } else {
      document
        .querySelectorAll(
          ".Auth-login-btn, .Auth-signup-btn, .signup-btn, .login-btn"
        )
        .forEach((el) => (el.closest("a").style.display = "inline-block"));
      document
        .querySelectorAll(".Auth-logout-btn, .logout-btn")
        .forEach((el) => (el.closest("a").style.display = "none"));
    }
  } catch (err) {
    console.error("Auth toggle error:", err);
  }
  //==========search history===========
  const searchInput = document.getElementById("search-input");
  const historyList = document.getElementById("search-history");
  const searchButton = document.getElementById("search-button"); // Fixed typo
  let searchHistory = [];

  if (searchButton) searchButton.addEventListener("click", submitSearch);

  function updateDropdown() {
    historyList.innerHTML = "";

    searchHistory.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      li.onclick = () => {
        searchInput.value = item;
        historyList.style.display = "none";
      };
      historyList.appendChild(li);
    });

    historyList.style.display = searchHistory.length ? "block" : "none";
  }

  // Show dropdown on focus or input
  if (searchInput) {
    searchInput.addEventListener("focus", updateDropdown);
    searchInput.addEventListener("input", updateDropdown);
  }

  // Hide dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
      historyList.style.display = "none";
    }
  });

  //========= Sticky Header ==========
  let prevScrollPos = window.pageYOffset;
  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    const navbar = document.getElementById("header");
    if (navbar) {
      navbar.style.top = prevScrollPos > currentScrollPos ? "0" : "-60px";
      prevScrollPos = currentScrollPos;
    }
  };

  //========= Image Upload and Preview ==========
  const fileInput = document.getElementById("fileInput");
  const preview = document.getElementById("preview");
  const signupForm = document.getElementById("signup-form");

  if (fileInput && preview) {
    fileInput.addEventListener("change", function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          preview.src = e.target.result;
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Image submitted successfully!");
    });
  }

  //========= Form Validation ==========
  
  const form = document.getElementById("signup-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let valid = true;

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      document.getElementById("nameError").innerText = name
        ? ""
        : "Name is required";
      document.getElementById("emailError").innerText = email.includes("@")
        ? ""
        : "Enter a valid email";
      document.getElementById("passwordError").innerText =
        password.length >= 6 ? "" : "Password must be at least 6 characters";
      document.getElementById("confirmPasswordError").innerText =
        confirmPassword === password ? "" : "Passwords do not match";

      if (
        !name ||
        !email.includes("@") ||
        password.length < 6 ||
        confirmPassword !== password
      ) {
        valid = false;
      }

      if (valid) {
        alert("Sign-up successful!");
      }
    });
  }

  //========= State-City Dropdown ==========
  const stateSelect = document.getElementById("state");
  const citySelect = document.getElementById("city");

  if (stateSelect && citySelect) {
    Object.keys(stateCityData).forEach((state) => {
      const option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
    });

    stateSelect.addEventListener("change", function () {
      citySelect.innerHTML = '<option value="">Select City</option>';
      const selectedState = stateSelect.value;

      if (selectedState in stateCityData) {
        stateCityData[selectedState].forEach((city) => {
          const option = document.createElement("option");
          option.value = city;
          option.textContent = city;
          citySelect.appendChild(option);
        });
      }
    });
  }

  //========= School-House Dropdown ==========
  const schoolSelector = document.getElementById("school-selector");
  const houseSelector = document.getElementById("school-houses");

  if (schoolSelector && houseSelector) {
    Object.keys(schoolHouseData).forEach((school) => {
      const option = document.createElement("option");
      option.value = school;
      option.textContent = school;
      schoolSelector.appendChild(option);
    });

    schoolSelector.addEventListener("change", function () {
      const selectedSchool = this.value;
      const houses = schoolHouseData[selectedSchool];

      houseSelector.innerHTML =
        '<option value="" disabled selected>Select your house</option>';
      houses.forEach((house) => {
        const option = document.createElement("option");
        option.value = house;
        option.textContent = house;
        houseSelector.appendChild(option);
      });

      houseSelector.disabled = false;
    });
  }

  //========= Uniform Section Display ==========
  const genderSelect = document.getElementById("gender-select");
  const uniformSelect = document.getElementById("uniform-select");

  const summerSection = document.getElementById("summer-uniform");
  const winterSection = document.getElementById("winter-uniform");

  const summerTitle = document.getElementById("summer-title");
  const winterTitle = document.getElementById("winter-title");

  const addToCartContainer = document.getElementById("add-to-cart-container");
  const addToCartButton = document.getElementById("add-to-cart-btn");

  const quantityInputs = document.querySelectorAll('input[type="number"]');
  const resetButton = document.getElementById("reset-btn");

  // Function to show/hide summer/winter uniform
  function updateUniformDisplay() {
    const gender = genderSelect ? genderSelect.value : "";
    const uniform = uniformSelect ? uniformSelect.value : "";

    if (summerSection) summerSection.style.display = "none";
    if (winterSection) winterSection.style.display = "none";

    if (gender && uniform === "Summer" && summerSection && summerTitle) {
      summerSection.style.display = "block";
      summerTitle.textContent = `${gender} Summer Uniform`;
    } else if (gender && uniform === "Winter" && winterSection && winterTitle) {
      winterSection.style.display = "block";
      winterTitle.textContent = `${gender} Winter Uniform`;
    }

    // Also reset the Add to Cart visibility when uniform type changes
    checkQuantities();
  }

  //======= Reset Button ==========
  if (resetButton && quantityInputs.length > 0) {
    resetButton.addEventListener("click", () => {
      quantityInputs.forEach((input) => {
        input.value = ""; // Reset all number inputs to empty
      });
      if (addToCartContainer) {
        addToCartContainer.style.display = "none"; // Hide the Add to Cart container
      }
    });
  }

  if (genderSelect)
    genderSelect.addEventListener("change", updateUniformDisplay);
  if (uniformSelect)
    uniformSelect.addEventListener("change", updateUniformDisplay);

  // --- Add to Cart Button Logic ---
  function checkQuantities() {
    let hasQuantity = false;
    if (quantityInputs.length > 0) {
      quantityInputs.forEach((input) => {
        if (parseInt(input.value) > 0) {
          hasQuantity = true;
        }
      });
    }
    if (addToCartContainer) {
      addToCartContainer.style.display = hasQuantity ? "block" : "none";
    }
  }

  // Attach listener to all number inputs
  quantityInputs.forEach((input) => {
    input.addEventListener("input", checkQuantities);
  });

  // Optional: Handle Add to Cart click
  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      alert("Items added to cart!");
    });
  }
});

//========= Loading Screen on Signup ==========
const signupFormLoading = document.getElementById("signup-form"); // Use consistent ID
const loadingScreen = document.getElementById("loadingScreen");
const loadingMessage = document.getElementById("loadingMessage");

const messages = [
  "Creating your account...",
  "Adding user to database...",
  "Signing you in...",
  "Almost done...",
];

if (signupFormLoading && loadingScreen && loadingMessage) {
  signupFormLoading.addEventListener("submit", function (e) {
    e.preventDefault(); // prevent normal form submission

    // Show loading screen
    loadingScreen.style.display = "flex";

    let index = 0;
    const interval = setInterval(() => {
      loadingMessage.textContent = messages[index];
      index++;

      if (index >= messages.length) {
        clearInterval(interval);

        // Simulate redirect after 4-5 seconds
        setTimeout(() => {
          loadingMessage.textContent = "Account Created Successfully ";

          // Redirect to dashboard or login page
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        }, 1000);
      }
    }, 1000); // change message every 1 second
  });
}
