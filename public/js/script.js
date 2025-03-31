// TOGGLE SIDEBAR..................
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
});

// Search.............
const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
    if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
            searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
    }
});

// Responsive......................
if (window.innerWidth < 768) {
    sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
    searchButtonIcon.classList.replace('bx-x', 'bx-search');
    searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
    if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});

// Switch-mode....................
const switchMode = document.getElementById('switch-mode');

// Load the dark mode preference from localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark');
    switchMode.checked = true;
}

switchMode.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'enabled'); // Save preference
    } else {
        document.body.classList.remove('dark');
        localStorage.setItem('darkMode', 'disabled'); // Save preference
    }
});



// Select the profile element and the profile menu
const profile = document.getElementById('profile');
const profileMenu = document.getElementById('profileMenu');

// Add a click event listener to the profile element
profile.addEventListener('click', function () {
    profileMenu.classList.toggle('open-menu');
});

// Optionally, close the menu if the user clicks outside
document.addEventListener('click', function (e) {
    if (!profile.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.classList.remove('open-menu');
    }
});


