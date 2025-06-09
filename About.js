document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init();

  // Initialize loading page
  initLoadingPage();
  
  // Mobile menu toggle functionality
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

// Loading Page Functionality
function initLoadingPage() {
  // Create shooting stars
  function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.width = (Math.random() * 3 + 1) + 'px';
    star.style.height = star.style.width;
    star.style.animationDuration = (Math.random() * 2 + 1) + 's';
    document.querySelector('.galaxy').appendChild(star);
    
    // Remove star after animation
    setTimeout(() => {
      star.remove();
    }, 2);
  }
  
  // Add shooting stars periodically
  setInterval(createShootingStar, 500);
  
  // Simulate loading progress
  let progress = 0;
  const progressBar = document.querySelector('.progress');
  const loadingOverlay = document.querySelector('.loading-overlay');
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      
      // Hide loading overlay when complete
      setTimeout(() => {
        loadingOverlay.classList.add('hidden');
      }, 2);
    }
    progressBar.style.width = progress + '%';
  }, 2);
  
  // Add some shooting stars immediately
  for (let i = 0; i < 5; i++) {
    setTimeout(createShootingStar, i * 200);
  }
}