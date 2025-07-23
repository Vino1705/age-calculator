function calculateAge() {
  const birthYearInput = document.getElementById("birthYear");
  const result = document.getElementById("result");
  const birthYear = birthYearInput.value.trim();
  const currentYear = new Date().getFullYear();

  if (birthYear === "") {
    result.innerText = "⚠️ Please enter your birth year.";
    return;
  }

  if (birthYear > currentYear) {
    result.innerText = "❌ You haven't been born yet!";
    return;
  }

  const age = currentYear - birthYear;
  result.innerText = `🎉 You are ${age} years old.`;
}

function resetForm() {
  document.getElementById("birthYear").value = "";
  document.getElementById("result").innerText = "";
}
