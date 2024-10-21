

/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/
/**********************************************************************/

const inputContainer = document.getElementById('inputContainer');
const nextButton = document.getElementById('nextButton');
const totalInputs = 10;
const inputsPerPage = 3;//adjustable

// Define the mapping of SDG titles to input ranges
const sdgMapping = {
    'SDG01': [1, 2], 
    'SDG02': [3, 4], 
    'SDG03': [5, 6],
    'SDG04': [7, 8],
    'SDG'
    // Add other SDG mappings here...
};

let currentPage = 0;
let userInputs = {};
const pageTitles = [
    "SDG01",
    "SDG02",
    "SDG03",
    "SDG04",
    "SDG05",
    "SDG06",
    "SDG07",
    "SDG08",
    "SDG09",
    "SDG010",
    "SDG011",
    "SDG012",
    "SDG013",
    "SDG014",
    "SDG015",
    "SDG016",
    "SDG017",
    // Add more titles as needed
];


function createInputs(sdgTitle) {
    // Clear the existing inputs
    inputContainer.innerHTML = '';

    // Get the input range for the selected SDG title
    const inputRange = sdgMapping[sdgTitle];
    if (!inputRange) {
        console.error('No input range found for', sdgTitle);
        return;
    }

    // Destructure the start and end values from the input range
    const [start, end] = inputRange;

    // Generate input fields for the specified range
    for (let i = start; i <= end; i++) {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        const label = document.createElement('label');
        label.textContent = `I ${i}: `;

        const inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.id = `i${i}`;
        inputField.value = userInputs[`i${i}`] || '';

        // Use only one event listener, 'input' for real-time updates
        inputField.addEventListener('input', (e) => {
            userInputs[`i${i}`] = e.target.value;
        });

        // Append the label and input field to the container
        inputGroup.appendChild(label);
        inputGroup.appendChild(inputField);
        inputContainer.appendChild(inputGroup);
    }
}

function updatePage() {
    const start = currentPage * inputsPerPage + 1;
    const end = Math.min(start + inputsPerPage - 1, totalInputs);
    
    // Update the page title
    const pageTitle = document.getElementById('pageTitle');
    pageTitle.textContent = pageTitles[currentPage] || `Page ${currentPage + 1}`;

    createInputs(start, end);

    nextButton.textContent = end === totalInputs ? 'Finish' : 'Next';
}


nextButton.addEventListener('click', () => {
    if (currentPage * inputsPerPage + inputsPerPage < totalInputs) {
        currentPage++;
        updatePage();
    } else {
        console.log('All user inputs:', userInputs);
        processUserInputs(userInputs);
        alert('Form completed! You can now submit the data.');
        // If you want to submit automatically:
        // submitInput();
    }
});

function processUserInputs(inputs) {
    for (let key in inputs) {
        let inputElement = document.getElementById(key);
        if (inputElement) {
            inputElement.value = inputs[key];
        }
    }
    console.log('All inputs are ready for submission');
    // You can call submitInput() here if you want it to run automatically
    // submitInput();
}

function submitInput() {
    const university = document.getElementById('userInput').value;
    let sum = 0;

    // Use the userInputs object instead of accessing DOM elements
    for (let i = 1; i <= 34; i++) {
        const value = userInputs[`i${i}`];
        if (value) {
            sum += Number(value);
        }
    }
    
    console.log('University:', university);

    alert("University: " + university + " and the sum of values is: " + sum);
}

// Initialize the first page
updatePage();
