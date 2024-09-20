/**
 * This function changes the overlay for edit contact and show the contact informations
 * @param {number} ID - This is the ID from the specific contact
 */
async function editContact(ID) {
    openContactOverlay();
    let pos = getIndexOfJson('ID', ID);
    let name = getIndexOfJson('ID', ID)['contact_name'];
    let mail = getIndexOfJson('ID', ID)['contact_mail'];
    let phone = getIndexOfJson('ID', ID)['contact_phone'];
    let initials = getIndexOfJson('ID', ID)['contact_initials'];
    let color = getIndexOfJson('ID', ID)['contact_color'];
    phoneValidation();
    displayEditTitle();
    displayContactDetailsEdit(name, mail, phone);
    displayEditInitials(initials, color);
    executeEdit(pos, ID)
}


/**
 * displays the title of the contact edit overlay
 */
function displayEditTitle(){
    elementByID("overlay_title").innerHTML = "";
    elementByID("overlay_title").innerHTML = "Edit contact";
}


/**
 * Displays the contact details
 * @param {String} name string of the name
 * @param {String} mail string of the mail
 * @param {Integer} phone phone number
 */
function displayContactDetailsEdit(name, mail, phone){
    elementByID("contact_name").value = name;
    elementByID("contact_mail").value = mail;
    elementByID("contact_phone").value = phone;
}


/**
 * styles the initials element
 * @param {String} initials initials of the user
 * @param {String} color Hex-value of the color
 */
function displayEditInitials(initials, color){
    elementByID("overlay_initials").classList.remove('person-bg');
    elementByID("overlay_initials").classList.add('contact-headline-initials');
    elementByID("overlay_initials").classList.add('contact-headline-initials-font');
    elementByID("overlay_initials").classList.add('person-bg');
    elementByID("overlay_initials").innerHTML = initials;
    elementByID("overlay_initials").style = `background-color: ${color}`;
}


/**
 * checks phone number vaildation
 */
function phoneValidation(){
    elementByID("contact_phone").oninput = function () {
        validatePhoneNumberInput(this, elementByID("errorMsg"));
    };
}


/**
 * edits contact
 * @param {number} pos index of the contact in contacts array
 * @param {integer} ID contact-ID
 */
function executeEdit(pos, ID){
    elementByID("onsubmit").onsubmit = null;
    elementByID("create_btn").innerHTML = "Save <img src='../assets/img/contacts/check.svg'>";
    elementByID("onsubmit").onsubmit = function (event) {
        event.preventDefault();
        if (!validatePhoneNumber(elementByID("contact_phone").value, elementByID("errorMsg"))) {
            return;
        }
        changeContactData(pos, ID);
    };
}


/**
 * This function set and check the validate for the phone number input
 * @param {string} inputElement - the input element
 * @param {string} errorMsgElement - the warn message element
 */
function validatePhoneNumberInput(inputElement, errorMsgElement) {
    inputElement.value = inputElement.value.replace(/\D/g, "");
    if (inputElement.value.length < 7) {
        errorMsgElement.innerHTML = "The phone number must have at least 7 numbers";
    } else {
        errorMsgElement.innerHTML = "";
    }
}


/**
 * This function check the validate for the phone number
 * @param {number} phoneNumber - the phone number from phone input
 * @param {string} errorMsgElement - the warn message element
 * @returns 
 */
function validatePhoneNumber(phoneNumber, errorMsgElement) {
    if (phoneNumber.length < 7) {
        errorMsgElement.innerHTML = "The phone number must have at least 7 numbers";
        return false;
    }
    errorMsgElement.innerHTML = "";
    return true;
}


/**
 * This function will change und save the contact in JSON structure
 * @param {number} pos - This is the index of the contact
 * @param {number} ID - This is the ID from the specific contact
 * @returns - nothing
 */
async function changeContactData(pos, ID) {
    let nameIsValid = checkName();
    let mailIsValid = checkMail(ID);
    if (!nameIsValid || !mailIsValid) {return;}
    pos['contact_name'] = contact_name.value;
    pos['contact_mail'] = contact_mail.value;
    pos['contact_phone'] = contact_phone.value;
    pos['contact_initials'] = getContactFirstLetters();
    await saveData();
    await loadData();
    createRegisterEntry();
    showContact(ID);
    emailAddresses = [];
    closeContactOverlay();
    smallAnimatedLabel("Contact succesfully edited");
}
