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

function animateCount(element, target) {
  let count = 0;
  const step = Math.ceil(target / 60);
  function update() {
    count += step;
    if (count >= target) {
      element.innerText = target.toLocaleString();
    } else {
      element.innerText = count.toLocaleString();
      requestAnimationFrame(update);
    }
  }
  update();
}

function calculateEverything() {
  const birthDateInput = document.getElementById("birthDate");
  const result = document.getElementById("result");
  const breakdown = document.getElementById("breakdown");
  const countdown = document.getElementById("countdown");
  const funFact = document.getElementById("funFact");
  const aiPredict = document.getElementById("aiPredict");
  const lifeStats = document.getElementById("lifeStats");
  const planetAge = document.getElementById("planetAge");
  const personality = document.getElementById("personality");
  const milestones = document.getElementById("milestones");

  const birthDateValue = birthDateInput.value;
  if (!birthDateValue) {
    result.innerText = "⚠️ Please enter your birthdate.";
    breakdown.innerText = countdown.innerText = funFact.innerText = aiPredict.innerText =
      lifeStats.innerText = planetAge.innerText = personality.innerText = milestones.innerText = "";
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
    • <span id="monthsVal">${ageMonths}</span> months<br>
    • <span id="daysVal">${ageDays}</span> days<br>
    • <span id="hoursVal">${ageHours}</span> hours<br>
    • <span id="minutesVal">${ageMinutes}</span> minutes<br>
    • <span id="secondsVal">${ageSeconds}</span> seconds
  `;

  animateCount(document.getElementById("monthsVal"), ageMonths);
  animateCount(document.getElementById("daysVal"), ageDays);
  animateCount(document.getElementById("hoursVal"), ageHours);
  animateCount(document.getElementById("minutesVal"), ageMinutes);
  animateCount(document.getElementById("secondsVal"), ageSeconds);

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

  const breaths = ageDays * 23000;
  const heartbeats = ageDays * 100000;
  const cupsOfChai = ageDays * 1.2;
  const steps = ageDays * 5000;
  lifeStats.innerHTML = `
    🧬 <strong>Your Life in Numbers:</strong><br>
    • ${breaths.toLocaleString()} breaths<br>
    • ${heartbeats.toLocaleString()} heartbeats<br>
    • ~${Math.round(cupsOfChai).toLocaleString()} cups of chai ☕<br>
    • ${steps.toLocaleString()} steps walked`;

  const earthYears = ageMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
  const mars = (earthYears / 1.88).toFixed(2);
  const jupiter = (earthYears / 11.86).toFixed(2);
  const mercury = (earthYears / 0.24).toFixed(2);
  const saturn = (earthYears / 29.46).toFixed(2);
  planetAge.innerHTML = `
    🪐 <strong>Your Age on Other Planets:</strong><br>
    • Mercury: ${mercury} years<br>
    • Mars: ${mars} years<br>
    • Jupiter: ${jupiter} years<br>
    • Saturn: ${saturn} years`;

  let personalityText = "";
  if (ageYears < 13) personalityText = "Curious and playful 👧🧒";
  else if (ageYears < 20) personalityText = "Bold and rebellious 🌱";
  else if (ageYears < 30) personalityText = "Curious and energetic ⚡";
  else if (ageYears < 40) personalityText = "Focused and evolving 🔥";
  else if (ageYears < 60) personalityText = "Wise and grounded 🌍";
  else personalityText = "Calm and full of wisdom 🌟";
  personality.innerText = `🧠 Personality Snapshot: ${personalityText}`;

  const milestoneList = [];
  if (year <= 2007) milestoneList.push("📱 iPhone launch (2007)");
  if (year <= 2010) milestoneList.push("📷 Instagram founded (2010)");
  if (year <= 2020) milestoneList.push("😷 COVID-19 pandemic (2020)");
  if (year <= 2022) milestoneList.push("🚀 James Webb Telescope launched (2022)");
  milestones.innerHTML = `
    📜 <strong>Milestones You've Lived Through:</strong><br>
    ${milestoneList.join("<br>")}`;

  document.getElementById("ageCard").scrollIntoView({ behavior: "smooth" });
}

function resetForm() {
  document.getElementById("birthDate").value = "";
  ["result", "breakdown", "countdown", "funFact", "aiPredict",
   "lifeStats", "planetAge", "personality", "milestones", "copyMsg"]
    .forEach(id => document.getElementById(id).innerText = "");
  document.getElementById("ageCard").scrollIntoView({ behavior: "smooth" });
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
