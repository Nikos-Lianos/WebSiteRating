const inputContainer = document.getElementById('inputContainer');
const nextButton = document.getElementById('nextButton');
const totalInputs = 34;

// Define the mapping of SDG titles to input ranges
const sdgMapping = {
    'SDG01': [1, 2], 
    'SDG02': [3, 4], 
    'SDG03': [5, 6],
    'SDG04': [7, 8],
    'SDG05': [9, 12],
    'SDG06': [13, 14],
    'SDG07': [15, 17],
    'SDG09': [18, 18],
    'SDG10': [19, 19],
    'SDG11': [20, 21],
    'SDG12': [22, 24],
    'SDG13': [25, 26],
    'SDG14': [27, 27],
    'SDG15': [28, 28],
    'SDG16': [29, 29],
    'SDG17': [30, 34]
};

let currentPage = 0;
let userInputs = {};
const pageTitles = Object.keys(sdgMapping);

function createInputs(sdgTitle) {
    inputContainer.innerHTML = '';

    const inputRange = sdgMapping[sdgTitle];
    if (!inputRange) {
        console.error('No input range found for', sdgTitle);
        return;
    }

    const [start, end] = inputRange;

    for (let i = start; i <= end; i++) {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';

        const label = document.createElement('label');
        label.textContent = `I ${i}: `;

        const inputField = document.createElement('input');
        inputField.type = 'number';
        inputField.id = `i${i}`;
        inputField.value = userInputs[`i${i}`] || '';

        inputField.addEventListener('input', (e) => {
            userInputs[`i${i}`] = e.target.value;
        });

        inputGroup.appendChild(label);
        inputGroup.appendChild(inputField);
        inputContainer.appendChild(inputGroup);
    }
}

function updatePage() {
    const pageTitle = document.getElementById('pageTitle');
    pageTitle.textContent = pageTitles[currentPage] || `Page ${currentPage + 1}`;

    createInputs(pageTitles[currentPage]);

    nextButton.textContent = currentPage === pageTitles.length - 1 ? 'Finish' : 'Next';
}

nextButton.addEventListener('click', () => {
    if (currentPage < pageTitles.length - 1) {
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
}

function submitInput() {
    const university = document.getElementById('userInput').value;

    // Define multiplication factors for each input
    const multiplicationFactors = {
        'i1': 0.784, 'i2': 0.216, 'i3': 0.58, 'i4': 0.42, 'i5': 0.663, 
        'i6': 0.337, 'i7': 0.701, 'i8': 0.299, 'i9': 0.193, 'i10': 0.257,
        'i11': 0.427, 'i12': 0.123, 'i13': 0.552, 'i14': 0.448, 'i15': 0.58,
        'i16': 0.264, 'i17': 0.176, 'i18': 1, 'i19': 1, 'i20': 0.465,
        'i21': 0.535, 'i22': 0.291, 'i23': 0.422, 'i24': 0.266, 'i25': 0.589,
        'i26': 0.411, 'i27': 1, 'i28': 1, 'i29': 1, 'i30': 0.241,
        'i31': 0.322, 'i32': 0.18, 'i33': 0.114, 'i34': 0.143
    };

    let sum = 0;

    // Loop through the inputs, multiply by the factor, and sum the results
    for (let i = 1; i <= 34; i++) {
        const value = userInputs[`i${i}`];
        if (value) {
            // Multiply the input value by its corresponding factor
            const factor = multiplicationFactors[`i${i}`] || 1; // Default to 1 if no factor is defined
            sum += Number(value) * factor;
        }
    }

    console.log('University:', university);
    console.log('Sum of weighted values:', sum);
    alert("University: " + university + " and the weighted sum of values is: " + sum);
}


// Initialize the first page
updatePage();