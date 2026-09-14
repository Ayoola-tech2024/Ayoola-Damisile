// Ayoola Damisile - Bento Grid & Command Palette Engine (v4.0)

document.addEventListener('DOMContentLoaded', function () {
    initializeCommandPalette();
    initializeNavigation();
    initializeScrollReveal();
    initializeForm();
});

// 1. Command Palette (Cmd+K / Ctrl+K)
function initializeCommandPalette() {
    const paletteOverlay = document.getElementById('cmd-palette-overlay');
    const paletteInput = document.getElementById('cmd-palette-input');
    const paletteList = document.getElementById('cmd-palette-list');
    const triggerBtns = document.querySelectorAll('.cmd-palette-trigger');

    if (!paletteOverlay || !paletteInput) return;

    function openPalette() {
        paletteOverlay.classList.remove('hidden');
        paletteOverlay.classList.add('flex');
        paletteInput.value = '';
        filterItems('');
        setTimeout(() => paletteInput.focus(), 50);
    }

    function closePalette() {
        paletteOverlay.classList.add('hidden');
        paletteOverlay.classList.remove('flex');
    }

    // Toggle with Cmd+K or Ctrl+K or Escape
    window.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (paletteOverlay.classList.contains('hidden')) {
                openPalette();
            } else {
                closePalette();
            }
        }
        if (e.key === 'Escape' && !paletteOverlay.classList.contains('hidden')) {
            closePalette();
        }
    });

    triggerBtns.forEach(btn => btn.addEventListener('click', openPalette));

    paletteOverlay.addEventListener('click', function (e) {
        if (e.target === paletteOverlay) closePalette();
    });

    // Filter Palette List
    paletteInput.addEventListener('input', function () {
        filterItems(this.value.toLowerCase().trim());
    });

    function filterItems(query) {
        const items = paletteList.querySelectorAll('.cmd-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (!query || text.includes(query)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Item Action Handlers
    paletteList.querySelectorAll('.cmd-item').forEach(item => {
        item.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            const target = this.getAttribute('data-target');

            closePalette();

            if (action === 'scroll' && target) {
                const targetEl = document.querySelector(target);
                if (targetEl) {
                    const offsetTop = targetEl.offsetTop - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            } else if (action === 'copy' && target) {
                copyToClipboard(target);
            } else if (action === 'link' && target) {
                window.open(target, '_blank');
            }
        });
    });
}

// 2. Navigation & Mobile Menu
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

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const offsetTop = targetEl.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

// 3. Scroll Reveal Observer
function initializeScrollReveal() {
    const revealEls = document.querySelectorAll('.bento-item');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
}

// 4. Copy Helper & Toast
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

function showToast(message) {
    const existing = document.querySelectorAll('.app-toast');
    existing.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'app-toast fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-200 shadow-2xl flex items-center gap-2';
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// 5. Contact Form Handler
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
