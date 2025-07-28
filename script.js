// Theme toggle with localStorage
window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeBtn").innerText = "☀️ Light Mode";
  }
};

function toggleTheme() {
  const body = document.body;
  const themeBtn = document.getElementById("themeBtn");
  const isDark = body.classList.toggle("dark-mode");

  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeBtn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function calculateEverything() {
  const birthDateInput = document.getElementById("birthDate");
  const result = document.getElementById("result");
  const breakdown = document.getElementById("breakdown");
  const countdown = document.getElementById("countdown");
  const funFact = document.getElementById("funFact");
  const aiPredict = document.getElementById("aiPredict");

  const birthDateValue = birthDateInput.value;
  if (!birthDateValue) {
    result.innerText = "⚠️ Please enter your birthdate.";
    breakdown.innerText = countdown.innerText = funFact.innerText = aiPredict.innerText = "";
    return;
  }

  const birthDate = new Date(birthDateValue);
  const now = new Date();

  if (birthDate > now) {
    result.innerText = "❌ You haven't been born yet!";
    return;
  }

  let ageYears = now.getFullYear() - birthDate.getFullYear();
  const thisYearBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (now < thisYearBirthday) ageYears--;

  result.innerText = `🎂 You are ${ageYears} years old!`;

  const ageMilliseconds = now - birthDate;
  const ageDays = Math.floor(ageMilliseconds / (1000 * 60 * 60 * 24));
  const ageHours = Math.floor(ageMilliseconds / (1000 * 60 * 60));
  const ageMinutes = Math.floor(ageMilliseconds / (1000 * 60));
  const ageSeconds = Math.floor(ageMilliseconds / 1000);
  const ageMonths = ageYears * 12 + (now.getMonth() - birthDate.getMonth());

  breakdown.innerHTML = `
    🧮 <strong>Breakdown:</strong><br>
    • ${ageMonths} months<br>
    • ${ageDays} days<br>
    • ${ageHours} hours<br>
    • ${ageMinutes} minutes<br>
    • ${ageSeconds} seconds
  `;

  let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (now > nextBirthday) nextBirthday.setFullYear(now.getFullYear() + 1);
  const daysLeft = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));
  countdown.innerText = daysLeft === 0
    ? "🎉 Today is your birthday!"
    : `⏳ ${daysLeft} day(s) until your next birthday`;

  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  let fact = "";
  if (month === 1 && day === 1) {
    fact = "On Jan 1: Lincoln issued the Emancipation Proclamation, Haiti declared independence, and the Euro launched!";
  } else if (month === 2 && day === 29) {
    fact = "Born on Feb 29? You're a leapling—only ~1 in 1,461 people share your birthday!";
  } else {
    switch (year) {
      case 2000: fact = "You were born in 2000—the Millennium!"; break;
      case 2005: fact = "2005: YouTube launched—first viral videos took over!"; break;
      case 2010: fact = "2010: iPad debuted—redefining tablets."; break;
      case 2016: fact = "2016: Pokémon GO took the world outdoors!"; break;
      case 1991: fact = "1991: Cold War ends—USSR dissolves."; break;
      case 1989: fact = "1989: The Berlin Wall falls—freedom rises."; break;
      default: fact = `You were born in ${year}. A special year!`;
    }
  }
  funFact.innerText = `📚 Fun Fact: ${fact}`;

  const guess = ageYears + Math.floor(Math.random() * 5 - 2);
  aiPredict.innerText = `🤖 AI guesses you're ${guess} years old based on vibes 😄`;
}

function resetForm() {
  document.getElementById("birthDate").value = "";
  ["result", "breakdown", "countdown", "funFact", "aiPredict", "copyMsg"]
    .forEach(id => document.getElementById(id).innerText = "");
}

function copyAgeCard() {
  const card = document.getElementById("ageCard").innerText;
  navigator.clipboard.writeText(card).then(() => {
    document.getElementById("copyMsg").innerText = "✅ Age card copied to clipboard!";
  });
}

function downloadImage() {
  const ageCard = document.getElementById("ageCard");
  html2canvas(ageCard).then(canvas => {
    const link = document.createElement("a");
    link.download = "age_card.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}
