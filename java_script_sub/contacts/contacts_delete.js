/**
 * This function delete the contact from JSON
 * @param {number} ID - This is the ID from the specific contact
 */
async function deleteContact(ID) {
    const indexToDelete = contacts.findIndex(contact => contact['register_entry'][0]['contact_ID'] === ID);
    if (indexToDelete !== -1) {
        const contactCategory = contacts[indexToDelete]['register_entry'][0]['contact_name'][0].toUpperCase();
        executeDeleteContact(contactCategory, indexToDelete);
        await saveData();
        await loadData();
        styleContactDelete();
        createRegisterEntry();
    } else {console.error('Contact not found for deletion.');}
    smallAnimatedLabel("Contact successfully deleted");
    returnToRegister();
}


/**
 * identifies the contact to delete
 * @param {Array} contactCategory Array of contact categories
 */
function executeDeleteContact(contactCategory, indexToDelete){
    contacts.splice(indexToDelete, 1);
    const categoryContactsExist = contacts.some(contact => {
        const firstLetter = contact['register_entry'][0]['contact_name'][0].toUpperCase();
        return firstLetter === contactCategory;
    });
    if (!categoryContactsExist) {
        const categoryIndex = categories.indexOf(contactCategory);
        if (categoryIndex !== -1) {
            categories.splice(categoryIndex, 1);
        }
    }
}


/**
 * adds styling to the element show_contact
 */
function styleContactDelete(){
    elementByID('show_contact').style.right = '-65vw';
    setTimeout(function () {
        elementByID('show_contact').innerHTML = '';
    }, 200);
}