document.addEventListener("DOMContentLoaded", () => {
  const introScreen = document.getElementById("introScreen");
  const enterLogo = document.querySelector(".enter-logo");
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
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const trackTitle = document.getElementById('trackTitle');

  let isPlaying = false;
  let timeouts = [];

  function openSite() {
    enterLogo.style.opacity = "0";
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

  function clearTextCenter() {
    textCenter.style.opacity = 0;
    timeouts.forEach(clearTimeout);
    timeouts = [];
  }

  function showTextCenter(text, duration = 4500) {
    clearTextCenter();
    textCenter.textContent = text;
    textCenter.style.opacity = 1;
    const t = setTimeout(() => { textCenter.style.opacity = 0; }, duration);
    timeouts.push(t);
  }

  function fadeAudio(audioElement, from, to, duration = 1500, callback) {
    const stepTime = 50;
    const steps = Math.max(1, Math.round(duration / stepTime));
    let currentStep = 0;
    const volumeStep = (to - from) / steps;
    audioElement.volume = from;
    const fadeInterval = setInterval(() => {
      currentStep++;
      audioElement.volume = Math.min(1, Math.max(0, from + volumeStep * currentStep));
      if (currentStep >= steps) {
        clearInterval(fadeInterval);
        if (callback) callback();
      }
    }, stepTime);
  }

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
    clearTextCenter();
    poemContainer.innerHTML = "";
    const lines = poemText.split("\n").filter(Boolean);
    const activeLines = [];
    const lineGap = 40;

    function showLine(i) {
      if (i >= lines.length) {
        setTimeout(() => {
          activeLines.forEach((line) => {
            const words = Array.from(line.querySelectorAll("span"));
            words.forEach((word, idx) => { setTimeout(() => { word.style.opacity = "0"; }, idx * 150); });
            setTimeout(() => line.remove(), words.length * 150 + 2400);
          });
          isPlaying = false;
        }, 2200);
        return;
      }

      const text = lines[i].trim();
      const line = document.createElement("div");
      line.className = "poem-line";
      line.style.top = `${i * lineGap}px`;
      poemContainer.appendChild(line);
      activeLines.push(line);

      const words = text.split(" ");
      words.forEach((wordText) => {
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
        }, j * 220);
      });

      if (activeLines.length > 3) {
        const oldLine = activeLines.shift();
        const oldWords = Array.from(oldLine.querySelectorAll("span"));
        oldWords.forEach((word, idx) => { setTimeout(() => { word.style.opacity = "0"; }, idx * 150); });
        setTimeout(() => oldLine.remove(), oldWords.length * 150 + 2400);
      }

      const delay = words.length * 220 + 1200;
      setTimeout(() => showLine(i + 1), delay);
    }

    showLine(0);
  }

  function showLocation() { if (isPlaying) return; isPlaying=true; clearTextCenter(); showTextCenter("Based In The Netherlands. Created at 10/21/2025."); setTimeout(()=>isPlaying=false,4500); }
  function showInspiration() { if(isPlaying)return; isPlaying=true; clearTextCenter(); showTextCenter("My inspiration is y̶̤̳͈̬̺͉̪̓̀̔̆ò̵̡̳̟̰̩̦͔͖͕͉̫̼͓͇̭̑̂̈̃̎̀̽̿̓̄̃͊̈͋̊̄͂͐̕ŭ̴̧͔̥̙͕̼̬̪͖͍̲."); setTimeout(()=>isPlaying=false,4500);}
  function showGraphic() { if(isPlaying)return; isPlaying=true; clearTextCenter(); showTextCenter("Working on it."); setTimeout(()=>isPlaying=false,4500);}
  function showZine() { if(isPlaying)return; isPlaying=true; clearTextCenter(); showTextCenter("Made by me. For you."); setTimeout(()=>isPlaying=false,4500);}

  const archiveImages = [
    "images/basil something.gif",
    "images/mari.gif",
    "images/mari something.gif",
    "images/mewo.gif",
    "images/basil.gif"
  ];

  function showArchives() {
    if (isPlaying) return; isPlaying=true; clearTextCenter(); poemContainer.innerHTML=''; archiveContainer.innerHTML='';
    archiveImages.forEach((src,i)=>{
      const div=document.createElement("div");
      div.classList.add("archive-item"); const sizes=["small","medium","large"];
      div.classList.add(sizes[Math.floor(Math.random()*sizes.length)]);
      const img=document.createElement("img"); img.src=src; div.appendChild(img); archiveContainer.appendChild(div);
      setTimeout(()=>{div.style.opacity='1'; div.style.transform='translateY(0)';},i*200);
    });
    setTimeout(()=>{isPlaying=false},archiveImages.length*200+1000);
  }

  function toggleSubmenuFor(targetMenuItem){ leftItems.forEach(li=>{if(li!==targetMenuItem)li.classList.remove('active');}); targetMenuItem.classList.toggle('active'); }
  document.addEventListener("click",(e)=>{ if(!e.target.closest("#leftMenu")) leftItems.forEach(li=>li.classList.remove('active')); });

  leftMenu.addEventListener("click",(e)=>{
    const menuItemOrSub=e.target.closest(".menu-item,.submenu-item"); if(!menuItemOrSub)return; e.stopPropagation();
    if(menuItemOrSub.classList.contains("menu-item") && menuItemOrSub.dataset.target==="winter2005"){ toggleSubmenuFor(menuItemOrSub); return; }
    const data=menuItemOrSub.dataset.target; if(!data || isPlaying) return;
    leftItems.forEach(li=>li.classList.remove('active')); clearTextCenter(); poemContainer.innerHTML=''; archiveContainer.innerHTML='';
    switch(data){ case "poem": animatePoem(); break; case "locations": showLocation(); break; case "inspiration": showInspiration(); break; case "graphic": showGraphic(); break; case "archives": showArchives(); break; case "zine": showZine(); break; }
  });

  playPauseBtn.addEventListener('click',()=>{
    if(audio.paused){
      audio.currentTime = 0;
      audio.play().catch(()=>{});
      fadeAudio(audio, 0, 1, 1500);
      playPauseBtn.textContent='pause';
      trackTitle.textContent='now playing: Remina';
    } else {
      fadeAudio(audio, audio.volume, 0, 1500, ()=>audio.pause());
      playPauseBtn.textContent='play';
    }
  });
});


const threadCursor = document.createElement('div');
threadCursor.classList.add('thread-cursor');
document.body.appendChild(threadCursor);

const trailCount = 8;
const trails = [];
for (let i = 0; i < trailCount; i++) {
  const t = document.createElement('div');
  t.classList.add('thread-trail');
  document.body.appendChild(t);
  trails.push({el: t, x: 0, y: 0});
}

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateThread() {
  let prevX = mouseX, prevY = mouseY;

  trails.forEach((trail) => {
    trail.x += (prevX - trail.x) * 0.25;
    trail.y += (prevY - trail.y) * 0.25;
    trail.el.style.transform = `translate(${trail.x}px, ${trail.y}px)`;
    prevX = trail.x;
    prevY = trail.y;
  });

  threadCursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  requestAnimationFrame(animateThread);
}

animateThread();
