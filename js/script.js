document.addEventListener('DOMContentLoaded', () => {
    // Tahun otomatis di footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Toggle menu mobile
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isOpen ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '74px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = '#161925';
            navLinks.style.padding = '20px';
            navLinks.style.gap = '16px';
        });
    }

    // Tutup menu mobile saat link diklik
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 860 && navLinks) navLinks.style.display = 'none';
        });
    });

    // Animasi fade-in saat elemen masuk viewport
    const animatedEls = document.querySelectorAll('[data-animate]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    animatedEls.forEach(el => observer.observe(el));

    // Highlight menu navbar sesuai section yang sedang dilihat
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 100;
            if (window.scrollY >= top) current = sec.getAttribute('id');
        });
        navAnchors.forEach(a => {
            a.style.color = a.getAttribute('href') === '#' + current ? '#e9e9f2' : '';
        });
    });
});
