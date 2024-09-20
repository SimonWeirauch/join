let selectedContact = null;

/**
 * This function shows the contact informations when click on a contact in the register
 * 
 * @param {number} ID - This is the ID from the specific contact
 */
function showContact(ID) {
    if (window.innerWidth <= 1200) {
        elementByID('contact_register').classList.add('d-none');
    }
    let name = getIndexOfJson('ID', ID)['contact_name'];
    let mail = getIndexOfJson('ID', ID)['contact_mail'];
    let phone = getIndexOfJson('ID', ID)['contact_phone'];
    let initials = getIndexOfJson('ID', ID)['contact_initials'];
    let color = getIndexOfJson('ID', ID)['contact_color'];
    document.querySelectorAll('.contact-info').forEach(contactElement => {
        contactElement.classList.remove('active');
    });
    displayDetails(name, mail, phone, initials, color, ID)
    addStylingToElement(name, mail, phone, initials, color, ID);
}


/**
 * add CSS styling to the element show_contact
 * @param {String} name contact name
 * @param {String} mail contact mail
 * @param {Integer} phone contact phone number
 * @param {String} initials contact initials
 * @param {String} color contact color
 * @param {Integer} ID contact ID
 */
function addStylingToElement(name, mail, phone, initials, color, ID){
    elementByID('show_contact').style.right = '-65vw';
    setTimeout(function (name, mail, phone, initials, color, ID) {
        elementByID('show_contact').style.right = '0';
        elementByID('show_contact').innerHTML = "";
        elementByID('show_contact').innerHTML += showContact_html(name, mail, phone, initials, color, ID);
    }, 200, name, mail, phone, initials, color, ID);
}


/**
 * displays the contact details
 * @param {String} name contact name
 * @param {String} mail contact mail
 * @param {Integer} phone contact phone number
 * @param {String} initials contact initials
 * @param {String} color contact color
 * @param {Integer} ID contact ID
 */
function displayDetails(name, mail, phone, initials, color, ID){
    let selectedContactElement = document.querySelector(`[data-contact-id="contactID_${ID}"]`);
    selectedContactElement.classList.add('active');
    selectedContact = {
        name,
        mail,
        phone,
        initials,
        color,
        ID
    };
}


/**
 * Gets the ID of the last object in the JSON-Array
 * @returns 
 */
function getLastJsonObjectID() {
    let lastEntry = contacts[contacts.length - 1];
    let lastEntryID = lastEntry['register_entry'][0]['contact_ID']
    return lastEntryID;
}


/**
 * Return to register - Responsive
 */
function returnToRegister() {
    let show = elementByID('show_contact')
    show.style.right = '-100vw';
    setTimeout(() => {
        elementByID('contact_register').classList.remove('d-none');
    }, 200);
}