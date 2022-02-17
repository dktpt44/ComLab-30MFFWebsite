// Variable to keep track of which tab is open
var currentTab = 1;

//getting reference to different 'pages'
var homeTab = document.querySelector(".homeDiv");
var aboutTab = document.querySelector(".aboutDiv");
var galleryTab = document.querySelector(".galleryDiv");

// getting reference to nav items
var homeLink = document.getElementById("home");
var aboutLink = document.getElementById("about");
var galleryLink = document.getElementById("gallery");

// adding click listeners to nav items
homeLink.addEventListener("click", () => {
  // if active tab is other than the current tab then change
  if (currentTab != 1) {
    currentTab = 1;
    // hide all other tabs and display the clicked one
    homeLink.classList.add("activeLi");
    aboutLink.classList.remove("activeLi");
    galleryLink.classList.remove("activeLi");

    homeTab.style.display = "block";
    aboutTab.style.display = "none";
    galleryTab.style.display = "none";

  }
});
// similar idea
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
// similar idea
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

// Carousel holder
var carouselContainer = document.getElementsByClassName('carousel-container')[0];

// adding click listeners to the buttons
var rightButton = document.getElementsByClassName("right-button")[0];
var leftButton = document.getElementsByClassName("left-button")[0];
rightButton.addEventListener('click', moveRight);
leftButton.addEventListener('click', moveLeft);


// for carousel
var IMAGE_WIDTH = 600;
// change image speed
var incrementByX = IMAGE_WIDTH / 100;
var currentImgIndex = 1;

// carousel image wrapper reference
var carouselWrapper = carouselContainer.getElementsByClassName('carousel-image-wrapper')[0];
var carouselImages = carouselWrapper.getElementsByTagName('img');
var totalNumberOfImages = carouselImages.length;
// image wrapper has total width to hold all the images
carouselWrapper.style.width = totalNumberOfImages * IMAGE_WIDTH + 'px';
carouselWrapper.style.left = '0px';

// to add indicators 
var allindicator = document.getElementsByClassName("img-indicators")[0];
// add as many indicators as there are images
for (var i = 0; i < totalNumberOfImages; i++) {
  var newcircle = document.createElement('button');
  newcircle.classList.add('circle');
  // add event listener to each indicator
  newcircle.onclick = function (e) {
    changeImage(e.target);
  }
  allindicator.appendChild(newcircle);
}
// indicators
var listOfButtons = document.getElementsByClassName('circle');
changeCircle();

// for auto animation
var globalInterval = null;
function globalAnimate(flag) {
  if (flag) {
    globalInterval = setInterval(function () {
      moveRight();
    }, 1500);
  } else {
    // to stop current auto animation when any of the buttons or indicators is clicked
    clearInterval(globalInterval);
  }
}

// move the carousel image left
function moveLeft() {
  var currentLeft = parseInt(carouselWrapper.style.left);
  if ((currentLeft % IMAGE_WIDTH) != 0) {
    return;
  }
  // stop global animation
  globalAnimate(false);
  // calculate new left position
  var newLeft = currentLeft + IMAGE_WIDTH;
  if (currentLeft == 0) {
    // if already at the leftmost image
    currentImgIndex = totalNumberOfImages + 1;
    newLeft = -(totalNumberOfImages - 1) * IMAGE_WIDTH;
    // start moving animation
    var dummyid = setInterval(function () {
      carouselWrapper.style.left = currentLeft + 'px';
      currentLeft -= 40;
      if (currentLeft <= newLeft) {
        // when target position is reached
        carouselWrapper.style.left = newLeft + 'px';
        // change the indicator
        changeCircle();
        // stop animation
        clearInterval(dummyid);
        // resume auto animation
        globalAnimate(true);
      }
    }, 10)
  } else {
    // if not at the leftmost image do the animation to show previous image
    var dummyid = setInterval(function () {
      carouselWrapper.style.left = currentLeft + 'px';
      currentLeft += incrementByX;
      if (currentLeft >= newLeft) {
        // reached at target position
        carouselWrapper.style.left = newLeft + 'px';
        changeCircle();
        clearInterval(dummyid);
        globalAnimate(true);
      }
    }, 10)
  }
  currentImgIndex--;
}

// similar idea
function moveRight() {
  var currentLeft = parseInt(carouselWrapper.style.left);
  if ((currentLeft % IMAGE_WIDTH) != 0) {
    return;
  }
  globalAnimate(false);
  var newLeft = currentLeft - IMAGE_WIDTH;
  if (currentImgIndex == totalNumberOfImages) {
    currentImgIndex = 0;
    newLeft = 0;
    var dummyid = setInterval(function () {
      carouselWrapper.style.left = currentLeft + 'px';
      currentLeft += 40;
      if (currentLeft >= newLeft) {
        carouselWrapper.style.left = newLeft + 'px';
        changeCircle();
        clearInterval(dummyid);
        globalAnimate(true);
      }
    }, 10)
  } else {
    var dummyid = setInterval(function () {
      carouselWrapper.style.left = currentLeft + 'px';
      currentLeft -= incrementByX;
      if (currentLeft <= newLeft) {
        carouselWrapper.style.left = newLeft + 'px';
        changeCircle();
        clearInterval(dummyid);
        globalAnimate(true);

      }

    }, 10);
  }
  currentImgIndex++;
}

// change the size of indicator
function changeCircle() {
  listOfButtons[currentImgIndex - 1].classList.add('bigger-circle');
  removeAllStyles();
}

// function to handle click event for indicators
function changeImage(clickedButton) {
  var oldIndex = currentImgIndex;
  // get the image index
  for (var i = 0; i < totalNumberOfImages; i++) {
    if (listOfButtons[i] == clickedButton) {
      currentImgIndex = i + 1;
      break;
    }
  }
  // animate to the new position
  animateImage(oldIndex);
  removeAllStyles();
  clickedButton.classList.add('bigger-circle');
}

// change the style of indicators
function removeAllStyles() {
  for (var i = 0; i < totalNumberOfImages; i++) {
    if (i == currentImgIndex - 1) {
      continue;
    }
    listOfButtons[i].classList.remove('bigger-circle');
  }
}

// function to animate to the new position when an indicator button is clicked
function animateImage(oldIndex) {
  if (oldIndex == currentImgIndex) {
    return;
  } else if (currentImgIndex < oldIndex) {
    // similar idea to move left, move right
    globalAnimate(false);
    var leftIncrement = (oldIndex - currentImgIndex) * 20;
    var currentLeft = parseInt(carouselWrapper.style.left);
    var newLeft = -(currentImgIndex - 1) * IMAGE_WIDTH;
    var dummyid = setInterval(function () {
      carouselWrapper.style.left = currentLeft + 'px';
      currentLeft += leftIncrement;
      if (currentLeft >= newLeft) {
        carouselWrapper.style.left = newLeft + 'px';
        clearInterval(dummyid);
        globalAnimate(true);
      }
    }, 10);
  } else {
    globalAnimate(false);
    var rightIncrement = (currentImgIndex - oldIndex) * 20;
    var currentRight = parseInt(carouselWrapper.style.left);
    var newRight = -(currentImgIndex - 1) * IMAGE_WIDTH;
    var dummyid = setInterval(function () {
      carouselWrapper.style.left = currentRight + 'px';
      currentRight -= rightIncrement;
      if (currentRight <= newRight) {
        carouselWrapper.style.left = newRight + 'px';
        clearInterval(dummyid);
        globalAnimate(true);

      }
    }, 10);
  }

}
// start auto animation
globalAnimate(true);
