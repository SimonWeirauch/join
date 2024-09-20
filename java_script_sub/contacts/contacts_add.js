/**
 * This function change the overlay for add contact and go to create contact
 */
function addContact() {
    openContactOverlay();
    elementByID("contact_phone").oninput = function () {
        validatePhoneNumberInput(this, elementByID("errorMsg"));
    };
    addTitle();
    elementByID("create_btn").innerHTML = "Create contact <img src='../assets/img/contacts/check.svg'>";
    styleAddInitials();
    clearInputs();
    if (window.location.href.includes("contacts.html?msg=contacts")) {
        createContactFromContacts();
    } else {
        createContactFromBoard();
    }
}


/**
 * creates a contact from contacts site
 */
function createContactFromContacts(){
    elementByID("onsubmit").onsubmit = function (event) {
        event.preventDefault();
        if (!validatePhoneNumber(elementByID("contact_phone").value, elementByID("errorMsg"))) {
            return;
        }
        createContact();
        return false;
    };
}


/**
 * creates a contact from board site
 */
function createContactFromBoard(){
    elementByID("onsubmit").onsubmit = function (event) {
        event.preventDefault();
        if (!validatePhoneNumber(elementByID("contact_phone").value, elementByID("errorMsg"))) {
            return;
        }
        createContactLight();
        return false;
    };
}


/**
 * clears input fields
 */
function clearInputs(){
    elementByID("contact_name").value = "";
    elementByID("contact_mail").value = "";
    elementByID("contact_phone").value = "";
}


/**
 * styles the initials
 */
function styleAddInitials(){
    elementByID("overlay_initials").classList.add('person-bg');
    elementByID("overlay_initials").src = ('../assets/img/contacts/no_person.png');
    elementByID("overlay_initials").classList.remove('contact-headline-initials');
    elementByID("overlay_initials").classList.remove('contact-headline-initials-font');
}


/**
 * adds title on add contact overlay
 */
function addTitle(){
    elementByID("overlay_title").innerHTML = "Add contact";
    elementByID("overlay_title_sub").innerHTML = "Tasks are better with a team!";
}