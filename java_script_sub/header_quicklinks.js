/**
 * opens the quicklink to the next page according to the msg parameter
 * @param {Sring} msg can be "summary", "addtask", "board", "contacts", "privacy", "legal" or "help"
 */
function identifyQuicklink(msg){
    quicklinkSummaryAddTask(msg);
    quicklinkBoardContacts(msg);
    quicklinkLegalHelpPrivacy(msg);
}


/**
 * opens the quicklink to the next page according to the msg parameter
 * @param {Sring} msg can be "summary", "addtask", "board", "contacts", "privacy", "legal" or "help"
 */
function quicklinkSummaryAddTask(msg){
    switch(msg){
        case 'summary':
            addBgToQuicklinks('quickSummary');
            addBgToQuicklinksResp('respQuickSummary');
        break;
        case 'addtask':
            addBgToQuicklinks('quickAddTask');
            addBgToQuicklinksResp('respQuickAddTask');
        break;
        default:
            addBgToQuicklinks('quickSummary');
            addBgToQuicklinksResp('respQuickSummary');
        break;
    }
}


/**
 * opens the quicklink to the next page according to the msg parameter
 * @param {Sring} msg can be "summary", "addtask", "board", "contacts", "privacy", "legal" or "help"
 */
function quicklinkBoardContacts(msg){
    switch(msg){
        case 'board':
            addBgToQuicklinks('quickBoard');
            addBgToQuicklinksResp('respQuickBoard');
        break;
        case 'contacts':
            addBgToQuicklinks('quickContacts');
            addBgToQuicklinksResp('respQuickContacts');
        break;
    }
}


/**
 * opens the quicklink to the next page according to the msg parameter
 * @param {Sring} msg can be "summary", "addtask", "board", "contacts", "privacy", "legal" or "help"
 */
function quicklinkLegalHelpPrivacy(msg){
    switch(msg){
        case 'privacy':
            addBgToQuicklinks('default')
            addBgToQuicklinksResp('default');
        break;
        case 'help':
            addBgToQuicklinks('default')
            addBgToQuicklinksResp('default');
        break;
        case 'legal':
            addBgToQuicklinks('default')
            addBgToQuicklinksResp('default');
        break;
    }
}


/**
 * adds dark blue background for the approrpriate quicklink in desktop view
 * @param {Sring} msg can be "summary", "addtask", "board", "contacts", "privacy", "legal" or "help"
 */
function addBgToQuicklinks(msg){
    document.getElementById('quickSummary').classList.remove('isActiveColor');
    document.getElementById('quickAddTask').classList.remove('isActiveColor');
    document.getElementById('quickBoard').classList.remove('isActiveColor');
    document.getElementById('quickContacts').classList.remove('isActiveColor');
    document.getElementById('quickSummary').classList.add('hoverBG');
    document.getElementById('quickAddTask').classList.add('hoverBG');
    document.getElementById('quickBoard').classList.add('hoverBG');
    document.getElementById('quickContacts').classList.add('hoverBG');
    changeActiveBG(msg);
}


/**
 * adds dark blue background for the approrpriate quicklink in responsive view
 * @param {Sring} msg can be "summary", "addtask", "board", "contacts", "privacy", "legal" or "help"
 */
function addBgToQuicklinksResp(msg){
    document.getElementById('respQuickSummary').classList.remove('isActiveColor');
    document.getElementById('respQuickAddTask').classList.remove('isActiveColor');
    document.getElementById('respQuickBoard').classList.remove('isActiveColor');
    document.getElementById('respQuickContacts').classList.remove('isActiveColor');
    document.getElementById('respQuickSummary').classList.add('hoverBG');
    document.getElementById('respQuickAddTask').classList.add('hoverBG');
    document.getElementById('respQuickBoard').classList.add('hoverBG');
    document.getElementById('respQuickContacts').classList.add('hoverBG');
    changeActiveBGResp(msg);
}


/**
 * adjusts Background color in desktop view
 * @param {Sring} msg can be "quickSummary", "quickAddTask", "quickBoard" or "quickContacts"
 */
function changeActiveBG(msg){
    switch(msg){
        case 'quickSummary':
            document.getElementById(`${msg}`).classList.add('isActiveColor');
            document.getElementById(`${msg}`).classList.remove('hoverBG');
        break;
        case 'quickAddTask':
            document.getElementById(`${msg}`).classList.add('isActiveColor');
            document.getElementById(`${msg}`).classList.remove('hoverBG');
        break;
        default:
            addBGBoardContacts(msg);
        break;  
    }
}


/**
 * adjusts Background color in desktop view
 * @param {Sring} msg can be "quickSummary", "quickAddTask", "quickBoard" or "quickContacts"
 */
function addBGBoardContacts(msg){
    switch(msg){
        case 'quickBoard':
            document.getElementById(`${msg}`).classList.add('isActiveColor');
            document.getElementById(`${msg}`).classList.remove('hoverBG');
        break;
        case 'quickContacts':
            document.getElementById(`${msg}`).classList.add('isActiveColor');
            document.getElementById(`${msg}`).classList.remove('hoverBG');
        break;
        default:
        break;
    }
}


/**
 * adjusts Background color in responsive view
 * @param {Sring} msg can be "respQuickSummary", "respQuickAddTask", "respQuickBoard" or "respQuickContacts"
 */
function changeActiveBGResp(msg){
    switch(msg){
        case 'respQuickSummary':
            document.getElementById(`${msg}`).classList.add('isActiveColor');
            document.getElementById(`${msg}`).classList.remove('hoverBG');
        break;
        case 'respQuickAddTask':
            document.getElementById(`${msg}`).classList.add('isActiveColor');
            document.getElementById(`${msg}`).classList.remove('hoverBG');
        break;
        default:  
            addBGBoardContactsResp(msg);
        break;
    }
}


/**
 * adjusts Background color in desktop view
 * @param {Sring} msg can be "respQuickSummary", "respQuickAddTask", "respQuickBoard" or "respQuickContacts"
 */
function addBGBoardContactsResp(msg){
    switch(msg){
        case 'respQuickBoard':
            document.getElementById(`${msg}`).classList.add('isActiveColor');
            document.getElementById(`${msg}`).classList.remove('hoverBG');
        break;
        case 'respQuickContacts':
            document.getElementById(`${msg}`).classList.add('isActiveColor');
            document.getElementById(`${msg}`).classList.remove('hoverBG');
        break;
        default:
        break;
    }
}