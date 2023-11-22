// Function to handle project form submission
function handleProjectFormSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get form input values
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;

  // Retrieve author information
  const author = document.getElementById("author").value;

  const client = document.getElementById("client").value;
  const category = document.getElementById("category").value;
  const services = document.getElementById("services").value;
  const description = document.getElementById("description").value;
  const url = document.getElementById("url").value;

  // Retrieve image files
  const imagesBackground = document.getElementById("imagesBackground").files[0];
  const image1 = document.getElementById("image1").files[0];
  const image2 = document.getElementById("image2").files[0];
  const image3 = document.getElementById("image3").files[0];

  // Perform input validation (add more validation as needed)
  if (
    !title ||
    !date ||
    !client ||
    !category ||
    !services ||
    !description ||
    !url
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  // Create a FormData object to send data as a multipart/form-data request
  const formData = new FormData();
  formData.append("title", title);
  formData.append("date", date);
  formData.append("author", author);
  formData.append("client", client);
  formData.append("category", category);
  formData.append("services", services);
  formData.append("description", description);
  formData.append("url", url);
  formData.append("imagesBackground", imagesBackground);
  formData.append("image1", image1);
  formData.append("image2", image2);
  formData.append("image3", image3);

  // Send a POST request to your server (adjust the URL accordingly)
  fetch("/submit-project", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the server's response (e.g., show a success message)
      console.log("Project submitted successfully:", data);
      alert("Project submitted successfully.");
      window.location.href = window.location.href;
    })
    .catch((error) => {
      // Handle errors (e.g., show an error message)
      console.error("Error submitting project:", error);
      alert("An error occurred while submitting the project.");
    });
}

// Add an event listener to the Project Form
const projectForm = document.getElementById("project-form");
if (projectForm) {
  projectForm.addEventListener("submit", handleProjectFormSubmit);
}

// Work XP Submission Handler
function handleExperienceFormSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault;

  // Get form input values
  const role = document.getElementById("role").value;
  const company = document.getElementById("company").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value;
  const images = document.getElementById("images").value;

  // Perform input validation (add more validation as needed)
  if (!role || !company || !description || !startDate) {
    alert("Please fill in all required fields.");
    return;
  }

  // Create a FormData object to send data as a multipart/form-data request
  const formData = new FormData();
  formData.append("role", role);
  formData.append("company", company);
  formData.append("startDate", startDate);
  formData.append("endDate", endDate);
  formData.append("description", description);

  // Send a POST request to your server (adjust the URL accordingly)
  fetch("/submit-work-experience", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the server's response (e.g., show a success message)
      console.log("Work Experience submitted successfully:", data);
      alert("Work Experience submitted successfully.");
    })
    .catch((error) => {
      // Handle errors (e.g., show an error message)
      console.error("Error submitting work experience:", error);
      alert("An error occurred while submitting the work experience.");
    });
}

// Add an event listener to the Project Form
const experienceForm = document.getElementById("experience-form");
if (experienceForm) {
  experienceForm.addEventListener("submit", handleExperienceFormSubmit);
}

// Client Submission Handler
function handleClientFormSubmit(event) {
  // Prevent the default form submission behavior
  event.preventDefault;

  // Get form input values
  const company = document.getElementById("company").value;
  const logoUrl = document.getElementById("logoUrl").value;

  // Perform input validation (add more validation as needed)
  if (!logoUrl || !company) {
    alert("Please fill in all required fields.");
    return;
  }

  // Create a FormData object to send data as a multipart/form-data request
  const formData = new FormData();
  formData.append("company", company);
  formData.append("logoUrl", logoUrl);

  // Send a POST request to your server (adjust the URL accordingly)
  fetch("/submit-client", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the server's response (e.g., show a success message)
      console.log("Client submitted successfully:", data);
      alert("Client submitted successfully.");
    })
    .catch((error) => {
      // Handle errors (e.g., show an error message)
      console.error("Error submitting Client:", error);
      alert("An error occurred while submitting the Client.");
    });
}

const clientForm = document.getElementById("client-form");
if (clientForm) {
  clientForm.addEventListener("submit", handleClientFormSubmit);
}

document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");

  registrationForm.addEventListener("submit", async function (e) {
    // Prevent the form from submitting as a standard POST request
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const registrationData = { username, email, password };

    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      // Successful Registration
      if (response.status === 201) {
        // Registration successful
        alert("Registration successful. You can now log in.");
        // Redirect to login page or do something else
      } else {
        // Registration failed
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering. Please try again.");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.getElementById("logout-link");

  // Add event listener to logout link
  logoutLink.addEventListener("click", async (event) => {
    event.preventDefault(); //Prevent default anchor behaviour

    try {
      //  Make HTTP request to server
      const response = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect user to the login page on successful logout
        window.location.href = "/login";
      } else {
        // Logout failed
        console.error("Logout Failed! ", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during Logout attempt! ", error);
    }
  });
});
