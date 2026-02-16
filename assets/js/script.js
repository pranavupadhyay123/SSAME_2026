// Toggle Read More / Read Less Text - Global Scope
function toggleReadMore(button) {
  if (button.innerText === "Read More") {
    button.innerText = "Read Less";
  } else {
    button.innerText = "Read More";
  }
}

// Wait for the DOM content to be loaded
document.addEventListener("DOMContentLoaded", function () {

  // Carousel Logic (Existing)
  const nextButton = document.querySelector('[data-carousel-next]');
  if (nextButton) {
    function clickNextButton() {
      nextButton.click();
    }
    setInterval(clickNextButton, 3000);
  }

  // --- Countdown Logic ---

  function startCountdown(id, targetDate) {
    const element = document.getElementById(id);
    if (!element) return;

    const countDownDate = new Date(targetDate).getTime();

    const x = setInterval(function () {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      // Check if date is passed
      if (distance < 0) {
        clearInterval(x);
        element.innerHTML = "<h4 class='text-danger'>Event Started</h4>";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      element.innerHTML = `
      <div class="d-flex justify-content-center gap-3">
        <div class="text-center">
          <span class="display-5 fw-bold text-secondary">${days}</span>
          <div class="small text-uppercase">Days</div>
        </div>
        <div class="text-center">
          <span class="display-5 fw-bold text-secondary">:</span>
        </div>
        <div class="text-center">
          <span class="display-5 fw-bold text-secondary">${hours}</span>
          <div class="small text-uppercase">Hours</div>
        </div>
        <div class="text-center">
          <span class="display-5 fw-bold text-secondary">:</span>
        </div>
        <div class="text-center">
          <span class="display-5 fw-bold text-secondary">${minutes}</span>
          <div class="small text-uppercase">Mins</div>
        </div>
        <div class="text-center">
          <span class="display-5 fw-bold text-secondary">:</span>
        </div>
        <div class="text-center">
          <span class="display-5 fw-bold text-secondary">${seconds}</span>
          <div class="small text-uppercase">Secs</div>
        </div>
      </div>
      `;

    }, 1000);
  }

  // Initialize Countdowns
  // 1. Conference Date: Nov 13, 2026
  startCountdown("conference-countdown", "Nov 13, 2026 09:00:00");

  // 2. Paper Submission Deadline: Oct 5, 2026
  startCountdown("submission-countdown", "Oct 5, 2026 23:59:59");

});
