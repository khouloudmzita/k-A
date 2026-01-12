// ===== Countdown Timer =====
const weddingDate = new Date("June 7, 2026 20:00:00").getTime();
const countdownEl = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;
  if(distance<0){ 
    countdownEl.innerHTML="Nous sommes mariés! 🎉"; 
    return; 
  }
  const days = Math.floor(distance / (1000*60*60*24));
  const hours = Math.floor((distance / (1000*60*60)) % 24);
  const minutes = Math.floor((distance / (1000*60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);
  countdownEl.innerHTML = `${days} jours · ${hours} h · ${minutes} min · ${seconds} s`;
}, 1000);

// ===== RSVP Confirmation =====
function confirmAttendance() {
  document.getElementById("rsvp").innerText =
    "Merci pour votre confirmation 💍 Nous avons hâte de vous voir!";
}

// ===== Scroll fade-in animation =====
const faders = document.querySelectorAll('.fade-in');
const appearOnScroll = new IntersectionObserver((entries, observer)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.animation='fadeUp 1s forwards';
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.3});
faders.forEach(fader => appearOnScroll.observe(fader));

// ===== Background Music on first interaction =====
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.2; 
let musicStarted = false;
function startMusic() {
  if(!musicStarted){
    bgMusic.play().catch(()=>{});
    musicStarted = true;
    window.removeEventListener('click', startMusic);
    window.removeEventListener('scroll', startMusic);
  }
}
window.addEventListener('click', startMusic);
window.addEventListener('scroll', startMusic);

// ===== Language Switcher =====
function switchLanguage(lang){
  document.querySelectorAll('[data-lang-fr]').forEach(el=>{
    if(lang==='fr') el.innerText = el.dataset.langFr || el.innerHTML;
    if(lang==='ar') el.innerText = el.dataset.langAr || el.innerHTML;
  });
}

// ===== Gallery Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll('.slides img');
function showSlide(index){
  const slideWidth = slides[0].clientWidth;
  document.querySelector('.slides').style.transform = `translateX(-${index*slideWidth}px)`;
}
function nextSlide(){
  currentSlide = (currentSlide+1)%slides.length;
  showSlide(currentSlide);
}
setInterval(nextSlide, 4000);

// ===== Particles + Rings + Petals =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

// Resize canvas to hero height
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.hero').offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ===== Sparkles =====
let particles = [];
for(let i=0;i<100;i++){
  particles.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*2+1, d:Math.random()*1+0.1});
}

// ===== Rings =====
let rings = [];
for(let i=0;i<15;i++){
  rings.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    r: Math.random()*10 + 5,
    alpha: Math.random()*0.7+0.3,
    speed: Math.random()*0.5 + 0.2
  });
}

// ===== Petals =====
let petals = [];
for(let i=0;i<30;i++){
  petals.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    size: Math.random()*15+10,
    alpha: Math.random()*0.7+0.3,
    speed: Math.random()*1 + 0.5,
    angle: Math.random()*Math.PI*2
  });
}

// ===== Draw all =====
function drawLuxuryParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Sparkles
  ctx.fillStyle = 'rgba(212,175,55,0.8)';
  ctx.beginPath();
  for(let i=0;i<particles.length;i++){
    let p = particles[i];
    ctx.moveTo(p.x,p.y);
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2,true);
  }
  ctx.fill();
  // Update sparkles
  particles.forEach(p=>{ p.y += p.d; if(p.y>canvas.height) p.y = -5; });

  // Rings
  ctx.strokeStyle = 'rgba(212,175,55,0.8)';
  ctx.lineWidth = 2;
  rings.forEach(r=>{
    ctx.beginPath();
    ctx.arc(r.x,r.y,r.r,0,Math.PI*2);
    ctx.stroke();
    r.y -= r.speed;
    if(r.y + r.r < 0) r.y = canvas.height + r.r;
  });

  // Petals
  petals.forEach(p=>{
    ctx.fillStyle = `rgba(255,182,193,${p.alpha})`;
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, p.size*0.6, p.size, Math.sin(p.angle), 0, Math.PI*2);
    ctx.fill();
    p.y -= p.speed;
    p.x += Math.sin(p.angle)*0.5;
    p.angle += 0.01;
    if(p.y + p.size < 0) { p.y = canvas.height + p.size; p.x = Math.random()*canvas.width; }
  });

  requestAnimationFrame(drawLuxuryParticles);
}
drawLuxuryParticles();
