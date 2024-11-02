"use strict";
// Get references to the form and display area
const form = document.getElementById('resume-form');
const resumeDisplayElement = document.getElementById('resume-display');
const shareableLinkContainer = document.getElementById('shareable-link-container');
const shareableLinkElement = document.getElementById('shareable-link');
const downloadPdfButton = document.getElementById('download-pdf');
// Handle form submission
form.addEventListener('submit', (event) => {
    var _a;
    event.preventDefault(); // prevent page reload
    // Collect input values
    const username = document.getElementById('username').value;
    const profilePictureInput = document.getElementById('profilePicture');
    const name = document.getElementById('name').value;
    const fatherName = document.getElementById('father').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const card = document.getElementById('card').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    // Read profile picture file and convert to Base64
    const profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
    if (profilePictureFile) {
        const reader = new FileReader();
        reader.onload = function () {
            const profilePictureBase64 = reader.result; // Base64 encoded image
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
    }
    else {
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
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('father').value = resumeData.fatherName;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('address').value = resumeData.address;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('card').value = resumeData.card;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
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
