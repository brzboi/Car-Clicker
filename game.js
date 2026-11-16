
(() => {
  const $ = id => document.getElementById(id);

  const SAVE_KEY = "mrDoranClickerSave";

  let points = 0;
  let perClick = 1;
  let clicks = 0;

  const upgrades = [
    {
      name: "Piss Him Off",
      description: "Make Mr Doran angry 😠",
      price: 25, bonus: 1, growth: 1.5,
      stage: "angry",
      message: "Uh oh... you've annoyed Mr Doran!"
    },
    {
      name: "Move Seat",
      description: "Move your chair around 🪑",
      price: 120, bonus: 4, growth: 1.6,
      stage: "moved",
      message: "MR DORAN HAS MOVED SEATS!"
    },
    {
      name: "Shout",
      description: "Start shouting 📢",
      price: 650, bonus: 15, growth: 1.7,
      stage: "shouting",
      message: "OI! WHO'S MAKING ALL THAT NOISE?!"
    },
    {
      name: "Pull Out Chromebook",
      description: "Get the Chromebook out 💻",
      price: 3000, bonus: 60, growth: 1.8,
      stage: "laptop",
      message: "CHROMEBOOK DEPLOYED!"
    },
    {
      name: "Walk Out",
      description: "Casually leave the classroom 🚪",
      price: 5000, bonus: 100, growth: 1.8,
      stage: "walkout",
      message: "YOU'VE WALKED OUT!"
    },
    {
      name: "Talk to Bro",
      description: "Have a chat with your mate 🗣️",
      price: 8000, bonus: 180, growth: 1.8,
      stage: "talk",
      message: "BROOOO!"
    },
    {
      name: "Start a Chant",
      description: "Get the whole class chanting 📣",
      price: 15000, bonus: 350, growth: 1.9,
      stage: "chant",
      message: "EVERYONE IS CHANTING!"
    },
    {
      name: "Do Some Math",
      description: "Solve some difficult maths ➗",
      price: 30000, bonus: 750, growth: 1.9,
      stage: "math",
      message: "MATHS GENIUS!"
    },
    {
      name: "Eat Food in Class",
      description: "Sneak some food into class 🍕",
      price: 60000, bonus: 1500, growth: 2,
      stage: "food",
      message: "CAUGHT EATING IN CLASS!"
    }
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

  function saveGame() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        points,
        perClick,
        clicks,
        levels: upgrades.map(u => u.level || 0)
      }));
      $("status").textContent = "Game saved! 💾";
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
        !Array.isArray(saved.levels) ||
        saved.levels.length !== upgrades.length ||
        !saved.levels.every(level =>
          Number.isSafeInteger(level) && level >= 0 && level <= 100000
        ) ||
        saved.points < 0 ||
        saved.perClick < 1 ||
        saved.clicks < 0
      ) return;

      points = saved.points;
      perClick = saved.perClick;
      clicks = saved.clicks;

      upgrades.forEach((u, i) => {
        u.level = saved.levels[i];
      });

      upgrades.forEach(u => {
        if (u.level > 0) {
          $("stage").classList.add(u.stage);
        }
      });

      $("status").textContent = "Welcome back! Your game was loaded 😎";
    } catch (error) {
      console.warn("Could not load saved game:", error);
    }
  }

  function render() {
    $("score").textContent = fmt(points);
    $("power").textContent = fmt(perClick);
    $("clicks").textContent = fmt(clicks);

    let rank = ranks[0][1];
    ranks.forEach(r => {
      if (points >= r[0]) rank = r[1];
    });
    $("rank").textContent = "Rank: " + rank;

    $("upgrades").replaceChildren();

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

      $("upgrades").append(button);
    });
  }

  $("faceButton").addEventListener("click", () => {
    points += perClick;
    clicks++;

    $("status").textContent = "+" + fmt(perClick) + " Doran points!";

    const floater = $("float");
    floater.textContent = "+" + fmt(perClick);
    floater.classList.remove("show");
    void floater.offsetWidth;
    floater.classList.add("show");

    render();
    saveGame();
  });

  $("reset").addEventListener("click", () => {
    if (!confirm("Reset all your Doran points and upgrades?")) return;

    points = 0;
    perClick = 1;
    clicks = 0;

    upgrades.forEach(u => {
      u.level = 0;
    });

    $("stage").className = "stage";
    $("status").textContent =
      "Mr Doran is having a peaceful day...";

    render();
    saveGame();
  });

  loadGame();
  render();

  window.addEventListener("beforeunload", saveGame);
})();//
// Supabase connection
const SUPABASE_URL = "https://cofyewdjiwohvklbeqok.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY_HERE";
