let newSubtasks = [];

/**
 * Init-Functions on load *
 */
async function initAddTasks() {
  await loadTasks();
  await loadTaskCategory();
  await includeHTML();
  adjustQuicklinkBG();
  setDateRange();
  addSubtask();
  await loadData();
  await userSelection('isClosed');
  detectDarkmode();
  eventListener('body');
}


/**
 * Generate list of subtasks
 */
function addSubtask() {
  let list = document.getElementById('subtasklist');
  list.innerHTML = '';
  for (let i = 0; i < newSubtasks.length; i++) {
    list.innerHTML += addSubtaskHTML(i);    
  }
}


/**
 * Sets min and max range for datepicker (from today to one year in the future)
 */
function setDateRange() {
  let no_of_years = 1;
  let year = new Date().getFullYear();
  let maxyear = new Date().getFullYear() + no_of_years;
  let month = ('0' + (new Date().getMonth() + 1)).slice(-2);
  let date = ('0' + new Date().getDate()).slice(-2);
  let today = year + '-' + month + '-' + date;
  let maxdate = maxyear + '-' + month + '-' + date;
  document.getElementById('addtask-duedate').min = today;
  document.getElementById('addtask-duedate').max = maxdate;
  preselectMediumPriority();
}


/**
 * Add and remove style for specified fields
 * @param {string} fieldName - the form-element
 * @param {string} labelField - the associated label
 */
function invalid(fieldName, labelField) {
  document.getElementById(`${fieldName}`).classList.add('error');
  document.getElementById(labelField).classList.remove('d-none');
}


/**
 * Add and remove style for specified fields
 * @param {string} fieldName - the form-element
 * @param {string} labelField - the associated label
 */
function valid(fieldName, labelField) {
  document.getElementById(`${fieldName}`).classList.remove('error');
  document.getElementById(labelField).classList.add('d-none');
}


/**
 * Validates input-fields and start additional functions depending of result
 * @param {string} inputField - form-field
 * @param {string} errorField - the associated label
 * @param {string} labelField - the associated label
 */
function validateField(inputField, errorField, labelField) {
  if (document.getElementById(inputField).value === '') {
    invalid(errorField, labelField);
  } else {
    valid(errorField, labelField);
  }
}


/**
* Hide the menues
*/
function hideMenues() {
  let arrowDropdownCategory = document.getElementById(
    'arrow_dropdown_addCategory',
  );
  let categorySelection = document.getElementById(
    'category_selection-background',
  );
  let arrowDropdownTask = document.getElementById('arrow_dropdown_addTask');
  let userSelection = document.getElementById('user_selection-background');
  arrowDropdownCategory.style.transform = 'rotate(360deg)';
  categorySelection.classList.add('d-none');
  arrowDropdownTask.style.transform = 'rotate(360deg)';
  userSelection.classList.add('d-none');
}


/**
 * Gets the next unused free Id from specified array
 * @param {string} items - array-name
 * @param {string} idKey - id
 * @returns
 */
async function getNextFreeId(items, idKey) {
  if (items.length === 0) {
    return 0;
  }
  let allIds = items.map((item) => item[idKey]);
  let nextFreeId = Math.max(...allIds) + 1;
  return nextFreeId;
}


/**
 * Animation of success and create a new task
 */
async function formSubmit() {
  await smallAnimatedLabel(
    'Task added to board',
    '../assets/img/summary/board.svg',
  );
  setTimeout(addNewTask, 3000);
}


/**
 * Used to get all Form-field values
 */
async function addNewTask() {
  let status = document.getElementById('temporaryStatus').innerHTML;
  let category = document.getElementById('category_select').innerHTML;
  let id = parseInt(await checkExistingTask(), 10);
  let title = document.getElementById('frame14_text').value;
  let description = document.getElementById('frame17_text').value;
  let prio = document.getElementById('prioResult').innerHTML;
  let addTaskSubtasks = newSubtasks;
  let allMember = contactSelection;
  let duedate = document.getElementById('addtask-duedate').value;
  let formattedTaskDate = new Date(duedate).getTime();
  await createTask(id, title, description, status, prio, addTaskSubtasks, allMember,  category, formattedTaskDate);
  await resetForm();
  await identifyGuest();
  openSelectedQuicklink('quickBoard');
}


/**
 * Used to check whether it is a new or an existing task.
 * @returns {number} id - currentTask-Id or new Task-Id
 */
async function checkExistingTask() {
  let id;
  let currentTask = document.getElementById('currentTask').innerText;
  if (currentTask === '') {
    id = await getNextFreeId(tasks, 'id');
  } else {
    id = currentTask;
  }
  return id;
}


/**
 * Used to create a new Task
 * @param {number} id - id of the new task
 * @param {string} title - title of the new task
 * @param {string} description - description of the new task
 * @param {string} status - status of the new task
 * @param {string} prio - prio of the new task
 * @param {string} addTaskSubtasks - subtasks of the new task
 * @param {string} allMember - member of the new task
 * @param {number} category - category of the new task
 * @param {date} formattedTaskDate - Duedate of the new task
 */
async function createTask(id,title,description,status,prio,addTaskSubtasks,
allMember,category,formattedTaskDate,) {
  let newTask = {
    id: id,
    title: title,
    description: description,
    status: status,
    prio: prio,
    subtasks: addTaskSubtasks,
    member: allMember,
    category: category,
    duedate: formattedTaskDate,
  };
  await changeTaskArray(id, newTask);
}


/**
 * Update Task or add new Task
 * @param {number} id - Task-id
 * @param {string} newTask - values of Task
 */
async function changeTaskArray(id, newTask) {
  let indexToUpdate = getTaskIndex(id);
  if (indexToUpdate !== -1) {
    tasks[indexToUpdate] = newTask;
  } else {
    tasks.push(newTask);
  }
  await setItem('tasks', tasks);
}


/**
 * Hide/Unhide the Category-Selection, Transform Arrow-Image and sets Focus
 */
function toggleCategory() {
  let arrowDropdown = document.getElementById('arrow_dropdown_addCategory');
  let categorySelection = document.getElementById(
    'category_selection-background',
  );
  let categorySelect = document.getElementById('category_select');
  if (categorySelection.classList.contains('d-none')) {
    categorySelect.focus();
    arrowDropdown.style.transform = 'rotate(180deg)';
    categorySelection.classList.remove('d-none');
  } else {
    arrowDropdown.style.transform = 'rotate(360deg)';
    categorySelection.classList.add('d-none');
  }
}


/**
 * Hide/Unhide the AssignetTo-Selection, Transform Arrow-Image and sets Focus
 */
function toggleAssignedTo() {
  let arrowDropdown = document.getElementById('arrow_dropdown_addTask');
  let userSelection = document.getElementById('user_selection-background');
  if (userSelection.classList.contains('d-none')) {
    arrowDropdown.style.transform = 'rotate(180deg)';
    userSelection.classList.remove('d-none');
  } else {
    arrowDropdown.style.transform = 'rotate(360deg)';
    userSelection.classList.add('d-none');
  }
}


/**
 * Set Values of your choice in Form
 * @param {number} choice - value of choice
 * @param {string} origin - name of origin where function was called
 */
function setCategory(choice, origin) {
  let categoryName = taskCategory[origin]['title'];
  document.getElementById('category_select_name').value = categoryName;
  document.getElementById('category_select').innerHTML = origin;
  if(!(choice == 'category')){
    toggleCategory();
  }
}


/** Click-Eventlistener to close the menues if you´re outside their containers
 * @param {string} myID - ID which is fired on the Click-Event
 */
function eventListener(myID) {
  let container = document.getElementById(myID);
  container.addEventListener('click', function (event) {
    let menuCategory = document.getElementById('frame74task');
    let menuUser = document.getElementById('frame74');
    let menuUserSelection = document.getElementById('user_selection-background');
    if (menuCategory && menuUserSelection) {
      if (menuCategory.contains(event.target) || menuUser.contains(event.target) 
          || menuUserSelection.contains(event.target)) {
        event.stopPropagation();
      } else {
        hideMenues();
      }
    }
  });
}


/**
 * Find active User in User-List
 */
function whoAmi() {
  for (let i = 0; i < contacts.length; i++) {
    let contactMaillist = contacts[i]['register_entry'][0]['contact_mail'];
    let checkedMaillist = contactMaillist.includes(activeUserMail);
    if (checkedMaillist) {
      contactID = contacts[i]['register_entry'][0]['contact_ID'];
      let userDiv = 'user_name_' + contactID;
      document.getElementById(userDiv).innerHTML += ` <b>(You)`;
    }
  }
}


/**
 * Sets style for Radiobuttons
 * @param {string} prio - task priority
 * @param {string} frameName -Name of HTML-element
 */
function selectedRadioButton(prio, frameName) {
  let frames = ['frame24', 'frame25', 'frame26'];
  let images = { Urgent: 'imgUrgent', Medium: 'imgMedium', Low: 'imgLow' };
  frames.forEach((frame) =>
    document.getElementById(frame).classList.remove(`${frame}_selected`),
  );
  Object.keys(images).forEach(
    (key) =>
      (document.getElementById(
        images[key],
      ).src = `../assets/img/add-task/${key.toLowerCase()}.svg`),
  );
  styleRadioButtons(prio, frameName);
}


/**
* styles the radio buttons
* @param {string} prio - task priority
* @param {string} frameName -Name of HTML-element
*/
function styleRadioButtons(prio, frameName){
  document.getElementById('priority').classList.remove('error');
  document.getElementById('priority_label').classList.add('d-none');
  document.getElementById(prio).checked = true;
  document.getElementById(frameName).classList.add(`${frameName}_selected`);
  document.getElementById(`img${prio}`).src = `../assets/img/add-task/${prio.toLowerCase()}_white.svg`;
  document.getElementById('prioResult').innerHTML = prio;
}