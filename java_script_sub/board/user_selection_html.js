/**
 * creates the user selection in the board
 * @param {String} name contact name
 * @param {String} initials contact initials
 * @param {String} color color hexcode
 * @param {Integer} ID contact ID
 * @returns HTML-Element
 */
function user_select_html(name, initials, color, ID) {
    return `
    <div id="user_element_${ID}" onclick="createBadge(${ID})" class="flex user">
        <div class="user-left">
            <div class="user-initials circle" style="background-color: ${color};">
                <div class="inner-circle">
                    ${initials}
                </div>
            </div>
            <div id="user_name_${ID}" class="user-name">${name}</div>
        </div>
        <div>
            <img class="user-checkbox" id="img_unchecked_${ID}" src="../assets/img/login/checkbox_unchecked.png">
            <img class="user-checkbox d-none" id="img_checked_${ID}" src="../assets/img/add-task/checkbox_checked_white.svg">
        </div>
    </div>
    `
}


/**
 * creates the user selection in the board
 * @param {String} selection selected user
 * @param {String} initials contact initials
 * @returns HTML-Element
 */
function user_selectedUser_html(selection, initials) {
    return `
        <div class="circle" id="user_inital_${selection}">
            <div class="inner-circle">
                ${initials}
            </div>
        </div>
        `
}


/**
 * creates the add contact button to the user selection
 * @returns HTML-Element
 */
function userSelection_addContact_button() {
    return `
    <div class="add-contact-button-area">
        <div onclick="addContact()" class="pointer add-contact-button w-100">
            <span>Add new contact</span>
            <img src="../assets/img/contacts/person_add.svg">
        </div>
    </div>
    `
}