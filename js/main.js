// Site scripts

// Display the current year in the footer.

function displayCurrentYear() {
    // Get the current date
    var currentDate = new Date();

    // Get the current year from the date object
    var currentYear = currentDate.getFullYear();

    // Display the current year in a specified element with id "yearDisplay"
    document.getElementById('yearDisplay').innerText = currentYear;
}

