// Ayoola Damisile - Bento Grid, Theme Switcher & Mobile Action Sheet Engine (v6.0)

document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    initializeCommandPalette();
    initializeMobileActionSheet();
    initializeNavigation();
    initializeScrollReveal();
    initializeForm();
});

// 1. Dark / Light Mode Theme Toggle Engine
function initializeTheme() {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const storedTheme = localStorage.getItem('theme');

    // Default to dark mode if no preference set
    if (storedTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
    }

    updateThemeIcons();

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            if (document.documentElement.classList.contains('dark')) {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
            updateThemeIcons();
        });
    });
}

function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    const themeIcons = document.querySelectorAll('.theme-toggle-icon');

    themeIcons.forEach(icon => {
        if (isDark) {
            icon.className = 'theme-toggle-icon fa-solid fa-sun text-amber-400';
        } else {
            icon.className = 'theme-toggle-icon fa-solid fa-moon text-zinc-700';
        }
    });
}

// 2. Desktop Command Palette (Cmd+K / Ctrl+K)
function initializeCommandPalette() {
    const paletteOverlay = document.getElementById('cmd-palette-overlay');
    const paletteInput = document.getElementById('cmd-palette-input');
    const paletteList = document.getElementById('cmd-palette-list');
    const triggerBtns = document.querySelectorAll('.cmd-palette-trigger');

    if (!paletteOverlay || !paletteInput) return;

    function openPalette() {
        if (window.innerWidth < 768) {
            openMobileSheet();
            return;
        }

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

// 3. Mobile Bottom Action Sheet Drawer
function openMobileSheet() {
    const mobileSheet = document.getElementById('mobile-action-sheet');
    const mobileBackdrop = document.getElementById('mobile-sheet-backdrop');
    if (!mobileSheet) return;

    mobileSheet.classList.remove('translate-y-full');
    if (mobileBackdrop) mobileBackdrop.classList.remove('hidden');
}

function closeMobileSheet() {
    const mobileSheet = document.getElementById('mobile-action-sheet');
    const mobileBackdrop = document.getElementById('mobile-sheet-backdrop');
    if (!mobileSheet) return;

    mobileSheet.classList.add('translate-y-full');
    if (mobileBackdrop) mobileBackdrop.classList.add('hidden');
}

function initializeMobileActionSheet() {
    const mobileSheet = document.getElementById('mobile-action-sheet');
    const mobileBackdrop = document.getElementById('mobile-sheet-backdrop');
    const fabBtn = document.getElementById('mobile-fab-btn');

    if (fabBtn) {
        fabBtn.addEventListener('click', openMobileSheet);
    }

    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', closeMobileSheet);
    }

    let touchStartY = 0;
    if (mobileSheet) {
        mobileSheet.addEventListener('touchstart', function (e) {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        mobileSheet.addEventListener('touchmove', function (e) {
            const touchMoveY = e.touches[0].clientY;
            if (touchMoveY - touchStartY > 60) {
                closeMobileSheet();
            }
        }, { passive: true });

        mobileSheet.querySelectorAll('.mobile-action-tile').forEach(tile => {
            tile.addEventListener('click', function () {
                const action = this.getAttribute('data-action');
                const target = this.getAttribute('data-target');

                closeMobileSheet();

                if (action === 'copy' && target) {
                    copyToClipboard(target);
                } else if (action === 'link' && target) {
                    window.open(target, '_blank');
                } else if (action === 'scroll' && target) {
                    const targetEl = document.querySelector(target);
                    if (targetEl) {
                        const offsetTop = targetEl.offsetTop - 80;
                        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                    }
                }
            });
        });
    }

    window.openMobileSheet = openMobileSheet;
    window.closeMobileSheet = closeMobileSheet;
}

// 4. Navigation
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

// 5. Scroll Reveal Observer
function initializeScrollReveal() {
    const revealEls = document.querySelectorAll('.bento-card');
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

// 6. Copy Helper & Toast
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
    toast.className = 'app-toast fixed bottom-20 md:bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-200 shadow-2xl flex items-center gap-2';
    toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// 7. Contact Form Handler
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
