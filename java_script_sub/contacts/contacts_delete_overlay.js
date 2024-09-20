/**
 * This function change the overlay for delete a contact and show the contact informations
 * 
 * @param {number} ID - This is the ID from the specific contact
 */
async function deleteContactOverlay(ID) {
    openContactOverlay();
    let name = getIndexOfJson('ID', ID)['contact_name'];
    let mail = getIndexOfJson('ID', ID)['contact_mail'];
    let phone = getIndexOfJson('ID', ID)['contact_phone'];
    let initials = getIndexOfJson('ID', ID)['contact_initials'];
    let color = getIndexOfJson('ID', ID)['contact_color'];
    displayDeleteTitle();
    displayDeleteInitials(initials, color);
    displayContactDetails(name, mail, phone);
    elementByID("onsubmit").onsubmit = null;
    elementByID("create_btn").innerHTML = "Delete <img src='../assets/img/contacts/check.svg'>";
    executeDelete(ID);
}


/**
 * displays the title of the contact delete overlay
 */
function displayDeleteTitle(){
    elementByID("overlay_title").innerHTML = "Delete contact";
    elementByID("overlay_title_sub").innerHTML = "Are you sure to delete?";
}


/**
 * Displays the initials of the contact
 * @param {String} initials initials of the user
 * @param {String} color Hex-value of the color
 */
function displayDeleteInitials(initials, color){
    elementByID("overlay_initials").classList.remove('person-bg');
    elementByID("overlay_initials").classList.add('contact-headline-initials');
    elementByID("overlay_initials").classList.add('contact-headline-initials-font');
    elementByID("overlay_initials").classList.add('person-bg');
    elementByID("overlay_initials").innerHTML = initials;
    elementByID("overlay_initials").style = `background-color: ${color}`;
}


/**
 * Displays the contact details
 * @param {String} name string of the name
 * @param {String} mail string of the mail
 * @param {Integer} phone phone number
 */
function displayContactDetails(name, mail, phone){
    elementByID("contact_name").value = name;
    elementByID("contact_name").disabled = true;
    elementByID("contact_mail").value = mail;
    elementByID("contact_mail").disabled = true;
    elementByID("contact_phone").value = phone;
    elementByID("contact_phone").disabled = true;
}


/**
 * deletes the contact
 * @param {integer} ID contact-ID
 */
function executeDelete(ID){
    elementByID("create_btn").onclick = async function (event) {
        event.preventDefault();
        deleteContact(ID);
        closeContactOverlay();
    };
}