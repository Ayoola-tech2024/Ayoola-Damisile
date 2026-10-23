// Ayoola Damisile - Professional Multi-Page Portfolio Engine (v7.1)

document.addEventListener('DOMContentLoaded', function () {
    initializeTheme();
    initializeCommandPalette();
    initializeMobileActionSheet();
    initializeNavigation();
    initializeProjectFilters();
    initializeForm();
});

// Shared helpers
function isInternalTarget(target) {
    return target.charAt(0) === '/' || !/^[a-z][a-z0-9+.-]*:/i.test(target);
}

function navigateTo(target) {
    if (isInternalTarget(target)) {
        window.location.href = target;
    } else {
        const win = window.open(target, '_blank', 'noopener');
        if (win) win.opener = null;
    }
}

function scrollToTarget(selector) {
    let targetEl = null;
    try {
        targetEl = document.querySelector(selector);
    } catch (err) {
        return false;
    }
    if (!targetEl) return false;
    const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: offsetTop, behavior: reduceMotion ? 'auto' : 'smooth' });
    return true;
}

function safeStorageGet(key) {
    try { return localStorage.getItem(key); } catch (err) { return null; }
}

function safeStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (err) { /* storage unavailable (private mode) */ }
}

// 1. Dark / Light Mode Theme Toggle Engine
// The initial theme is applied by a tiny inline script in <head> to avoid a flash
// of the wrong theme; this keeps it in sync and wires up the toggle buttons.
function initializeTheme() {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const storedTheme = safeStorageGet('theme');

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
                safeStorageSet('theme', 'light');
            } else {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
                safeStorageSet('theme', 'dark');
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

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
        btn.setAttribute('aria-pressed', isDark ? 'false' : 'true');
    });

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute('content', isDark ? '#08080a' : '#ffffff');
}

// 2. Spotlight Search / Command Palette (Cmd+K / Ctrl+K)
function initializeCommandPalette() {
    const paletteOverlay = document.getElementById('cmd-palette-overlay');
    const paletteInput = document.getElementById('cmd-palette-input');
    const paletteList = document.getElementById('cmd-palette-list');
    const triggerBtns = document.querySelectorAll('.cmd-palette-trigger');

    if (!paletteOverlay || !paletteInput || !paletteList) return;

    let lastFocused = null;

    function openPalette() {
        if (window.innerWidth < 768) {
            openMobileSheet();
            return;
        }

        lastFocused = document.activeElement;
        paletteOverlay.classList.remove('hidden');
        paletteOverlay.classList.add('flex');
        paletteInput.value = '';
        filterItems('');
        setTimeout(() => paletteInput.focus(), 50);
    }

    function closePalette() {
        paletteOverlay.classList.add('hidden');
        paletteOverlay.classList.remove('flex');
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    window.addEventListener('keydown', function (e) {
        if ((e.metaKey || e.ctrlKey) && e.key && e.key.toLowerCase() === 'k') {
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
        if (e.key === 'Enter' && document.activeElement === paletteInput) {
            const firstVisible = Array.prototype.find.call(
                paletteList.querySelectorAll('.cmd-item'),
                item => item.style.display !== 'none'
            );
            if (firstVisible) firstVisible.click();
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
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        item.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            const target = this.getAttribute('data-target');

            closePalette();

            if (action === 'scroll' && target) {
                scrollToTarget(target);
            } else if (action === 'copy' && target) {
                copyToClipboard(target);
            } else if (action === 'link' && target) {
                navigateTo(target);
            }
        });
    });
}

// 3. Mobile Touch Quick-Action Bottom Drawer
function openMobileSheet() {
    const mobileSheet = document.getElementById('mobile-action-sheet');
    const mobileBackdrop = document.getElementById('mobile-sheet-backdrop');
    if (!mobileSheet) return;

    mobileSheet.classList.remove('translate-y-full');
    mobileSheet.setAttribute('aria-hidden', 'false');
    if (mobileBackdrop) mobileBackdrop.classList.remove('hidden');
}

function closeMobileSheet() {
    const mobileSheet = document.getElementById('mobile-action-sheet');
    const mobileBackdrop = document.getElementById('mobile-sheet-backdrop');
    if (!mobileSheet) return;

    mobileSheet.classList.add('translate-y-full');
    mobileSheet.setAttribute('aria-hidden', 'true');
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
                    navigateTo(target);
                } else if (action === 'scroll' && target) {
                    scrollToTarget(target);
                }
            });
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMobileSheet();
    });

    window.openMobileSheet = openMobileSheet;
    window.closeMobileSheet = closeMobileSheet;
}

// 4. Mobile Menu & Navigation
function initializeNavigation() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileBtn && mobileMenu) {
        const setMenuState = function (open) {
            mobileMenu.classList.toggle('hidden', !open);
            mobileBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
            mobileBtn.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
            const icon = mobileBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !open);
                icon.classList.toggle('fa-xmark', open);
            }
        };

        mobileBtn.addEventListener('click', function () {
            setMenuState(mobileMenu.classList.contains('hidden'));
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenuState(false));
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                setMenuState(false);
                mobileBtn.focus();
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            if (scrollToTarget(targetId)) {
                e.preventDefault();
                if (history.pushState) history.pushState(null, '', targetId);
            }
        });
    });
}

// 5. Project Filtering on Catalog Page
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-catalog-item');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.setAttribute('aria-pressed', btn.classList.contains('bg-zinc-900') ? 'true' : 'false');

        btn.addEventListener('click', function () {
            filterBtns.forEach(b => {
                b.classList.remove('bg-zinc-900', 'text-white', 'dark:bg-white', 'dark:text-black', 'font-semibold');
                b.classList.add('bg-zinc-100', 'text-zinc-700', 'dark:bg-zinc-800/80', 'dark:text-zinc-400');
                b.setAttribute('aria-pressed', 'false');
            });

            this.classList.remove('bg-zinc-100', 'text-zinc-700', 'dark:bg-zinc-800/80', 'dark:text-zinc-400');
            this.classList.add('bg-zinc-900', 'text-white', 'dark:bg-white', 'dark:text-black', 'font-semibold');
            this.setAttribute('aria-pressed', 'true');

            const category = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Categories are space/comma separated tokens; match whole tokens only
                const cardCats = (card.getAttribute('data-category') || '').toLowerCase().split(/[\s,]+/).filter(Boolean);
                if (category === 'all' || cardCats.indexOf((category || '').toLowerCase()) !== -1) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 6. Copy Helper & Toast
function copyToClipboard(text, btnElement) {
    const onSuccess = () => {
        showToast(`Copied: ${text}`);
        if (btnElement) {
            if (!btnElement.dataset.originalHtml) btnElement.dataset.originalHtml = btnElement.innerHTML;
            btnElement.innerHTML = `<i class="fa-solid fa-check text-emerald-500" aria-hidden="true"></i> Copied`;
            clearTimeout(btnElement._copyTimer);
            btnElement._copyTimer = setTimeout(() => {
                btnElement.innerHTML = btnElement.dataset.originalHtml;
                delete btnElement.dataset.originalHtml;
            }, 2000);
        }
    };

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(onSuccess).catch(() => fallbackCopy(text) ? onSuccess() : showToast('Failed to copy'));
    } else if (fallbackCopy(text)) {
        onSuccess();
    } else {
        showToast('Failed to copy');
    }
}

function fallbackCopy(text) {
    try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
    } catch (err) {
        return false;
    }
}

function showToast(message) {
    const existing = document.querySelectorAll('.app-toast');
    existing.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'app-toast fixed bottom-20 md:bottom-6 right-6 z-50 px-4 py-2.5 rounded-lg dark:bg-zinc-900 bg-white border dark:border-zinc-700 border-zinc-300 text-xs font-mono dark:text-zinc-200 text-zinc-800 shadow-2xl flex items-center gap-2';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');

    const check = document.createElement('span');
    check.setAttribute('aria-hidden', 'true');
    check.textContent = '✓';
    const text = document.createElement('span');
    text.textContent = message;
    toast.appendChild(check);
    toast.appendChild(text);
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

        const name = (document.getElementById('contact-name')?.value || '').trim();
        const email = (document.getElementById('contact-email')?.value || '').trim();
        const subject = (document.getElementById('contact-subject')?.value || '').trim() || 'Portfolio Inquiry';
        const message = (document.getElementById('contact-message')?.value || '').trim();

        if (!name || !email || !message) {
            showToast('Please complete all required fields');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast('Please enter a valid email address');
            return;
        }

        const waText = `Hi Ayoola,\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
        const waUrl = `https://wa.me/2348169787869?text=${encodeURIComponent(waText)}`;

        showToast('Redirecting to WhatsApp...');
        // Open synchronously inside the submit handler so pop-up blockers allow it
        const win = window.open(waUrl, '_blank', 'noopener');
        if (!win) window.location.href = waUrl;
    });
}

// Expose helpers used by inline onclick handlers
window.copyToClipboard = copyToClipboard;
