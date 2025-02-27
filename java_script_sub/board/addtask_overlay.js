/**
 * Function to open the Add-Task-Dialog
 */
async function openAddTaskOverlay() {
    resetArrays();
    await taskContainerRenderHTML('add', 'Add');
    let overlayBg = elementByID("overlay-bg-addTask");
    let overlayContent = elementByID("overlay-content-addTask");
    overlayContent.classList.remove("slideOut");
    overlayBg.classList.add("d-flex");
    overlayBg.classList.remove("d-none");
    overlayContent.classList.add("slide-in");
    overlayContent.style.right = "0";
    preselectMediumPriority();
    overlayContent.addEventListener("animationend", onAnimationEnd);
    function onAnimationEnd() {
        overlayContent.removeEventListener("animationend", onAnimationEnd);
        overlayBg.classList.remove("d-none");        
    }    
}


/**
 * preselects Medium Radiobutton as default
 */
function preselectMediumPriority(){
    document.getElementById('frame25').classList.add('frame25_selected');
    selectedRadioButton('Medium', 'frame25');
}


/**
 * Function to close the Add-Task-Dialog
 */
async function closeAddTaskOverlay() {
    resetForm();
    let overlayBg = elementByID("overlay-bg-addTask");
    let overlayContent = elementByID("overlay-content-addTask");
    overlayContent.classList.add("slideOut");    
    overlayContent.addEventListener("animationend", onAnimationEnd);
    function onAnimationEnd() {
        overlayContent.removeEventListener("animationend", onAnimationEnd);
        overlayBg.classList.remove("d-flex");
        overlayBg.classList.add("d-none");
        overlayContent.classList.remove("slideOut");
        document.getElementById('taskContainer').innerHTML = '';
    }
}
