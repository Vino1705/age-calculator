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
    breakdown.innerText = "";
    countdown.innerText = "";
    funFact.innerText = "";
    aiPredict.innerText = "";
    return;
  }

  const birthDate = new Date(birthDateValue);
  const now = new Date();

  if (birthDate > now) {
    result.innerText = "❌ You haven't been born yet!";
    return;
  }

  // Main age in years
  let ageYears = now.getFullYear() - birthDate.getFullYear();
  const thisYearBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  if (now < thisYearBirthday) {
    ageYears--; // hasn't had birthday yet this year
  }

  result.innerText = `🎂 You are ${ageYears} years old!`;

  // Breakdown
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

  // Countdown to next birthday
  let nextBirthday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (now > nextBirthday) {
    nextBirthday.setFullYear(now.getFullYear() + 1);
  }
  const daysLeft = Math.ceil((nextBirthday - now) / (1000 * 60 * 60 * 24));
  countdown.innerText = daysLeft === 0
    ? "🎉 Today is your birthday!"
    : `⏳ ${daysLeft} day(s) until your next birthday`;

// — Fun Fact by birth year or exact birthday —
const year = birthDate.getFullYear();
const month = birthDate.getMonth() + 1; // 1–12
const day = birthDate.getDate();

let fact = "";

// Check birthday exact date (month/day) for historical events
if (month === 1 && day === 1) {
  fact = "On your birthday (Jan 1): Lincoln issued the Emancipation Proclamation in 1863, Haiti declared independence in 1804, and the euro was introduced in 2002.";
} else if (month === 2 && day === 29) {
  fact = "Born on Feb 29? You’re a leapling—only ~1 in 1,461 people share your birthday!"; // :contentReference[oaicite:20]{index=20}
} else {
  // fallback: fun fact by birth year
  switch(year) {
    case 2000:
      fact = "You were born in 2000—the Millennium! The world braced for Y2K, but it passed quietly.";
      break;
    case 1995:
      fact = "1995 was the birth year of JavaScript—your life began with a powerful language!";
      break;
    case 1983:
      fact = "In 1983, ARPANET transitioned to TCP/IP—the birth of the modern Internet!";
      break;
    case 1963:
      fact = "1963 saw the release of Mary Shelley’s *Frankenstein* remake or major cultural events.";
      break;
    case 2002:
      fact = "The euro currency launched across Europe in 2002—born into a new economic era."; // :contentReference[oaicite:21]{index=21}
      break;
    case 1804:
      fact = "In 1804, Haiti declared independence—the first Black-majority republic."; // :contentReference[oaicite:22]{index=22}
      break;
    case 1835:
      fact = "In 1835, the U.S. national debt dropped to zero—only time in history!"; // :contentReference[oaicite:23]{index=23}
      break;
    case 2005:
      fact = "2005 was the year YouTube was launched – the world got its first viral videos!";
      break;
    case 2016:
      fact = "In 2016, Pokémon GO took over the streets as augmented reality exploded!";
      break;
    case 2010:
      fact = "The iPad was introduced in 2010, redefining mobile computing.";
      break;
    case 1991:
      fact = "1991 marked the official end of the Cold War as the USSR dissolved.";
      break;
    case 1989:
      fact = "The Berlin Wall fell in 1989 – a symbol of freedom and change.";
      break;
    default:
      fact = `You were born in ${year}. What a wonderful year!`;
  }
}

funFact.innerText = `📚 Fun Fact: ${fact}`;


  // Simulated AI age prediction
  const guess = ageYears + Math.floor(Math.random() * 5 - 2); // +/- 2
  aiPredict.innerText = `🤖 AI guesses you're ${guess} years old based on vibes 😄`;
}

function resetForm() {
  document.getElementById("birthDate").value = "";
  document.getElementById("result").innerText = "";
  document.getElementById("breakdown").innerText = "";
  document.getElementById("countdown").innerText = "";
  document.getElementById("funFact").innerText = "";
  document.getElementById("aiPredict").innerText = "";
  document.getElementById("copyMsg").innerText = "";
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

function copyAgeCard() {
  const result = document.getElementById("result").innerText;
  const breakdown = document.getElementById("breakdown").innerText;
  const countdown = document.getElementById("countdown").innerText;
  const funFact = document.getElementById("funFact").innerText;
  const aiPredict = document.getElementById("aiPredict").innerText;

  const cardText = `${result}\n${breakdown}\n${countdown}\n${funFact}\n${aiPredict}`;
  navigator.clipboard.writeText(cardText).then(() => {
    document.getElementById("copyMsg").innerText = "✅ Age card copied to clipboard!";
  });
}
