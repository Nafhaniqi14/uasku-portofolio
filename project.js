document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initAnimations();
  initMobileMenu();
  initActiveLinks();
  initLoadingPage();
});

function initAnimations() {
  // Initialize AOS animation
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
}

function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-links");
  
  if (!menuToggle || !navMenu) return;
  
  menuToggle.addEventListener("click", function() {
    navMenu.classList.toggle("show");
    const icon = this.querySelector("i");
    icon.classList.toggle("bx-menu");
    icon.classList.toggle("bx-x");
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      const menuIcon = document.querySelector(".menu-toggle i");
      menuIcon.classList.remove("bx-x");
      menuIcon.classList.add("bx-menu");
    });
  });
}

function initActiveLinks() {
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === currentPage);
  });
}

function initLoadingPage() {
  const loadingOverlay = document.querySelector('.loading-overlay');
  if (!loadingOverlay) return;

  // Immediately complete the loading
  loadingOverlay.style.opacity = '0';
  setTimeout(() => {
    loadingOverlay.style.display = 'none';
  }, 500);

  // Optional: You can keep the shooting stars animation if desired
  function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.width = (Math.random() * 3 + 1) + 'px';
    star.style.height = star.style.width;
    star.style.animationDuration = (Math.random() * 2 + 1) + 's';
    
    const galaxy = document.querySelector('.galaxy');
    if (galaxy) {
      galaxy.appendChild(star);
      setTimeout(() => star.remove(), 2000);
    }
  }

  // Add some shooting stars for visual effect
  for (let i = 0; i < 5; i++) {
    setTimeout(createShootingStar, i * 200);
  }
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-links");
  const navbar = document.querySelector(".navbar");
  
  menuToggle.addEventListener("click", function() {
    navMenu.classList.toggle("show");
    navbar.classList.toggle("expanded"); // Tambahan untuk styling
    const icon = this.querySelector("i");
    icon.classList.toggle("bx-menu");
    icon.classList.toggle("bx-x");
    
    // Tambahan untuk mencegah scroll saat menu terbuka
    if (navMenu.classList.contains("show")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      navbar.classList.remove("expanded");
      document.body.style.overflow = "";
      const menuIcon = document.querySelector(".menu-toggle i");
      menuIcon.classList.remove("bx-x");
      menuIcon.classList.add("bx-menu");
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener("click", function(event) {
    if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
      navMenu.classList.remove("show");
      navbar.classList.remove("expanded");
      document.body.style.overflow = "";
      const menuIcon = document.querySelector(".menu-toggle i");
      menuIcon.classList.remove("bx-x");
      menuIcon.classList.add("bx-menu");
    }
  });
}