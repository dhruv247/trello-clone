// Add Card
let addCardButton = document.querySelector('#addCardButton');
addCardButton.addEventListener('click', addCard);
function addCard() {
  let cardName = document.querySelector('#addCardInput').value;
  let laneName = document.querySelector('#addCardDropdown').value;

  // to check that name is not an empty string ("" means false in js)
  if (!cardName.trim()) {
    alert('Please enter a valid card name!');
    document.querySelector('#addCardInput').value = ''; // Reset field
    // forces lane selection
  } else if (laneName === '') {
    alert('Please select a lane!');
    // card name is valid
  } else {
    let selectedLane = document.querySelector('#' + laneName); // convert lane to id (html usage) form
    // New Card Structure and content
    let newCard = document.createElement('div');
    newCard.classList.add('taskCard');
    newCard.innerHTML =
      '<p>' +
      cardName +
      '</p><div class="cardButtons"><button class="editCard"><i class="fa-solid fa-pen-to-square p-1"></i></button><button class="deleteCard"><i class="fa-solid fa-x p-1" style="color: #ff0000"></i></button></div>';
    selectedLane.appendChild(newCard);
    // Reset Fields
    document.querySelector('#addCardInput').value = '';
    document.querySelector('#addCardDropdown').value = '';
  }
}

// lane name validity check
function validLaneName(newLaneNameLowerCase) {
  // Duplicate lane name check as an arrow function
  const duplicateLaneCheck = (newLaneName) => {
    let selectDropdownOptions = document.querySelector('#addCardDropdown').options;
    for (let i = 0; i < selectDropdownOptions.length; i++) {
      if (selectDropdownOptions[i].value === newLaneName) {
        return true;
      }
    }
    return false; // Return false if no duplicates found
  };

  if (!newLaneNameLowerCase.trim()) {
    alert('Please enter a lane name!');
    document.querySelector('#addLaneInput').value = '';
    return false;
  } else if (duplicateLaneCheck(newLaneNameLowerCase)) {
    alert(
      'Duplicate or highly similar lane name! Please enter a different lane name.'
    );
    document.querySelector('#addLaneInput').value = '';
    return false;
  }
  // Additional checks (Due to restrictions on id naming)
  else if (/^\d|[.,]/.test(newLaneNameLowerCase)) {
    alert(
      'Lane name starts with a number of contains "," or "."! Please enter a new lane name.'
    );
    document.querySelector('#addLaneInput').value = '';
    return false;
  } else {
    return true;
  }
}

// Add Lane
let addLaneButton = document.querySelector('#addLaneButton');
addLaneButton.addEventListener('click', addLane);
function addLane() {
  let newLaneName = document.querySelector('#addLaneInput').value;
  let newLaneNameLowerCase = newLaneName.toLowerCase(); // formatting for id (html usage) format
  newLaneNameLowerCase = newLaneNameLowerCase.replace(/\s+/g, ''); // Remove spaces for formatting for id
  // check if lane is not valid
  if (!validLaneName(newLaneNameLowerCase)) {
    // function carries out checks
  }
  // all checks pass
  else {
    let laneDropdownOptions = document.querySelector('#addCardDropdown');
    // creating new option structure for lane selection dropdown
    let newOption = document.createElement('option');
    newOption.textContent = newLaneName;
    newOption.value = newLaneNameLowerCase;
    laneDropdownOptions.appendChild(newOption);
    // creating a lane in the lane section
    let laneSection = document.querySelector('#laneSection');
    let newLane = document.createElement('div');
    newLane.classList.add('col-md-6', 'mt-5');
    newLane.innerHTML =
      '<div class="d-flex justify-content-between"><h4>' +
      newLaneName +
      '</h4><div class="laneButtons"><button class="editLane"><i class="fa-solid fa-pen-to-square p-1"></i></button><button class="deleteLane"><i class="fa-solid fa-x p-1" style="color: #ff0000"></i></button></div></div><div class="lane" id=' +
      newLaneNameLowerCase +
      '></div>';
    laneSection.appendChild(newLane);
    document.querySelector('#addLaneInput').value = ''; // Reset field
  }
}

// Delete Card
document.querySelector('#laneSection').addEventListener('click', (e) => {
  if (e.target.closest('.deleteCard')) {
    e.target.closest('.taskCard').remove();
  }
});

// Edit Card
document.querySelector('#laneSection').addEventListener('click', (e) => {
  if (e.target.closest('.editCard')) {
    let newCardName = prompt('Enter new card name!');
    e.target.closest('.taskCard').querySelector('p').textContent = newCardName;
  }
});

// Delete Lane
document.querySelector('#laneSection').addEventListener('click', (e) => {
  if (e.target.closest('.deleteLane')) {
    let currentParentLane = e.target.closest('.col-md-6'); // Selects the lane div

    // checks if the lane contains any cards
    if (currentParentLane.querySelector('.lane').innerHTML.trim() === '') {
      e.target.closest('.col-md-6').remove();
      // Remove the lane from the dropdown
      let currentLaneID = currentParentLane.querySelector('.lane').id;
      let laneDropdownOptions = document.querySelector('select').options;
      for (let i = 0; i < laneDropdownOptions.length; i++) {
        if (laneDropdownOptions[i].value === currentLaneID) {
          laneDropdownOptions[i].remove(); // Removes the option with the specified value
          break;
        }
      }
    }
    // If the lane contains any cards
    else {
      alert('The current lane is not empty!');
    }
  }
});

// Edit Lane
document.querySelector('#laneSection').addEventListener('click', (e) => {
  if (e.target.closest('.editLane')) {
    let currentParentLane = e.target.closest('.col-md-6'); // Selects the lane div
    // Checks if lane is empty
    if (currentParentLane.querySelector('.lane').innerHTML.trim() === '') {
      let newLaneName = prompt('Enter new card name!');
      let newLaneNameLowerCase = newLaneName.toLowerCase().replace(/\s+/g, '');
      // check if the new (edited) lane name is valid
      if (validLaneName(newLaneNameLowerCase)) {
        // checks have passed
        let laneDropdownOptions = document.querySelector('select').options;
        // change name in the lane dropdown
        for (let i = 0; i < laneDropdownOptions.length; i++) {
          if (
            laneDropdownOptions[i].value ===
            currentParentLane.querySelector('.lane').id
          ) {
            laneDropdownOptions[i].value = newLaneNameLowerCase;
            laneDropdownOptions[i].textContent = newLaneName;
            break;
          }
        }
        // change name on the lane heading lane id
        currentParentLane.querySelector('.lane').id = newLaneNameLowerCase;
        currentParentLane.querySelector('h4').textContent = newLaneName;
      }
    }
    // Lane is not empty
    else {
      alert(
        'The current lane is not empty! Please delete cards before changing elements'
      );
    }
  }
});