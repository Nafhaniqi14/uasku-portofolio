// Typing Effect
const texts = ["Website Developer", "Data Scientist", "Graphic Designer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const pauseDelay = 2000;

function typeEffect() {
  const currentText = texts[index];
  const displayedText = currentText.substring(0, charIndex);
  document.getElementById("changing-text").textContent = displayedText;

  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
    setTimeout(typeEffect, typingSpeed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, typingSpeed / 2);
  } else if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, pauseDelay);
  } else {
    isDeleting = false;
    index = (index + 1) % texts.length;
    setTimeout(typeEffect, typingSpeed);
  }
}

// Loading Page with Instant Transition
function initLoadingPage() {
  let progress = 0;
  const progressBar = document.querySelector('.progress');
  const loadingOverlay = document.querySelector('.loading-overlay');
  
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 20; // Faster progress increment
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      progressBar.style.width = '100%';
      loadingOverlay.style.opacity = '0';
      // Remove overlay immediately after fading
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
      }, 300); // Short fade duration
    }
    progressBar.style.width = progress + '%';
  }, 100); // Faster interval
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-links");
  
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

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize loading page (will disappear quickly)
  initLoadingPage();
  
  // Initialize animations
  AOS.init();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Start typing effect after a brief delay
  setTimeout(typeEffect, 500);
});
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