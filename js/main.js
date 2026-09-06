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

// Count the poems on a collection page and show the total.
// Pages without a #poemCount element simply don't display a count.

function countPoems() {
    var target = document.getElementById('poemCount');
    if (!target) {
        return 0;
    }

    var count = document.querySelectorAll('.poem').length;
    target.textContent = count.toLocaleString();
    return count;
}

// Run automatically wherever a #poemCount element is present, so pages
// don't each need their own inline call.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', countPoems);
} else {
    countPoems();
}


// Count the words in a novel chapter and show the total.
// Pages without a #wordCount element simply don't display a count.

function countWords() {
    var target = document.getElementById('wordCount');
    if (!target) {
        return 0;
    }

    var total = 0;
    document.querySelectorAll('section.chapter p').forEach(function (p) {
        total += p.textContent.split(/\s+/).filter(function (word) {
            return word.trim().length > 0;
        }).length;
    });

    target.textContent = total.toLocaleString();
    return total;
}

// Run automatically wherever a #wordCount element is present, so chapters
// don't each need their own inline copy of this.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', countWords);
} else {
    countWords();
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
