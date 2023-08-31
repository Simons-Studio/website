
let topBar = document.getElementById('topbar');
let sticky = topBar.offsetTop;

function positionHeader() {
    
    if (window.scrollY > sticky + topBar.clientHeight) {
        console.log(sticky);
        topBar.classList.add('nav-bar-attach-bottom');
        // topBar.classList.remove('nav-bar-attach-top');
    } else {
        topBar.classList.remove('nav-bar-attach-bottom');
        // topBar.classList.add('nav-bar-attach-top');
    }
}

window.onscroll = function() {positionHeader();}