
(() => {
  const $ = id => document.getElementById(id);

  const cars = [
    { name: "BMW M4", price: 0, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1000" },
{ name: "Toyota Supra", price: 25000, image: "https://commons.wikimedia.org/wiki/Special:FilePath/2023_Toyota_Supra.jpg?width=1200" },
 { name: "Nissan GT-R", price: 150000, image: "https://commons.wikimedia.org/wiki/Special:FilePath/2017_Nissan_GT-R.jpg?width=1200" }, 
    { name: "Lamborghini Huracán", price: 1000000, image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1000" },
    { name: "Porsche 911 GT3 RS", price: 5000000, image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Porsche_911_GT3_RS_%282022%29_1X7A7164.jpg/1280px-Porsche_911_GT3_RS_%282022%29_1X7A7164.jpg" },
  { name: "McLaren 720S", price: 25000000, image: "https://commons.wikimedia.org/wiki/Special:FilePath/2018_Mclaren_720S.jpg?width=1200" },
    { name: "Ferrari 488", price: 100000000, image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1000" },
    { name: "Purple Audi R8 (CC)", price: 1000000000, image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1000" }
  ];

const bikes = [
  { name: "Yamaha R1", price: 100000, image: "https://commons.wikimedia.org/wiki/Special:FilePath/Yamaha_YZF-R1.jpg" },
  { name: "Kawasaki Ninja H2R", price: 250000, image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kawasaki_Ninja_H2R_right.JPG" },
  { name: "Ducati Panigale V4", price: 500000, image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ducati_Panigale_V4_2026.jpg" },
  { name: "BMW S1000RR", price: 750000, image: "https://commons.wikimedia.org/wiki/Special:FilePath/BMW_S1000RR.jpg" },
  { name: "Suzuki Hayabusa", price: 1000000, image: "https://commons.wikimedia.org/wiki/Special:FilePath/Suzuki_Hayabusa_2025.jpg" },
  { name: "Harley-Davidson Fat Boy", price: 3000000, image: "https://commons.wikimedia.org/wiki/Special:FilePath/FLSTFB_Fat_Boy.jpg" },
  { name: "BMW M 1000 RR", price: 10000000, image: "https://commons.wikimedia.org/wiki/Special:FilePath/2024-06_BMW_M_Motorrad_S1000RR.jpg" },
  { name: "Ducati Panigale V4 R", price: 25000000, image: "https://commons.wikimedia.org/wiki/Special:FilePath/2026_Ducati_Panigale_V4R.jpg" }
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
  { name: "Fuel Station", description: "+75 points per second", price: 10000, bonus: 75, growth: 1.8 },
  { name: "Supercar Rental", description: "+250 points per second", price: 50000, bonus: 250, growth: 1.9 },
  { name: "Racing Team", description: "+1,000 points per second", price: 250000, bonus: 1000, growth: 2 },
  { name: "Luxury Car Empire", description: "+5,000 points per second", price: 1000000, bonus: 5000, growth: 2 },
  { name: "Tyre Shop", description: "+50 points per second", price: 5000000, bonus: 50, growth: 2 },
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
      businessLevels = Array.isArray(saved.businessLevels) ? saved.businessLevels : businessLevels;
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

  function calculateStats() {
    perClick = 1 + parts.reduce((total, part, i) => total + part.bonus * partLevels[i], 0);
    income = businesses.reduce((total, business, i) => total + business.bonus * businessLevels[i], 0);
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
    if ($("power")) $("power").textContent = format(perClick * multiplier());
    if ($("clicks")) $("clicks").textContent = format(clicks);
    if ($("income")) $("income").textContent = format(income * multiplier());
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
      detail.textContent = business.description;
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
      points += perClick * multiplier();
      clicks++;
      if ($("float")) {
        $("float").textContent = "+" + format(perClick * multiplier());
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
      selectedCar = 0;
      unlockedCars = [0];
      partLevels = Array(parts.length).fill(0);
      businessLevels = Array(businesses.length).fill(0);
      updateCar();
      renderAll();
      saveGame();
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
      points += income * multiplier();
      renderAll();
      saveGame();
    }
  }, 1000);
})();
