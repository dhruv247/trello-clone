// DOM Elements - Grouping all our element selections at the top
const elements = {
    todoLane: document.getElementById('todo'),
    completedLane: document.getElementById('completed'),
    addCardButton: document.getElementById('addCard'),
    cardInput: document.getElementById('cardInput'),
    lanesContainer: document.getElementById('lanes-container'),
    addLaneButton: document.getElementById('addLane'),
    laneInput: document.getElementById('laneInput'),
    laneSelect: document.getElementById('laneSelect')
};

// Card Functions
function createCard(taskName) {
    // Create main card element
    const card = document.createElement('div');
    card.className = 'card p-2 bg-white shadow';
    card.draggable = true;
    
    // Create card content
    const content = `
        <div class="d-flex justify-content-between align-items-center">
            <span>${taskName}</span>
            <button class="btn btn-danger btn-sm ms-2">&times;</button>
        </div>
    `;
    card.innerHTML = content;
    
    // Add delete functionality
    card.querySelector('button').onclick = () => card.remove();
    
    // Add drag functionality
    setupCardDrag(card);
    
    return card;
}

function setupCardDrag(card) {
    card.addEventListener('dragstart', (e) => {
        card.id = `card-${Date.now()}`; // Add temporary ID
        e.dataTransfer.setData('cardId', card.id);
    });

    card.addEventListener('dragend', () => {
        card.id = ''; // Remove temporary ID
    });
}

// Lane Functions
function createLane(laneName) {
    // Create lane structure
    const lane = document.createElement('div');
    lane.className = 'col-md-6 mt-3';
    
    const laneId = `lane-${Date.now()}`;
    const content = `
        <div class="d-flex justify-content-between align-items-center">
            <h4>${laneName}</h4>
            <button class="btn btn-danger btn-sm">&times;</button>
        </div>
        <div class="lane bg-light" id="${laneId}"></div>
    `;
    lane.innerHTML = content;
    
    // Setup lane functionality
    setupLaneDropping(lane.querySelector('.lane'));
    setupLaneDelete(lane, laneId);
    addLaneToDropdown(laneName, laneId);
    
    return lane;
}

function setupLaneDropping(laneDiv) {
    laneDiv.addEventListener('dragover', (e) => e.preventDefault());
    laneDiv.addEventListener('drop', (e) => {
        e.preventDefault();
        const card = document.getElementById(e.dataTransfer.getData('cardId'));
        if (card) laneDiv.appendChild(card);
    });
}

function setupLaneDelete(lane, laneId) {
    lane.querySelector('button').onclick = () => {
        lane.remove();
        // Remove from dropdown
        const option = elements.laneSelect.querySelector(`option[value="${laneId}"]`);
        if (option) option.remove();
    };
}

function addLaneToDropdown(laneName, laneId) {
    const option = document.createElement('option');
    option.value = laneId;
    option.textContent = laneName;
    elements.laneSelect.appendChild(option);
}

// Event Listeners
elements.addCardButton.addEventListener('click', () => {
    const taskName = elements.cardInput.value.trim();
    const selectedLaneId = elements.laneSelect.value;
    const selectedLane = document.getElementById(selectedLaneId);
    
    if (taskName) {
        selectedLane.appendChild(createCard(taskName));
        elements.cardInput.value = '';
    } else {
        alert('Please enter a task name');
    }
});

elements.addLaneButton.addEventListener('click', () => {
    const laneName = elements.laneInput.value.trim();
    if (laneName) {
        elements.lanesContainer.appendChild(createLane(laneName));
        elements.laneInput.value = '';
    } else {
        alert('Please enter a lane name');
    }
});

// Setup initial lanes for drag and drop
[elements.todoLane, elements.completedLane].forEach(lane => {
    setupLaneDropping(lane);
});