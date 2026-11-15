(() => {
  const $ = id => document.getElementById(id);
  let points = 0, perClick = 1, clicks = 0;
  const upgrades = [
    { name: "Piss Him Off", description: "Mr Doran starts getting annoyed 😠", price: 25, bonus: 1, stage: "angry", message: "Uh oh... you've annoyed Mr Doran!" },
    { name: "Move Seat", description: "The chair starts moving around 🪑", price: 120, bonus: 4, stage: "moved", message: "MR DORAN HAS MOVED SEATS!" },
    { name: "Shout", description: "Unlock the legendary shout 📢", price: 650, bonus: 15, stage: "shouting", message: "OI! WHO'S MAKING ALL THAT NOISE?!" },
    { name: "Pull Out Chromebook", description: "The Chromebook has entered the room 💻", price: 3000, bonus: 60, stage: "laptop", message: "CHROMEBOOK DEPLOYED. GAME OVER." }
  ];
  const ranks = [[0,"Doran Beginner"],[100,"Doran Apprentice"],[500,"Doran Enthusiast"],[2000,"Doran Expert"],[10000,"Doran Legend"],[50000,"DORAN OVERLORD"]];
  const fmt = n => Math.floor(n).toLocaleString("en-GB");
  function render() {
    $("score").textContent = fmt(points);
    $("power").textContent = fmt(perClick);
    $("clicks").textContent = fmt(clicks);
    $("rank").textContent = "Rank: " + ranks.filter(r => points >= r[0]).at(-1)[1];
    $("upgrades").replaceChildren();
    upgrades.forEach((u, i) => {
      const bought = Boolean(u.bought);
      const button = document.createElement("button");
      button.className = "upgrade";
      button.disabled = bought || points < u.price;
      const info = document.createElement("span");
      const name = document.createElement("strong");
      name.textContent = (bought ? "✓ " : "") + (i + 1) + ". " + u.name;
      const desc = document.createElement("small");
      desc.textContent = bought ? "UNLOCKED" : u.description + " · +" + u.bonus + " per click";
      info.append(name, desc);
      const price = document.createElement("span");
      price.className = "price";
      price.textContent = bought ? "OWNED" : fmt(u.price) + " pts";
      button.append(info, price);
      button.addEventListener("click", () => {
        if (bought || points < u.price) return;
        points -= u.price; perClick += u.bonus; u.bought = true;
        $("stage").classList.add(u.stage);
        $("status").textContent = u.message;
        render();
      });
      $("upgrades").append(button);
    });
  }
  $("faceButton").addEventListener("click", () => {
    points += perClick; clicks++;
    $("status").textContent = "+" + fmt(perClick) + " Doran points!";
    const floater = $("float");
    floater.textContent = "+" + fmt(perClick);
    floater.classList.remove("show"); void floater.offsetWidth; floater.classList.add("show");
    render();
  });
  $("reset").addEventListener("click", () => {
    if (!confirm("Reset all your Doran points and upgrades?")) return;
    points = 0; perClick = 1; clicks = 0;
    upgrades.forEach(u => { u.bought = false; });
    $("stage").className = "stage";
    $("status").textContent = "Mr Doran is having a peaceful day...";
    render();
  });
  render();
})();