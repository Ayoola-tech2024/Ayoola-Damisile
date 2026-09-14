// Ayoola Damisile (Adams) - Portfolio Main JavaScript Engine (v2.0)

document.addEventListener('DOMContentLoaded', function () {
    initializeTypedEffect();
    initializeTerminal();
    initializeNavigation();
    initializeProjectFilters();
    initializeScrollReveal();
    initializeHireForm();
});

// 1. Typed.js Hero Subtitle
function initializeTypedEffect() {
    const typedTarget = document.getElementById('typed-text');
    if (typedTarget && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Full-Stack Software Engineer',
                'Open-Source Security Author',
                'Biometric & AI Systems Developer',
                'Classical Pianist & Organist'
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2200,
            loop: true,
            showCursor: true,
            cursorChar: '_'
        });
    }
}

// 2. Interactive Terminal Simulator
function initializeTerminal() {
    const termInput = document.getElementById('terminal-input');
    const termBody = document.getElementById('terminal-body');
    const termQuickBtns = document.querySelectorAll('.term-quick-btn');

    if (!termInput || !termBody) return;

    const COMMANDS = {
        'npx fixmcp': `<span class="text-cyan-400 font-semibold">[fixmcp v0.1.0]</span> Model Context Protocol Diagnostic & Auto-Fix Tool
<span class="text-emerald-400">✔</span> Scanning system for Claude Code, Cursor, and Windsurf configurations...
<span class="text-emerald-400">✔</span> Claude Code Config: <span class="text-slate-300">~/.claude.json</span> (Validated)
<span class="text-emerald-400">✔</span> Cursor MCP Schema: <span class="text-slate-300">JSON-RPC 2.0 Endpoint Verified</span>
<span class="text-emerald-400">✔</span> Registered Servers: <span class="text-amber-300">stitch, memory</span>
<span class="text-emerald-400">✔ 0 Errors Detected. All MCP Servers Healthy!</span>
📦 Package: <a href="https://www.npmjs.com/package/fixmcp" target="_blank" class="text-cyan-400 underline hover:text-cyan-300">https://www.npmjs.com/package/fixmcp</a>
🐙 GitHub:  <a href="https://github.com/Ayoola-tech2024/fixmcp" target="_blank" class="text-cyan-400 underline hover:text-cyan-300">https://github.com/Ayoola-tech2024/fixmcp</a>`,

        'npx @damisile_ayoola/envvault': `<span class="text-emerald-400 font-semibold">[@damisile_ayoola/envvault v1.1.0]</span> Encrypted Environment Variable Vault
<span class="text-emerald-400">✔</span> Authenticated Cipher: <span class="text-amber-300">AES-256-GCM</span> (Zero-Dependency)
<span class="text-emerald-400">✔</span> Key Derivation: <span class="text-amber-300">PBKDF2 SHA-512 (100,000 iterations)</span>
<span class="text-emerald-400">✔</span> Pre-Commit Git Hook: Active (0 Plaintext Secrets Leaked)
🔒 Security Status: <span class="text-emerald-400">Vault Secure (.env.vault)</span>
📦 Package: <a href="https://www.npmjs.com/package/@damisile_ayoola/envvault" target="_blank" class="text-emerald-400 underline hover:text-emerald-300">https://www.npmjs.com/package/@damisile_ayoola/envvault</a>
🐙 GitHub:  <a href="https://github.com/Ayoola-tech2024/envvault" target="_blank" class="text-emerald-400 underline hover:text-emerald-300">https://github.com/Ayoola-tech2024/envvault</a>`,

        'cat bio': `<span class="text-amber-400 font-bold">AYOOLA DAMISILE (ADAMS)</span> — Full-Stack Engineer & Product Builder
<span class="text-slate-300">Degree:</span> Business Information Technology @ FUTA
<span class="text-slate-300">Focus:</span> Mission-Critical Systems, Developer Security CLI Tools, Biometrics & AI
<span class="text-slate-300">Location:</span> Nigeria (Available for Global / Remote Full-Time Engineering Roles)
<span class="text-slate-300">Dual Track:</span> Accomplished Classical Pianist & Organist (Bach, Polyphony, Choir Director)`,

        'skills': `<span class="text-cyan-400 font-bold">CORE TECHNICAL COMPETENCIES</span>
<span class="text-amber-400">▸ Security & Tools:</span> AES-256-GCM, PBKDF2 SHA-512, MCP JSON-RPC, Git Pre-Commit Security Hooks
<span class="text-amber-400">▸ Full-Stack & Mobile:</span> Next.js 15 (App Router), TypeScript, React, React Native / Expo, Tailwind CSS, Zustand
<span class="text-amber-400">▸ Cloud & Databases:</span> PostgreSQL, Supabase, InsForge, Cloudinary, IndexedDB (idb), Webhooks
<span class="text-amber-400">▸ AI & Biometrics:</span> MediaPipe 3D FaceMesh, Computer Vision, Telegram/WhatsApp AI Agents`,

        'projects': `<span class="text-cyan-400 font-bold">FEATURED ENGINEERING PROJECTS</span>
1. <span class="text-emerald-400 font-semibold">fixmcp</span> — npm CLI tool for MCP server diagnosis & repair
2. <span class="text-emerald-400 font-semibold">@damisile_ayoola/envvault</span> — AES-256-GCM encrypted .env secret manager
3. <span class="text-emerald-400 font-semibold">checkIn</span> — AI & Facial Recognition Biometric Attendance Portal
4. <span class="text-emerald-400 font-semibold">buysolar.ng</span> — E-Commerce Solar Energy Sizing & Checkout Platform
5. <span class="text-emerald-400 font-semibold">Memodams</span> — Digital Tribute & Memory Book System
6. <span class="text-emerald-400 font-semibold">Paul Hilpert Consultancy</span> — Enterprise Strategic Management Portal`,

        'contact': `<span class="text-emerald-400 font-bold">DIRECT CONTACT CHANNELS</span>
📧 Email:    <a href="mailto:ayooladamisile24@gmail.com" class="text-cyan-400 underline">ayooladamisile24@gmail.com</a>
📱 WhatsApp: <a href="https://wa.me/2348169787869" target="_blank" class="text-cyan-400 underline">+234 816 978 7869</a>
💼 LinkedIn: <a href="https://www.linkedin.com/in/damisile-ayoola-096a7b382" target="_blank" class="text-cyan-400 underline">linkedin.com/in/damisile-ayoola-096a7b382</a>
🐙 GitHub:   <a href="https://github.com/Ayoola-tech2024" target="_blank" class="text-cyan-400 underline">github.com/Ayoola-tech2024</a>
📦 NPM:      <a href="https://www.npmjs.com/~damisile_ayoola" target="_blank" class="text-cyan-400 underline">npmjs.com/~damisile_ayoola</a>`,

        'help': `<span class="text-slate-300 font-bold">AVAILABLE CLI COMMANDS:</span>
  <span class="text-cyan-400">npx fixmcp</span>                  Diagnose & fix MCP server configurations
  <span class="text-emerald-400">npx @damisile_ayoola/envvault</span> Encrypted AES-256 environment vault
  <span class="text-amber-400">cat bio</span>                     Display developer background & focus
  <span class="text-cyan-400">skills</span>                      List technical competencies & architecture
  <span class="text-emerald-400">projects</span>                    Showcase published tools & full-stack apps
  <span class="text-amber-400">contact</span>                     Show direct communication channels
  <span class="text-slate-400">clear</span>                       Clear terminal screen`
    };

    function executeCommand(cmdRaw) {
        const cmd = cmdRaw.trim().toLowerCase();
        if (!cmd) return;

        if (cmd === 'clear') {
            termBody.innerHTML = '';
            termInput.value = '';
            return;
        }

        // Add command prompt line
        const cmdLine = document.createElement('div');
        cmdLine.className = 'mb-1 text-slate-300';
        cmdLine.innerHTML = `<span class="text-emerald-400">ayoola@portfolio</span>:<span class="text-cyan-400">~</span>$ <span class="text-white font-mono font-semibold">${escapeHtml(cmdRaw)}</span>`;
        termBody.appendChild(cmdLine);

        // Add output line
        const outLine = document.createElement('div');
        outLine.className = 'mb-3 font-mono text-xs md:text-sm text-slate-300 leading-relaxed pl-3 border-l-2 border-slate-700';

        // Match command (flexible matching)
        let matchedKey = Object.keys(COMMANDS).find(k => k === cmd || cmd.includes(k) || (k.startsWith('npx') && cmd.includes(k.split(' ')[1])));
        
        if (cmd === 'bio' || cmd === 'about') matchedKey = 'cat bio';

        if (matchedKey && COMMANDS[matchedKey]) {
            outLine.innerHTML = COMMANDS[matchedKey];
        } else {
            outLine.innerHTML = `<span class="text-red-400">command not found: ${escapeHtml(cmdRaw)}</span>. Type <span class="text-cyan-400 font-bold">help</span> to see available commands.`;
        }

        termBody.appendChild(outLine);
        termInput.value = '';
        termBody.scrollTop = termBody.scrollHeight;
    }

    termInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            executeCommand(this.value);
        }
    });

    termQuickBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const cmd = this.getAttribute('data-cmd');
            if (cmd) {
                termInput.value = cmd;
                executeCommand(cmd);
            }
        });
    });
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// 3. One-Click Copy to Clipboard Tool
function copyToClipboard(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied to clipboard: "${text}"`, 'success');
        if (btnElement) {
            const origContent = btnElement.innerHTML;
            btnElement.innerHTML = `<i class="fa-solid fa-check text-emerald-400"></i> Copied!`;
            setTimeout(() => {
                btnElement.innerHTML = origContent;
            }, 2000);
        }
    }).catch(() => {
        showToast('Failed to copy text', 'error');
    });
}

// 4. Toast Notification System
function showToast(message, type = 'info') {
    const existingToasts = document.querySelectorAll('.app-toast');
    existingToasts.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `app-toast fixed bottom-6 right-6 z-50 px-5 py-3 rounded-lg shadow-xl text-xs md:text-sm font-mono font-medium border flex items-center gap-3 transition-all duration-300 ${
        type === 'success' ? 'bg-slate-900 border-emerald-500/60 text-emerald-400 shadow-emerald-950/50' :
        type === 'error' ? 'bg-slate-900 border-red-500/60 text-red-400 shadow-red-950/50' :
        'bg-slate-900 border-cyan-500/60 text-cyan-400 shadow-cyan-950/50'
    }`;
    
    toast.innerHTML = `<span>${type === 'success' ? '✓' : 'ℹ'}</span> <span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        setTimeout(() => toast.remove(), 300);
    }, 2800);
}

// 5. Navigation Scroll & Active Link Tracking
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
                const offsetTop = targetEl.offsetTop - 75;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
}

// 6. Project Filtering System
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-item');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => {
                b.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold', 'border-cyan-400');
                b.classList.add('bg-slate-800/80', 'text-slate-300', 'border-slate-700');
            });

            this.classList.remove('bg-slate-800/80', 'text-slate-300', 'border-slate-700');
            this.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold', 'border-cyan-400');

            const category = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category || (cardCat && cardCat.includes(category))) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 7. Scroll Reveal Observer
function initializeScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-6');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
}

// 8. Hire Form to Direct WhatsApp Formatting
function initializeHireForm() {
    const form = document.getElementById('hire-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('hire-name')?.value || '';
        const email = document.getElementById('hire-email')?.value || '';
        const roleType = document.getElementById('hire-role')?.value || 'Engineering Role / Project';
        const msg = document.getElementById('hire-message')?.value || '';

        if (!name || !email) {
            showToast('Please fill in your name and email.', 'error');
            return;
        }

        const formattedMsg = `Hi Ayoola!
I reached out via your portfolio website.

Name: ${name}
Email: ${email}
Opportunity / Role: ${roleType}
Message: ${msg}`;

        const waUrl = `https://wa.me/2348169787869?text=${encodeURIComponent(formattedMsg)}`;
        showToast('Redirecting to WhatsApp...', 'success');

        setTimeout(() => {
            window.open(waUrl, '_blank');
        }, 800);
    });
}
