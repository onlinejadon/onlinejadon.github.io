// ==========================================
// AS JADON SOLUTIONS - COMPLETE INTERACTION
// ==========================================

const WHATSAPP_NUMBER = "918871469064";

let selectedPlan = { name:"", price:0, pages:"" };

const $ = (id) => document.getElementById(id);
const enquiryModal = $("enquiryModal");
const policyModal = $("policyModal");
const chatWindow = $("chatWindow");
const enquiryForm = $("enquiryForm");
const aiMascot = $("aiMascot");
const eyes = document.querySelectorAll(".eye");

function lockBody(lock){
  document.body.style.overflow = lock ? "hidden" : "";
}

function selectPlan(name, price, pages){
  selectedPlan = {name, price, pages};
  $("selectedPlanName").textContent = name;
  $("selectedPlanInfo").textContent = `• ₹${price.toLocaleString("en-IN")} • ${pages}`;
  enquiryModal.classList.add("active");
  enquiryModal.setAttribute("aria-hidden","false");
  lockBody(true);
  setTimeout(() => $("name")?.focus(), 250);
}

function closeModal(){
  enquiryModal.classList.remove("active");
  enquiryModal.setAttribute("aria-hidden","true");
  policyModal.classList.remove("active");
  policyModal.setAttribute("aria-hidden","true");
  if(!chatWindow.classList.contains("active")) lockBody(false);
}

function openPolicy(type){
  const title = $("policyTitle"), content = $("policyContent");
  const policies = {
    privacy: ["Privacy Policy", `
      <p>We respect your privacy. Information submitted through this website is used only to process your enquiry and communicate regarding the requested service.</p>
      <p>We do not sell or intentionally share your personal information with third parties.</p>`],
    terms: ["Terms & Conditions", `
      <p>Website development services are provided according to the selected package and agreed project requirements.</p>
      <p>Additional requirements outside the selected package may involve additional charges.</p>`],
    refund: ["Refund Policy", `
      <p>Refund eligibility depends on the project status, service agreement and work already completed.</p>
      <p>Please discuss refund terms before starting a project.</p>`]
  };
  const data = policies[type] || policies.privacy;
  title.textContent = data[0];
  content.innerHTML = data[1];
  policyModal.classList.add("active");
  policyModal.setAttribute("aria-hidden","false");
  lockBody(true);
}
function closePolicy(){
  policyModal.classList.remove("active");
  policyModal.setAttribute("aria-hidden","true");
  if(!enquiryModal.classList.contains("active") && !chatWindow.classList.contains("active")) lockBody(false);
}

enquiryForm?.addEventListener("submit", e => {
  e.preventDefault();
  const name = $("name").value.trim();
  const email = $("email").value.trim();
  const mobile = $("mobile").value.trim();
  const business = $("business").value.trim();
  const location = $("location").value.trim();

  if(!name || !email || !mobile || !business || !location){
    alert("Please fill in all fields.");
    return;
  }
  if(!/^[0-9]{10}$/.test(mobile)){
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }
  const message =
`✨ AS JADON SOLUTIONS
━━━━━━━━━━━━━━━━━━━━

🌐 WEBSITE PROJECT ENQUIRY

📦 Plan: ${selectedPlan.name}
💰 Price: ₹${selectedPlan.price.toLocaleString("en-IN")}
📄 Pages: ${selectedPlan.pages}

━━━━━━━━━━━━━━━━━━━━

👤 Name: ${name}
📧 Gmail: ${email}
📱 Mobile: ${mobile}
🏪 Business / Shop: ${business}
📍 Location: ${location}

━━━━━━━━━━━━━━━━━━━━

🚀 I would like to start my website project.

Thank you.
AS Jadon Solutions`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  closeModal();
});

function openChat(){
  chatWindow.classList.add("active");
  chatWindow.setAttribute("aria-hidden","false");
  lockBody(false);
}
function closeChat(){
  chatWindow.classList.remove("active");
  chatWindow.setAttribute("aria-hidden","true");
  if(!enquiryModal.classList.contains("active") && !policyModal.classList.contains("active")) lockBody(false);
}
$("chatToggle")?.addEventListener("click", openChat);
$("chatClose")?.addEventListener("click", closeChat);

document.querySelectorAll("[data-plan]").forEach(btn => {
  btn.addEventListener("click", () => {
    const p = btn.dataset.plan;
    if(p==="simple") selectPlan("SIMPLE",2999,"2–3 Pages");
    if(p==="pro") selectPlan("PRO",5999,"5–7 Pages");
    if(p==="max") selectPlan("MAX",9999,"10+ Pages");
    closeChat();
  });
});

enquiryModal?.addEventListener("click", e => { if(e.target===enquiryModal) closeModal(); });
policyModal?.addEventListener("click", e => { if(e.target===policyModal) closePolicy(); });

document.addEventListener("keydown", e => {
  if(e.key==="Escape"){ closeModal(); closePolicy(); closeChat(); $("themePanel")?.classList.remove("open"); }
});

// Mobile menu
const menuButton = $("menuButton"), navLinks = $("navLinks");
menuButton?.addEventListener("click", () => navLinks.classList.toggle("active"));
navLinks?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("active")));

// Smooth anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const id = link.getAttribute("href");
    if(id && id!=="#" && document.querySelector(id)){
      e.preventDefault();
      document.querySelector(id).scrollIntoView({behavior:"smooth", block:"start"});
    }
  });
});

// Reveal on scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.13, rootMargin:"0px 0px -50px 0px"});
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// 0 -> 100,000 counter when hero enters
let counterStarted = false;
function animateCounter(){
  if(counterStarted) return;
  counterStarted = true;
  const el = $("userCounter");
  const duration = 5200;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now-start)/duration,1);
    const eased = 1-Math.pow(1-p,3);
    const value = Math.floor(100000*eased);
    el.textContent = value.toLocaleString("en-IN");
    if(p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
new IntersectionObserver(es => es.forEach(e => e.isIntersecting && animateCounter()),{threshold:.25}).observe(document.querySelector(".hero"));

// Cute AI eye tracking: mouse + touch/pointer
let lastPointer = {x:innerWidth/2,y:innerHeight/2};
let pointerActive = false;
let idleTimer;
function setEyes(x,y){
  lastPointer={x,y};
  pointerActive=true;
  clearTimeout(idleTimer);
  idleTimer=setTimeout(()=>{ pointerActive=false; },2600);
  eyes.forEach(eye=>{
    const r=eye.getBoundingClientRect();
    const cx=r.left+r.width/2, cy=r.top+r.height/2;
    const angle=Math.atan2(y-cy,x-cx);
    const max=4.2;
    const dx=Math.cos(angle)*max, dy=Math.sin(angle)*max;
    eye.style.setProperty("--look-x",`${dx}px`);
    eye.style.setProperty("--look-y",`${dy}px`);
  });
}
document.addEventListener("pointermove", e => setEyes(e.clientX,e.clientY), {passive:true});
document.addEventListener("touchmove", e => {
  const t=e.touches[0]; if(t) setEyes(t.clientX,t.clientY);
},{passive:true});

function happyAI(){
  aiMascot.classList.remove("happy");
  void aiMascot.offsetWidth;
  aiMascot.classList.add("happy");
  setTimeout(()=>aiMascot.classList.remove("happy"),1500);
}
aiMascot?.addEventListener("click",()=>{
  happyAI();
  setTimeout(openChat,420);
});
aiMascot?.addEventListener("keydown",e=>{
  if(e.key==="Enter"||e.key===" "){e.preventDefault(); happyAI();setTimeout(openChat,420);}
});

// Blink + idle look-around
setInterval(()=>{
  if(!aiMascot.classList.contains("happy")){
    aiMascot.classList.add("blink");
    setTimeout(()=>aiMascot.classList.remove("blink"),180);
  }
}, 3600 + Math.random()*1600);

setInterval(()=>{
  if(pointerActive || aiMascot.classList.contains("happy")) return;
  const r=aiMascot.getBoundingClientRect();
  setEyes(r.left+r.width*(.25+Math.random()*.5), r.top+r.height*(.25+Math.random()*.25));
  setTimeout(()=>{
    if(!pointerActive) setEyes(innerWidth/2, innerHeight/2);
  },700);
},5200);

// ==========================================
// COLOR / THEME CONTROL
// Existing default remains blue/cyan.
// User can switch, auto-cycle, pause, custom color.
// ==========================================
const root = document.documentElement;
const themeButton=$("themeButton"), themePanel=$("themePanel"), themeClose=$("themeClose");
const autoTheme=$("autoTheme"), pauseTheme=$("pauseTheme"), glowIntensity=$("glowIntensity"), customColor=$("customColor");
const swatches=[...document.querySelectorAll(".swatch")];

const themes=["#25bfff","#9b7cff","#ff62bd","#49e6a5","#ff9c5a","#ff637d","#b9d5ff"];
let themeIndex=0, autoOn=true, paused=false, autoTimer=null;

function hexToRgb(hex){
  const n=hex.replace("#","");
  return {r:parseInt(n.slice(0,2),16),g:parseInt(n.slice(2,4),16),b:parseInt(n.slice(4,6),16)};
}
function setAccent(hex, save=true){
  if(hex==="rainbow"){
    root.style.setProperty("--accent","#25bfff");
    root.style.setProperty("--accent2","#9b7cff");
    root.style.setProperty("--theme-rainbow","1");
    document.body.classList.add("rainbow-theme");
  }else{
    root.style.setProperty("--accent",hex);
    const {r,g,b}=hexToRgb(hex);
    const darker=`rgb(${Math.max(0,Math.floor(r*.43))},${Math.max(0,Math.floor(g*.43))},${Math.max(0,Math.floor(b*.43))})`;
    root.style.setProperty("--accent2",darker);
    root.style.setProperty("--theme-rainbow","0");
    document.body.classList.remove("rainbow-theme");
    themeIndex=Math.max(0,themes.indexOf(hex));
    customColor.value=hex;
  }
  swatches.forEach(s=>s.classList.toggle("active",s.dataset.theme===hex));
  if(save) localStorage.setItem("aj-theme",hex);
}
function updateGlow(){
  root.style.setProperty("--glow",glowIntensity.value);
  const opacity=.07+(Number(glowIntensity.value)/100)*.12;
  document.querySelector(".glow-one").style.opacity=opacity;
  document.querySelector(".glow-two").style.opacity=opacity*.65;
  localStorage.setItem("aj-glow",glowIntensity.value);
}
function setAuto(on,save=true){
  autoOn=on;
  autoTheme.classList.toggle("active",on);
  autoTheme.setAttribute("aria-pressed",String(on));
  if(save)localStorage.setItem("aj-auto",String(on));
  restartAuto();
}
function setPaused(on){
  paused=on;
  pauseTheme.textContent=on?"▶":"⏸";
  pauseTheme.title=on?"Resume auto color":"Pause current color";
  restartAuto();
}
function restartAuto(){
  clearInterval(autoTimer);
  if(autoOn && !paused){
    autoTimer=setInterval(()=>{
      const next=themes[(themeIndex+1)%themes.length];
      setAccent(next);
    },11000);
  }
}
themeButton.addEventListener("click",()=>{
  const open=themePanel.classList.toggle("open");
  themeButton.setAttribute("aria-expanded",String(open));
});
themeClose.addEventListener("click",()=>themePanel.classList.remove("open"));
document.addEventListener("click",e=>{
  if(!e.target.closest(".theme-control")) themePanel.classList.remove("open");
});
autoTheme.addEventListener("click",()=>setAuto(!autoOn));
pauseTheme.addEventListener("click",()=>setPaused(!paused));
swatches.forEach(s=>s.addEventListener("click",()=>{
  if(s.dataset.theme==="rainbow"){
    setAccent("rainbow");
  }else setAccent(s.dataset.theme);
  setAuto(false);
}));
customColor.addEventListener("input",e=>{
  setAccent(e.target.value);
  setAuto(false);
});
glowIntensity.addEventListener("input",updateGlow);

const savedTheme=localStorage.getItem("aj-theme");
const savedAuto=localStorage.getItem("aj-auto");
const savedGlow=localStorage.getItem("aj-glow");
if(savedTheme) setAccent(savedTheme,false);
else setAccent("#25bfff",false);
if(savedAuto!==null) autoOn=savedAuto==="true";
autoTheme.classList.toggle("active",autoOn);
if(savedGlow){glowIntensity.value=savedGlow}
updateGlow();
restartAuto();

// Rainbow mode gets a slow gradient only when selected.
const rainbowStyle=document.createElement("style");
rainbowStyle.textContent=`
body.rainbow-theme{--accent:#25bfff}
body.rainbow-theme .brand-mark{background:linear-gradient(120deg,#25bfff,#9b7cff,#ff62bd,#ff9c5a,#49e6a5);background-size:300% 300%;animation:rainbowShift 9s ease infinite}
body.rainbow-theme .primary-btn,body.rainbow-theme .featured .plan-btn{background:linear-gradient(120deg,#25bfff,#9b7cff,#ff62bd,#ff9c5a,#49e6a5);background-size:300% 300%;animation:rainbowShift 12s ease infinite}
@keyframes rainbowShift{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}
.eye span{transform:translate(var(--look-x,0),var(--look-y,0))}
`;
document.head.appendChild(rainbowStyle);

$("year").textContent=new Date().getFullYear();
