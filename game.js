
(() => {
  const $ = id => document.getElementById(id);
  let points = 0, perClick = 1, clicks = 0; // NEW UPDATE

  const upgrades = [
    { name: "Piss Him Off", description: "Make Mr Doran angry 😠", price: 25, bonus: 1, stage: "angry", message: "Uh oh... you've annoyed Mr Doran!" },
    { name: "Move Seat", description: "Move the chair 🪑", price: 120, bonus: 4, stage: "moved", message: "MR DORAN HAS MOVED SEATS!" },
    { name: "Shout", description: "Unlock a legendary shout 📢", price: 650, bonus: 15, stage: "shouting", message: "OI! WHO'S MAKING ALL THAT NOISE?!" },
    { name: "Pull Out Chromebook", description: "Deploy the Chromebook 💻", price: 3000, bonus: 60, stage: "laptop", message: "CHROMEBOOK DEPLOYED!" },
    { name: "Walk Out", description: "Make a dramatic exit 🚪", price: 8000, bonus: 130, stage: "walkout", message: "MR DORAN HAS WALKED OUT!" },
    { name: "Talk to Bro", description: "Have a chat 🗣️", price: 18000, bonus: 280, stage: "talk", message: "BRO, HAVE YOU DONE THE HOMEWORK?" },
    { name: "Start a Chant", description: "Get the class chanting 📣", price: 40000, bonus: 600, stage: "chant", message: "DORAN! DORAN! DORAN!" },
    { name: "Do Some Math", description: "Bring out the big brain maths 🧮", price: 90000, bonus: 1400, stage: "math", message: "CALCULATE YOUR DORAN POINTS!" },
    { name: "Eat Food in Class", description: "Sneak a snack 🍕", price: 200000, bonus: 3500, stage: "food", message: "WHO'S EATING IN MY CLASS?!" }
  ];

  const ranks = [[0,"Doran Beginner"],[100,"Doran Apprentice"],[500,"Doran Enthusiast"],[2000,"Doran Expert"],[10000,"Doran Legend"],[50000,"DORAN OVERLORD"]];
  const fmt = n => Math.floor(n).toLocaleString("en-GB");
  const priceFor = u => Math.floor(u.price * Math.pow(1.45, u.bought || 0));

  function render() {
    $("score").textContent = fmt(points);
    $("power").textContent = fmt(perClick);
    $("clicks").textContent = fmt(clicks);
    $("rank").textContent = "Rank: " + ranks.filter(r => points >= r[0]).at(-1)[1];
    $("upgrades").replaceChildren();

    upgrades.forEach((u, i) => {
      const cost = priceFor(u);
      const button = document.createElement("button");
      button.className = "upgrade";
      button.disabled = points < cost;

      const info = document.createElement("span");
      const name = document.createElement("strong");
      name.textContent = (i + 1) + ". " + u.name + (u.bought ? " ×" + u.bought : "");
      const desc = document.createElement("small");
      desc.textContent = u.description + " · +" + fmt(u.bonus) + " per click" + (u.bought ? " · bought " + u.bought + " times" : "");
      info.append(name, desc);

      const price = document.createElement("span");
      price.className = "price";
      price.textContent = fmt(cost) + " pts";
      button.append(info, price);

      button.addEventListener("click", () => {
        const currentCost = priceFor(u);
        if (points < currentCost) return;
        points -= currentCost;
        perClick += u.bonus;
        u.bought = (u.bought || 0) + 1;
        $("stage").classList.add(u.stage);
        $("status").textContent = u.message + " Bought " + u.bought + " times!";
        render();
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
  });

  $("reset").addEventListener("click", () => {
    if (!confirm("Reset all your Doran points and upgrades?")) return;
    points = 0;
    perClick = 1;
    clicks = 0;
    upgrades.forEach(u => { u.bought = 0; });
    $("stage").className = "stage";
    $("status").textContent = "Mr Doran is having a peaceful day...";
    render();
  });

  render();
})();
