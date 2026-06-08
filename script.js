// ── Pétalas flutuantes ──
  function createPetal() {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = p.style.height = (8 + Math.random() * 10) + 'px';
    p.style.animationDuration = (6 + Math.random() * 8) + 's';
    p.style.animationDelay    = (Math.random() * 4) + 's';
    p.style.opacity = .4 + Math.random() * .4;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 14000);
  }
  setInterval(createPetal, 800);

  // ── Scroll reveal ──
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

  // ── Scroll to top ──
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('visible', window.scrollY > 300);
  });

  // ── Pedido WhatsApp ──
  function pedirWhats(produto) {
    const msg = encodeURIComponent(`Olá! Vim pelo catálogo e tenho interesse em: *${produto}* 🌸\nPoderia me passar mais informações?`);
    window.open(`https://wa.me/556993289385?text=${msg}`, '_blank');
  }