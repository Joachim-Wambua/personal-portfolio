// Function to handle project form submission
function handleProjectFormSubmit(event) {
    // Prevent the default form submission behavior 
    event.preventDefault;

    // Get form input values
    const title = document.getElementById('title').value;
    const client = document.getElementById('client').value;
    const team = document.getElementById('team').value;
    const services = document.getElementById('services').value;
    const year = document.getElementById('year').value;
    const description = document.getElementById('description').value;
    const images = document.getElementById('images').files;
    const url = document.getElementById('url').value;

    // Perform input validation (add more validation as needed)
    if (!title || !year || !description) {
        alert('Please fill in all required fields.');
        return;
    }

    // Create a FormData object to send data as a multipart/form-data request
    const formData = new FormData();
    formData.append('title', title);
    formData.append('client', client);
    formData.append('team', team);
    formData.append('services', services);
    formData.append('year', year);
    formData.append('description', description);
    formData.append('url', url);
    for (const image of images) {
        formData.append('images', image);
    }

    // Send a POST request to your server (adjust the URL accordingly)
    fetch('/submit-project', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Handle the server's response (e.g., show a success message)
        console.log('Project submitted successfully:', data);
        alert('Project submitted successfully.');
        window.location.href = window.location.href;
    })
    .catch(error => {
        // Handle errors (e.g., show an error message)
        console.error('Error submitting project:', error);
        alert('An error occurred while submitting the project.');
    });

}

// Add an event listener to the Project Form
const projectForm = document.getElementById('project-form');
if (projectForm) {
    projectForm.addEventListener('submit', handleProjectFormSubmit);
}

// Work XP Submission Handler
function handleExperienceFormSubmit(event) {
    // Prevent the default form submission behavior 
    event.preventDefault;

    // Get form input values
    const role = document.getElementById('role').value;
    const company = document.getElementById('company').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const description = document.getElementById('description').value;
    const images = document.getElementById('images').value;

    // Perform input validation (add more validation as needed)
    if (!role || !company || !description || !startDate) {
        alert('Please fill in all required fields.');
        return;
    }

    // Create a FormData object to send data as a multipart/form-data request
    const formData = new FormData();
    formData.append('role', role);
    formData.append('company', company);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('description', description);
    
    // Send a POST request to your server (adjust the URL accordingly)
    fetch('/submit-work-experience', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Handle the server's response (e.g., show a success message)
        console.log('Work Experience submitted successfully:', data);
        alert('Work Experience submitted successfully.');
    })
    .catch(error => {
        // Handle errors (e.g., show an error message)
        console.error('Error submitting work experience:', error);
        alert('An error occurred while submitting the work experience.');
    });

}

// Add an event listener to the Project Form
const experienceForm = document.getElementById('experience-form');
if (experienceForm) {
    experienceForm.addEventListener('submit', handleExperienceFormSubmit);
}

// Client Submission Handler
function handleClientFormSubmit(event) {
     // Prevent the default form submission behavior 
     event.preventDefault;

     // Get form input values
     const company = document.getElementById('company').value;
     const logoUrl = document.getElementById('logoUrl').value;

     // Perform input validation (add more validation as needed)
    if (!logoUrl || !company) {
        alert('Please fill in all required fields.');
        return;
    }

    
    // Create a FormData object to send data as a multipart/form-data request
    const formData = new FormData();
    formData.append('company', company);
    formData.append('logoUrl', logoUrl);

    // Send a POST request to your server (adjust the URL accordingly)
    fetch('/submit-client', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Handle the server's response (e.g., show a success message)
        console.log('Client submitted successfully:', data);
        alert('Client submitted successfully.');
    })
    .catch(error => {
        // Handle errors (e.g., show an error message)
        console.error('Error submitting Client:', error);
        alert('An error occurred while submitting the Client.');
    });
}

const clientForm = document.getElementById('client-form');
if (clientForm) {
    clientForm.addEventListener('submit', handleClientFormSubmit)
}


function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("togglePassword");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.classList.remove("fa-eye-slash");
        toggleIcon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        toggleIcon.classList.remove("fa-eye");
        toggleIcon.classList.add("fa-eye-slash");
    }
}