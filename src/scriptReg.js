// Get modal and button elements
const regmodal = document.getElementById('regRoleModal');
const getStartedBtn = document.getElementById('getStartedBtn');
const closeBtn = document.querySelector('.close');

// Open modal on "Get Started" button click
getStartedBtn.addEventListener('click', () => {
  regmodal.style.display = 'flex'; // Show the modal
});

// Close modal on clicking the close button
closeBtn.addEventListener('click', () => {
  regmodal.style.display = 'none'; // Hide the modal
});

// Close modal on clicking outside the modal content

