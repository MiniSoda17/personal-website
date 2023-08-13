// Finds what web-page the user is on
let windowPathName = window.location.pathname;
let windowName = windowPathName;
if (windowName == '/index.html') {
    windowName = '/home.html';
}

/**
 * Changes the navbar to correspond with the webpage the user is on
*/
function navBarSelector() {
    windowName = windowName.replace('/','').replace('.html','');
    document.getElementById(windowName).style.color = "White";;
    document.getElementById(windowName + '-tab').style.backgroundColor = "Black";
}

/**
 * A function that allows for videos to run over a simple mouse hover
 */
function addHoverVideoFnc() {
    const projectVideos = document.querySelectorAll(".project-video");
    
    /**
     * Plays the selected video
     * 
     * @param {element} video the video to be played 
     */
    function playVid(video) {
        video.play();
    }
    
    /**
     * Pauses the selected video
     * 
     * @param {element} video the video to be paused
     */
    function pauseVid(video) {
        video.pause();
    }
    
    // Pausing each video to prevent autoplay
    for(let vid of projectVideos) {
        pauseVid(vid); 
    }
    
    // Runs the function for each video
    for(let vid of projectVideos) {
        vid.addEventListener("mouseover", function(event) {
            event.target.style.transform = "scale(1.025)";
            playVid(event.target);
        })
        vid.addEventListener("mouseout", function(event) {
            event.target.style.transform = "scale(1)";
            pauseVid(event.target);
        })
    }
}

/**
 * Runs the entire validation process in the contacts page and changes the greeting message
 */
function addValidation() {
    // Finding all the necessary variables
    const name_input = document.getElementById("fname");
    const email_input = document.getElementById("femail");
    const message_input = document.getElementById("message");
    const submitButton = document.getElementById("submitButton");
    const contact_heading = document.querySelector(".contact-message");
    
    let allInputs = [name_input, email_input, message_input];
    
    // Checks for any button clicks
    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        if(validation(checkAny)) {
            changeContactHeading(contact_heading, name_input.value)
            for(let i = 0; i < allInputs.length; i++) {
                allInputs[i].value = "";
            }
        } 
    });
    
    /**
     * Callback function being called with name and email input as params.
     * 
     * @param {function} validateCondition1 a function to validate user input
     * @returns a true or false depending whether user inputted their name and email
     */
    function validation(validateCondition1) {
        return validateCondition1(name_input, email_input)
    }
    
    /**
     * Checks to see whether the user inputted their name or email, both or none.
     * 
     * @param {string} name_input
     * @param {string} email_input 
     * @returns a true or false depending on what the user inputted.
     */
    function checkAny(name_input, email_input) {
        let msg = ""
        let valid = true
        if(name_input.value == "") {
            msg += "name"
            valid = false
        }
        if(email_input.value == "") {
            if(msg) msg += " and ";
            msg += "email"
            valid = false
        }
        if(!valid) {
            alert("Please enter a valid " + msg + ".")
        }
        return valid
    }
    
    /**
     * Changes the contact heading, depending on the user's name
     * 
     * @param {string} heading the title element
     * @param {string} name    the name of the user
     */
    function changeContactHeading(heading, name) {
        heading.textContent = "Thank you " + name + ". I will be in contact with you shortly."
        heading.classList.add("minimise-contact-heading");
    }
}

/**
 * Makes the element bigger depending on how close the mouse is. The closer the mouse is, the bigger
 */
function addBiggerCircleFnc() {
    const rows = document.querySelectorAll(".row");
    let res = [];
    
    rows.forEach(row => res.push(row.children));
    
    for(let row of rows) {
        for(let circle of row.children) {
            makeItBigger(circle, 1.4, 1.1);
        }
    }
    
    /**
     * Changes the size of a specific element and it's neighbouring elements
     * 
     * @param {event} element            the element to be changed
     * @param {number} multiplier        how big the element will grow in size
     * @param {number} smallMultiplier   how big the elements around the main element will grow
     */
    function makeItBigger(element, multiplier, smallMultiplier) {
        // Scales the circle to be slightly bigger and those close to it
        element.addEventListener("mouseover", (e) => {
            element.style.transform = "scale(" + multiplier + ")";
            element.nextElementSibling.style.transform = "scale(" + smallMultiplier + ")";
            element.parentElement.nextElementSibling.style.transform = "scale(" + smallMultiplier + ")";
        })
        
        // Scales the circle back to its original size and those around it
        element.addEventListener("mouseout", (e) => {
            element.style.transform = "scale(1)";
            element.nextElementSibling.style.transform = "scale(1)"
            element.parentElement.nextElementSibling.style.transform = "scale(1)"
        })
    }
}

/**
 * Checks to see what page the user is on and will run the corresponding functions for that page
 */
function renderPage() {
    switch(windowName) {
        case "projects":
            addHoverVideoFnc();
        case "contact":
            addValidation();
        case "awards":
            addBiggerCircleFnc();
    }
}

// Runs everything
navBarSelector();
renderPage();
