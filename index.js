document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Theme Toggle
  // ==========================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  const themeIcon = themeToggleBtn.querySelector('i');

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
    }
  }

  // ==========================================
  // 2. Custom Cursor
  // ==========================================
  const cursor = document.getElementById('custom-cursor');
  const cursorDot = document.getElementById('custom-cursor-dot');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });

  // Grow cursor on interactive elements
  const interactives = document.querySelectorAll('a, button, .skills-tab-btn, .project-card, .chat-suggest-btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.borderColor = 'var(--accent-purple)';
      cursor.style.backgroundColor = 'rgba(168, 85, 247, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.borderColor = 'var(--accent-cyan)';
      cursor.style.backgroundColor = 'transparent';
    });
  });

  // ==========================================
  // 3. Scroll Progress Bar & Nav Activation
  // ==========================================
  const progressBar = document.getElementById('scroll-progress-bar');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';

    // Active Nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 4. Typing Animation
  // ==========================================
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'AI & Machine Learning Enthusiast',
    'Future Software Engineer',
    'Technology Explorer',
    'Problem Solver',
    'Creative Builder',
    'Continuous Learner',
    'Future Innovator'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }
  type();

  // ==========================================
  // 5. Interactive Particles Canvas
  // ==========================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  const numberOfParticles = 80;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.6 - 0.3;
      this.speedY = Math.random() * 0.6 - 0.3;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }

    draw() {
      const currentTheme = htmlElement.getAttribute('data-theme');
      ctx.fillStyle = currentTheme === 'dark' ? 'rgba(6, 182, 212, 0.4)' : 'rgba(59, 130, 246, 0.3)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
  }

  function connectParticles() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const lineAlphaScale = currentTheme === 'dark' ? 0.08 : 0.05;
    
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          ctx.strokeStyle = currentTheme === 'dark' 
            ? `rgba(168, 85, 247, ${(1 - distance/120) * lineAlphaScale})`
            : `rgba(59, 130, 246, ${(1 - distance/120) * lineAlphaScale})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  // ==========================================
  // 6. Skills Dashboard Data & Logic
  // ==========================================
  const skillsData = [
    { name: 'Python', category: 'programming', percentage: 85 },
    { name: 'C Language', category: 'programming', percentage: 80 },
    { name: 'JavaScript (ES6+)', category: 'programming', percentage: 75 },
    { name: 'SQL', category: 'programming', percentage: 70 },
    { name: 'Supervised Learning', category: 'aiml', percentage: 75 },
    { name: 'Neural Networks Basics', category: 'aiml', percentage: 65 },
    { name: 'Model Evaluation', category: 'aiml', percentage: 70 },
    { name: 'Data Visualization', category: 'datascience', percentage: 80 },
    { name: 'Pandas & Numpy', category: 'datascience', percentage: 75 },
    { name: 'HTML5 & CSS3', category: 'web', percentage: 90 },
    { name: 'Git & GitHub', category: 'web', percentage: 80 },
    { name: 'Responsive Design', category: 'web', percentage: 85 },
    { name: 'Entrepreneurial Mindset', category: 'soft', percentage: 90 },
    { name: 'Problem Solving', category: 'soft', percentage: 85 },
    { name: 'Team Collaboration', category: 'soft', percentage: 85 }
  ];

  const skillsContainer = document.getElementById('skills-container');
  const skillsTabBtns = document.querySelectorAll('.skills-tab-btn');

  function renderSkills(category = 'all') {
    skillsContainer.innerHTML = '';
    const filteredSkills = category === 'all' 
      ? skillsData 
      : skillsData.filter(s => s.category === category);

    filteredSkills.forEach(skill => {
      const card = document.createElement('div');
      card.className = 'skill-card glass-panel';
      card.innerHTML = `
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-percentage">${skill.percentage}%</span>
        </div>
        <div class="skill-bar-bg">
          <div class="skill-bar-fill" style="width: 0%"></div>
        </div>
      `;
      skillsContainer.appendChild(card);
      
      // Trigger animation on bar fill
      setTimeout(() => {
        card.querySelector('.skill-bar-fill').style.width = skill.percentage + '%';
      }, 50);
    });
  }

  skillsTabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      skillsTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSkills(btn.dataset.category);
    });
  });

  renderSkills(); // Initial render

  // ==========================================
  // 7. Projects Showcase Data, Filter & Search
  // ==========================================
  const projectsData = [
    {
      title: 'acp_mini_proj',
      desc: 'A console-based 2D Graphics Editor developed in C using a character-based canvas. Supports drawing lines, rectangles, circles, and triangles with interactive keyboard navigation. Features include adding, deleting, modifying shapes, color customization, live previews, coordinate selection, and dynamic rendering using graphics algorithms.',
      tech: ['C', 'Graphics Algorithms', 'Console-UI'],
      category: 'c-graphics',
      badge: 'C Project',
      github: 'https://github.com/incharassathish77-dotcom/acp_mini_proj'
    },
    {
      title: 'acp_practice_cls_1',
      desc: 'An AI-powered Skill Tree Simulator. Built to visualize, test, and adapt learning paths and skill hierarchies dynamically, matching student educational focuses to target competencies.',
      tech: ['JavaScript', 'HTML5', 'CSS3', 'Dynamic Simulator'],
      category: 'simulators',
      badge: 'Skill Simulator',
      github: 'https://github.com/incharassathish77-dotcom/acp_practice_cls_1',
      live: 'https://aipoweredskilltreesimulator.vercel.app'
    },
    {
      title: 'python_mini_project',
      desc: 'A Government Scheme recommendation and eligibility tracker web application. Employs user criteria (age, location, income) to filter and advise on optimal governmental programs using logical heuristics.',
      tech: ['Python', 'HTML', 'CSS', 'Recommendation Engine'],
      category: 'recommendation',
      badge: 'Python/Web',
      github: 'https://github.com/incharassathish77-dotcom/python_mini_project',
      live: 'https://python-mini-project-three.vercel.app'
    },
    {
      title: 'Portfolio-',
      desc: 'A world-class, premium developer portfolio website built using vanilla HTML5, CSS3, and ES6+ JavaScript. Features glassmorphic cards, moving interactive canvas particles, a custom cursor, scroll progression tracking, dynamic theme shifting, and a chatbot helper assistant.',
      tech: ['HTML5', 'CSS3', 'ES6 JavaScript', 'Canvas API'],
      category: 'web-portfolio',
      badge: 'Portfolio',
      github: 'https://github.com/incharassathish77-dotcom/Portfolio-',
      live: 'https://vercel.com/incharassathish77-6951s-projects/portfolio'
    }
  ];

  const projectsContainer = document.getElementById('projects-container');
  const projectSearchInput = document.getElementById('project-search');

  function renderProjects(filterText = '') {
    projectsContainer.innerHTML = '';
    const filtered = projectsData.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(filterText.toLowerCase()) ||
                            project.desc.toLowerCase().includes(filterText.toLowerCase()) ||
                            project.tech.some(t => t.toLowerCase().includes(filterText.toLowerCase()));
      return matchesSearch;
    });

    if (filtered.length === 0) {
      projectsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 3rem;">No projects found matching the keywords.</div>';
      return;
    }

    filtered.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card glass-panel';
      
      let linksHTML = '';
      if (project.github) {
        linksHTML += `<a href="${project.github}" target="_blank" class="project-link" title="GitHub Source"><i class="fa-brands fa-github"></i></a>`;
      }
      if (project.live) {
        linksHTML += `<a href="${project.live}" target="_blank" class="project-link" title="Live Preview"><i class="fa-solid fa-up-right-from-square"></i></a>`;
      }

      card.innerHTML = `
        <div class="project-card-header">
          <span class="project-card-badge">${project.badge}</span>
        </div>
        <div class="project-card-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.desc}</p>
          <div class="project-tech-stack">
            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="project-links">
            ${linksHTML}
          </div>
        </div>
      `;
      projectsContainer.appendChild(card);
    });
  }

  projectSearchInput.addEventListener('input', (e) => {
    renderProjects(e.target.value);
  });

  renderProjects(); // Initial render

  // ==========================================
  // 8. GitHub Analytics & Heatmap Simulation
  // ==========================================
  const githubLanguages = [
    { name: 'C', percentage: 48, color: '#555555' },
    { name: 'JavaScript', percentage: 32, color: '#f1e05a' },
    { name: 'HTML/CSS', percentage: 12, color: '#e34c26' },
    { name: 'Python', percentage: 8, color: '#3572A5' }
  ];

  const githubLanguagesContainer = document.getElementById('github-languages-container');
  githubLanguages.forEach(lang => {
    const item = document.createElement('div');
    item.className = 'lang-item';
    item.innerHTML = `
      <div class="lang-meta">
        <span>${lang.name}</span>
        <span>${lang.percentage}%</span>
      </div>
      <div class="lang-bar-track">
        <div class="lang-bar-fill" style="width: ${lang.percentage}%; background-color: ${lang.color};"></div>
      </div>
    `;
    githubLanguagesContainer.appendChild(item);
  });

  // Render contribution matrix blocks
  const contribSquares = document.getElementById('contribution-squares');
  for (let i = 0; i < 91; i++) { // Render 13 weeks of contribution
    const level = Math.floor(Math.random() * 4); // 0 to 3 contribution level
    const square = document.createElement('div');
    square.style.width = '10px';
    square.style.height = '10px';
    square.style.borderRadius = '2px';
    
    // Choose color based on contribution level
    let bg = 'rgba(255, 255, 255, 0.05)';
    if (level === 1) bg = 'rgba(6, 182, 212, 0.2)';
    else if (level === 2) bg = 'rgba(6, 182, 212, 0.5)';
    else if (level === 3) bg = 'rgba(168, 85, 247, 0.8)';
    
    square.style.backgroundColor = bg;
    contribSquares.appendChild(square);
  }

  // ==========================================
  // 9. AI Knowledge Hub Glossary Rendering
  // ==========================================
  const glossaryData = [
    { term: 'Supervised Learning', def: 'A type of Machine Learning where the model is trained on labeled data to map inputs to outputs.' },
    { term: 'Neural Network', def: 'A computing system inspired by biological neural brains, consisting of interconnected node layers.' },
    { term: 'Transformer', def: 'A deep learning architecture relying on self-attention mechanisms, powering modern large language models.' },
    { term: 'Overfitting', def: 'A modeling error where an algorithm fits its training set too closely, failing to generalize to unseen test records.' },
    { term: 'Vibe Coding', def: 'The workflow of building functional tools and apps with AI systems via high-level conversational prompt exchanges.' }
  ];

  const glossaryContainer = document.getElementById('ai-glossary');
  glossaryData.forEach(item => {
    const el = document.createElement('div');
    el.className = 'glossary-item';
    el.innerHTML = `
      <div class="glossary-term">${item.term}</div>
      <div class="glossary-def">${item.def}</div>
    `;
    glossaryContainer.appendChild(el);
  });

  // ==========================================
  // 10. AI Chat Assistant Widget Logic
  // ==========================================
  const chatBubble = document.getElementById('chat-bubble');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatBody = document.getElementById('chat-body');
  const chatSuggestBtns = document.querySelectorAll('.chat-suggest-btn');

  chatBubble.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    // Remove ping once opened
    const ping = chatBubble.querySelector('.chat-bubble-ping');
    if (ping) ping.remove();
  });

  chatClose.addEventListener('click', () => {
    chatWindow.style.display = 'none';
  });

  function addChatMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function handleChatBotReply(userMessage) {
    const msgLower = userMessage.toLowerCase();
    let reply = "";

    if (msgLower.includes('education') || msgLower.includes('college') || msgLower.includes('university') || msgLower.includes('study')) {
      reply = "Inchara is pursuing a B.Tech in Computer Science and Engineering with a specialization in Artificial Intelligence and Machine Learning at REVA University (2025-2029).";
    } else if (msgLower.includes('project') || msgLower.includes('code') || msgLower.includes('made') || msgLower.includes('build')) {
      reply = "She has developed: 1) 'acp_mini_proj' - a C-based 2D console graphics editor; 2) 'acp_practice_cls_1' - an AI Skill Tree simulator; and 3) 'python_mini_project' - a Government Scheme recommendation app.";
    } else if (msgLower.includes('skill') || msgLower.includes('language') || msgLower.includes('python') || msgLower.includes('know')) {
      reply = "Inchara's programming skills include Python, C, JavaScript, HTML5/CSS3, and SQL. She is also skilled in AI foundations, neural networks, and data visualization.";
    } else if (msgLower.includes('cert') || msgLower.includes('ignite') || msgLower.includes('wadhwani')) {
      reply = "She holds a certificate of completion from the Ignite India 5.0 Program by Wadhwani Global Entrepreneur (completed Dec 09, 2025), where she completed 42 hours of coursework in business modeling and ideation.";
    } else if (msgLower.includes('contact') || msgLower.includes('email') || msgLower.includes('phone') || msgLower.includes('reach')) {
      reply = "You can contact Inchara via email at incharassathish77@gmail.com, or mobile at 9019265804. She is based in Bengaluru, Karnataka, India.";
    } else {
      reply = "I'm a smart bot trained on Inchara's resume. You can ask me about her projects, education, technical skills, certifications, or how to contact her!";
    }

    // Simulate typing delay
    setTimeout(() => {
      addChatMessage('bot', reply);
    }, 400);
  }

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    addChatMessage('user', text);
    chatInput.value = '';
    handleChatBotReply(text);
  }

  chatSend.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  chatSuggestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.dataset.query;
      addChatMessage('user', query);
      handleChatBotReply(query);
    });
  });

  // ==========================================
  // 11. Contact Form Visual Handler
  // ==========================================
  const contactForm = document.getElementById('portfolio-contact-form');
  const formStatus = document.getElementById('form-status-msg');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.style.display = 'block';
    formStatus.className = 'form-status';
    formStatus.textContent = 'Sending message...';

    // Simulate sending message
    setTimeout(() => {
      formStatus.classList.add('success');
      formStatus.textContent = 'Thank you! Your message has been sent successfully. Inchara will get back to you soon.';
      contactForm.reset();
    }, 1200);
  });
});
