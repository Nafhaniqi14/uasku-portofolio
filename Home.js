// Typing effect
const texts = ["Website Developer", "Data Scientist", "Graphic Designer"];
let index = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100;
const delay = 2000;

function typeEffect() {
  const currentText = texts[index];
  const displayedText = currentText.substring(0, charIndex);
  document.getElementById("changing-text").textContent = displayedText;

  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
    setTimeout(typeEffect, speed);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, speed / 2);
  } else if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, delay);
  } else {
    isDeleting = false;
    index = (index + 1) % texts.length;
    setTimeout(typeEffect, speed);
  }
}

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animation
  AOS.init();
  
  // Start typing effect
  setTimeout(typeEffect, 1000);
  
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-links");
  
  menuToggle.addEventListener("click", function() {
    navMenu.classList.toggle("show");
    this.querySelector("i").classList.toggle("bx-menu");
    this.querySelector("i").classList.toggle("bx-x");
  });
  
  // Close menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
      document.querySelector(".menu-toggle i").classList.remove("bx-x");
      document.querySelector(".menu-toggle i").classList.add("bx-menu");
    });
  });
});