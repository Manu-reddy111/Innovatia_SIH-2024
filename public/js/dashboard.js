document.addEventListener('DOMContentLoaded', function () {
    const editIcon = document.querySelector('.bx.bxs-edit-alt');
    const editFormContainer = document.getElementById('edit-form-container');
    const editForm = document.getElementById('edit-form');

    // Show the form when the edit icon is clicked
    editIcon.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the click from propagating to the document
        editFormContainer.style.display = 'block';
    });

    // Close the form when clicking outside
    document.addEventListener('click', (e) => {
        if (!editFormContainer.contains(e.target) && editFormContainer.style.display === 'block') {
            editFormContainer.style.display = 'none';
        }
    });

    // Prevent the form from closing when clicking inside it
    editFormContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Add dynamic input fields for awards and wins
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('add-field')) {
            const parent = e.target.parentElement;
            const newField = parent.cloneNode(true);
            newField.querySelector('input').value = ''; // Clear the new input
            parent.parentElement.appendChild(newField);
        }
    });

    // Handle form submission
    editForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Update Links
        document.querySelector('.linkedin-link').setAttribute('href', document.getElementById('linkedin-link').value);
        document.querySelector('.github-link').setAttribute('href', document.getElementById('github-link').value);
        document.querySelector('.facebook-link').setAttribute('href', document.getElementById('facebook-link').value);

        // Update Images
        document.querySelector('.studentprofile-part1').style.backgroundImage = `url(${document.getElementById('background-image').value})`;
        document.querySelector('.student-usernamepic img').src = document.getElementById('profile-image').value;

        // Update Department and Hall Ticket
        document.querySelector('.student-data1').innerHTML = `
            <p><span><i class='bx bxs-invader'></i></span>${document.getElementById('department').value}</p>
            <p><span><i class='bx bxs-hard-hat'></i></span>${document.getElementById('hall-ticket').value}</p>
        `;

        // Update Awards
        const awardsContainer = document.querySelector('.student-data2');
        awardsContainer.innerHTML = ''; // Clear existing awards
        const awards = Array.from(editForm.querySelectorAll('input[name="award[]"]'));
        awards.forEach(award => {
            awardsContainer.innerHTML += `<p><i class='bx bxs-award'></i> ${award.value}</p>`;
        });

        // Update Wins
        const winsContainer = document.querySelector('.student-data3');
        winsContainer.innerHTML = ''; // Clear existing wins
        const wins = Array.from(editForm.querySelectorAll('input[name="win[]"]'));
        wins.forEach(win => {
            winsContainer.innerHTML += `<p><i class='bx bx-badge'></i> ${win.value}</p>`;
        });

        // Update Description
        document.querySelector('.student-data5').innerHTML = `<p>${document.getElementById('description').value}</p>`;

        // Close the form
        editFormContainer.style.display = 'none';
    });
});
