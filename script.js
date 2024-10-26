const buttons = document.querySelectorAll('.button');

 // Add click event listener to each button
 buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // Remove 'active' class from all buttons
      buttons.forEach((b) => b.classList.remove('active'));
      // Add 'active' class to the clicked button
      button.classList.add('active');
    });
  });

  function pressEffect(btn) {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 100);
  }