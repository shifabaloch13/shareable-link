document.getElementById('resumeForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const contactElement = document.getElementById('contact') as HTMLInputElement;
    const nationalityElement = document.getElementById('nationality') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLInputElement;
    const experienceElement = document.getElementById('experience') as HTMLInputElement;
    const skillsElement = document.getElementById('skills') as HTMLInputElement;
    const profilePictureElement = document.getElementById('profilePicture') as HTMLInputElement;
    const usernameElement = document.getElementById("username") as HTMLInputElement;

    if (nameElement && emailElement && contactElement && nationalityElement && educationElement && experienceElement && usernameElement && skillsElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const contact = contactElement.value;
        const nationality = nationalityElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const username = usernameElement.value;
        const skills = skillsElement.value;
        const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`;

        let resumeOutput = `
            <h2>Resume</h2>
            <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
            <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
            <p><strong>Contact Number:</strong> <span id="edit-contact" class="editable">${contact}</span></p>
            <p><strong>Nationality:</strong> <span id="edit-nationality" class="editable">${nationality}</span></p>

            <h3>Education</h3>
            <p id="edit-education" class="editable">${education}</p>

            <h3>Experience</h3>
            <p id="edit-experience" class="editable">${experience}</p>

            <h3>Skills</h3>
            <p id="edit-skills" class="editable">${skills}</p>
        `;

        if (profilePictureElement && profilePictureElement.files && profilePictureElement.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageDataUrl = e.target?.result as string;
                resumeOutput = `
                    <div class="profilePictureContainer">
                        <img src="${imageDataUrl}" class="profilePicture" alt="Profile Picture">
                    </div>
                    ${resumeOutput}
                `;
                const resumeOutputElement = document.getElementById('resumeOutput');
                if (resumeOutputElement) {
                    resumeOutputElement.innerHTML = resumeOutput;
                    addDownloadButton(resumeOutput, uniquePath); 
                }
                enableEditing();
            };
            reader.readAsDataURL(profilePictureElement.files[0]);
        } else {
            const resumeOutputElement = document.getElementById('resumeOutput');
            if (resumeOutputElement) {
                resumeOutputElement.innerHTML = resumeOutput;
                addDownloadButton(resumeOutput, uniquePath);  
            }
            enableEditing(); 
        }
    } else {
        console.error('One or more form elements are missing');
    }
});

function addDownloadButton(resumeOutput: string, uniquePath: string) {
    const printButton = document.createElement('button');
    printButton.textContent = 'Download Resume as PDF';
    printButton.classList.add('button');
    printButton.addEventListener('click', function() {
        const newWindow = window.open('', '', 'width=800,height=600');
        newWindow?.document.write(`
            <html>
                <head><title>Resume</title></head>
                <body>${resumeOutput}</body>
            </html>
        `);
        newWindow?.document.close();
        newWindow?.focus();
        newWindow?.print();
    });

    const resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        buttonContainer.appendChild(printButton);
        resumeOutputElement.appendChild(buttonContainer);
    }
}

function enableEditing() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function() {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                input.addEventListener('blur', function() {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}

document.getElementById('ShareableLink')?.addEventListener('click', function() {
    const usernameElement = document.getElementById("username") as HTMLInputElement;
    if (usernameElement) {
        const username = usernameElement.value;
        const shareableLink = `https://example.com/resumes/${username.replace(/\s+/g, '_')}_cv.html`;

        alert(`Shareable Link: ${shareableLink}`);

        
        copyToClipboard(shareableLink);
    } else {
        console.error('Username is missing');
    }
});

function copyToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Shareable link copied to clipboard!');
}