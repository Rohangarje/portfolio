// Wait for resources to load including CDNs
window.addEventListener('load', () => {
  initLenisScroll();
  initPageLoader();
  initScrollProgress();
  initTypedSubtitle();
  initSwiperSliders();
  initAosScrollEffects();
  initTiltCards();
  initMagneticButtons();
});

/* ==========================================================================
   LENIS SMOOTH SCROLL INTEGRATION
   ========================================================================== */
let lenis;
function initLenisScroll() {
  if (typeof Lenis === 'undefined') return;
  
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Link GSAP ScrollTrigger and AOS to Lenis Scroll event updates
  lenis.on('scroll', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.update();
    }
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  });

  if (typeof gsap !== 'undefined') {
    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }
}

/* ==========================================================================
   GSAP PRELOADER & TEXT REVEAL TIMELINES
   ========================================================================== */
function initPageLoader() {
  const bar = document.querySelector('.loader-bar');
  const wrapper = document.querySelector('.loader-wrapper');
  
  if (!bar || !wrapper) return;

  let width = 0;
  const interval = setInterval(() => {
    width += Math.floor(Math.random() * 25) + 5;
    if (width >= 100) {
      width = 100;
      clearInterval(interval);
      
      bar.style.width = '100%';
      
      // Fire page entrance GSAP sequence
      setTimeout(() => {
        fadeLoaderAndRevealPage();
      }, 300);
    } else {
      bar.style.width = width + '%';
    }
  }, 80);

  function fadeLoaderAndRevealPage() {
    if (typeof gsap === 'undefined') {
      wrapper.style.display = 'none';
      showHeroElements();
      return;
    }
    
    // Only animate the loader out — hero elements are always visible via CSS
    gsap.to(wrapper, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        wrapper.style.display = 'none';
      }
    });
  }

  // Safety fallback: force all hero elements visible if animation doesn't fire
  function showHeroElements() {
    const heroEls = [
      '.hero-greet', '.hero-name', '.hero-sub',
      '.hero-cta .btn', '.hero-socials',
      '.photo-frame', '.floating-tech-icon'
    ];
    heroEls.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    });
  }

  // Guarantee visibility after 2.5s regardless of animation state
  setTimeout(showHeroElements, 2500);
}

/* ==========================================================================
   SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (windowScroll / height) * 100;
    progressBar.style.width = progress + '%';
  });
}

/* ==========================================================================
   TYPED.JS HERO SUBTITLE
   ========================================================================== */
function initTypedSubtitle() {
  const element = document.querySelector('.typed-target');
  if (!element || typeof Typed === 'undefined') return;

  const rawSubtitles = element.getAttribute('data-subtitles');
  const subtitles = rawSubtitles ? JSON.parse(rawSubtitles) : ['Full Stack Developer', 'Software Engineer'];

  new Typed('.typed-target', {
    strings: subtitles,
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });
}

/* ==========================================================================
   SWIPER SLIDERS (CERTIFICATIONS & TESTIMONIALS)
   ========================================================================== */
function initSwiperSliders() {
  if (typeof Swiper === 'undefined') return;

  // Certifications Slider setup
  new Swiper('.certifications-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      }
    }
  });

  // Testimonials Slider setup
  new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination-testimonials',
      clickable: true,
    }
  });
}

/* ==========================================================================
   AOS SCROLL EFFECTS (REVEALING LAYOUTS)
   ========================================================================== */
function initAosScrollEffects() {
  if (typeof AOS === 'undefined') return;

  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false,
    anchorPlacement: 'top-bottom',
    offset: 120
  });

  // Animate dynamic proficiency bars as they scroll into viewport
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.progress-fill').forEach(bar => {
      const targetPercent = bar.getAttribute('data-percent') || '0%';
      
      gsap.to(bar, {
        scrollTrigger: {
          trigger: bar,
          start: 'top 85%',
        },
        width: targetPercent,
        duration: 1.5,
        ease: "power2.out"
      });
    });
  }
}

/* ==========================================================================
   VANILLA TILT CARDS
   ========================================================================== */
function initTiltCards() {
  const tiltElements = document.querySelectorAll('[data-tilt]');
  if (tiltElements.length === 0 || typeof VanillaTilt === 'undefined') return;

  VanillaTilt.init(Array.from(tiltElements), {
    max: 12,
    speed: 400,
    glare: true,
    "max-glare": 0.15,
    scale: 1.02,
    axis: null, // What axis should be disabled. Can be "x" or "y"
    reset: true
  });
}

/* ==========================================================================
   GSAP MAGNETIC BUTTONS ACCENT
   ========================================================================== */
function initMagneticButtons() {
  const magnets = document.querySelectorAll('.btn-magnetic');
  if (magnets.length === 0 || typeof gsap === 'undefined') return;

  magnets.forEach(magnet => {
    magnet.addEventListener('mousemove', (e) => {
      const boundary = magnet.getBoundingClientRect();
      // Calculate mouse displacement relative to center position of the button bounding frame
      const x = e.clientX - boundary.left - boundary.width / 2;
      const y = e.clientY - boundary.top - boundary.height / 2;

      // Animate displacement offsets gently in GSAP
      gsap.to(magnet, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    magnet.addEventListener('mouseleave', () => {
      // Snap details back to layout origin
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      });
    });
  });
}
