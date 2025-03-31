// Tech Stack: Handle Tag Selection and Input
document.querySelectorAll('.tech-tag').forEach(tag => {
    tag.addEventListener('click', () => {
        const input = document.getElementById('tech-stack-input');
        let tags = input.value.split(',').map(tag => tag.trim()).filter(Boolean);

        if (tag.textContent === "Other") {
            const customTag = prompt("Enter your custom tech stack:");
            if (customTag && !tags.includes(customTag)) {
                tags.push(customTag);
            }
        } else if (!tags.includes(tag.textContent)) {
            tags.push(tag.textContent);
        }

        input.value = tags.join(', ');
    });
});

// Team Members: Add and Remove Fields
document.getElementById('add-field').addEventListener('click', () => {
    event.preventDefault();
    const container = document.getElementById('team-member-container');
    const row = `
        <div class="input-row">
            <div class="team-members-column">
                <div class="input-container">
                    <input type="text" placeholder="Enter Team Member Name" name="TeamMember">
                </div>
            </div>
            <div class="hall-ticket-column">
                <div class="input-container">
                    <input type="text" placeholder="Enter Hall Ticket No" name="HallTicket">
                </div>
            </div>
        </div>`;
    container.insertAdjacentHTML('beforeend', row);
});

document.getElementById('remove-field').addEventListener('click', () => {
    event.preventDefault();
    const container = document.getElementById('team-member-container');
    if (container.children.length > 1) {
        container.lastElementChild.remove();
    } else {
        alert("At least one team member field must remain.");
    }
});

// Awards: Add and Remove Fields
document.getElementById('add-award').addEventListener('click', () => {
    event.preventDefault();
    const container = document.getElementById('awards-container');
    const input = `<div class="input-container"><input type="text" class="award-input" placeholder="Enter Award"></div>`;
    container.insertAdjacentHTML('beforeend', input);
});

document.getElementById('remove-award').addEventListener('click', () => {
    event.preventDefault();
    const container = document.getElementById('awards-container');
    if (container.children.length > 1) {
        container.lastElementChild.remove();
    } else {
        alert("At least one award field must remain.");
    }
});
// Wins: Add and Remove Fields
// Wins: Add and Remove Fields
// Wins: Add and Remove Fields
// Wins: Add and Remove Fields
document.getElementById('add-win').addEventListener('click', () => {
    event.preventDefault();
    const container = document.getElementById('wins-container');
    const inputField = `
        <div class="input-container">
            <input type="text" class="win-input" placeholder="Enter Win" />
        </div>`;
    container.insertAdjacentHTML('beforeend', inputField);
});

document.getElementById('remove-win').addEventListener('click', () => {
    event.preventDefault();
    const container = document.getElementById('wins-container');
    if (container.children.length > 1) {
        container.lastElementChild.remove();
    } else {
        alert("At least one win field must remain.");
    }
});





// Drag-and-Drop for Single File (Image/Video)
setupDragAndDrop('drag-drop-area', 'fileInput', 'fileLinkContainer', ['image/', 'video/']);

// Drag-and-Drop for Multiple Files (Images)
setupDragAndDrop('multi-drag-drop-area', 'multiFileInput', 'multiFileLinkContainer', ['image/']);

// Drag-and-Drop with File Limit
function setupLimitedDragAndDrop(areaId, inputId, linkContainerId, fileLimit) {
    const area = document.getElementById(areaId);
    const input = document.getElementById(inputId);
    const container = document.getElementById(linkContainerId);
    let uploadedFiles = []; // Track uploaded files

    area.addEventListener('click', () => input.click());

    input.addEventListener('change', () => processLimitedFiles(input.files, container, fileLimit, uploadedFiles));

    area.addEventListener('dragover', event => {
        event.preventDefault();
        area.classList.add('dragover');
    });

    area.addEventListener('dragleave', () => {
        area.classList.remove('dragover');
    });

    area.addEventListener('drop', event => {
        event.preventDefault();
        area.classList.remove('dragover');
        processLimitedFiles(event.dataTransfer.files, container, fileLimit, uploadedFiles);
    });
}

// Process files with a limit
function processLimitedFiles(files, container, fileLimit, uploadedFiles) {
    Array.from(files).forEach(file => {
        if (uploadedFiles.length < fileLimit) {
            uploadedFiles.push(file);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(file);
            link.target = '_blank';
            link.download = file.name;
            link.textContent = file.name;
            link.style = 'display: block; margin-top: 5px;';
            container.appendChild(link);
        } else {
            alert(`File limit reached! You can only upload up to ${fileLimit} files.`);
        }
    });
}

// Setup for publication-part11
setupLimitedDragAndDrop(
    'publication-part11-box',
    'publication-part11-input',
    'publication-part11-links',
    3 // Maximum number of files
);

// Setup for publication-part12
setupLimitedDragAndDrop(
    'publication-part12-box',
    'publication-part12-input',
    'publication-part12-links',
    3 // Maximum number of files
);

// Setup for publication-part13 (Project Files)
setupLimitedDragAndDrop(
    'publication-part13-box',
    'publication-part13-input',
    'publication-part13-links',
    5 // Maximum number of files
);

// Setup for publication-part14 (Other Certificates)
setupLimitedDragAndDrop(
    'publication-part14-box',
    'publication-part14-input',
    'publication-part14-links',
    5 // Maximum number of files
);


// General Drag-and-Drop Helper Function
function setupDragAndDrop(areaId, inputId, linkContainerId, validTypes) {
    const area = document.getElementById(areaId);
    const input = document.getElementById(inputId);
    const container = document.getElementById(linkContainerId);

    area.addEventListener('click', () => input.click());

    input.addEventListener('change', () => processFiles(input.files, validTypes, container));

    area.addEventListener('dragover', event => {
        event.preventDefault();
        area.classList.add('dragover');
    });

    area.addEventListener('dragleave', () => {
        area.classList.remove('dragover');
    });

    area.addEventListener('drop', event => {
        event.preventDefault();
        area.classList.remove('dragover');
        processFiles(event.dataTransfer.files, validTypes, container);
    });
}

// Process files
function processFiles(files, validTypes, container) {
    container.innerHTML = ''; // Clear previous links
    Array.from(files).forEach(file => {
        if (validTypes.some(type => file.type.startsWith(type))) {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(file);
            link.target = '_blank';
            link.download = file.name;
            link.textContent = file.name;
            link.style = 'display: block; margin-top: 5px;';
            container.appendChild(link);
        } else {
            container.innerHTML += `<p style="color: red;">${file.name} is not a valid file type.</p>`;
        }
    });
}

