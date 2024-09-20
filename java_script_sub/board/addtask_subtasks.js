/**
* Generate HTML to added Subtask
* @param {number} i - number of subtask
* @returns 
*/
function addSubtaskHTML(i) {
  return /*html*/ `
    <li class="pointer" ondblclick="editSubtask(${i})">
      <div>&bull; 
        ${newSubtasks[i].subtitle}
      </div>      
      <div class="subtaskActionPanel">
        <img onclick="editSubtask(${i})" class="pointer button-hover" src="../assets/img/board/edit.svg">
        <img class="subtask-vector" src="../assets/img/add-task/vector_dark.png">
        <img onclick="deleteSubtask(${i})" class="pointer button-hover" src="../assets/img/board/delete.svg">
      </div>
    </li>
    `;
}
  
  
/**
 * Add new Subtasks from input
 * @returns
 */
async function addnewSubtask() {
  let subtitleValue = document.getElementById('frame14_subtask_text').value;
  if (!subtitleValue) {return;}
  hideEditSubtask();
  let nextSubId = await getNextFreeId(newSubtasks, 'subid');
  if (newSubtasks.length < 25) {
    createSubtask(nextSubId, subtitleValue)
  } else {
    document.getElementById('frame14_subtask').classList.add('error');
    document.getElementById('frame14_subtask_label').classList.remove('d-none');
  }
  subtaskActions();
}


/**
 * adds a new subtask
 * @param {integer} nextSubId give the next subtask id to the element
 */
function createSubtask(nextSubId, subtitleValue){
    let newSubtask = {
        subid: nextSubId,
        subtitle: subtitleValue,
        substatus: 'open',
      };
      newSubtasks.push(newSubtask);
      document.getElementById('frame14_subtask_text').value = '';
      addSubtask();
}


/**
* Delete subtask from array
* @param {number} id - id of subtask in array
*/
  function deleteSubtask(id) {
    document.getElementById('frame14_subtask_label').classList.add('d-none');
    document.getElementById('frame14_subtask').classList.remove('error');
    newSubtasks.splice(id, 1);
    addSubtask();
    hideEditSubtask();
}
  

/**
* Edit subtask on input
* @param {number} id - id of subtask in array
*/
  function editSubtask(id) {
    let subtaskfield = document.getElementById('subtaskEditInput');
    let subTaskActions = document.getElementById('subtaskEditActions');
    let editField = document.getElementById('subtaskEdit');
    let subtaskArea = document.getElementById('subtaskArea');
    let subtaskList = document.getElementById('subtasklist');
    editField.classList.remove('d-none');
    subtaskfield.value = newSubtasks[id]['subtitle'];
    subTaskActions.innerHTML = '';
    subTaskActions.innerHTML = editSubtaskHTML(id);  
    subtaskArea.scrollTop = 0;
    subtaskfield.focus();
    subtaskList.style.filter = 'blur(2px)';
}
  

/**
 * Generate HTML to edit Subtasks
 * @param {number} id - number of current subtask (active to edit)
 * @returns 
 */
  function editSubtaskHTML(id) {
    return /*html*/ `
       <img onclick="deleteSubtask(${id})" class="pointer button-hover" src="../assets/img/board/delete.svg">
       <img class="subtask-vector" src="../assets/img/add-task/vector.png">
       <img onclick="updateSubtask(${id})" class="pointer button-hover" src="../assets/img/add-task/check_black.svg">
    `;
}
  

/**
 * Update subtask
 * @param {number} id - id of subtask in array
 */
  function updateSubtask(id) {
    newSubtasks[id]['subtitle'] = document.getElementById('subtaskEditInput').value;
    addSubtask();
    hideEditSubtask();
}
  

/**
 * Hiding input-field
 */
  function hideEditSubtask() {
    let subtaskEditInput = document.getElementById('subtaskEditInput');
    let subtaskEdit = document.getElementById('subtaskEdit');
    let subtaskList = document.getElementById('subtasklist');
    subtaskEditInput.value = '';
    subtaskEdit.classList.add('d-none');
    subtaskList.style.filter = 'blur(0px)';
}
  

/**
 * Set empty value on form-field
 * @param {string} field - associated fieldname
 */
function clearInput(field) {
    document.getElementById(field).value = '';
    hideEditSubtask();
    subtaskActions();
}


/**
 * Change style for displaying or not input-fields
 * @param {string} view - parameter which defines the origin of the function
 */
function subtaskActions(view) {
  if (view == 'show') {
    document.getElementById('clearSubtaskInput').classList.remove('d-none');
    document.getElementById('addSubtaskInput').classList.remove('d-none');
    document.getElementById('subtask-vector').classList.remove('d-none');
    document.getElementById('plusSubtaskButton').classList.add('d-none');
  } else {
    document.getElementById('clearSubtaskInput').classList.add('d-none');
    document.getElementById('addSubtaskInput').classList.add('d-none');
    document.getElementById('subtask-vector').classList.add('d-none');
    document.getElementById('plusSubtaskButton').classList.remove('d-none');
  }
}