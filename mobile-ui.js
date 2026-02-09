/**
 * mobile-ui.js
 * Handles mobile sidebar toggling and overlay interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('main-sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    let transitionTimeout;

    if (!mobileMenuBtn || !sidebar || !overlay) {
        console.warn('Mobile UI elements not found');
        return;
    }

    function openSidebar() {
        clearTimeout(transitionTimeout);
        sidebar.classList.remove('-translate-x-full');
        overlay.classList.remove('hidden');
        // Force reflow
        void overlay.offsetWidth;
        overlay.classList.remove('opacity-0');
        overlay.classList.add('opacity-100');
        
        // Ensure sidebar is on top of everything (z-index fix)
        sidebar.style.zIndex = '100';
        overlay.style.zIndex = '90';
        
        // Lock body scroll
        document.body.classList.add('overflow-hidden');
    }

    function closeSidebar() {
        clearTimeout(transitionTimeout);
        sidebar.classList.add('-translate-x-full');
        overlay.classList.remove('opacity-100');
        overlay.classList.add('opacity-0');
        
        transitionTimeout = setTimeout(() => {
            overlay.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 300); // Match CSS transition duration
    }

    function toggleSidebar() {
        const isClosed = sidebar.classList.contains('-translate-x-full');
        if (isClosed) {
            openSidebar();
        } else {
            closeSidebar();
        }
    }

    // Event Listeners
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
    });

    overlay.addEventListener('click', closeSidebar);

    // Close sidebar on window resize if moving to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            if (!sidebar.classList.contains('-translate-x-full')) {
                closeSidebar();
            }
        }
    });

    // Close Button Logic
    const closeBtn = document.getElementById('sidebar-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }
});
