
  function showLoginForm() {
    document.getElementById("login-form").style.display = "block"; // Show login form
    document.getElementById("signup-form").style.display = "none"; // Hide signup form
  }

  function showSignupForm() {
    document.getElementById("login-form").style.display = "none"; // Hide login form
    document.getElementById("signup-form").style.display = "block"; // Show signup form
  }


  function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
  }
    