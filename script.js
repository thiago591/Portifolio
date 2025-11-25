
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
          const currentTheme = body.getAttribute('data-theme');
          const newTheme = currentTheme === 'light' ? 'dark' : 'light';
          body.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
          updateThemeIcon(newTheme);
      });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.menu-hamburguer');
    const navMenu = document.querySelector('.menu-links');
    const navLinks = document.querySelectorAll('.link-menu');

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', function() {
          hamburger.classList.toggle('active');
          navMenu.classList.toggle('active');
      });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
              hamburger.classList.remove('active');
              navMenu.classList.remove('active');
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.link-menu, .rodape-link, .botao-principal');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (!href || href.startsWith('http')) return;
            e.preventDefault();
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let charIndex = 0;
    function typeText() {
        if (charIndex < text.length) {
            typingElement.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        }
    }
    setTimeout(typeText, 500);
});


document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visivel'); });
    }, observerOptions);
    const animatedElements = document.querySelectorAll('.habilidade-pill, .sobre-card, .grade-projetos, .contato-conteudo');
    animatedElements.forEach(el => { el.classList.add('aparecer'); observer.observe(el); });
});


document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const phoneInput = document.getElementById('phone');
    const cpfInput = document.getElementById('cpf');
    const cepInput = document.getElementById('cep');
    const birthInput = document.getElementById('birthdate');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.querySelector('.modal-fechar');

    if (phoneInput) {
      phoneInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '');
          let formattedValue = '';
          if (value.length > 0) {
              if (value.length <= 2) {
                  formattedValue = `(${value}`;
              } else if (value.length <= 6) {
                  formattedValue = `(${value.slice(0, 2)}) ${value.slice(2)}`;
              } else if (value.length <= 10) {
                  formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
              } else {
                  formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
              }
          }
          e.target.value = formattedValue;
      });
    }

    if (cpfInput) {
      cpfInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '').slice(0, 11);
          let formatted = '';
          if (value.length > 0) {
              formatted = value
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
          }
          e.target.value = formatted;
      });
    }

    if (cepInput) {
      cepInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '').slice(0, 8);
          let formatted = '';
          if (value.length > 0) {
              formatted = value.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
          }
          e.target.value = formatted;
      });
    }

    if (birthInput) {
      birthInput.addEventListener('input', function(e) {
          let value = e.target.value.replace(/\D/g, '').slice(0, 8);
          let formatted = '';
          if (value.length > 0) {
              formatted = value
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\d{2})(\d)/, '$1/$2');
          }
          e.target.value = formatted;
      });
    }

    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          const formData = new FormData(contactForm);
          const name = (formData.get('name') || '').trim();
          const phone = (formData.get('phone') || '').trim();
          const cpf = (formData.get('cpf') || '').trim();
          const cep = (formData.get('cep') || '').trim();
          const birth = (formData.get('birthdate') || '').trim();
          const email = (formData.get('email') || '').trim();
          const message = (formData.get('message') || '').trim();
          if (!name || !phone || !cpf || !cep || !birth || !email || !message) { alert('Por favor, preencha todos os campos.'); return; }
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) { alert('Por favor, insira um email válido.'); return; }
          const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
          if (!phoneRegex.test(phone)) { alert('Por favor, insira um telefone válido.'); return; }
          const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
          if (!cpfRegex.test(cpf)) { alert('Por favor, insira um CPF válido.'); return; }
          const cepRegex = /^\d{5}-\d{3}$/;
          if (!cepRegex.test(cep)) { alert('Por favor, insira um CEP válido.'); return; }
          const birthRegex = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
          if (!birthRegex.test(birth)) { alert('Por favor, insira uma data válida (dd/mm/aaaa).'); return; }
          setTimeout(function() { if (successModal) successModal.style.display = 'block'; contactForm.reset(); }, 800);
      });
    }

    if (closeModal) {
      closeModal.addEventListener('click', function() { if (successModal) successModal.style.display = 'none'; });
    }
    window.addEventListener('click', function(e) { if (e.target === successModal) successModal.style.display = 'none'; });
});



document.addEventListener('DOMContentLoaded', function() {
    const moon = document.querySelector('.capa-decor .lua');
    const photoCircle = document.querySelector('.foto-perfil');
    function onScroll() {
        const y = window.scrollY || window.pageYOffset;
        if (moon) moon.style.transform = `translateY(${y * 0.15}px)`;
        if (photoCircle) photoCircle.style.transform = `translateY(${y * -0.05}px)`;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
});


document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.cabecalho');
    window.addEventListener('scroll', function() {
        if (!navbar) return;
        navbar.style.boxShadow = window.scrollY > 100 ? 'var(--shadow)' : 'none';
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carrossel-trilho');
    const slides = document.querySelectorAll('.carrossel-slide');
    const prevBtn = document.querySelector('.carrossel-prev');
    const nextBtn = document.querySelector('.carrossel-next');
    const dotsContainer = document.querySelector('.carrossel-pontos');
    if (!track || slides.length === 0) return;

    let index = 0;
    const total = slides.length;

   
    const dots = Array.from({ length: total }, (_, i) => {
        const dot = document.createElement('button');
        dot.className = 'ponto-carrossel';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', () => goTo(i));
        dotsContainer && dotsContainer.appendChild(dot);
        return dot;
    });

    function update() {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function goTo(i) {
        index = (i + total) % total;
        update();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    nextBtn && nextBtn.addEventListener('click', next);
    prevBtn && prevBtn.addEventListener('click', prev);

   
    let timer = setInterval(next, 4000);
    const carousel = document.querySelector('.carrossel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(timer));
        carousel.addEventListener('mouseleave', () => { timer = setInterval(next, 4000); });
    }

    update();
});