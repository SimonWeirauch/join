let categories = [];

/**
 * Close Dialogs on Overlay-BG  
 * @param {string} event - event-data
 */
function doNotClose(event) {  
  event.stopPropagation();
}


/**
 * Changing Favicon if Darkmode is true
 */
function detectDarkmode() {
  let isDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;  
  if(isDarkMode)
  {
    let link = document.getElementById('favicon');    
    if(document.documentURI == "https://simon-weirauch.de/join/index.html" ){
    
      link.setAttribute('href', '../join/assets/img/logo_light.png');
    }
    else{
      link.setAttribute('href', '../assets/img/logo_light.png');
    }
  }
}


/**
 * Show infobox if Site is in Landscape-Mode
 */
function checkViewPort() {
  if (screen.availHeight < screen.availWidth) {
    if(screen.availHeight < 440){
      showLandscapeNotification();
    }
  }else{
    location.reload();
  }
}


/**
 * Shows information when turned into landscape mode
 */
function showLandscapeNotification(){
  body = document.body;      
  body.innerHTML = "";
  body.innerHTML = /*html*/`
    <div id="landscape">
     <img id="landscapeImg" src="../assets/img/favicon.png">
     <div id="landscapeText">Sorry! Join is built to be used in portrait mode.</div>
     </div>
   `;
}

window.onresize = checkViewPort;