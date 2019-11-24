/*Sources Cited:
Photo Credit: @grohsfabian and @brookecagle on unsplash.com, alamy stock photo.
HTML Forms. https://www.w3schools.com/html/html_forms.asp.
How to code a carousel with HTML, CSS, and JavaScript. Kevin Powell. 
  https://www.youtube.com/watch?v=VYsVOamdB0g.
Normalize Boilerplate.normalize.css.https://www.skillcrush.com.
*/

let track = document.querySelector('.carousel_track');
let slides = Array.from(track.children);
let nextButton = document.querySelector('.carousel_button--right');
let prevButton = document.querySelector('.carousel_button--left');
let dotsNav = document.querySelector('.carousel_nav');
let dots = Array.from(dotsNav.children);
let manual = 0; //boolean value for click event

let slideSize = slides[0].getBoundingClientRect();
let slideWidth = slideSize.width;

let updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-slide');
  targetDot.classList.add('current-slide');
}

let hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    prevButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
}

//arrange the slides next to one another
/*slides[0].style.left = slideWidth * 0 + 'px';
slides[1].style.left = slideWidth * 1 + 'px';
slides[2].style.left = slideWidth * 2 + 'px';
*/
let setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

let moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
}

//when I click left, move slides left
prevButton.addEventListener('click', e=> {
  let currentSlide = track.querySelector('.current-slide');
  let prevSlide = currentSlide.previousElementSibling;
  let currentDot = dotsNav.querySelector('.current-slide');
  let prevDot = currentDot.previousElementSibling;
  let prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
  manual = 1;
});


//when I click right, move slides right
nextButton.addEventListener('click', e=> {
  let currentSlide = track.querySelector('.current-slide');
  let nextSlide = currentSlide.nextElementSibling;
  
  let currentDot = dotsNav.querySelector('.current-slide');
  let nextDot = currentDot.nextElementSibling;
  let nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

//when I click nav indicators, move to that slide
dotsNav.addEventListener('click', e=> {
  //find which indicator was clicked
  let targetDot = e.target.closest('button');
  if (!targetDot) return;
  
  let currentSlide = track.querySelector('.current-slide');
  let currentDot = dotsNav.querySelector('.current-slide');
  let targetIndex = dots.findIndex(dot => dot === targetDot);
  let targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
  manual = 1;
});

//otherwise, just move next every 5 seconds when the page loads
let swipe = function() {
  let currentSlide = track.querySelector('.current-slide');
  let nextSlide = currentSlide.nextElementSibling;
  let currentDot = dotsNav.querySelector('.current-slide');
  let nextDot = currentDot.nextElementSibling;
  let nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
}

let automagic = setInterval(swipe, 5000);

function stopEvent() {
  clearInterval(automagic);
}
