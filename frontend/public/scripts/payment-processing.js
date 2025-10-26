document.addEventListener("DOMContentLoaded", () => {
  const paymentSelect = document.querySelector("#payment");
  const paymentDisplay = document.querySelector("#selected-payment");
  let selectedValue;
  paymentSelect.addEventListener("change", () => {
    selectedValue = paymentSelect.value;
    console.log("Selected Payment Method:", selectedValue);
    paymentDisplay.textContent = selectedValue || "Not selected yet!";
  });
  // alert("Selected Payment Method: " + selectedValue);
});
