
(() => {
  const $ = id => document.getElementById(id);
  const SAVE_KEY = "mrDoranClickerSave";

  let points = 0;
  let perClick = 1;
  let clicks = 0;
  let rebirths = 0;

  const upgrades = [
    { name: "Piss Him Off", description: "Make Mr Doran angry 😠", price: 25, bonus: 1, growth: 1.5, stage: "angry", message: "Uh oh... you've annoyed Mr Doran!" },
    { name: "Move Seat", description: "Move your chair around 🪑", price: 120, bonus: 4, growth: 1.6, stage: "moved", message: "MR DORAN HAS MOVED SEATS!" },
    { name: "Shout", description: "Start shouting 📢", price: 650, bonus: 15, growth: 1.7, stage: "shouting", message: "OI! WHO'S MAKING ALL THAT NOISE?!" },
    { name: "Pull Out Chromebook", description: "Get the Chromebook out 💻", price: 3000, bonus: 60, growth: 1.8, stage: "laptop", message: "CHROMEBOOK DEPLOYED!" },
    { name: "Walk Out", description: "Casually leave the classroom 🚪", price: 5000, bonus: 100, growth: 1.8, stage: "walkout", message: "YOU'VE WALKED OUT!" },
    { name: "Talk to Bro", description: "Have a chat with your mate 🗣️", price: 8000, bonus: 180, growth: 1.8, stage: "talk", message: "BROOOO!" },
    { name: "Start a Chant", description: "Get the whole class chanting 📣", price: 15000, bonus: 350, growth: 1.9, stage: "chant", message: "EVERYONE IS CHANTING!" },
    { name: "Do Some Math", description: "Solve some difficult maths ➗", price: 30000, bonus: 750, growth: 1.9, stage: "math", message: "MATHS GENIUS!" },
    { name: "Eat Food in Class", description: "Sneak some food into class 🍕", price: 60000, bonus: 1500, growth: 2, stage: "food", message: "CAUGHT EATING IN CLASS!" }
  ];

  const moneyUpgrades = [
    { name: "Get Your Mate to Do the Work", emoji: "🤝", price: 50, bonus: 1 },
    { name: "Sneak on Your Phone", emoji: "📱", price: 150, bonus: 2 },
    { name: "Sell Your Snacks", emoji: "🍫", price: 400, bonus: 5 },
    { name: "Become the Teacher's Favourite", emoji: "😇", price: 1000, bonus: 10 },
    { name: "Start a Classroom Business", emoji: "💼", price: 2500, bonus: 20 },
    { name: "Sell the Homework Answers", emoji: "📝", price: 6000, bonus: 50 },
    { name: "Become Class Representative", emoji: "🎖️", price: 15000, bonus: 100 },
    { name: "Control the Seating Plan", emoji: "🪑", price: 40000, bonus: 250 },
    { name: "Own the Tuck Shop", emoji: "🍬", price: 100000, bonus: 500 },
    { name: "Become Head Pupil", emoji: "👑", price: 250000, bonus: 1000 },
    { name: "Run the Whole School", emoji: "🏫", price: 750000, bonus: 5000 },
    { name: "Sneak a Bag of Crisps", emoji: "🥔", price: 1500000, bonus: 10000 },
    { name: "Get a Toilet Pass", emoji: "🚽", price: 3000000, bonus: 20000 },
    { name: "Copy Your Mate's Homework", emoji: "📚", price: 7000000, bonus: 50000 },
    { name: "Win an Argument with Doran", emoji: "🗣️", price: 15000000, bonus: 100000 },
    { name: "Get the Class Dismissed Early", emoji: "🔔", price: 35000000, bonus: 250000 },
    { name: "Become the Chromebook Admin", emoji: "💻", price: 80000000, bonus: 500000 },
    { name: "Take Over the Canteen", emoji: "🍔", price: 200000000, bonus: 1000000 },
    { name: "Buy the School", emoji: "🏢", price: 500000000, bonus: 2500000 },
    { name: "Become Principal", emoji: "🎓", price: 1500000000, bonus: 10000000 },
    { name: "Become SUPREME PUPIL", emoji: "👑", price: 5000000000, bonus: 50000000 }
  ];

  const ranks = [
    [0, "Doran Beginner"],
    [100, "Doran Apprentice"],
    [500, "Doran Enthusiast"],
    [2000, "Doran Expert"],
    [10000, "Doran Legend"],
    [50000, "DORAN OVERLORD"]
  ];

  const fmt = n => Math.floor(n).toLocaleString("en-GB");
  const multiplier = () => rebirths === 0 ? 1 : rebirths * 2;
  const passiveBase = () => moneyUpgrades.reduce(
    (total, u) => total + u.bonus * (u.level || 0), 0
  );
  const passiveIncome = () => passiveBase() * multiplier();
  const rebirthPrice = () => Math.floor(1000000 * Math.pow(5, rebirths));

  function saveGame() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        points,
        perClick,
        clicks,
        rebirths,
        levels: upgrades.map(u => u.level || 0),
        moneyLevels: moneyUpgrades.map(u => u.level || 0)
      }));
      if ($("status")) $("status").textContent = "Game saved! 💾";
    } catch (error) {
      console.warn("Could not save game:", error);
    }
  }

  function loadGame() {
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY));
      if (!saved) return;

      if (
        !Number.isFinite(saved.points) ||
        !Number.isFinite(saved.perClick) ||
        !Number.isFinite(saved.clicks) ||
        saved.points < 0 ||
        saved.perClick < 1 ||
        saved.clicks < 0 ||
        !Array.isArray(saved.levels) ||
        saved.levels.length !== upgrades.length
      ) return;

      points = saved.points;
      perClick = saved.perClick;
      clicks = saved.clicks;
      rebirths = Number.isSafeInteger(saved.rebirths) && saved.rebirths >= 0
        ? saved.rebirths : 0;

      upgrades.forEach((u, i) => {
        u.level = Number.isSafeInteger(saved.levels[i]) && saved.levels[i] >= 0
          ? saved.levels[i] : 0;
      });

      if (Array.isArray(saved.moneyLevels)) {
        moneyUpgrades.forEach((u, i) => {
          u.level = Number.isSafeInteger(saved.moneyLevels[i]) && saved.moneyLevels[i] >= 0
            ? saved.moneyLevels[i] : 0;
        });
      }

      upgrades.forEach(u => {
        if (u.level > 0 && u.stage) $("stage").classList.add(u.stage);
      });

      $("status").textContent = "Welcome back! Your game was loaded 😎";
    } catch (error) {
      console.warn("Could not load saved game:", error);
    }
  }

  // Rebirth panel
  const rebirthPanel = document.createElement("div");
  rebirthPanel.className = "rebirth-panel";
  rebirthPanel.style.cssText = "padding:15px;margin:12px 0;border:2px solid gold;border-radius:12px;text-align:center;";
  const rebirthInfo = document.createElement("p");
  const rebirthButton = document.createElement("button");
  rebirthButton.className = "upgrade";
  rebirthPanel.append(rebirthInfo, rebirthButton);
  $("upgrades").before(rebirthPanel);

  function render() {
    $("score").textContent = fmt(points);
    $("power").textContent = fmt(perClick * multiplier());
    $("clicks").textContent = fmt(clicks);

    let rank = ranks[0][1];
    ranks.forEach(r => {
      if (points >= r[0]) rank = r[1];
    });
    $("rank").textContent = "Rank: " + rank;

    rebirthInfo.textContent =
      "⭐ Rebirths: " + rebirths +
      " | Multiplier: x" + multiplier() +
      " | Earn " + fmt(passiveIncome()) + " points per second";

    rebirthButton.disabled = points < rebirthPrice();
    rebirthButton.textContent =
      "🔄 REBIRTH — Need " + fmt(rebirthPrice()) + " points";

    const shop = $("upgrades");
    shop.replaceChildren();

    const clickHeading = document.createElement("h3");
    clickHeading.textContent = "🖱️ CLICK UPGRADES";
    shop.append(clickHeading);

    upgrades.forEach((u, i) => {
      const price = Math.floor(u.price * Math.pow(u.growth, u.level || 0));
      const button = document.createElement("button");
      button.className = "upgrade";
      button.disabled = points < price;

      const info = document.createElement("span");
      const name = document.createElement("strong");
      name.textContent = (i + 1) + ". " + u.name;

      const desc = document.createElement("small");
      desc.textContent =
        u.description + " · +" + fmt(u.bonus) +
        " per click · Owned: " + (u.level || 0);

      info.append(name, desc);

      const cost = document.createElement("span");
      cost.className = "price";
      cost.textContent = fmt(price) + " pts";
      button.append(info, cost);

      button.addEventListener("click", () => {
        if (points < price) return;
        points -= price;
        perClick += u.bonus;
        u.level = (u.level || 0) + 1;
        $("stage").classList.add(u.stage);
        $("status").textContent = u.message;
        render();
        saveGame();
      });

      shop.append(button);
    });

    const moneyHeading = document.createElement("h3");
    moneyHeading.textContent = "💰 MONEY PER SECOND UPGRADES";
    shop.append(moneyHeading);

    const incomeText = document.createElement("p");
    incomeText.textContent =
      "You currently earn " + fmt(passiveIncome()) + " points every second!";
    shop.append(incomeText);

    moneyUpgrades.forEach((u, i) => {
      const price = Math.floor(u.price * Math.pow(1.65, u.level || 0));
      const button = document.createElement("button");
      button.className = "upgrade";
      button.disabled = points < price;

      const info = document.createElement("span");
      const name = document.createElement("strong");
      name.textContent = u.emoji + " " + u.name;

      const desc = document.createElement("small");
      desc.textContent =
        "+" + fmt(u.bonus * multiplier()) + " points/sec · Owned: " + (u.level || 0);

      info.append(name, desc);

      const cost = document.createElement("span");
      cost.className = "price";
      cost.textContent = fmt(price) + " pts";
      button.append(info, cost);

      button.addEventListener("click", () => {
        if (points < price) return;
        points -= price;
        u.level = (u.level || 0) + 1;
        $("status").textContent = u.name + " bought! +" + fmt(u.bonus) + " per second!";
        render();
        saveGame();
      });

      shop.append(button);
    });
  }

  $("faceButton").addEventListener("click", () => {
    points += perClick * multiplier();
    clicks++;

    $("status").textContent = "+" + fmt(perClick * multiplier()) + " Doran points!";

    const floater = $("float");
    floater.textContent = "+" + fmt(perClick * multiplier());
    floater.classList.remove("show");
    void floater.offsetWidth;
    floater.classList.add("show");

    render();
    saveGame();
  });

  rebirthButton.addEventListener("click", () => {
    if (points < rebirthPrice()) return;
    if (!confirm("REBIRTH? Your points and upgrades will reset, but your rebirth bonus stays forever!")) return;

    rebirths++;
    points = 0;
    perClick = 1;
    clicks = 0;

    upgrades.forEach(u => u.level = 0);
    moneyUpgrades.forEach(u => u.level = 0);

    $("stage").className = "stage";
    $("status").textContent =
      "REBIRTH " + rebirths + "! Your multiplier is now x" + multiplier() + "!";
    render();
    saveGame();
  });

  $("reset").addEventListener("click", () => {
    if (!confirm("Reset EVERYTHING, including your rebirths?")) return;

    points = 0;
    perClick = 1;
    clicks = 0;
    rebirths = 0;

    upgrades.forEach(u => u.level = 0);
    moneyUpgrades.forEach(u => u.level = 0);

    $("stage").className = "stage";
    $("status").textContent = "Mr Doran is having a peaceful day...";
    render();
    saveGame();
  });

  loadGame();
  render();

  // Passive income, paid every second
  setInterval(() => {
    const earned = passiveIncome();
    if (earned > 0) {
      points += earned;
      render();
      saveGame();
    }
  }, 1000);

  window.addEventListener("beforeunload", saveGame);
})();
