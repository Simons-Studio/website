let header = document.getElementById("header");
let headerHeight = header.clientHeight;
window.onscroll = () => positionHeader();

let navigationButton = document.getElementById("navigation-menu-input");
let expandableNavMenu = document.getElementById("expansion-menu");

function positionHeader() {
  // TODO: move this check elsewhere; in fact this might not be needed
  if (screen.width < 600) {
    let distBottomHeadertoScreenTop = window.scrollY - headerHeight;
    if (distBottomHeadertoScreenTop > 0) {
      // Determine if vertical menu transition occurs
      if (!header.classList.contains("nav-bar-attach-bottom")) {
        header.classList.add("nav-bar-attach-bottom");
        navigationButton.checked = false;
        expandableNavMenu.style.display = "none";
        toggleDivExpansion(expandableNavMenu, false);
        expandableNavMenu.style.display = "flex";
      }
      // slide header into view
      let headerPeak = min(distBottomHeadertoScreenTop - headerHeight, 0);
      header.style.bottom = headerPeak + "px";
    } else {
      // Determine if vertical menu transition occurs
      if (header.classList.contains("nav-bar-attach-bottom")) {
        header.classList.remove("nav-bar-attach-bottom");
        navigationButton.checked = false;
        expandableNavMenu.style.display = "none";
        toggleDivExpansion(expandableNavMenu, false);
        expandableNavMenu.style.display = "flex";
      }
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
