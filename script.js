// ============================================
// PRISB Web Developers - Fixed JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========================================
  // Remove Loading Screen Immediately
  // ========================================
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
  document.body.style.overflow = 'auto';
  
  // ========================================
  // Theme Toggle with LocalStorage
  // ========================================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle ? themeToggle.querySelector('.theme-icon') : null;
  
  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(savedTheme);
    if (themeIcon) updateThemeIcon(savedTheme);
  } else if (!prefersDark) {
    document.body.classList.remove('dark');
    document.body.classList.add('light');
    if (themeIcon) updateThemeIcon('light');
  } else {
    if (themeIcon) updateThemeIcon('dark');
  }
  
  function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌞' : '🌙';
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.body.classList.contains('light') ? 'light' : 'dark';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.body.classList.remove(currentTheme);
      document.body.classList.add(newTheme);
      
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
  
  // ========================================
  // Mobile Menu Toggle
  // ========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      
      const spans = mobileMenuBtn.querySelectorAll('span');
      spans.forEach((span) => {
        span.style.transition = 'all 0.3s ease';
      });
      
      if (mobileNav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close mobile menu when clicking on a link
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }
  
  // ========================================
  // Back to Top Button
  // ========================================
  const backToTop = document.getElementById('backToTop');
  
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ========================================
  // Accordion Functionality
  // ========================================
  const accordionTitles = document.querySelectorAll('.acc-title');
  
  accordionTitles.forEach(title => {
    title.addEventListener('click', function() {
      const item = this.parentElement;
      const content = this.nextElementSibling;
      const isActive = item.classList.contains('active');
      
      // Close all other accordion items
      document.querySelectorAll('.acc-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.acc-content').style.maxHeight = '0';
          otherItem.querySelector('.acc-title').setAttribute('aria-expanded', 'false');
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
        this.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });
  
  // ========================================
  // Scroll Animations using Intersection Observer
  // ========================================
  const scrollElements = document.querySelectorAll('.scroll-animate');
  
  if (scrollElements.length > 0) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    scrollElements.forEach(el => {
      scrollObserver.observe(el);
    });
  }
  
  // ========================================
  // Sticky Header Effect
  // ========================================
  const header = document.querySelector('header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }
  
  // ========================================
  // Counter Animation for Stats
  // ========================================
  const stats = document.querySelectorAll('.stat-number');
  let statsAnimated = false;
  
  const animateStats = () => {
    stats.forEach(stat => {
      const target = stat.textContent;
      const numericValue = parseInt(target);
      
      if (!isNaN(numericValue)) {
        let current = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= numericValue) {
            stat.textContent = target;
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(current) + '+';
          }
        }, 30);
      }
    });
  };
  
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection && stats.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          animateStats();
        }
      });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
  }
  
  // ========================================
  // Card Hover Effects
  // ========================================
  const cards = document.querySelectorAll('.card, .pricing-card, .hero-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // ========================================
  // Keyboard Navigation Support
  // ========================================
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        if (mobileMenuBtn) {
          const spans = mobileMenuBtn.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      }
    }
  });
  
  // ========================================
  // Reduce Motion for Users Who Prefer It
  // ========================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    document.querySelectorAll('.scroll-animate').forEach(el => {
      el.classList.add('visible');
    });
  }
  
  // ========================================
  // Console Welcome Message
  // ========================================
  console.log('%c🚀 Welcome to PRISB Web Developers!', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
  console.log('%cBuilt with ❤️ by the PRISB Team', 'font-size: 14px; color: #8b5cf6;');
  
});