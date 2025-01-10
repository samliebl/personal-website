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

function countPoems() {
    // Count the number of elements with the class 'poem'
    const poemElements = document.querySelectorAll('.poem').length;

    // Print the number to the console
    console.log('Number of poem elements:', poemElements);

    // Write the number to the span with ID 'poemCount'
    const poemCountSpan = document.getElementById('poemCount');
    if (poemCountSpan) {
        poemCountSpan.innerText = poemElements;
    } else {
        console.error('Span element with id "poemCount" not found');
    }
}


function generateListNumbers() {
    // Select all top-level bucket list containers
    const bucketLists = document.querySelectorAll('.bucket-list');

    // Iterate over each bucket list
    bucketLists.forEach((list) => {
        const topLevelItems = list.querySelectorAll('.bucket-list-item');

        // Iterate over each top-level list item
        topLevelItems.forEach((topItem, topIndex) => {
            // Set the top-level number, starting at 1 for each bucket list
            const topLevelNumber = `${topIndex + 1}`;
            const topNumberDiv = topItem.querySelector('.number');
            if (topNumberDiv) {
                topNumberDiv.textContent = topLevelNumber;
            } else {
                console.error("No .number div found for top-level item", topItem);
            }

            // Handle second-level items inside each top-level item
            const secondLevelItems = topItem.querySelectorAll('.bucket-list-item-content');
            secondLevelItems.forEach((secondItem, secondIndex) => {
                // Set the second-level number, based on the top level and second level
                const secondLevelNumber = `${topIndex + 1}.${secondIndex + 1}`;
                const secondNumberDiv = secondItem.querySelector('.number');
                if (secondNumberDiv) {
                    secondNumberDiv.textContent = secondLevelNumber;
                } else {
                    console.error("No .number div found for second-level item", secondItem);
                }

                // Handle third-level items inside each second-level item
                const thirdLevelItems = secondItem.querySelectorAll('li');
                thirdLevelItems.forEach((thirdItem, thirdIndex) => {
                    // Set the third-level number, with top, second, and third levels
                    const thirdLevelNumber = `${topIndex + 1}.${secondIndex + 1}.${thirdIndex + 1}`;
                    const thirdNumberDiv = thirdItem.querySelector('.number');
                    if (thirdNumberDiv) {
                        thirdNumberDiv.textContent = thirdLevelNumber;
                    } else {
                        console.error("No .number div found for third-level item", thirdItem);
                    }
                });
            });
        });
    });
}

document.querySelector('.accordion-header').addEventListener('click', function() {
    const accordion = this.parentElement;
    accordion.classList.toggle('open');
});