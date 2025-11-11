document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("introScreen");
  const enterText = document.querySelector(".enter-text");
  const leftMenu = document.getElementById("leftMenu");
  const rightMenu = document.getElementById("rightMenu");
  const leftItems = Array.from(leftMenu.querySelectorAll(".menu-item"));
  const rightItems = Array.from(rightMenu.querySelectorAll(".menu-item"));
  const poemContainer = document.getElementById("poemContainer");
  const textCenter = document.getElementById("textCenter");
  const archiveContainer = document.getElementById("archiveContainer");
  const audio = document.getElementById("track1");
  const musicPlayer = document.getElementById('musicPlayer');
  const playPauseBtn = document.getElementById('playPauseBtn');

  let isPlaying = false;
  let timeouts = [];

  function openSite() {
    enterText.style.opacity = "0";
    setTimeout(() => {
      introScreen.style.display = "none";
      leftItems.forEach((it, i) =>
        setTimeout(() => it.classList.add("visible"), 80 + i * 120)
      );
      rightItems.forEach((it, i) =>
        setTimeout(() => it.classList.add("visible"), 380 + i * 120)
      );
    }, 700);
    setTimeout(() => musicPlayer.classList.add('visible'), 900);
  }

  introScreen.addEventListener("click", openSite);
  introScreen.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openSite();
    }
  });

  const poemText = `
I dont know what's wrong between us.
But everyday feels like a ticking time bomb.
I dont want to leave, yet i feel stuck.
When will we truly love eachother?
When will we stop putting scars on eachother? 
It hurts. 
The marks you leave on me, it hurts.
But they remind me of you.
Whenever i see them, i think of you.
Its a disgusting feeling.
But i cant help it.
I want to be with you.
I want you to desire me.
Like how i desire you.`;

  function animatePoem() {
    if (isPlaying) return;
    isPlaying = true;
    poemContainer.innerHTML = "";
    const lines = poemText.split("\n").filter(Boolean);
    const activeLines = [];
    const lineGap = 28; // smaller gap on mobile prevents shifting

    function showLine(i) {
      if (i >= lines.length) {
        setTimeout(() => {
          activeLines.forEach((line) => {
            const words = Array.from(line.querySelectorAll("span"));
            words.forEach((word, idx) => setTimeout(() => { word.style.opacity = "0"; }, idx * 120));
            setTimeout(() => line.remove(), words.length * 120 + 1500);
          });
          isPlaying = false;
        }, 1500);
        return;
      }

      const text = lines[i].trim();
      const line = document.createElement("div");
      line.className = "poem-line";
      line.style.top = `${i * lineGap}px`;
      poemContainer.appendChild(line);
      activeLines.push(line);

      text.split(" ").forEach((wordText) => {
        const span = document.createElement("span");
        span.className = "poem-word";
        span.textContent = wordText;
        line.appendChild(span);
      });

      requestAnimationFrame(() => {
        line.style.opacity = "1";
        line.style.transform = "translateY(0)";
      });

      const spans = line.querySelectorAll("span");
      spans.forEach((span, j) => {
        setTimeout(() => {
          span.style.opacity = "1";
          span.style.color = "rgba(0,0,0,1)";
          span.style.transform = "translateY(0)";
        }, j * 150);
      });

      if (activeLines.length > 3) {
        const oldLine = activeLines.shift();
        const oldWords = Array.from(oldLine.querySelectorAll("span"));
        oldWords.forEach((word, idx) => { setTimeout(() => { word.style.opacity = "0"; }, idx * 100); });
        setTimeout(() => oldLine.remove(), oldWords.length * 100 + 1500);
      }

      const delay = text.split(" ").length * 150 + 800;
      setTimeout(() => showLine(i + 1), delay);
    }

    showLine(0);
  }

  leftMenu.addEventListener("click",(e)=>{
    const menuItemOrSub=e.target.closest(".menu-item,.submenu-item"); 
    if(!menuItemOrSub)return; e.stopPropagation();
    if(menuItemOrSub.classList.contains("menu-item") && menuItemOrSub.dataset.target==="winter2005"){ 
      leftItems.forEach(li=>{if(li!==menuItemOrSub) li.classList.remove('active');}); 
      menuItemOrSub.classList.toggle('active'); 
      return; 
    }
    const data=menuItemOrSub.dataset.target; 
    if(!data || isPlaying) return;
    leftItems.forEach(li=>li.classList.remove('active')); 
    poemContainer.innerHTML=''; 
    switch(data){ case "poem": animatePoem(); break; }
  });
});
