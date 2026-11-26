
(() => {
  const $ = id => document.getElementById(id);
  // CAR CLICKER SOUND SYSTEM
 async function playHorn() {
  try {
    window.audioContext = window.audioContext || new (window.AudioContext || window.webkitAudioContext)();
    const audioContext = window.audioContext;

    if (audioContext.state === "suspended") await audioContext.resume();

    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator1.type = "sawtooth";
    oscillator2.type = "sawtooth";

    oscillator1.frequency.value = 350;
    oscillator2.frequency.value = 440;

    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.7);

    oscillator1.connect(gain);
    oscillator2.connect(gain);
    gain.connect(audioContext.destination);

    oscillator1.start();
    oscillator2.start();

    oscillator1.stop(audioContext.currentTime + 0.7);
    oscillator2.stop(audioContext.currentTime + 0.7);
  } catch (error) {
    console.log("Horn unavailable", error);
  }
}

 const cars = [
  { name: "BMW M4", price: 0, boost: 1, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1000" },
  { name: "Toyota Supra", price: 25000, boost: 1.5, image: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Toyota_Supra.jpg?width=1200" },
  { name: "Nissan GT-R", price: 150000, boost: 2, image: "https://commons.wikimedia.org/wiki/Special:FilePath/2017_Nissan_GT-R.jpg?width=1200" },
  { name: "Lamborghini Huracán", price: 1000000, boost: 3, image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1000" },
  { name: "Porsche 911 GT3 RS", price: 5000000, boost: 4, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Porsche_911_GT3_RS_%282022%29_1X7A7164.jpg/1280px-Porsche_911_GT3_RS_%282022%29_1X7A7164.jpg" },
  { name: "McLaren 720S", price: 25000000, boost: 5, image: "https://commons.wikimedia.org/wiki/Special:FilePath/2018_Mclaren_720S.jpg?width=1200" },
  { name: "Ferrari 488", price: 100000000, boost: 7, image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1000" },
  { name: "Purple Audi R8 (CC)", price: 1000000000, boost: 10, image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1000" }
];

const bikes = [
  { name: "Yamaha R1", price: 100000, boost: 1.2, image: "https://commons.wikimedia.org/wiki/Special:FilePath/Yamaha_YZF-R1.jpg" },
  { name: "Kawasaki Ninja H2R", price: 250000, boost: 1.5, image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kawasaki_Ninja_H2R_right.JPG" },
  { name: "Ducati Panigale V4", price: 500000, boost: 2, image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ducati_Panigale_V4_2026.jpg" },
  { name: "BMW S1000RR", price: 750000, boost: 2.5, image: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_S1000RR.jpg" },
  { name: "Suzuki Hayabusa", price: 1000000, boost: 3, image: "https://commons.wikimedia.org/wiki/Special:FilePath/Suzuki_Hayabusa_2025.jpg" },
  { name: "Harley-Davidson Fat Boy", price: 3000000, boost: 4, image: "https://commons.wikimedia.org/wiki/Special:FilePath/FLSTFB_Fat_Boy.jpg" },
  { name: "BMW M 1000 RR", price: 10000000, boost: 5, image: "https://commons.wikimedia.org/wiki/Special:FilePath/2024-06_BMW_M_Motorrad_S1000RR.jpg" },
  { name: "Ducati Panigale V4 R", price: 25000000, boost: 7, image: "https://commons.wikimedia.org/wiki/Special:FilePath/2026_Ducati_Panigale_V4R.jpg" }
];

  
const parts = [
  { name: "Sports Exhaust", description: "+1 point per click", price: 25, bonus: 1, growth: 1.5 },
  { name: "Racing Tyres", description: "+4 points per click", price: 120, bonus: 4, growth: 1.6 },
  { name: "Turbocharger", description: "+15 points per click", price: 650, bonus: 15, growth: 1.7 },
  { name: "ECU Remap", description: "+60 points per click", price: 3000, bonus: 60, growth: 1.8 },
  { name: "Twin Turbo", description: "+100 points per click", price: 5000, bonus: 100, growth: 1.8 },
  { name: "Nitro Boost", description: "+180 points per click", price: 8000, bonus: 180, growth: 1.9 },
  { name: "Racing Engine", description: "+350 points per click", price: 15000, bonus: 350, growth: 1.9 },
  { name: "Carbon Fibre Body", description: "+750 points per click", price: 30000, bonus: 750, growth: 2 },
  { name: "Track Suspension", description: "+1,500 points per click", price: 60000, bonus: 1500, growth: 2 },
  { name: "Launch Control", description: "+3,000 points per click", price: 120000, bonus: 3000, growth: 2 },
  { name: "Supercharger", description: "+7,500 points per click", price: 300000, bonus: 7500, growth: 2 },
  { name: "Racing Exhaust", description: "+15,000 points per click", price: 750000, bonus: 15000, growth: 2 },
  { name: "Drift Setup", description: "+35,000 points per click", price: 2000000, bonus: 35000, growth: 2 },
  { name: "Formula 1 Engine", description: "+100,000 points per click", price: 6000000, bonus: 100000, growth: 2 },
  { name: "Carbon Fibre Upgrade", description: "+250,000 points per click", price: 15000000, bonus: 250000, growth: 2 },
  { name: "Electric Turbo", description: "+600,000 points per click", price: 40000000, bonus: 600000, growth: 2 }
];

 
const businesses = [
  { name: "Small Mechanic Workshop", description: "+1 point per second", price: 100, bonus: 1, growth: 1.6 },
  { name: "Car Wash", description: "+5 points per second", price: 500, bonus: 5, growth: 1.7 },
  { name: "Used Car Dealership", description: "+20 points per second", price: 2500, bonus: 20, growth: 1.8 },
  { name: "Tyre Shop", description: "+50 points per second", price: 7500, bonus: 50, growth: 2 },
  { name: "Fuel Station", description: "+75 points per second", price: 10000, bonus: 75, growth: 1.8 },
  { name: "Supercar Rental", description: "+250 points per second", price: 50000, bonus: 250, growth: 1.9 },
  { name: "Racing Team", description: "+1,000 points per second", price: 250000, bonus: 1000, growth: 2 },
  { name: "Luxury Car Empire", description: "+5,000 points per second", price: 1000000, bonus: 5000, growth: 2 },
  { name: "Car Detailing Centre", description: "+250 points per second", price: 15000000, bonus: 250, growth: 2 },
  { name: "Supercar Showroom", description: "+1,000 points per second", price: 50000000, bonus: 1000, growth: 2 },
  { name: "Racing Circuit", description: "+5,000 points per second", price: 200000000, bonus: 5000, growth: 2 },
  { name: "Hypercar Factory", description: "+25,000 points per second", price: 1000000000, bonus: 25000, growth: 2 },
  { name: "F1 Racing Corporation", description: "+100,000 points per second", price: 5000000000, bonus: 100000, growth: 2 },
  { name: "Worldwide Car Empire", description: "+1,000,000 points per second", price: 25000000000, bonus: 1000000, growth: 2 }
];


  let points = 0;
  let clicks = 0;
  let perClick = 1;
  let income = 0;
  let rebirths = 0;
  let selectedCar = 0;
  let unlockedCars = [0];
  let selectedBike = 0;
let unlockedBikes = [0];
  let partLevels = Array(parts.length).fill(0);
  let businessLevels = Array(businesses.length).fill(0);

  const saveKey = "carClickerSave";

 function loadGame() {
  try {
    const saved = JSON.parse(localStorage.getItem(saveKey));
    if (!saved) return;

    points = Number(saved.points) || 0;
    clicks = Number(saved.clicks) || 0;
    rebirths = Number(saved.rebirths) || 0;
    selectedCar = Number(saved.selectedCar) || 0;
    unlockedCars = Array.isArray(saved.unlockedCars) ? saved.unlockedCars : [0];
    selectedBike = Number(saved.selectedBike) || 0;
    unlockedBikes = Array.isArray(saved.unlockedBikes) ? saved.unlockedBikes : [0];
    unlockedBikes = unlockedBikes.filter(i => i !== 0);
    partLevels = Array.isArray(saved.partLevels) ? saved.partLevels : partLevels;

    const oldBusinessLevels = Array.isArray(saved.businessLevels)
      ? saved.businessLevels
      : businessLevels;

    if (localStorage.getItem(saveKey + "_business_order_v1") !== "done") {
      businessLevels = [
        oldBusinessLevels[0],
        oldBusinessLevels[1],
        oldBusinessLevels[2],
        oldBusinessLevels[7],
        oldBusinessLevels[3],
        oldBusinessLevels[4],
        oldBusinessLevels[5],
        oldBusinessLevels[6],
        ...oldBusinessLevels.slice(8)
      ];

      saved.businessLevels = businessLevels;
      localStorage.setItem(saveKey, JSON.stringify(saved));
      localStorage.setItem(saveKey + "_business_order_v1", "done");
    } else {
      businessLevels = oldBusinessLevels;
    }

    selectedCar = Math.max(0, Math.min(cars.length - 1, selectedCar));
    if (!unlockedCars.includes(0)) unlockedCars.unshift(0);
    partLevels = parts.map((_, i) => Math.max(0, Number(partLevels[i]) || 0));
    businessLevels = businesses.map((_, i) => Math.max(0, Number(businessLevels[i]) || 0));

  } catch (error) {
    console.warn("Could not load save:", error);
  }

 }
  function saveGame() {
    localStorage.setItem(saveKey, JSON.stringify({
    points, clicks, rebirths, selectedCar, unlockedCars, selectedBike, unlockedBikes, partLevels, businessLevels
    }));
    if ($("saveStatus")) $("saveStatus").textContent = "Progress saved automatically 💾";
  }

 function multiplier() {
  return rebirths === 0 ? 1 : rebirths * 2;
}

function vehicleMultiplier() {
  const carBoost = cars[selectedCar]?.boost || 1;
  const bikeBoost = unlockedBikes.includes(selectedBike)
    ? (bikes[selectedBike]?.boost || 1)
    : 1;

  return carBoost * bikeBoost;
}

  function calculateStats() {
    perClick = 1 + parts.reduce((total, part, i) => total + part.bonus * partLevels[i], 0);
   income = businesses.reduce((total, business, i) => total + business.bonus * businessLevels[i], 0) * 1.5;
  }

  function format(number) {
  if (number < 1000) return Math.floor(number).toLocaleString("en-GB");
  const units = ["K", "M", "B", "T", "Qa", "Qi"];
  let value = number;
  let unit = -1;
  while (value >= 1000 && unit < units.length - 1) {
    value /= 1000;
    unit++;
  }
  return value.toFixed(1) + units[unit];
}

  function updateStats() {
    calculateStats();
    if ($("score")) $("score").textContent = format(points);
   if ($("power")) $("power").textContent = format(perClick * multiplier() * vehicleMultiplier());
    if ($("clicks")) $("clicks").textContent = format(clicks);
   if ($("income")) $("income").textContent = format(income * multiplier() * vehicleMultiplier());
    if ($("rank")) {
      let rank = "Car Beginner";
      if (points >= 1000) rank = "Street Racer";
      if (points >= 100000) rank = "Pro Driver";
      if (points >= 10000000) rank = "Supercar Legend";
      if (points >= 1000000000) rank = "Garage Billionaire";
      $("rank").textContent = "Rank: " + rank;
    }
    updateRebirth();
  }

  function updateCar() {
    const car = cars[selectedCar];
    if ($("carImage")) {
      $("carImage").src = car.image;
      $("carImage").alt = car.name;
    }
    if ($("status")) $("status").textContent = "Your " + car.name + " is ready! Tap it to earn points.";
  }

  
function renderGarage() {
  if (!$("garage")) return;

  $("garage").innerHTML = "";

  cars.forEach((car, i) => {
    const unlocked = unlockedCars.includes(i);
    const selected = selectedCar === i;

    const button = document.createElement("button");
    button.className = "upgrade garage-car" + (selected ? " selected-car" : "");
    button.disabled = !unlocked && points < car.price;

    const image = document.createElement("img");
    image.className = "garage-car-image";
    image.src = car.image;
    image.alt = car.name;
    image.loading = "lazy";

    const details = document.createElement("span");
    details.className = "garage-car-details";

    const name = document.createElement("strong");
    name.textContent = (selected ? "🏁 " : "") + car.name;

    const description = document.createElement("small");
    description.textContent = selected
      ? "YOUR CURRENT CAR"
      : unlocked
        ? "UNLOCKED — CLICK TO SELECT"
        : "LOCKED — EARN POINTS TO UNLOCK";

    details.append(name, description);

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = unlocked
      ? (selected ? "SELECTED" : "SELECT")
      : format(car.price) + " points";

    button.append(image, details, price);

    button.addEventListener("click", () => {
      if (unlocked) {
        selectedCar = i;
        updateCar();
      } else if (points >= car.price) {
        points -= car.price;
        unlockedCars.push(i);
        selectedCar = i;
        updateCar();
      }

      renderAll();
      saveGame();
    });

    $("garage").appendChild(button);
  });
}
function renderBikeGarage() {
  if (!$("bikeGarage")) return;

  $("bikeGarage").innerHTML = "";

  bikes.forEach((bike, i) => {
    const unlocked = unlockedBikes.includes(i);
    const selected = selectedBike === i;

    const button = document.createElement("button");
    button.className = "upgrade garage-car";
    button.disabled = !unlocked && points < bike.price;
const img = document.createElement("img");
img.src = bike.image;
img.alt = bike.name;
img.className = "bike-image";
img.style.width = "130px";
img.style.height = "85px";
img.style.objectFit = "contain";
    const details = document.createElement("span");
    details.className = "garage-car-details";

    const name = document.createElement("strong");
    name.textContent = "🏍️ " + bike.name;

    const description = document.createElement("small");
    description.textContent = selected ? "YOUR CURRENT BIKE" : unlocked ? "UNLOCKED" : "LOCKED — EARN POINTS";

    details.append(name, description);

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = unlocked ? (selected ? "SELECTED" : "SELECT") : format(bike.price) + " points";

    button.append(img, details, price);

    button.addEventListener("click", () => {
      if (unlocked) {
        selectedBike = i;
      } else if (points >= bike.price) {
        points -= bike.price;
        unlockedBikes.push(i);
        selectedBike = i;
      }

      renderAll();
      saveGame();
    });

    $("bikeGarage").appendChild(button);
  });
}
  function renderParts() {
    if (!$("upgrades")) return;
    $("upgrades").innerHTML = "";
    parts.forEach((part, i) => {
      const cost = Math.floor(part.price * Math.pow(part.growth, partLevels[i]));
      const button = document.createElement("button");
      button.className = "upgrade";
      button.disabled = points < cost;
      const left = document.createElement("span");
      const name = document.createElement("strong");
      name.textContent = part.name + " (Level " + partLevels[i] + ")";
      const detail = document.createElement("small");
      detail.textContent = part.description;
      left.append(name, detail);
      const price = document.createElement("span");
      price.className = "price";
      price.textContent = format(cost) + " points";
      button.append(left, price);
      button.addEventListener("click", () => {
        if (points < cost) return;
        points -= cost;
        partLevels[i]++;
        renderAll();
        saveGame();
      });
      $("upgrades").appendChild(button);
    });
  }

  function renderBusinesses() {
    if (!$("incomeUpgrades")) return;
    $("incomeUpgrades").innerHTML = "";
    businesses.forEach((business, i) => {
      const cost = Math.floor(business.price * Math.pow(business.growth, businessLevels[i]));
      const button = document.createElement("button");
      button.className = "upgrade";
      button.disabled = points < cost;
      const left = document.createElement("span");
      const name = document.createElement("strong");
      name.textContent = business.name + " (Level " + businessLevels[i] + ")";
      const detail = document.createElement("small");
      const rate = business.bonus * 1.5;
detail.textContent = "+" + rate.toLocaleString("en-GB") + " points per second";
      left.append(name, detail);
      const price = document.createElement("span");
      price.className = "price";
      price.textContent = format(cost) + " points";
      button.append(left, price);
      button.addEventListener("click", () => {
        if (points < cost) return;
        points -= cost;
        businessLevels[i]++;
        renderAll();
        saveGame();
      });
      $("incomeUpgrades").appendChild(button);
    });
  }

  function updateRebirth() {
    const cost = Math.floor(1000000 * Math.pow(5, rebirths));
    if ($("rebirthInfo")) {
      $("rebirthInfo").textContent =
        "Cost: " + format(cost) + " points. Current multiplier: x" + multiplier() +
        ". Rebirths: " + rebirths;
    }
    if ($("rebirthButton")) $("rebirthButton").disabled = points < cost;
  }

  function renderAll() {
    updateStats();
    renderGarage();
    renderBikeGarage();
    renderParts();
    renderBusinesses();
}
  

  if ($("faceButton")) {
    $("faceButton").addEventListener("click", () => {
   playHorn();
     points += perClick * multiplier() * vehicleMultiplier();
      clicks++;
      if ($("float")) {
      $("float").textContent = "+" + format(perClick * multiplier() * vehicleMultiplier());
        $("float").classList.remove("show");
        void $("float").offsetWidth;
        $("float").classList.add("show");
      }
      renderAll();
      saveGame();
    });
  }

  if ($("rebirthButton")) {
  $("rebirthButton").addEventListener("click", () => {
    const cost = Math.floor(1000000 * Math.pow(5, rebirths));
    if (points < cost) return;

    rebirths++;
    points = 0;
    clicks = 0;

    // RESET CARS
    selectedCar = 0;
    unlockedCars = [0];

    // RESET BIKES
    selectedBike = -1;
    unlockedBikes = [];

    // RESET UPGRADES AND BUSINESSES
    partLevels = Array(parts.length).fill(0);
    businessLevels = Array(businesses.length).fill(0);

    updateCar();
    renderAll();
    saveGame();

    alert("REBIRTH COMPLETE! Your garage has been reset! 🏎️");
  });
}

  if ($("reset")) {
    $("reset").addEventListener("click", () => {
      if (!confirm("Reset your whole Car Clicker game?")) return;
      points = 0;
      clicks = 0;
      rebirths = 0;
      selectedCar = 0;
      unlockedCars = [0];
      selectedBike = -1;
unlockedBikes = [];
      partLevels = Array(parts.length).fill(0);
      businessLevels = Array(businesses.length).fill(0);
      updateCar();
      renderAll();
      saveGame();
    });
  }

  loadGame();
  updateCar();
  renderAll();
  saveGame();

  setInterval(() => {
    if (income > 0) {
   points += income * multiplier() * vehicleMultiplier();
      renderAll();
      saveGame();
    }
  }, 1000);
  // CAR CLICKER PLAYER COUNTERS
const SUPABASE_URL = "https://nxfskhcsutfwantoeykm.supabase.co";
const SUPABASE_KEY = "sb_publishable_kjT1BIzaM_IqBEHmyWuJbw__GfHTLOx";
const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
let playerId = localStorage.getItem("carClickerPlayerId");

if (!playerId) {
  playerId = crypto.randomUUID();
  localStorage.setItem("carClickerPlayerId", playerId);
}


async function updatePlayerCounter() {
  let display = document.getElementById("playerCounter");

  if (!display) {
    display = document.createElement("div");
    display.id = "playerCounter";
    display.style.cssText = "text-align:center;padding:12px;margin:12px;font-weight:bold;";
    document.body.appendChild(display);
  }

  try {
    display.textContent = "Checking player counter...";

    const saveResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/players?on_conflict=player_id`,
      {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=minimal"
        },
        body: JSON.stringify({
          player_id: playerId,
          username: "CarPlayer_" + playerId.replace(/-/g, "").slice(0, 8),
          last_seen: new Date().toISOString()
        })
      }
    );

    if (!saveResponse.ok) {
      throw new Error("Save failed: " + await saveResponse.text());
    }

    const headers = {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: "count=exact",
      Range: "0-0"
    };

    const onlineResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/players?select=player_id&last_seen=gte.${encodeURIComponent(new Date(Date.now() - 90000).toISOString())}`,
      { headers }
    );

    const totalResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/players?select=player_id`,
      { headers }
    );

    if (!onlineResponse.ok) {
      throw new Error("Online count failed: " + await onlineResponse.text());
    }

    if (!totalResponse.ok) {
      throw new Error("Total count failed: " + await totalResponse.text());
    }

    const online = onlineResponse.headers.get("content-range");
    const total = totalResponse.headers.get("content-range");

    display.textContent =
      `🟢 Playing now: ${online?.split("/")[1] || "?"} | 👥 Played ever: ${total?.split("/")[1] || "?"}`;

  } catch (error) {
    display.textContent = "Counter error: " + error.message;
  }
}


updatePlayerCounter();
setInterval(updatePlayerCounter, 30000);
  // ==============================
// CAR CLICKER GLOBAL LEADERBOARD
// ==============================

function makeUsername() {
  return "Player" + Math.floor(1000 + Math.random() * 9000);
}

let playerUsername = localStorage.getItem("carClickerUsername");

if (!playerUsername) {
  playerUsername = makeUsername();
  localStorage.setItem("carClickerUsername", playerUsername);
}


async function saveLeaderboardScore() {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { data: account, error: lookupError } = await supabase
      .from("player_accounts")
      .select("best_points")
      .eq("user_id", user.id)
      .single();

    if (lookupError) throw lookupError;

    const bestPoints = Math.max(
      Number(account.best_points) || 0,
      Math.floor(points)
    );

    const { error } = await supabase
      .from("player_accounts")
      .update({ best_points: bestPoints })
      .eq("user_id", user.id);

    if (error) throw error;

  } catch (error) {
    console.log("Leaderboard save error:", error);
  }
}


async function loadLeaderboard() {
  try {
    const OWNER_ID = "55067734-4d0a-46b4-ad51-404ccc0e7527";

    const { data: players, error } = await supabase
      .from("player_accounts")
      .select("user_id, username, best_points")
      .order("best_points", { ascending: false })
      .limit(10);

    if (error) throw error;

    const board = document.getElementById("leaderboard");
    if (!board) return;

    board.innerHTML = `
      <h2>🏆 Global Leaderboard</h2>
      <p>Top 10 players worldwide</p>
    `;

    players.forEach((player, index) => {
      const entry = document.createElement("p");

      entry.textContent =
        `${index + 1}. ${player.username} — ${Number(player.best_points).toLocaleString()} points`;

     if (player.user_id === OWNER_ID) {
  entry.textContent += " 👑 BRZBOI OWNER";
}

if (player.username.toLowerCase() === "codestar123") {
  entry.textContent += " 🧪 TESTER";
}

      board.appendChild(entry);
    });

  } catch (error) {
    console.log("Leaderboard load error:", error);
  }
}

function createLeaderboard() {
  if (document.getElementById("leaderboard")) return;

  const board = document.createElement("div");
  board.id = "leaderboard";
  board.style.cssText =
    "background:#222;padding:18px;margin:15px;border-radius:12px;color:white;text-align:center;";

  document.body.appendChild(board);

  const button = document.createElement("button");
  button.textContent = "✏️ Change Username";
const accountButton = document.createElement("button");
accountButton.textContent = "🔐 Sign Up / Log In";


accountButton.onclick = () => {
  const overlay = document.createElement("div");

  overlay.style.cssText = `
    position:fixed;
    inset:0;
    z-index:99999;
    background:rgba(0,0,0,0.88);
    display:flex;
    align-items:center;
    justify-content:center;
    padding:15px;
    box-sizing:border-box;
  `;

  overlay.innerHTML = `
    <div style="
      background:#21132f;
      color:white;
      padding:28px;
      border-radius:20px;
      width:100%;
      max-width:380px;
      text-align:center;
      border:2px solid #a855f7;
      box-shadow:0 0 30px #8b5cf6;
      font-family:Arial,sans-serif;
      box-sizing:border-box;
    ">
      <div style="font-size:45px">🏎️</div>
      <h1 style="color:#d8b4fe;margin:8px">CAR CLICKER</h1>
      <p style="color:#c4b5fd">WELCOME BACK, DRIVER!</p>

      <input id="ccUsername"
        placeholder="Choose a username"
        maxlength="16"
        style="
          display:none;
          box-sizing:border-box;
          width:100%;
          padding:13px;
          margin:7px 0;
          border-radius:9px;
          border:0;
        ">

      <input id="ccEmail"
        type="email"
        placeholder="Email address"
        style="
          box-sizing:border-box;
          width:100%;
          padding:13px;
          margin:7px 0;
          border-radius:9px;
          border:0;
        ">

      <input id="ccPassword"
        type="password"
        placeholder="Password"
        style="
          box-sizing:border-box;
          width:100%;
          padding:13px;
          margin:7px 0;
          border-radius:9px;
          border:0;
        ">

      <label style="font-size:13px;color:#ddd">
        <input type="checkbox" id="ccShowPassword">
        Show password
      </label>

      <button id="ccSubmit" style="
        display:block;
        width:100%;
        padding:14px;
        margin-top:15px;
        background:#9333ea;
        color:white;
        border:0;
        border-radius:10px;
        font-weight:bold;
        font-size:16px;
        cursor:pointer;
      ">LOG IN</button>

      <button id="ccSwitch" style="
        background:none;
        color:#d8b4fe;
        border:0;
        padding:14px;
        cursor:pointer;
      ">Need an account? Sign up</button>

      <p id="ccMessage"
        style="font-size:13px;color:#fca5a5;overflow-wrap:anywhere">
      </p>

      <button id="ccClose" style="
        background:#49345e;
        color:white;
        border:0;
        padding:10px 20px;
        border-radius:8px;
        cursor:pointer;
      ">CLOSE</button>
    </div>
  `;

  document.body.appendChild(overlay);

  let signup = false;
  const $cc = id => overlay.querySelector("#" + id);

  $cc("ccSwitch").onclick = () => {
    signup = !signup;

    $cc("ccUsername").style.display =
      signup ? "block" : "none";

    $cc("ccSubmit").textContent =
      signup ? "CREATE ACCOUNT" : "LOG IN";

    $cc("ccSwitch").textContent = signup
      ? "Already have an account? Log in"
      : "Need an account? Sign up";

    $cc("ccMessage").textContent = "";
  };

  $cc("ccShowPassword").onchange = event => {
    $cc("ccPassword").type =
      event.target.checked ? "text" : "password";
  };

  $cc("ccClose").onclick = () => overlay.remove();

  $cc("ccSubmit").onclick = async () => {
    const email = $cc("ccEmail").value.trim();
    const password = $cc("ccPassword").value;
    const username = $cc("ccUsername").value.trim();

    if (!email || !password || (signup && !username)) {
      $cc("ccMessage").textContent =
        "Please fill in all the boxes.";
      return;
    }

    if (signup && username.length > 16) {
      $cc("ccMessage").textContent =
        "Username must be 16 characters or less.";
      return;
    }

    $cc("ccSubmit").disabled = true;
    $cc("ccSubmit").textContent = "PLEASE WAIT...";
    $cc("ccMessage").textContent = "";

    try {
      const result = signup
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({
            email,
            password
          });

      if (result.error) throw result.error;

      const user = result.data.user;

      if (!user || !result.data.session) {
        $cc("ccMessage").textContent =
          "Check your email to confirm your account.";

        $cc("ccSubmit").disabled = false;
        $cc("ccSubmit").textContent =
          signup ? "CREATE ACCOUNT" : "LOG IN";
        return;
      }

      const { data: account, error } = await supabase
        .from("player_accounts")
        .select("username")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (account) {
        playerUsername = account.username;
      } else if (signup) {
        playerUsername = username.slice(0, 16);

        const { error: insertError } = await supabase
          .from("player_accounts")
          .insert({
            user_id: user.id,
            username: playerUsername,
            best_points: Math.floor(points)
          });

        if (insertError) throw insertError;
      } else {
        throw new Error("Account username not found.");
      }

      localStorage.setItem(
        "carClickerUsername",
        playerUsername
      );

      await loadLeaderboard();

      overlay.remove();
      alert("Welcome, " + playerUsername + "! 🎉");

    } catch (error) {
      $cc("ccMessage").textContent = error.message;

      $cc("ccSubmit").disabled = false;
      $cc("ccSubmit").textContent =
        signup ? "CREATE ACCOUNT" : "LOG IN";
    }
  };
};




document.body.appendChild(accountButton);
  button.onclick = async () => {
    const newName = prompt("Choose your username (maximum 16 characters):");

    if (!newName || !newName.trim()) return;

    playerUsername = newName.trim().slice(0, 16);
    localStorage.setItem("carClickerUsername", playerUsername);

    await saveLeaderboardScore();
    await loadLeaderboard();
  };

  document.body.appendChild(button);
}

createLeaderboard();
saveLeaderboardScore();
loadLeaderboard();

setInterval(async () => {
  await saveLeaderboardScore();
  await loadLeaderboard();
}, 30000);
  

// ==============================
// CLICK-TO-EXPAND GAME SECTIONS
// ==============================

const expandableSections = [
  { name: "YOUR GARAGE", id: "garage" },
  { name: "MOTORBIKE GARAGE", id: "bikeGarage" },
  { name: "CAR PARTS", id: "upgrades" },
  { name: "GARAGE INCOME", id: "incomeUpgrades" }
];

expandableSections.forEach(section => {
  const heading = [...document.querySelectorAll("h1, h2, h3, h4")]
    .find(h => h.textContent.toUpperCase().includes(section.name));

  const content = document.getElementById(section.id);

  if (!heading || !content) return;

  heading.insertAdjacentElement("afterend", content);

  content.style.display = "none";
  heading.style.cursor = "pointer";
  heading.style.userSelect = "none";
  heading.title = "Click to show or hide";

  const arrow = document.createElement("span");
  arrow.textContent = " ▼";
  arrow.style.color = "#a78bfa";
  heading.appendChild(arrow);

  heading.addEventListener("click", () => {
    const isHidden = content.style.display === "none";

    content.style.display = isHidden ? "block" : "none";
    arrow.textContent = isHidden ? " ▲" : " ▼";
  });
});

// Remove old popup menu
const oldShopButton = document.getElementById("upgradeShopButton");
if (oldShopButton) oldShopButton.remove();

const oldShopOverlay = document.getElementById("upgradeShopOverlay");
if (oldShopOverlay) oldShopOverlay.remove();

// END OF GAME SCRIPT
})();
