document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animation
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
  
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
  
  // Add active class to current page link
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-links a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
  
  // Horizontal scroll effect for projects
  const projectsContainer = document.querySelector(".projects-horizontal");
  let isDown = false;
  let startX;
  let scrollLeft;
  
  projectsContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - projectsContainer.offsetLeft;
    scrollLeft = projectsContainer.scrollLeft;
  });
  
  projectsContainer.addEventListener('mouseleave', () => {
    isDown = false;
  });
  
  projectsContainer.addEventListener('mouseup', () => {
    isDown = false;
  });
  
  projectsContainer.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - projectsContainer.offsetLeft;
    const walk = (x - startX) * 2;
    projectsContainer.scrollLeft = scrollLeft - walk;
  });
});