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

  // Skills data and rendering
  const skillsData = [
    {
      title: "Data Scientist",
      icon: "fas fa-chart-line",
      description: "Extracting insights from complex data to drive business decisions",
      skills: [
        "Machine Learning",
        "Statistical Analysis",
        "Data Visualization",
        "Python/R Programming",
        "Big Data Technologies"
      ]
    },
    {
      title: "Graphic Designer",
      icon: "fas fa-palette",
      description: "Creating visually stunning designs that communicate effectively",
      skills: [
        "Adobe Creative Suite",
        "UI/UX Design",
        "Brand Identity",
        "Typography",
        "Print & Digital Media"
      ]
    },
    {
      title: "Web Developer",
      icon: "fas fa-code",
      description: "Building responsive and interactive web experiences",
      skills: [
        "HTML5/CSS3/JavaScript",
        "React/Vue/Angular",
        "Node.js/PHP",
        "RESTful APIs",
        "Database Management"
      ]
    }
  ];

  const skillsGrid = document.querySelector('.skills-grid');
  skillsData.forEach((skill, index) => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    skillCard.setAttribute('data-aos', 'fade-up');
    skillCard.setAttribute('data-aos-delay', `${index * 100}`);
    skillCard.innerHTML = `
      <div class="skill-icon">
        <i class="${skill.icon}"></i>
      </div>
      <h2>${skill.title}</h2>
      <p>${skill.description}</p>
      <ul class="skill-list">
        ${skill.skills.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
    skillsGrid.appendChild(skillCard);
  });

  // Tools data and rendering
  const toolsData = [
    { name: "Correldraw", icon: "Asset/Corel.png" },
    { name: "HTML", icon: "Asset/HTML.png" },
    { name: "CSS", icon: "Asset/CSS.png" },
    { name: "Java Script", icon: "Asset/JS.png" },
    { name: "Photoshop", icon: "Asset/Photoshop.png" },
    { name: "Phyton", icon: "Asset/Phyton.png" },
    { name: "C++", icon: "Asset/C++.png" },
    { name: "VS Code", icon: "Asset/VS Code.png" },
  ];

  const toolsContainer = document.querySelector('.tools-container');
  toolsData.forEach((tool, index) => {
    const toolItem = document.createElement('div');
    toolItem.className = 'tool-item';
    toolItem.setAttribute('data-aos', 'fade-up');
    toolItem.setAttribute('data-aos-delay', `${100 + (index * 100)}`);
    toolItem.innerHTML = `
      <img src="${tool.icon}" alt="${tool.name}" class="tool-icon">
      <span>${tool.name}</span>
    `;
    toolsContainer.appendChild(toolItem);
  });

  // GitHub Contributions Calendar
  function generateMockContributions() {
    const contributions = [];
    const now = new Date();
    const startDate = new Date(now);
    startDate.setFullYear(startDate.getFullYear() - 1);
    
    let currentDate = new Date(startDate);
    
    while (currentDate <= now) {
      // Randomly generate some contributions
      const count = Math.random() > 0.7 ? Math.floor(Math.random() * 10) : 0;
      
      contributions.push({
        date: currentDate.toISOString().split('T')[0],
        count: count
      });
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return contributions;
  }

  function renderContributionsCalendar(contributions) {
    const grid = document.getElementById('contributions-grid');
    grid.innerHTML = '';

    // Get the current date and calculate the start date (1 year ago)
    const now = new Date();
    const startDate = new Date(now);
    startDate.setFullYear(startDate.getFullYear() - 1);

    // Calculate the day of the week for the start date (0 = Sunday, 6 = Saturday)
    let startDay = startDate.getDay();
    
    // If the start date isn't Sunday, we need to offset the grid
    if (startDay !== 0) {
      for (let i = 0; i < startDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell';
        emptyCell.setAttribute('data-level', '0');
        grid.appendChild(emptyCell);
      }
    }

    // Create a map of all dates with their contribution counts
    const contributionMap = {};
    contributions.forEach(day => {
      contributionMap[day.date] = day.count;
    });

    // Iterate through each day of the year and create cells
    const currentDate = new Date(startDate);
    while (currentDate <= now) {
      const dateString = currentDate.toISOString().split('T')[0];
      const count = contributionMap[dateString] || 0;
      
      // Determine the contribution level (similar to GitHub's color scale)
      let level;
      if (count === 0) level = 0;
      else if (count <= 3) level = 1;
      else if (count <= 6) level = 2;
      else if (count <= 9) level = 3;
      else level = 4;

      const cell = document.createElement('div');
      cell.className = 'day-cell';
      cell.setAttribute('data-level', level);
      cell.setAttribute('data-date', currentDate.toLocaleDateString());
      cell.setAttribute('data-count', count);
      grid.appendChild(cell);

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  // Use mock data for demonstration
  const mockContributions = generateMockContributions();
  renderContributionsCalendar(mockContributions);


  async function fetchGitHubContributions(username) {
    try {
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
      if (!response.ok) throw new Error('Failed to fetch GitHub contributions');
      const data = await response.json();
      return data.contributions;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }
  
  fetchGitHubContributions('Nafhaniqi14').then(contributions => {
    if (contributions) {
      renderContributionsCalendar(contributions);
    } else {
      document.getElementById('contributions-grid').innerHTML = 
        '<p>Unable to load GitHub contributions. Showing mock data instead.</p>';
      renderContributionsCalendar(generateMockContributions());
    }
  });
});