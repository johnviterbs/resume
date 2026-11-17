// --- 1. DOCUMENT MODAL & FULLSCREEN LOGIC ---
function openModal(filePath, title) {
  const modal = document.getElementById('resume-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalTitle = document.getElementById('modal-title');
  
  modalBody.innerHTML = `<object data="${filePath}#toolbar=0" type="application/pdf" width="100%" height="100%">
                            <div style="padding: 20px; color: white; text-align: center; margin-top: 20vh;">
                              It seems your browser or IDM is blocking the inline PDF view. <br><br>
                              <a href="${filePath}" target="_blank" style="color: #00f2fe;">Click here to open it directly in a new tab</a>.
                            </div>
                         </object>`;
                         
  modalTitle.innerHTML = `<i class="fa-solid fa-file-pdf"></i> ${title}`;
  modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('resume-modal');
  const modalBody = document.getElementById('modal-body-content');
  
  modalBody.innerHTML = ''; 
  modal.style.display = 'none';
  
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(err => console.log(err));
  }
}

function toggleFullScreen() {
  const modalContent = document.querySelector('.modal-content');
  if (!document.fullscreenElement) {
    modalContent.requestFullscreen().catch(err => {
      console.log(`Error enabling fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
}

window.onclick = function(event) {
  const modal = document.getElementById('resume-modal');
  if (event.target === modal) {
    closeModal();
  }
}


// --- 2. SCROLL SPY LOGIC ---
const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.nav-item');

window.addEventListener('scroll', () => {
  let current = '';
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    
    if (scrollY >= (sectionTop - 250)) {
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


// --- 3. UNIVERSAL EXPANDABLE CARD TOGGLE (SKILLS, PROJECTS & TOOLS) ---
function toggleProject(headerElement) {
  const card = headerElement.closest('.expandable-card');
  if (card) {
    card.classList.toggle('active');
  }
}

window.toggleTool = function(toolCard) {
  toolCard.classList.toggle('active');
};


// --- 4. AUTO-INJECT LIGHTBOX MODAL ---
let currentZoom = 1;

function setupLightbox() {
  if (document.getElementById('custom-photo-lightbox')) return;

  const lightboxHTML = `
    <div id="custom-photo-lightbox" style="display:none; position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(3,7,18,0.95); backdrop-filter:blur(10px); z-index:999999; flex-direction:column; align-items:center; justify-content:center;">
      <div style="position:fixed; top:20px; right:25px; display:flex; gap:12px; background:#0f172a; border:1px solid rgba(255,255,255,0.15); padding:10px 18px; border-radius:12px; z-index:1000000;">
        <button id="lb-zoom-out" style="background:none; border:none; color:#fff; font-size:1.2rem; cursor:pointer;" title="Zoom Out"><i class="fa-solid fa-magnifying-glass-minus"></i></button>
        <button id="lb-reset" style="background:none; border:none; color:#fff; font-size:1.2rem; cursor:pointer;" title="Reset"><i class="fa-solid fa-rotate-left"></i></button>
        <button id="lb-zoom-in" style="background:none; border:none; color:#fff; font-size:1.2rem; cursor:pointer;" title="Zoom In"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
        <button id="lb-close" style="background:none; border:none; color:#ef4444; font-size:1.6rem; line-height:1; cursor:pointer; margin-left:8px;" title="Close">&times;</button>
      </div>
      <div id="lb-container" style="width:94vw; height:90vh; display:flex; align-items:center; justify-content:center; overflow:auto;">
        <img id="lb-image" src="" alt="Preview" style="max-width:100%; max-height:100%; border-radius:10px; border:1px solid rgba(0,242,254,0.4); box-shadow:0 20px 50px rgba(0,0,0,0.8); transition:transform 0.2s ease; cursor:zoom-in;">
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', lightboxHTML);

  const lightbox = document.getElementById('custom-photo-lightbox');
  const lbImg = document.getElementById('lb-image');

  const updateZoom = (val) => {
    currentZoom = Math.min(Math.max(0.7, val), 3.5);
    lbImg.style.transform = `scale(${currentZoom})`;
    lbImg.style.cursor = currentZoom > 1 ? 'zoom-out' : 'zoom-in';
  };

  document.getElementById('lb-zoom-in').onclick = () => updateZoom(currentZoom + 0.4);
  document.getElementById('lb-zoom-out').onclick = () => updateZoom(currentZoom - 0.4);
  document.getElementById('lb-reset').onclick = () => updateZoom(1);
  document.getElementById('lb-close').onclick = () => { lightbox.style.display = 'none'; };

  lbImg.onclick = (e) => {
    e.stopPropagation();
    updateZoom(currentZoom === 1 ? 2 : 1);
  };

  lightbox.onclick = (e) => {
    if (e.target.id === 'custom-photo-lightbox' || e.target.id === 'lb-container') {
      lightbox.style.display = 'none';
    }
  };

  lightbox.addEventListener('wheel', (e) => {
    e.preventDefault();
    updateZoom(currentZoom + (e.deltaY < 0 ? 0.25 : -0.25));
  });
}

function openPhotoLightbox(src) {
  setupLightbox();
  const lightbox = document.getElementById('custom-photo-lightbox');
  const lbImg = document.getElementById('lb-image');
  currentZoom = 1;
  lbImg.style.transform = 'scale(1)';
  lbImg.style.cursor = 'zoom-in';
  lbImg.src = src;
  lightbox.style.display = 'flex';
}


// --- 5. AUTO-LOAD GALLERY IMAGES + CLICK EVENT ---
setupLightbox();

document.querySelectorAll('.gallery-grid[data-folder]').forEach(grid => {
  const folder = grid.getAttribute('data-folder');
  const start = parseInt(grid.getAttribute('data-start')) || 1;
  const end = parseInt(grid.getAttribute('data-end')) || 70;
  grid.innerHTML = '';
  
  for (let i = start; i <= end; i++) {
    const img = document.createElement('img');
    const extensions = ['jpg', 'JPG', 'png', 'PNG', 'jpeg'];
    let extIndex = 0;

    img.src = `${folder}/${i}.${extensions[extIndex]}`;
    img.alt = `Proof ${i}`;
    img.style.cursor = 'pointer';
    
    img.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openPhotoLightbox(this.src);
    });

    img.onerror = function() {
      extIndex++;
      if (extIndex < extensions.length) {
        this.src = `${folder}/${i}.${extensions[extIndex]}`;
      } else {
        this.remove();
      }
    };
    grid.appendChild(img);
  }
});