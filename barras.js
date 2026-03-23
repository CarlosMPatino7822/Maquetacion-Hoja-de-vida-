
const skills = [
  { name: 'Java',        pct: 95 },
  { name: 'Html',        pct: 90 },
  { name: 'Python',      pct: 82 },
  { name: 'JavaScript',  pct: 88 },
  { name: 'CSS',         pct: 92 },
];

const container = document.getElementById('skills-container');
skills.forEach((s, i) => {
  container.innerHTML += `
    <div class="skill-row">
      <div class="skill-top">
        <span class="skill-name">${s.name}</span>
        <span class="skill-pct" id="pct-${i}">0%</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" id="bar-${i}"></div>
      </div>
    </div>`;
});

function animateCount(el, target, duration) {
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target) + '%';
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function runAnimation() {
  skills.forEach((s, i) => {
    const bar = document.getElementById('bar-' + i);
    const pct = document.getElementById('pct-' + i);
    setTimeout(() => {
      bar.style.width = s.pct + '%';
      pct.classList.add('visible');
      animateCount(pct, s.pct, 1100);
      setTimeout(() => bar.classList.add('done'), 1000);
    }, i * 160);
  });
}

const skillsBlock = document.querySelector('.right2');
let alreadyAnimated = false;

const observerBars = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !alreadyAnimated) {
      alreadyAnimated = true;
      runAnimation();
    }
  });
}, { threshold: 0.4 });

if (skillsBlock) observerBars.observe(skillsBlock);