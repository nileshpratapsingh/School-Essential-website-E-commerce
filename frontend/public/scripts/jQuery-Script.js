import { stateCityData, schoolHouseData } from "./data-sets.js";

$(function () {
  // ===== Sidebar Toggle =====
  $(".menu-toggle, .close-btn").on("click", () =>
    $(".sidebar").toggleClass("active")
  );

  // ===== Sticky Header =====
  let prevScroll = window.pageYOffset;
  $(window).on("scroll", () => {
    const currScroll = window.pageYOffset;
    $("#header").css("top", prevScroll > currScroll ? "0" : "-60px");
    prevScroll = currScroll;
  });

  // ===== Image Upload Preview =====
  $("#fileInput").on("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => $("#preview").attr("src", e.target.result).show();
      reader.readAsDataURL(file);
    }
  });

  // ===== Form Validation =====
  $("#signup-form").on("submit", function (e) {
    e.preventDefault();
    const name = $("#name").val(),
      email = $("#email").val(),
      pass = $("#password").val(),
      cpass = $("#confirmPassword").val();

    $("#nameError").text(name ? "" : "Name is required");
    $("#emailError").text(email.includes("@") ? "" : "Enter a valid email");
    $("#passwordError").text(pass.length >= 6 ? "" : "Min 6 characters");
    $("#confirmPasswordError").text(
      pass === cpass ? "" : "Passwords do not match"
    );

    if (name && email.includes("@") && pass.length >= 6 && pass === cpass) {
      alert("Sign-up successful!");
    }
  });

  // ===== State-City Dropdown =====
  $.each(stateCityData, (state) =>
    $("#state").append(`<option value="${state}">${state}</option>`)
  );

  $("#state").on("change", function () {
    const state = $(this).val(),
      cities = stateCityData[state] || [];
    $("#city").html("<option>Select City</option>");
    $.each(cities, (_, city) => $("#city").append(`<option>${city}</option>`));
  });

  // ===== School-House Dropdown =====
  $.each(schoolHouseData, (school) =>
    $("#school-selector").append(`<option>${school}</option>`)
  );
  $("#school-selector").on("change", function () {
    const houses = schoolHouseData[$(this).val()] || [];
    $("#school-houses").html(
      "<option disabled selected>Select your house</option>"
    );
    $.each(houses, (_, h) =>
      $("#school-houses").append(`<option>${h}</option>`)
    );
  });

  // ===== Uniform Display + Reset =====
  const updateUniform = () => {
    const gender = $("#gender-select").val(),
      type = $("#uniform-select").val();
    $("#summer-uniform, #winter-uniform").hide();
    if (type === "Summer")
      $("#summer-uniform")
        .show()
        .find("#summer-title")
        .text(`${gender} Summer Uniform`);
    if (type === "Winter")
      $("#winter-uniform")
        .show()
        .find("#winter-title")
        .text(`${gender} Winter Uniform`);
    toggleCart();
  };

  $("#gender-select, #uniform-select").on("change", updateUniform);
  $("#reset-btn").on("click", () => {
    $('input[type="number"]').val("");
    $("#add-to-cart-container").hide();
  });

  // ===== Add-to-Cart Logic =====
  const toggleCart = () => {
    const hasQty = $('input[type="number"]')
      .toArray()
      .some((i) => parseInt($(i).val()) > 0);
    $("#add-to-cart-container").toggle(hasQty);
  };

  $('input[type="number"]').on("input", toggleCart);
  $("#add-to-cart-btn").on("click", () => alert("Items added to cart!"));

  // ================== Loading Screen ==================

  $(".signup-form form").on("submit", function (e) {
    e.preventDefault();
    $("#loadingOverlay").css("display", "flex");

    $.ajax({
      url: "/signup",
      method: "POST",
      data: $(this).serialize(),

      success: function (res) {
        $("#loadingOverlay p").text("Account created successfully");

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      },

      error: function () {
        $("#loadingOverlay p").text("Something went wrong");

        setTimeout(() => {
          $("#loadingOverlay").fadeOut();
          window.location.href = "/account";
        }, 2000);
      },
    });
  });

  $(".loginform").on("submit", function (e) {
    e.preventDefault();

    $("#loadingOverlay").css("display", "flex");

    $.ajax({
      url: "/login",
      method: "POST",
      data: $(this).serialize(),

      success: function (res) {
        $("#loadingOverlay p").text("Loggin in....");

        setTimeout(() => {
          $("#loadingOverlay").fadeOut();
        }, 2000);
      },
      error: function () {
        $("#loadingOverlay p").text("Invalid email or password");

        setTimeout(() => {
          $("#loadingOverlay").fadeOut();
        }, 2000);
      },
    });
  });
});
