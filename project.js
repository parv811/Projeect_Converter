let main = document.getElementById('main');
let menuButton = document.getElementById('menuButton'); //get id of menu button
let themeButton = document.getElementById('themeButton'); //get id of theme/moon type button
var menuButtonState = 0;  //No display menu default
var themeButtonState = 0; //Default light mode
let root = document.querySelector(':root'); // selects html root element

//To hide and display the menu
menuButton.addEventListener('click',()=>{
    if(menuButtonState == 0) 
    {
        menu.style.display = "block";
        menuButtonState = 1;
    }
    else
    {
        menu.style.display = "none";
        menuButtonState = 0;
    }
})

//To change the page theme to light or dark mode
themeButton.addEventListener('click',()=>{
    if(themeButtonState == 0)
    {
        root.style.setProperty('--fontcolorblack','white');
        root.style.setProperty('--fontcolorwhite','black');
        root.style.setProperty('--fontcolorbluish','grey');
        root.style.setProperty('--bgcolorwhite','black');
        root.style.setProperty('--bgcolorbluish','grey');
        root.style.setProperty('--bgcolorf0f0f0','#CBC8C8');
        root.style.setProperty('--bgcolorf9f9f9','#090909');
        root.style.setProperty('--bordercolorwhite','black');
        root.style.setProperty('--boxshadowcolorreddish','rgba(254, 218, 241, 0.8)');
        root.style.setProperty('--boxshadowcolorblack','rgba(255, 255, 255, 0.3)');
        root.style.setProperty('--boxshadowcolorfadeblack','rgba(255, 255, 255, 0.1)'); 
        
        themeButtonState = 1;
    }
    else
    {
        root.style.setProperty('--fontcolorblack','black');
        root.style.setProperty('--fontcolorwhite','white');
        root.style.setProperty('--fontcolorbluish','lightsteelblue');
        root.style.setProperty('--bgcolorwhite','white');
        root.style.setProperty('--bgcolorbluish','lightsteelblue');
        root.style.setProperty('--bgcolorf0f0f0','#f0f0f0');
        root.style.setProperty('--bgcolor090909','#f9f9f9');
        root.style.setProperty('--bordercolorwhite','white');
        root.style.setProperty('--boxshadowcolorreddish','rgba(255, 0, 0, 0.1)');
        root.style.setProperty('--boxshadowcolorblack','rgba(0, 0, 0, 0.3)');
        root.style.setProperty('--boxshadowcolorfadewhite','rgba(0, 0, 0, 0.1)'); 
        
        themeButtonState = 0
    }
})

