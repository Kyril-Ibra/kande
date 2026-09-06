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

const form=document.getElementById('rsvpForm');
form?.addEventListener('submit',e=>{
  e.preventDefault();
  if(!form.checkValidity()){
    form.reportValidity();
    return;
  }
  const data=Object.fromEntries(new FormData(form).entries());
  localStorage.setItem('wedding-rsvp-draft',JSON.stringify(data));
  const note=document.getElementById('formNote');
  note.textContent='Данные сохранены локально в этом браузере. Чтобы ответы приходили вам, подключите endpoint формы перед публикацией.';
});
