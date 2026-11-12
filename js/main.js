const grid = document.getElementById('grid');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCaption = document.getElementById('lb-caption');

document.getElementById('year').textContent = new Date().getFullYear();

function openLightbox(work) {
  lbImg.src = work.image;
  lbImg.alt = work.alt || work.title;
  lbCaption.textContent = [work.title, work.year, work.medium].filter(Boolean).join(' · ');
  lightbox.showModal();
}

// Gallery only exists on the Home and Portfolio pages
if (grid) {
  const limit = Number(grid.dataset.limit) || Infinity;

  fetch('data/works.json')
    .then((r) => r.json())
    .then((works) => {
      works.slice(0, limit).forEach((work) => {
        const fig = document.createElement('figure');
        const btn = document.createElement('button');
        const img = document.createElement('img');
        img.src = work.image;
        img.alt = work.alt || work.title;
        img.loading = 'lazy';
        btn.append(img);
        btn.addEventListener('click', () => openLightbox(work));
        const cap = document.createElement('figcaption');
        cap.textContent = work.title;
        fig.append(btn, cap);
        grid.append(fig);
      });
    })
    .catch(() => {
      grid.textContent = 'Could not load artwork.';
    });
}

if (lightbox) {
  document.getElementById('close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });
}
