// Wait for the DOM content to be loaded
document.addEventListener("DOMContentLoaded", function() {
  // Function to click the next button
  function clickNextButton() {
      // Find the next button
      const nextButton = document.querySelector('[data-carousel-next]');
      // Trigger a click event on the next button
      nextButton.click();
  }

  // Set an interval to click the next button every 3 seconds
  const intervalId = setInterval(clickNextButton, 3000);
});
