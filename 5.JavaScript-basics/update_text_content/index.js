function submitHandler(e) {
  e.preventDefault();

  const typeInput = document.getElementById("type-input").value.trim(); // Trim whitespace
  const receiveInput = document.getElementById("receive-input");

  if (typeInput && receiveInput) {
    receiveInput.textContent = typeInput;
  }

  document.getElementById("type-input").value = "";
}

document.getElementById("form").addEventListener("submit", submitHandler);