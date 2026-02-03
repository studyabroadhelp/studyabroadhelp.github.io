/* =========================================
  1. DRAGGABLE WHATSAPP BUTTON LOGIC
  =========================================
*/
const whatsappBtn = document.getElementById('whatsappBtn');

if (whatsappBtn) {
    let isDragging = false;
    let offsetX, offsetY;

    whatsappBtn.addEventListener('mousedown', startDrag);
    whatsappBtn.addEventListener('touchstart', startDrag, { passive: false });

    function startDrag(e) {
        isDragging = true;
        const rect = whatsappBtn.getBoundingClientRect();

        if (e.type === 'touchstart') {
            offsetX = e.touches[0].clientX - rect.left;
            offsetY = e.touches[0].clientY - rect.top;
        } else {
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
        }

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchmove', drag, { passive: false });
        document.addEventListener('touchend', stopDrag);
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();

        let clientX, clientY;
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        let left = clientX - offsetX;
        let top = clientY - offsetY;

        // Boundary checks to keep button inside screen
        const maxLeft = window.innerWidth - whatsappBtn.offsetWidth;
        const maxTop = window.innerHeight - whatsappBtn.offsetHeight;

        left = Math.max(0, Math.min(left, maxLeft));
        top = Math.max(0, Math.min(top, maxTop));

        whatsappBtn.style.left = left + 'px';
        whatsappBtn.style.top = top + 'px';
        whatsappBtn.style.right = 'auto';
        whatsappBtn.style.bottom = 'auto';
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('touchend', stopDrag);
    }
}

/* =========================================
  2. ELIGIBILITY & FORM LOGIC (Index Page Only)
  =========================================
*/
const eligibilityForm = document.getElementById('eligibilityForm');

if (eligibilityForm) {
    const eligibilityResult = document.getElementById('eligibilityResult');
    const applyForm = document.getElementById('applyForm');
    const applyOverlay = document.getElementById('applyOverlay');
    const applyInputs = applyForm.querySelectorAll('input, select, button');
    const lockMsg = document.getElementById('applyLockMsg');

    eligibilityForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const pcb = document.getElementById('pcb').value;
        const percentage = document.getElementById('percentage').value;
        const neet = document.getElementById('neet').value;
        const passport = document.getElementById('passport').value;

        if (pcb === 'yes' && (percentage === '50' || percentage === '40') && neet === 'yes' && passport === 'yes') {
            eligibilityResult.style.display = 'block';
            eligibilityResult.style.color = 'green';
            eligibilityResult.innerHTML = "✅ You are eligible! Application form unlocked.";

            // Unlock Form
            applyInputs.forEach(el => el.disabled = false);
            if (applyOverlay) applyOverlay.style.display = 'none';
            if (lockMsg) lockMsg.style.display = 'none';

            // Scroll to form
            setTimeout(() => {
                document.getElementById('apply').scrollIntoView({ behavior: 'smooth' });
            }, 800);
        } else {
            eligibilityResult.style.display = 'block';
            eligibilityResult.style.color = 'red';
            eligibilityResult.innerHTML = "❌ Based on your answers, you may not meet the current criteria. Contact us for a manual review.";
        }
    });
}
/* =========================================
   3. HAMBURGER MENU TOGGLE
   ========================================= */
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
}

// Close menu when a link is clicked
document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('show');
    });
});
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    
    // Debugging line: Open your phone browser console to see if this triggers
    console.log("Menu button clicked!"); 
    
    if (navLinks) {
        navLinks.classList.toggle('show');
    } else {
        console.error("Error: Could not find the element with ID 'navLinks'");
    }
}
