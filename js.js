// ===== Countdown Timer =====
const weddingDate = new Date("June 7, 2026 20:00:00").getTime();
const countdownEl = document.getElementById("countdown");

setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;
  if(distance<0){ countdownEl.innerHTML="Nous sommes mariés! 🎉"; return; }
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

// ===== Lightbox Gallery =====
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const galleryImages = document.querySelectorAll('.gallery-img');
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.innerHTML = `<img src="${img.src}" alt="Wedding Image">`;
    lightbox.style.display = 'flex';
  });
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// ===== Language Switcher =====
function switchLanguage(lang){
  document.querySelectorAll('[data-lang-fr]').forEach(el=>{
    if(lang==='fr') el.innerText = el.dataset.langFr || el.innerHTML;
    if(lang==='ar') el.innerText = el.dataset.langAr || el.innerHTML;
  });
}

// ===== Background Music on first interaction =====
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.2; // soft music
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
