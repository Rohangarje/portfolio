document.addEventListener('DOMContentLoaded', () => {
  // Initialize Utilities
  initCustomCursor();
  initMouseSpotlight();
  initThemeHandling();
  initThemeCustomizer();
  initHeaderScroll();
  initMobileNav();
  initContactForm();
  initMockGithubChart();
  initVisitorCounter();
});

/* ==========================================================================
   CUSTOM CURSOR EXPERIENCE
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  
  if (!cursor || !follower) return;

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Add micro-delay to follower for floating trail effect
    setTimeout(() => {
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    }, 50);
  });

  // Attach hover triggers on clickable objects
  const clickables = document.querySelectorAll('a, button, input, textarea, select, .swiper-slide, .color-dot');
  clickables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      follower.classList.add('cursor-hover');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      follower.classList.remove('cursor-hover');
    });
  });
}

/* ==========================================================================
   RADIAL SPOTLIGHT MOUSE GLOW
   ========================================================================== */
function initMouseSpotlight() {
  const spotlight = document.querySelector('.spotlight');
  if (!spotlight) return;

  document.addEventListener('mousemove', (e) => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
  });
}

/* ==========================================================================
   THEME SWITCHING (DARK / LIGHT)
   ========================================================================== */
function initThemeHandling() {
  const themeToggleBtn = document.querySelector('.theme-toggle-btn');
  if (!themeToggleBtn) return;
  
  const icon = themeToggleBtn.querySelector('i');

  // Check saved cookie or default to dark
  const currentTheme = getCookie('theme') || 'dark';
  if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    if (icon) icon.className = 'fas fa-moon';
  } else {
    document.body.classList.remove('light-theme');
    if (icon) icon.className = 'fas fa-sun';
  }

  themeToggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    const newTheme = isLight ? 'light' : 'dark';
    
    setCookie('theme', newTheme, 30);
    
    if (icon) {
      icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Dispatch custom event to let canvas drawings adapt
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
  });
}

/* ==========================================================================
   PALETTE THEME CUSTOMIZER
   ========================================================================== */
function initThemeCustomizer() {
  const customizer = document.querySelector('.customizer-panel');
  const toggle = document.querySelector('.customizer-toggle');
  const dots = document.querySelectorAll('.color-dot');
  
  if (!customizer || !toggle) return;

  // Toggle Customizer Panel drawer
  toggle.addEventListener('click', () => {
    customizer.classList.toggle('active');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = customizer.classList.contains('active') ? 'fas fa-times' : 'fas fa-cog';
    }
  });

  // Close Customizer list on outer click
  document.addEventListener('click', (e) => {
    if (!customizer.contains(e.target) && e.target !== toggle && !toggle.contains(e.target)) {
      customizer.classList.remove('active');
      const icon = toggle.querySelector('i');
      if (icon) icon.className = 'fas fa-cog';
    }
  });

  // Apply saved color theme details
  const savedAccentColor = getCookie('accentColor') || '#6366f1';
  document.documentElement.style.setProperty('--accent', savedAccentColor);
  
  const red = parseInt(savedAccentColor.substring(1,3), 16);
  const green = parseInt(savedAccentColor.substring(3,5), 16);
  const blue = parseInt(savedAccentColor.substring(5,7), 16);
  document.documentElement.style.setProperty('--accent-rgb', `${red}, ${green}, ${blue}`);
  
  // Highlight active dot
  dots.forEach(dot => {
    const colorStyle = window.getComputedStyle(dot).backgroundColor;
    const hexColor = rgb2hex(colorStyle);
    if (hexColor.toLowerCase() === savedAccentColor.toLowerCase()) {
      dot.classList.add('active');
    }
    
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');
      
      const newAccent = rgb2hex(window.getComputedStyle(dot).backgroundColor);
      document.documentElement.style.setProperty('--accent', newAccent);
      
      const r = parseInt(newAccent.substring(1,3), 16);
      const g = parseInt(newAccent.substring(3,5), 16);
      const b = parseInt(newAccent.substring(5,7), 16);
      document.documentElement.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
      
      setCookie('accentColor', newAccent, 30);
      
      if (window.pJSDom && window.pJSDom[0]) {
        // Adapt background Web Particles linkage color
        window.pJSDom[0].pJS.particles.color.value = newAccent;
        window.pJSDom[0].pJS.particles.line_linked.color = newAccent;
        window.pJSDom[0].pJS.fn.particlesRefresh();
      }
    });
  });
}

function rgb2hex(rgb) {
  if (rgb.startsWith('#')) return rgb;
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return '#6366f1';
  function hex(x) {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  }
  return "#" + hex(match[1]) + hex(match[2]) + hex(match[3]);
}

/* ==========================================================================
   HEADER ACCENT SCROLL
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   MOBILE DROPDOWN MENU
   ========================================================================== */
function initMobileNav() {
  const toggle = document.querySelector('.mobile-nav-toggle');
  const menu = document.querySelector('.nav-menu');
  const links = document.querySelectorAll('.nav-link');
  
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    const icon = toggle.querySelector('i');
    if (icon) {
      icon.className = menu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    }
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      const icon = toggle.querySelector('i');
      if (icon) icon.className = 'fas fa-bars';
    });
  });
}

/* ==========================================================================
   SECURED CONTACT FORMS LOGIC
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  const responseMsg = document.getElementById('formResponseMsg');
  
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!responseMsg) return;
    responseMsg.style.display = 'none';
    responseMsg.className = 'form-response-msg';
    
    // Disable submission button for debounce action
    const btn = form.querySelector('button[type="submit"]');
    const originalBtnHTML = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Inquiry...';

    const formData = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      subject: document.getElementById('contactSubject').value,
      message: document.getElementById('contactMessage').value
    };

    try {
      const response = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      if (response.ok) {
        responseMsg.classList.add('success');
        responseMsg.innerHTML = `<i class="fas fa-check-circle"></i> ${result.message}`;
        responseMsg.style.display = 'block';
        form.reset();
      } else {
        responseMsg.classList.add('error');
        responseMsg.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${result.message || 'Error executing transmission.'}`;
        responseMsg.style.display = 'block';
      }
    } catch (err) {
      responseMsg.classList.add('error');
      responseMsg.innerHTML = `<i class="fas fa-wifi"></i> Connection timed out. Please check network.`;
      responseMsg.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalBtnHTML;
    }
  });
}

/* ==========================================================================
   GITHUB MOCK CONTEXT INTEGRATION
   ========================================================================== */
function initMockGithubChart() {
  const chartBars = document.querySelectorAll('.chart-bar');
  if (chartBars.length === 0) return;

  setTimeout(() => {
    chartBars.forEach(bar => {
      const targetPercent = bar.getAttribute('data-height') || '20px';
      bar.style.height = targetPercent;
    });
  }, 600);
}

/* ==========================================================================
   VISITOR ACCUMULATOR COUNTER TRANSITION
   ========================================================================== */
function initVisitorCounter() {
  const counterEl = document.getElementById('visitorCounter');
  if (!counterEl) return;

  const target = parseInt(counterEl.innerText) || 105;
  const start = Math.max(10, target - 15);
  let current = start;
  counterEl.innerText = start;

  const timer = setInterval(() => {
    current += 1;
    counterEl.innerText = current;
    if (current >= target) {
      clearInterval(timer);
    }
  }, 100);
}

/* ==========================================================================
   COOKIE HELPERS
   ========================================================================== */
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
