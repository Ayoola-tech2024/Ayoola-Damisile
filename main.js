// Ayoola Damisile - Horizontal / Chaos Scroll Engine (v3.0)

document.addEventListener('DOMContentLoaded', function () {
    initializeHorizontalScroll();
    initializeNavigation();
    initializeProjectFilters();
    initializeForm();
});

let currentPanelIndex = 0;
const totalPanels = 6;
let isAnimating = false;

function initializeHorizontalScroll() {
    const track = document.getElementById('horizontal-track');
    const prevBtn = document.getElementById('prev-panel-btn');
    const nextBtn = document.getElementById('next-panel-btn');
    const currentNumEl = document.getElementById('current-panel-num');
    const progressBar = document.getElementById('scroll-progress-bar');
    const navLinks = document.querySelectorAll('.nav-panel-link');

    if (!track) return;

    function goToPanel(index) {
        if (index < 0 || index >= totalPanels || isAnimating) return;

        isAnimating = true;
        currentPanelIndex = index;

        // Translate track horizontally
        track.style.transform = `translateX(-${currentPanelIndex * 100}vw)`;

        // Update indicator
        if (currentNumEl) {
            currentNumEl.textContent = `0${currentPanelIndex + 1}`;
        }

        // Update progress bar width
        if (progressBar) {
            const progressPct = ((currentPanelIndex + 1) / totalPanels) * 100;
            progressBar.style.width = `${progressPct}%`;
        }

        // Update active nav links
        navLinks.forEach(link => {
            const panelIdx = parseInt(link.getAttribute('data-panel-index'), 10);
            if (panelIdx === currentPanelIndex) {
                link.classList.add('text-white', 'border-b', 'border-white');
                link.classList.remove('text-zinc-400');
            } else {
                link.classList.remove('text-white', 'border-b', 'border-white');
                link.classList.add('text-zinc-400');
            }
        });

        // Cooldown to prevent hyper-scroll wheel sensitivity
        setTimeout(() => {
            isAnimating = false;
        }, 650);
    }

    // 1. Mouse Wheel -> Horizontal Panel Slide
    window.addEventListener('wheel', function (e) {
        // Prevent default vertical page scroll
        e.preventDefault();

        if (isAnimating) return;

        if (e.deltaY > 20 || e.deltaX > 20) {
            goToPanel(currentPanelIndex + 1);
        } else if (e.deltaY < -20 || e.deltaX < -20) {
            goToPanel(currentPanelIndex - 1);
        }
    }, { passive: false });

    // 2. Keyboard Navigation (Arrows)
    window.addEventListener('keydown', function (e) {
        if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(e.key)) {
            e.preventDefault();
            goToPanel(currentPanelIndex + 1);
        } else if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(e.key)) {
            e.preventDefault();
            goToPanel(currentPanelIndex - 1);
        }
    });

    // 3. Touch Swipe Handling (Mobile / Tablet)
    let touchStartX = 0;
    let touchStartY = 0;

    window.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', function (e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;

        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;

        // If swipe distance is sufficient
        if (Math.abs(diffX) > 40 || Math.abs(diffY) > 40) {
            if (diffX > 40 || diffY > 40) {
                goToPanel(currentPanelIndex + 1);
            } else if (diffX < -40 || diffY < -40) {
                goToPanel(currentPanelIndex - 1);
            }
        }
    }, { passive: true });

    // 4. Click Arrow Buttons
    if (prevBtn) prevBtn.addEventListener('click', () => goToPanel(currentPanelIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToPanel(currentPanelIndex + 1));

    // 5. Click Nav Bar Links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const panelIdx = parseInt(this.getAttribute('data-panel-index'), 10);
            if (!isNaN(panelIdx)) {
                goToPanel(panelIdx);
            }
        });
    });

    // Expose for external calls
    window.goToPanel = goToPanel;
}

// Mobile Navbar Toggle
function initializeNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }
}

// Project Filtering in Panel 3
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-item');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => {
                b.classList.remove('bg-white', 'text-black', 'font-semibold');
                b.classList.add('bg-zinc-800/80', 'text-zinc-400', 'hover:text-white');
            });

            this.classList.remove('bg-zinc-800/80', 'text-zinc-400', 'hover:text-white');
            this.classList.add('bg-white', 'text-black', 'font-semibold');

            const category = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category || (cardCat && cardCat.includes(category))) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Copy Helper
function copyToClipboard(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied: ${text}`);
        if (btnElement) {
            const originalText = btnElement.innerHTML;
            btnElement.innerHTML = `<i class="fa-solid fa-check text-emerald-400"></i> Copied`;
            setTimeout(() => {
                btnElement.innerHTML = originalText;
            }, 2000);
        }
    }).catch(() => {
        showToast('Failed to copy');
    });
}

// Toast
function showToast(message) {
    const existing = document.querySelectorAll('.app-toast');
    existing.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'app-toast fixed bottom-20 right-6 z-50 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-200 shadow-2xl flex items-center gap-2';
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Contact Form
function initializeForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('contact-name')?.value || '';
        const email = document.getElementById('contact-email')?.value || '';
        const message = document.getElementById('contact-message')?.value || '';

        if (!name || !email || !message) {
            showToast('Please complete all required fields');
            return;
        }

        const waText = `Hi Ayoola,\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
        const waUrl = `https://wa.me/2348169787869?text=${encodeURIComponent(waText)}`;
        
        showToast('Redirecting to WhatsApp...');
        setTimeout(() => {
            window.open(waUrl, '_blank');
        }, 600);
    });
}
