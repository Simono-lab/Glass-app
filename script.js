const phone = document.getElementById("phone");
const sidebar = document.getElementById("sidebar");

let menuOpen = false;

function animateHover(el, on = true) {
  gsap.to(el, {
    y: on ? -5 : 0,
    scale: on ? 1.04 : 1,
    duration: 0.22,
    ease: "power2.out"
  });
}

document.querySelectorAll(".glass, .icon, .tab, .navbtn, .menu-item, .menu-footer, .side-item").forEach(el => {
  el.addEventListener("mouseenter", () => animateHover(el, true));
  el.addEventListener("mouseleave", () => animateHover(el, false));
});

document.querySelectorAll(".glass").forEach(card => {
  card.addEventListener("click", () => {
    const panel = card.dataset.panel;
    if (panel === "menu") {
      menuOpen = !menuOpen;
      sidebar.classList.toggle("open", menuOpen);
      gsap.to(sidebar, {
        x: menuOpen ? 0 : -240,
        opacity: menuOpen ? 1 : 0,
        duration: 0.45,
        ease: "power3.out"
      });
    }
    document.querySelectorAll(".glass").forEach(c => c.style.outline = "none");
    card.style.outline = "1px solid rgba(255,73,216,.35)";
    gsap.fromTo(card, { boxShadow: "0 26px 70px rgba(0,0,0,.55)" }, { boxShadow: "0 30px 85px rgba(0,0,0,.62)", duration: 0.3 });
  });
});

document.querySelectorAll(".navbtn, .icon, .menu-item, .side-item").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".navbtn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".menu-item").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".side-item").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

window.addEventListener("mousemove", e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  gsap.to(phone, {
    rotationY: x,
    rotationX: -y,
    duration: 0.6,
    ease: "power2.out"
  });
});

gsap.from(".orb", { opacity: 0, scale: 0.85, duration: 1.2, ease: "power3.out" });
gsap.from(".phone", { opacity: 0, y: 60, rotate: -15, duration: 1.1, ease: "power4.out", delay: 0.1 });
gsap.from(".glass", { opacity: 0, y: 20, stagger: 0.08, duration: 0.8, ease: "power3.out", delay: 0.35 });
gsap.to(".screen-glow", { opacity: 1, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut" });
