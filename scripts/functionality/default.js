let topBar = document.getElementById("topbar");
// let sticky = topBar.offsetTop;

// function positionHeader() {
//   if (window.scrollY > sticky + topBar.clientHeight) {
//     console.log(sticky);
//     topBar.classList.add("nav-bar-attach-bottom");
//     // topBar.classList.remove('nav-bar-attach-top');
//   } else {
//     topBar.classList.remove("nav-bar-attach-bottom");
//     // topBar.classList.add('nav-bar-attach-top');
//   }
// }

// window.onscroll = function () {
//   positionHeader();
// };

document
  .getElementById("navigation-menu-input")
  .addEventListener("change", function (e) {
    let expandableNavMenu = document.getElementById("expansion-menu");
    toggleDivExpansion(expandableNavMenu, this.checked);
  });

function toggleDivExpansion(div, checked) {
  let contentHeight = div.scrollHeight;

  if (checked) {
    div.style.visibility = "visible";
    div.style.maxHeight = contentHeight + "px";
  } else {
    div.style.visibility = "hidden";
    div.style.maxHeight = 0 + "px";
  }
}
