//select the gear icon
let gearIcon = document.querySelector(".fa-gear");
//select setting box
let settingBox = document.querySelector(".setting-box");
//open setting box and rotate gear icon
gearIcon.addEventListener("click", function () {
  settingBox.classList.toggle("oppen");
  this.classList.toggle("fa-spin");
});
//select colors in setting box
let colorsSpans = document.querySelectorAll(".colors span");
//check if there is color in local storage
if (window.localStorage.getItem("main-color")) {
  //load the color from local storge
  document.documentElement.style.setProperty(
    "--main-color",
    window.localStorage.getItem("main-color")
  );
  //remove class active from all color spans
  colorsSpans.forEach((span) => {
    span.classList.remove("active");
  });
  //add class active to choosen color span
  document
    .querySelector(
      `[data-color="${window.localStorage.getItem("main-color")}"]`
    )
    .classList.add("active");
}
handelActive(colorsSpans);
colorsSpans.forEach((span) => {
  span.addEventListener("click", function (e) {
    let choosenColor = this.dataset.color;
    //change the main color in root to choosen color
    document.documentElement.style.setProperty("--main-color", choosenColor);
    // save the color in local storage
    window.localStorage.setItem("main-color", choosenColor);
  });
});
let randomSpans = document.querySelectorAll(".background-box span");
let backgrondOption = true;
let theInterval;
//check if there is rondom background option in local storage
if (window.localStorage.getItem("random-background")) {
  if (window.localStorage.getItem("random-background") === "yes") {
    backgrondOption = true;
    randomBackground();
  } else {
    backgrondOption = false;
    clearInterval(theInterval);
  }
  //remove class active from all spans
  randomSpans.forEach((span) => {
    span.classList.remove("active");
  });
  document
    .querySelector(
      `[data-background="${window.localStorage.getItem("random-background")}"]`
    )
    .classList.add("active");
}
//select nav options
let navOptions = document.querySelectorAll(".nav-option span");
//check if threr is nav option in local storage
if (window.localStorage.getItem("nav-option")) {
  if (window.localStorage.getItem("nav-option") === "yes") {
    document.querySelector(".nav-box").style.display = "block";
  } else {
    document.querySelector(".nav-box").style.display = "none";
  }
  //remove class active from all spans
  navOptions.forEach((span) => {
    span.classList.remove("active");
  });
  document
    .querySelector(`[data-nav="${window.localStorage.getItem("nav-option")}"]`)
    .classList.add("active");
}
// randomly change background
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let landing = document.querySelector(".landing-page");
function randomBackground() {
  if (backgrondOption === true) {
    theInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landing.style.backgroundImage = `url("imegs/${imgsArray[randomNumber]}")`;
    }, 5000);
  }
}
randomBackground();
handelActive(randomSpans);
randomSpans.forEach((span) => {
  span.addEventListener("click", function (e) {
    //handel random backgrond
    if (this.dataset.background === "yes") {
      backgrondOption = true;
      randomBackground();
      console.log("yes");
    } else {
      backgrondOption = false;
      clearInterval(theInterval);
      console.log("No");
    }
    //save in local storage
    window.localStorage.setItem("random-background", this.dataset.background);
  });
});

function handelActive(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", function () {
      //remove active from all elements
      elements.forEach((ele) => {
        ele.classList.remove("active");
      });
      //add active to clicked element
      ele.classList.add("active");
    });
  });
}

function fillSpanSkills() {
  let skillsSpans = document.querySelectorAll(
    ".skill-box .skill-progress span"
  );
  skillsSpans.forEach((span) => {
    span.style.width = span.dataset.width;
  });
}

window.addEventListener("scroll", function (e) {
  let skilsSection = this.document.querySelector(".skills");
  //get top of section
  let topOfSectoin = skilsSection.offsetTop;
  //get where we are in the window
  let scrollY = this.window.pageYOffset;
  //get the height of the seen from window
  let windowHeight = this.window.innerHeight;
  // get the height of section
  let heightOfSection = skilsSection.offsetHeight;
  if (scrollY + windowHeight >= topOfSectoin + 100) {
    // fill progress of skill when user reach to skills section
    fillSpanSkills();
  }
});

let galleryImgs = document.querySelectorAll(".gallery .imegs img");
galleryImgs.forEach((img) => {
  //click on image
  img.addEventListener("click", function () {
    //create overlay
    let overlayDiv = document.createElement("div");
    overlayDiv.className = "overlay-popup";
    document.body.appendChild(overlayDiv);
    // create gallery popup
    let galleryPopup = document.createElement("div");
    galleryPopup.className = "gallery-popup";
    document.body.appendChild(galleryPopup);
    // create title of image
    let titleOfImeg = document.createElement("h1");
    let textOfTitle = document.createTextNode(this.alt);
    titleOfImeg.appendChild(textOfTitle);
    galleryPopup.appendChild(titleOfImeg);
    //create image
    let imagePopup = document.createElement("img");
    imagePopup.src = this.src;
    imagePopup.className = "image-popup";
    galleryPopup.appendChild(imagePopup);
    console.log(this.src);
    //creat close button
    let closeButton = document.createElement("span");
    closeButton.innerHTML = "X";
    closeButton.className = "close-button";
    galleryPopup.appendChild(closeButton);
    //remove popup and overlay when click on button
    closeButton.addEventListener("click", function () {
      galleryPopup.remove();
      overlayDiv.remove();
    });
  });
});

// select bullets in navigation box
let bulletsInNav = document.querySelectorAll(".nav-box .bullet");
// // select all links
let allLinks = document.querySelectorAll(".header a");
// scroll to clicked sectioin
function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(`.${this.dataset.section}`).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSection(allLinks);
scrollToSection(bulletsInNav);

handelActive(navOptions);
navOptions.forEach((option) => {
  option.addEventListener("click", function () {
    if (this.dataset.nav === "no") {
      document.querySelector(".nav-box").style.display = "none";
    } else {
      document.querySelector(".nav-box").style.display = "block";
    }
    //save option in local storage
    window.localStorage.setItem("nav-option", this.dataset.nav);
  });
});

document.querySelector(".danger").addEventListener("click", function () {
  localStorage.removeItem("main-color");
  localStorage.removeItem("nav-option");
  localStorage.removeItem("random-background");
  location.reload();
});

let menuIcon = document.querySelector(".menu");
let menuOfLinks = document.querySelector(".landing-page .header ul");

menuIcon.addEventListener("click", function (e) {
  e.stopPropagation();
  this.classList.toggle("open");
  menuOfLinks.classList.toggle("open");
});
menuOfLinks.addEventListener("click", function (e) {
  e.stopPropagation();
});
document.addEventListener("click", function (e) {
  if (menuOfLinks.classList.contains("open")) {
    if (e.target !== menuIcon) {
      menuOfLinks.classList.remove("open");
      menuIcon.classList.remove("open");
    }
  }
});
