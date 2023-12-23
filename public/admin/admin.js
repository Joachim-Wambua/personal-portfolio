function handleProjectFormSubmit(e){e.preventDefault();let t=document.getElementById("title").value,n=document.getElementById("date").value,r=document.getElementById("author").value,l=document.getElementById("client").value,a=document.getElementById("category").value,o=document.getElementById("tech_stack").value,i=document.getElementById("project_overview").value,d=document.getElementById("project_objectives").value,u=document.getElementById("key_features").value,c=document.getElementById("url").value,m=document.getElementById("imagesBackground").value,s=document.getElementById("image1").value,p=document.getElementById("image2").value,g=document.getElementById("image3").value;if(!t||!n||!l||!a||!o||!i||!d||!u||!c){alert("Please fill in all required fields.");return}let y=new FormData;y.append("title",t),y.append("date",n),y.append("author",r),y.append("client",l),y.append("category",a),y.append("tech_stack",o),y.append("project_overview",i),y.append("project_objectives",d),y.append("key_features",u),y.append("url",c),y.append("imagesBackground",m),y.append("image1",s),y.append("image2",p),y.append("image3",g),fetch("/submit-project",{method:"POST",body:y}).then(e=>e.json()).then(e=>{console.log("Project submitted successfully:",e),alert("Project submitted successfully."),window.location.href=window.location.href}).catch(e=>{console.error("Error submitting project:",e),alert("An error occurred while submitting the project.")})}const projectForm=document.getElementById("project-form");function handleExperienceFormSubmit(e){e.preventDefault;let t=document.getElementById("role").value,n=document.getElementById("company").value,r=document.getElementById("startDate").value,l=document.getElementById("endDate").value,a=document.getElementById("description").value;if(document.getElementById("images").value,!t||!n||!a||!r){alert("Please fill in all required fields.");return}let o=new FormData;o.append("role",t),o.append("company",n),o.append("startDate",r),o.append("endDate",l),o.append("description",a),fetch("/submit-work-experience",{method:"POST",body:o}).then(e=>e.json()).then(e=>{console.log("Work Experience submitted successfully:",e),alert("Work Experience submitted successfully.")}).catch(e=>{console.error("Error submitting work experience:",e),alert("An error occurred while submitting the work experience.")})}projectForm&&projectForm.addEventListener("submit",handleProjectFormSubmit);const experienceForm=document.getElementById("experience-form");function handleClientFormSubmit(e){e.preventDefault;let t=document.getElementById("company").value,n=document.getElementById("logoUrl").value;if(!n||!t){alert("Please fill in all required fields.");return}let r=new FormData;r.append("company",t),r.append("logoUrl",n),fetch("/submit-client",{method:"POST",body:r}).then(e=>e.json()).then(e=>{console.log("Client submitted successfully:",e),alert("Client submitted successfully.")}).catch(e=>{console.error("Error submitting Client:",e),alert("An error occurred while submitting the Client.")})}experienceForm&&experienceForm.addEventListener("submit",handleExperienceFormSubmit);const clientForm=document.getElementById("client-form");clientForm&&clientForm.addEventListener("submit",handleClientFormSubmit),document.addEventListener("DOMContentLoaded",function(){let e=document.getElementById("registrationForm");e.addEventListener("submit",async function(e){e.preventDefault();let t=document.getElementById("username").value,n=document.getElementById("email").value,r=document.getElementById("password").value;try{let l=await fetch("/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:t,email:n,password:r})});201===l.status?alert("Registration successful. You can now log in."):alert("Registration failed. Please try again.")}catch(a){console.error("Error:",a),alert("An error occurred while registering. Please try again.")}})}),document.addEventListener("DOMContentLoaded",()=>{let e=document.getElementById("logout-link");e.addEventListener("click",async e=>{e.preventDefault();try{let t=await fetch("/logout",{method:"GET",headers:{"Content-Type":"application/json"}});t.ok?window.location.href="/login":console.error("Logout Failed! ",t.statusText)}catch(n){console.error("An error occurred during Logout attempt! ",n)}})});