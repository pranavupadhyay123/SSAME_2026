// Wait for the DOM content to be loaded
document.addEventListener("DOMContentLoaded", function () {

  // Carousel Logic (Existing)
  // Check if elements exist before verifying
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

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // Toggle Read More / Read Less Text
      function toggleReadMore(button) {
        if (button.innerText === "Read More") {
          button.innerText = "Read Less";
        } else {
          button.innerText = "Read More";
        }
      }
      element.innerHTML = `
              <div class="d-flex justify-content-center gap-3">
                  <div class="text-center">
                      <span class="display-5 fw-bold text-danger">${days}</span>
                      <div class="small text-uppercase">Days</div>
                  </div>
                   <div class="text-center">
                      <span class="display-5 fw-bold text-danger">:</span>
                  </div>
                  <div class="text-center">
                      <span class="display-5 fw-bold text-danger">${hours}</span>
                      <div class="small text-uppercase">Hours</div>
                  </div>
                   <div class="text-center">
                      <span class="display-5 fw-bold text-danger">:</span>
                  </div>
                  <div class="text-center">
                      <span class="display-5 fw-bold text-danger">${minutes}</span>
                      <div class="small text-uppercase">Mins</div>
                  </div>
                   <div class="text-center">
                      <span class="display-5 fw-bold text-danger">:</span>
                  </div>
                  <div class="text-center">
                      <span class="display-5 fw-bold text-danger">${seconds}</span>
                      <div class="small text-uppercase">Secs</div>
                  </div>
              </div>
          `;

      if (distance < 0) {
        clearInterval(x);
        element.innerHTML = "<h4 class='text-danger'>Event Started</h4>";
      }
    }, 1000);
  }

  // Initialize Countdowns
  // 1. Conference Date: Nov 7, 2026
  startCountdown("conference-countdown", "Nov 13, 2026 09:00:00");

  // 2. Paper Submission Deadline: Placeholder (e.g., Nov 1, 2026) -> User to confirm
  startCountdown("submission-countdown", "Oct 5, 2026 23:59:59");

});
