const topbar=document.querySelector('.topbar');
const menuToggle=document.querySelector('.menu-toggle');
const mobileMenu=document.getElementById('mobileMenu');

function openMenu(){
  if(!topbar||!mobileMenu||!menuToggle) return;
  topbar.classList.add('menu-open');
  mobileMenu.hidden=false;
  mobileMenu.style.display='block';
  menuToggle.setAttribute('aria-expanded','true');
  document.body.style.overflowX='hidden';
}

function closeMenu(){
  if(!topbar||!mobileMenu||!menuToggle) return;
  topbar.classList.remove('menu-open');
  mobileMenu.hidden=true;
  mobileMenu.style.display='none';
  menuToggle.setAttribute('aria-expanded','false');
  document.body.style.overflowX='hidden';
}

menuToggle?.addEventListener('click',()=>{
  const expanded=menuToggle.getAttribute('aria-expanded')==='true';
  expanded ? closeMenu() : openMenu();
});

// Smooth anchor scrolling + close mobile menu on navigation.
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const id=a.getAttribute('href');
  const el=document.querySelector(id);
  if(el){
    e.preventDefault();
    closeMenu();
    el.scrollIntoView({behavior:'smooth'});
  }
}));

// Close the mobile menu when tapping outside the panel.
document.addEventListener('click',e=>{
  if(!topbar?.classList.contains('menu-open')) return;
  const insideBar=topbar.contains(e.target);
  if(!insideBar) closeMenu();
});

// Respect users who disable motion.
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if(!reduceMotion){
  const revealSelectors=[
    '.intro-copy',
    '.section-heading',
    '.venue-copy',
    '.faq details',
    '#rsvp form'
  ];

  document.querySelectorAll(revealSelectors.join(',')).forEach(el=>{
    el.classList.add('motion');
    if(el.matches('.venue-copy')) el.classList.add('motion-right');
    if(el.matches('#rsvp form')) el.classList.add('motion-right');
  });

  document.querySelector('.venue-image')?.classList.add('motion-image');
  document.querySelector('.rsvp-grid>img')?.classList.add('motion-image');

  const targets=[
    ...document.querySelectorAll('.motion'),
    ...document.querySelectorAll('.date-card'),
    ...document.querySelectorAll('.event'),
    ...document.querySelectorAll('.motion-image')
  ];

  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:.16,rootMargin:'0px 0px -7% 0px'});

  targets.forEach(el=>io.observe(el));



}

//отправка формы:
const form = document.querySelector("#rsvpForm");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "Отправляем...";

  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    if (data[key]) {
      if (!Array.isArray(data[key])) data[key] = [data[key]];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  data["access_key"] = "9e48c60e-bdc3-4532-8436-67b5f2d8099d";

  try {
    const response = await fetch("https://web3forms.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.success) {
      console.error("Ошибка от Web3Forms:", result);
      throw new Error("Ошибка отправки");
    }

    form.reset();
    submitButton.textContent = "Ответ отправлен ♡";
    return;

  } catch (error) {
    console.error("Произошла ошибка:", error);
    submitButton.textContent = "Попробуйте ещё раз";
    
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }, 4000);
  }
});