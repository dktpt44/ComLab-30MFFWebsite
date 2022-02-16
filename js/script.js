// Variable to keep track of which tab is open
var currentTab = 1;

var homeTab = document.querySelector(".homeDiv");
var aboutTab = document.querySelector(".aboutDiv");
var galleryTab = document.querySelector(".galleryDiv");

var homeLink = document.getElementById("home");
var aboutLink = document.getElementById("about");
var galleryLink = document.getElementById("gallery");

homeLink.addEventListener("click", () => {
  if (currentTab != 1) {
    currentTab = 1;
    homeLink.classList.add("activeLi");
    aboutLink.classList.remove("activeLi");
    galleryLink.classList.remove("activeLi");

    homeTab.style.display = "block";
    aboutTab.style.display = "none";
    galleryTab.style.display = "none";

  }
});
aboutLink.addEventListener("click", () => {
  if (currentTab != 2) {
    currentTab = 2;
    homeLink.classList.remove("activeLi");
    aboutLink.classList.add("activeLi");
    galleryLink.classList.remove("activeLi");

    homeTab.style.display = "none";
    aboutTab.style.display = "block";
    galleryTab.style.display = "none";
  }
});
galleryLink.addEventListener("click", () => {
  if (currentTab != 3) {
    currentTab = 3;
    homeLink.classList.remove("activeLi");
    aboutLink.classList.remove("activeLi");
    galleryLink.classList.add("activeLi");

    homeTab.style.display = "none";
    aboutTab.style.display = "none";
    galleryTab.style.display = "block";
  }
});

// function to open the video overlay
function openNav() {
  document.getElementById("overlayDiv").style.height = "100%";
}
// function to close the video overlay
function closeNav() {
  document.getElementById("overlayDiv").style.height = "0%";
}