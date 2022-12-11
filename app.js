//tutorial source: https://www.youtube.com/watch?v=4UXJb4rjeDg
//12-11-22 Application not working as intended
//TODO: Inifinite scroll not working

let sliderwrap = document.querySelector(".slider-wrap");

let slider = document.querySelector(".slider");

let clonesWidth;

let sliderWidth;

let clones = [];

let disableScroll = false;
let scrollPos;

let items = [...document.querySelectorAll(".slider-item")];

console.log(items);

let images = [...document.querySelectorAll(".img-div")];

images.forEach((image, idx) => {
  image.style.backgroundImage = `url(./images/${idx + 1}.jpg)`;
});

items.forEach((item) => {
  let clone = item.cloneNode(true);
  clone.classList.add("clone");
  slider.appendChild(clone);
  clones.push(clone);
});

function getClonesWidth() {
  let width = 0;
  clones.forEach((clone) => {
    width += clone.offsetWidth;
    console.log(`clones width ${width}`)
    return width;
  });
}


function getScrollPos() {
    console.log(`scroll pos ${window.scrollY}`)
  return window.scrollY;
}


function scrollUpdate() {
  scrollPos = getScrollPos();
  if (clonesWidth + scrollPos >= sliderWidth) {
    window.scrollTo({ top: 1 });
  } else if (scrollPos <= 0) {
    window.scrollTo({top: sliderWidth - clonesWidth -1})
  }

  slider.style.transform =`translateX(${-window.scrollY}px)`
  requestAnimationFrame(scrollUpdate)
}

function onLoad () {
    calculateDimensions()
    // console.log(`slider width ${sliderWidth}`)
    document.body.style.height = `${sliderWidth}px`;
    window.scrollTo({ top: 1 });
    scrollUpdate()
}

function calculateDimensions() {
    sliderWidth = slider.getBoundingClientRect().width;
    clonesWidth = getClonesWidth();
}


onLoad()



