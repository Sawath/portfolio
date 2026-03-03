// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('themeToggle');
    this.themeIcon = document.getElementById('themeIcon');
    this.html = document.documentElement;
    
    this.init();
  }

  init() {
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.setTheme(savedTheme);
    
    // Add event listener
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  setTheme(theme) {
    this.html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update icon
    this.themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  toggleTheme() {
    const currentTheme = this.html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    
    // Add animation
    this.themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      this.themeToggle.style.transform = '';
    }, 300);
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.navbar = document.querySelector('.navbar');
    
    this.init();
  }

  init() {
    // Mobile menu toggle
    this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
    
    // Close mobile menu when clicking on a link
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => this.handleScroll());
    
    // Smooth scrolling for navigation links
    this.setupSmoothScrolling();
  }

  toggleMobileMenu() {
    this.navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const bars = this.navToggle.querySelectorAll('.bar');
    const isActive = this.navMenu.classList.contains('active');
    
    bars[0].style.transform = isActive ? 'rotate(45deg) translate(5px, 5px)' : '';
    bars[1].style.opacity = isActive ? '0' : '1';
    bars[2].style.transform = isActive ? 'rotate(-45deg) translate(7px, -6px)' : '';
  }

  closeMobileMenu() {
    this.navMenu.classList.remove('active');
    const bars = this.navToggle.querySelectorAll('.bar');
    bars[0].style.transform = '';
    bars[1].style.opacity = '1';
    bars[2].style.transform = '';
  }

  handleScroll() {
    if (window.scrollY > 100) {
      this.navbar.style.background = 'var(--nav-bg)';
      this.navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    } else {
      this.navbar.style.background = 'var(--nav-bg)';
      this.navbar.style.boxShadow = '';
    }
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Animation Manager
class AnimationManager {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupCounters();
    this.setupSkillBars();
    this.setupTypingEffect();
    this.setupParallax();
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, this.observerOptions);

    // Add animation classes to elements
    document.addEventListener('DOMContentLoaded', () => {
      const animatedElements = document.querySelectorAll(`
        .section-header, .about-intro, .highlight-item, 
        .timeline-item, .skill-category, .project-card, 
        .contact-item, .contact-form
      `);
      
      animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
      });
    });
  }

  setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          this.animateCounter(entry.target, target);
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }

  animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    
    updateCounter();
  }

  setupSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = entry.target.getAttribute('data-progress');
          entry.target.style.width = progress + '%';
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
      skillObserver.observe(bar);
    });
  }

  setupTypingEffect() {
    const nameElement = document.querySelector('.name');
    if (nameElement) {
      const text = nameElement.textContent;
      nameElement.textContent = '';
      let index = 0;
      
      const typeWriter = () => {
        if (index < text.length) {
          nameElement.textContent += text.charAt(index);
          index++;
          setTimeout(typeWriter, 100);
        }
      };
      
      // Start typing after page load
      setTimeout(typeWriter, 500);
    }
  }

  setupParallax() {
    // Disabled parallax to fix scroll issues
    return;
  }
}

// Interactive Elements Manager
class InteractiveManager {
  constructor() {
    this.init();
    this.setupProjectModals();
  }

  init() {
    this.setupProjectCards();
    this.setupTechIcons();
    this.setupSkillOrbs();
    this.setupForm();
    // this.setupProjectModals(); // Temporairement désactivé
    this.setupCursorTrail();
  }

  setupProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  setupTechIcons() {
    const techIcons = document.querySelectorAll('.tech-icon');
    
    techIcons.forEach(icon => {
      icon.addEventListener('mouseenter', () => {
        const tech = icon.getAttribute('data-tech');
        this.showTooltip(icon, tech);
      });
      
      icon.addEventListener('mouseleave', () => {
        this.hideTooltip();
      });
    });
  }

  setupSkillOrbs() {
    const skillOrbs = document.querySelectorAll('.skill-orb');
    
    skillOrbs.forEach(orb => {
      orb.addEventListener('mouseenter', () => {
        orb.style.transform = 'translateY(-10px) scale(1.1)';
      });
      
      orb.addEventListener('mouseleave', () => {
        orb.style.transform = 'translateY(-5px) scale(1)';
      });
    });
  }

  setupForm() {
    const contactForm = document.getElementById('contactForm');
    const downloadCV = document.getElementById('downloadCV');
    
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
          // Check if EmailJS is available
          if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS non chargé');
          }
          
          // Send email using EmailJS with correct service ID
          const response = await emailjs.send(
            'service_0r2jn5h', 
            'template_bll0cdf', 
            {
              from_name: data.name,
              from_email: data.email,
              subject: data.subject,
              message: data.message,
              reply_to: data.email
            }
          );
          
          // Show success message
          this.showNotification('Message envoyé avec succès! Je vous répondrai dès que possible.', 'success');
          
          // Reset form
          contactForm.reset();
        } catch (error) {
          // Show error message
          console.error('EmailJS error details:', error);
          let errorMessage = 'Erreur lors de l\'envoi. ';
          
          if (error.text) {
            errorMessage += error.text;
          } else if (error.message) {
            errorMessage += error.message;
          } else {
            errorMessage += 'Veuillez réessayer plus tard.';
          }
          
          // Fallback: open email client
          const fallbackMessage = `Vous pouvez aussi m'envoyer un email directement à: syllasawath28@gmail.com\n\nNom: ${data.name}\nEmail: ${data.email}\nSujet: ${data.subject}\n\nMessage:\n${data.message}`;
          
          this.showNotification(errorMessage + '\n\nOuverture de votre client email...', 'warning');
          
          // Open email client as fallback
          window.location.href = `mailto:syllasawath28@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(fallbackMessage)}`;
        }
      });
    }
    
    if (downloadCV) {
      downloadCV.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Direct download link
        const link = document.createElement('a');
        link.href = 'assets/CV_SYLLA_Sawath.pdf';
        link.download = 'CV_SYLLA_Sawath.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification('CV téléchargé avec succès!', 'success');
      });
    }
  }

  setupProjectModals() {
    // Project cards click handlers
    const projectCards = document.querySelectorAll('.project-card');
    const modalOverlay = document.getElementById('modalOverlay');
    
    // Modal references
    const modals = {
      healthguard: document.getElementById('healthguardModal'),
      jobmatch: document.getElementById('jobmatchModal'),
      security: document.getElementById('securityModal'),
      dashboard: document.getElementById('dashboardModal'),
      saas: document.getElementById('saasModal')
    };
    
    // Close buttons
    const closeButtons = {
      healthguard: document.getElementById('closeHealthguard'),
      jobmatch: document.getElementById('closeJobmatch'),
      security: document.getElementById('closeSecurity'),
      dashboard: document.getElementById('closeDashboard'),
      saas: document.getElementById('closeSaas')
    };
    
    // Add click handlers to project cards
    projectCards.forEach((card, index) => {
      card.addEventListener('click', () => {
        let modalId;
        
        switch(index) {
          case 0: modalId = 'healthguard'; break;
          case 1: modalId = 'jobmatch'; break;
          case 2: modalId = 'security'; break;
          case 3: modalId = 'dashboard'; break;
          case 4: modalId = 'saas'; break;
          default: return;
        }
        
        this.openModal(modalId);
      });
    });
    
    // Add close handlers
    Object.values(closeButtons).forEach(button => {
      if (button) {
        button.addEventListener('click', () => this.closeModal());
      }
    });
    
    // Close modal on overlay click
    if (modalOverlay) {
      modalOverlay.addEventListener('click', () => this.closeModal());
    }
  }
  
  openModal(modalId) {
    const modal = document.getElementById(modalId + 'Modal');
    const overlay = document.getElementById('modalOverlay');
    
    if (modal && overlay) {
      modal.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  
  closeModal() {
    const modals = document.querySelectorAll('.modal');
    const overlay = document.getElementById('modalOverlay');
    
    modals.forEach(modal => modal.classList.remove('active'));
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  showTooltip(element, text) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
    
    setTimeout(() => {
      tooltip.style.opacity = '1';
    }, 10);
  }

  hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
      setTimeout(() => tooltip.remove(), 300);
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
      }
    }, 5000);
  }
}

// Performance Optimizer
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.setupDebounce();
    this.setupThrottle();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  setupDebounce() {
    window.debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };
  }

  setupThrottle() {
    window.throttle = (func, limit) => {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all managers
  new ThemeManager();
  new NavigationManager();
  new AnimationManager();
  new InteractiveManager();
  new PerformanceOptimizer();
  
  // Add loading complete class
  document.body.classList.add('loaded');
  
  console.log('🚀 Portfolio loaded successfully!');
});

// Add CSS for cursor trail and notifications
const additionalStyles = `
  .cursor-trail {
    position: fixed;
    width: 8px;
    height: 8px;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.6;
    transition: opacity 0.3s ease;
  }

  .tooltip {
    position: fixed;
    background: var(--bg-tertiary);
    color: var(--text-primary);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    box-shadow: var(--card-shadow);
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-tertiary);
    color: var(--text-primary);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: var(--card-shadow-hover);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    min-width: 300px;
    animation: slideInRight 0.3s ease;
    border: 1px solid var(--border-color);
  }

  .notification-success {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    border-color: #10b981;
  }

  .notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }

  .notification-close {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 0;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  .notification-close:hover {
    opacity: 1;
  }

  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .loaded * {
    animation-play-state: running !important;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
