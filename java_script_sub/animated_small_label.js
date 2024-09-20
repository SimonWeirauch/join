/**
 * Showing a confirmation-message (add, delete, edit)
 * @param {string} message - message-text
 * @param {string} imgSrc - path of an image which should be displayed
 */
async function smallAnimatedLabel(message, imgSrc) {
    const timeout = 500;
    setTimeout(() => {
        const overlay = document.createElement("div");
        setOverlay(message, imgSrc, overlay);
        setTimeout(() => {
            overlay.style.right = "20vw";
        }, 10);
        if (window.innerWidth <= 450) {
            renderSmallScreen(overlay);
        } else {
            renderBigScreen(overlay);
        }
    }, timeout);
}


/**
 * styles the overlay to be shown at either a small or a big screen
 * @param {string} message - message-text
 * @param {string} imgSrc - path of an image which should be displayed
 */
function setOverlay(message, imgSrc, overlay){
    overlay.classList.add("small-overlay");
    overlay.appendChild(document.createTextNode(message));
    if (imgSrc) {
        const img = document.createElement("img");
        img.src = imgSrc;
        overlay.appendChild(img);
    }
    overlay.style.position = "fixed";
    overlay.style.right = "-50vw";
    overlay.style.gap = "10px";
    overlay.style.transition = "all 0.3s ease-in-out";
    overlay.style.zIndex = "9999";
    document.body.appendChild(overlay);
}


/**
 * styles the overlay div to be shown at a small screen
 * @param {HTML-Element} overlay 
 */
function renderSmallScreen(overlay){
    setTimeout(() => {
        overlay.style.right = "-100vw";
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 2000);
    }, 2000);
}


/**
 * styles the overlay div to be shown at a big screen
 * @param {HTML-Element} overlay 
 */
function renderBigScreen(overlay){
    setTimeout(() => {
        overlay.style.right = "-50vw";
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 2000);
    }, 2000);
}