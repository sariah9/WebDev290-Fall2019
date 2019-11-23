//Carousel JS
const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button--right');
const prevButton = document.querySelector('.carousel_button--left');
const dotsNav = document.querySelector('.carousel_nav');
const dots = Array.from(dotNav.children);

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current_slide');
  targetDot.classList.add('current_slide');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('is_hidden');
    nextButton.classList.remove('is_hidden');
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('is_hidden');
    nextButton.classList.add('is_hidden');
  } else {
    prevButton.classList.remove('is_hidden');
    nextButton.classList.remove('is_hidden');
  }
}

//arrange the slides next to one another
/*slides[0].style.left = slideWidth * 0 + 'px';
slides[1].style.left = slideWidth * 1 + 'px';
slides[2].style.left = slideWidth * 2 + 'px';
*/
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('current_slide');
  targetSlide.classList.add('current_slide');
}

//when I click left, move slides left
prevButton.addEventListener('click', e=> {
  const currentSlide = track.querySelector('.current_slide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.current_slide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

//when I click right, move slides right
nextButton.addEventListener('click', e=> {
  const currentSlide = track.querySelector('.current_slide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.current_slide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

//when I click nav indicators, move to that slide
dotsNav.addEventListener('click', e=> {
  //find which indicator was clicked
  const targetDot = e.target.closest('button');

  if (!targetDot) return;
  
  const currentSlide = track.querySelector('.current-slide');
  const currentDot = dotsNav.querySelector('.current-slide');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  cont targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});