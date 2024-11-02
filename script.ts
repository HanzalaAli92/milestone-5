// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;
const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // prevent page reload

    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const fatherName = (document.getElementById('father') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const card = (document.getElementById('card') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Read profile picture file and convert to Base64
    const profilePictureFile = profilePictureInput.files?.[0];
    if (profilePictureFile) {
        const reader = new FileReader();
        reader.onload = function () {
            const profilePictureBase64 = reader.result as string; // Base64 encoded image

            // Save form data in localStorage with the username as the key
            const resumeData = {
                name,
                fatherName,
                email,
                address,
                phone,
                card,
                education,
                experience,
                skills,
                profilePicture: profilePictureBase64
            };
            localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

            // Generate the resume content dynamically
            const resumeHTML = `
                <h2>Editable Resume</h2>
                ${profilePictureBase64 ? `<img src="${profilePictureBase64}" alt="Profile Picture" class="profilePicture">` : ''}

                <h3>Personal Information</h3>

                <p><b>Name:</b> <span contenteditable="true">${name}</span></p>

                <p><b>Father Name:</b> <span contenteditable="true">${fatherName}</span></p>

                <p><b>Email:</b> <span contenteditable="true">${email}</span></p>

                <p><b>Address:</b> <span contenteditable="true">${address}</span></p>

                <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>

                <p><b>Identity Card Number:</b> <span contenteditable="true">${card}</span></p>

                <h3>Education</h3>
                <p contenteditable="true">${education}</p>

                <h3>Experience</h3>
                <p contenteditable="true">${experience}</p>

                <h3>Skills</h3>
                <p contenteditable="true">${skills}</p>
            `;

            // Display the generated resume
            resumeDisplayElement.innerHTML = resumeHTML;

            // Generate a shareable URL with the username only
            const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

            // Display the shareable link
            shareableLinkContainer.style.display = 'block';
            shareableLinkElement.href = shareableURL;
            shareableLinkElement.textContent = shareableURL;
        };
        reader.readAsDataURL(profilePictureFile); // Convert file to base64
    } else {
        // Handle case where no profile picture is uploaded
        const resumeData = {
            name,
            fatherName,
            email,
            address,
            phone,
            card,
            education,
            experience,
            skills
        };
        localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

        // Generate the resume content dynamically
        const resumeHTML = `
            <h2>Editable Resume</h2>
            <h3>Personal Information</h3>

            <p><b>Name:</b> <span contenteditable="true">${name}</span></p>

            <p><b>Father Name:</b> <span contenteditable="true">${fatherName}</span></p>

            <p><b>Email:</b> <span contenteditable="true">${email}</span></p>

            <p><b>Address:</b> <span contenteditable="true">${address}</span></p>

            <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>

            <p><b>Identity Card Number:</b> <span contenteditable="true">${card}</span></p>

            <h3>Education</h3>
            <p contenteditable="true">${education}</p>

            <h3>Experience</h3>
            <p contenteditable="true">${experience}</p>

            <h3>Skills</h3>
            <p contenteditable="true">${skills}</p>
        `;

        // Display the generated resume
        resumeDisplayElement.innerHTML = resumeHTML;

        // Generate a shareable URL with the username only
        const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

        // Display the shareable link
        shareableLinkContainer.style.display = 'block';
        shareableLinkElement.href = shareableURL;
        shareableLinkElement.textContent = shareableURL;
    }
});

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);

            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('father') as HTMLInputElement).value = resumeData.fatherName;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('address') as HTMLInputElement).value = resumeData.address;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('card') as HTMLInputElement).value = resumeData.card;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;

            // Display the profile picture if available
            if (resumeData.profilePicture) {
                const profilePictureElement = document.createElement('img');
                profilePictureElement.src = resumeData.profilePicture;
                profilePictureElement.alt = 'Profile Picture';
                profilePictureElement.classList.add('profilePicture');
                resumeDisplayElement.prepend(profilePictureElement);
            }
        }
    }
});