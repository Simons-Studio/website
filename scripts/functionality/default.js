let header = document.getElementById("header");
let headerHeight = header.clientHeight;
window.onscroll = () => positionHeader();

function positionHeader() {
  let distBottomHeadertoScreenTop = window.scrollY - headerHeight;
  if (distBottomHeadertoScreenTop > 0 && screen.width < 600) {
    header.classList.add("nav-bar-attach-bottom");
    let headerPeak = min(distBottomHeadertoScreenTop - headerHeight, 0);
    header.style.bottom = headerPeak + "px";
  } else {
    header.classList.remove("nav-bar-attach-bottom");
  }
}

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
