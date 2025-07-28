// On load, check and apply saved theme
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeBtn").innerText = "☀️ Light Mode";
  }
};

// Toggle dark/light theme
function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById("themeBtn");

  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");

  // Save choice
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeBtn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

// Calculate age + avatar + milestones
function calculateAge() {
  const birthYearInput = document.getElementById("birthYear");
  const result = document.getElementById("result");
  const milestone = document.getElementById("milestone");
  const avatar = document.getElementById("avatar");

  const birthYear = birthYearInput.value.trim();
  const currentYear = new Date().getFullYear();

  // Reset messages
  result.innerText = "";
  milestone.innerText = "";
  avatar.innerText = "";

  if (birthYear === "") {
    result.innerText = "⚠️ Please enter your birth year.";
    result.style.color = "#ff3b3b";
    return;
  }

  if (birthYear > currentYear) {
    result.innerText = "❌ You haven't been born yet!";
    result.style.color = "#ff3b3b";
    return;
  }

  const age = currentYear - birthYear;

  // Show result
  result.innerText = `🎂 You are ${age} years old.`;
  result.style.color = "#2a5298";

  // Milestone logic
  if (age < 13) {
    milestone.innerText = "🧒 You’re a child!";
  } else if (age < 18) {
    milestone.innerText = "🧑 You’re a teenager!";
  } else if (age < 30) {
    milestone.innerText = "🧑‍🎓 Enjoy your 20s!";
  } else if (age < 50) {
    milestone.innerText = "💼 Prime working years!";
  } else if (age < 65) {
    milestone.innerText = "🎯 Midlife explorer!";
  } else {
    milestone.innerText = "👴 Golden years ahead!";
  }

  // Avatar based on age
  if (age < 5) {
    avatar.innerText = "👶 Baby";
  } else if (age < 13) {
    avatar.innerText = "🧒 Kid";
  } else if (age < 20) {
    avatar.innerText = "🧑 Teen";
  } else if (age < 40) {
    avatar.innerText = "🧑‍💼 Adult";
  } else if (age < 60) {
    avatar.innerText = "🧓 Mature";
  } else {
    avatar.innerText = "👵 Senior";
  }
}

// Reset all inputs and messages
function resetForm() {
  document.getElementById("birthYear").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("milestone").innerText = "";
  document.getElementById("avatar").innerText = "";
}
