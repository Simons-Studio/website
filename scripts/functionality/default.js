let header = document.getElementById("header");
let headerHeight = header.clientHeight;
window.onscroll = () => positionHeader();

let navigationButton = document.getElementById("navigation-menu-input");
let expandableNavMenu = document.getElementById("expansion-menu");

// TODO: Smooth out menu transition
function positionHeader() {
  let distBottomHeadertoScreenTop = window.scrollY - headerHeight;
  if (distBottomHeadertoScreenTop > 0 && screen.width < 600) {
    if (!header.classList.contains("nav-bar-attach-bottom")) {
      header.classList.add("nav-bar-attach-bottom");
      navigationButton.checked = false;
      expandableNavMenu.style.display = "none";
      toggleDivExpansion(expandableNavMenu, false);
      expandableNavMenu.style.display = "flex";
    }
    let headerPeak = min(distBottomHeadertoScreenTop - headerHeight, 0);
    header.style.bottom = headerPeak + "px";
  } else {
    if (header.classList.contains("nav-bar-attach-bottom")) {
      header.classList.remove("nav-bar-attach-bottom");
      navigationButton.checked = false;
      expandableNavMenu.style.display = "none";
      toggleDivExpansion(expandableNavMenu, false);
      expandableNavMenu.style.display = "flex";
    }
  }
}

navigationButton.addEventListener("change", function (e) {
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
