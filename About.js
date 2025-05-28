document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
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