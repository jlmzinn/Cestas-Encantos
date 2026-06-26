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

  // ── Galeria de Fotos ──
  function montarGaleria() {
    const container = document.getElementById('galeriaGrid');
    const vazio = document.getElementById('galeriaVazia');
    if (!container) return;

    // galeriaFotos vem do arquivo js/galeria.js
    if (!window.galeriaFotos || window.galeriaFotos.length === 0) {
      if (vazio) vazio.style.display = 'block';
      container.style.display = 'none';
      return;
    }

    if (vazio) vazio.style.display = 'none';
    container.style.display = 'grid';
    container.innerHTML = '';

    window.galeriaFotos.forEach((item, index) => {
      const fig = document.createElement('figure');
      fig.className = 'galeria-item reveal';

      const img = document.createElement('img');
      img.src = 'img/galeria/' + item.arquivo;
      img.alt = item.legenda || 'Cesta personalizada';
      img.loading = 'lazy';
      img.onerror = function () {
        fig.classList.add('galeria-erro');
        img.style.display = 'none';
      };
      img.addEventListener('click', () => abrirLightbox(index));

      fig.appendChild(img);

      if (item.legenda) {
        const cap = document.createElement('figcaption');
        cap.textContent = item.legenda;
        fig.appendChild(cap);
      }

      container.appendChild(fig);
    });

    // Reaplica o efeito de revelação nos novos itens
    const novosReveals = container.querySelectorAll('.reveal');
    const obs2 = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 60);
          obs2.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    novosReveals.forEach(el => obs2.observe(el));
  }

  // ── Lightbox (ampliar foto) ──
  function abrirLightbox(index) {
    const item = window.galeriaFotos[index];
    if (!item) return;

    const overlay = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const cap = document.getElementById('lightboxCaption');

    img.src = 'img/galeria/' + item.arquivo;
    img.alt = item.legenda || '';
    cap.textContent = item.legenda || '';
    overlay.classList.add('ativo');
    document.body.style.overflow = 'hidden';
  }

  function fecharLightbox() {
    const overlay = document.getElementById('lightbox');
    overlay.classList.remove('ativo');
    document.body.style.overflow = '';
  }

  document.addEventListener('DOMContentLoaded', () => {
    montarGaleria();

    const overlay = document.getElementById('lightbox');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target.id === 'lightbox' || e.target.id === 'lightboxClose') {
          fecharLightbox();
        }
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') fecharLightbox();
    });
  });
