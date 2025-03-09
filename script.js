
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

  function showBoyBag() {
    document.getElementById('bagImage').src = 'bott';
    document.getElementById('bagImage').alt = 'Boy Bag';
  }

  function showGirlBag() {
    document.getElementById('bagImage').src = 'girl-bag.jpg';
    document.getElementById('bagImage').alt = 'Girl Bag';
  }