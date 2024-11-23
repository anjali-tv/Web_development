let currentSlide = 0;
let slides = document.querySelectorAll(".slide");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

// Ensure the first slide is visible initially
slides[currentSlide].classList.add("active");

function next() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}
nextBtn.addEventListener("click", next);

function prev() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

prevBtn.addEventListener("click", prev);
setInterval(next, 3000);
