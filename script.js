
  function showLoginForm() {
    document.getElementById("login-form").style.display = "block"; // Show login form
    document.getElementById("signup-form").style.display = "none"; // Hide signup form
  }

  function showSignupForm() {
    document.getElementById("login-form").style.display = "none"; // Hide login form
    document.getElementById("signup-form").style.display = "block"; // Show signup form
  }

  function toggleMenu() {                                         //Function to toggle sidebar
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
  }

  let prevScrollPos = window.pageYOffset; // sticky header function
  window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      let navbar = document.getElementById("header");
      if (prevScrollPos > currentScrollPos) {
          navbar.style.top = "0";
      } else {
          navbar.style.top = "-60px"; /* Adjust based on navbar height */
      }
      prevScrollPos = currentScrollPos;
  }

  function showBoyBag() {
    document.getElementById('bagImage').src = 'bott';
    document.getElementById('bagImage').alt = 'Boy Bag';
  }

  function showGirlBag() {
    document.getElementById('bagImage').src = 'girl-bag.jpg';
    document.getElementById('bagImage').alt = 'Girl Bag';
  }

  document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
  });
  document.getElementById('signup-form').addEventListener('submit', function(event) {     //image upload and preview
    event.preventDefault();
    alert('Image submitted successfully!');
  });
  document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    let valid = true;

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    document.getElementById("nameError").innerText = name ? "" : "Name is required";
    document.getElementById("emailError").innerText = email.includes("@") ? "" : "Enter a valid email";
    document.getElementById("passwordError").innerText = password.length >= 6 ? "" : "Password must be at least 6 characters";
    document.getElementById("confirmPasswordError").innerText = confirmPassword === password ? "" : "Passwords do not match";

    if (!name || !email.includes("@") || password.length < 6 || confirmPassword !== password) {
        valid = false;
    }

    if (valid) {
        alert("Sign-up successful!");
    }
});

document.addEventListener("DOMContentLoaded", function () {                //Sign up form address: state city selector
  const stateCityData = {
      "Uttar Pradesh": ["Kanpur", "Lucknow", "Varanasi", "Agra", "Allahabad"],
      "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
      "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
      "West Bengal": ["Kolkata", "Darjeeling", "Siliguri", "Howrah", "Durgapur"],
      "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Kota", "Ajmer"],
      "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"],
      "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
      "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
      "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
      "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda"]
  };

  const stateSelect = document.getElementById("state");
  const citySelect = document.getElementById("city");

  // Populate state dropdown
  Object.keys(stateCityData).forEach(state => {
      let option = document.createElement("option");
      option.value = state;
      option.textContent = state;
      stateSelect.appendChild(option);
  });

  // Update city dropdown based on selected state
  stateSelect.addEventListener("change", function () {
      citySelect.innerHTML = '<option value="">Select City</option>';
      const selectedState = stateSelect.value;

      if (selectedState in stateCityData) {
          stateCityData[selectedState].forEach(city => {
              let option = document.createElement("option");
              option.value = city;
              option.textContent = city;
              citySelect.appendChild(option);
          });
      }
  });
});

