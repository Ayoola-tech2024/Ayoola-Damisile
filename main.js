// Ayoola Damisile - Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeProjectFilters();
    initializeForm();
});

// 1. Navigation & Mobile Menu
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

    // Smooth scroll for anchor links
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

// 2. Project Filtering
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

// 3. One-Click Copy Helper
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

// 4. Toast Notification
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
