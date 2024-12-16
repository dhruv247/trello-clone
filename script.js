// Add Card
let addCardButton = document.querySelector('#addCardButton');
addCardButton.addEventListener('click', addCard);
function addCard() {
  let cardName = document.querySelector('#addCardInput').value;
  let laneName = document.querySelector('#addCardDropdown').value;
  if (!cardName.trim()) {
    alert('Please enter a valid card name!');
    document.querySelector('#addCardInput').value = '';
  } else if (laneName === '') {
    alert('Please select a lane!');
    document.querySelector('#addCardDropdown').value = '';
  } else {
    let selectedLane = document.querySelector('#' + laneName);
    let newCard = document.createElement('div');
    newCard.classList.add('taskCard');
    newCard.innerHTML =
      '<p>' +
      cardName +
      '</p><div class="cardButtons"><button class="editCard"><i class="fa-solid fa-pen-to-square p-1"></i></button><button class="deleteCard"><i class="fa-solid fa-x p-1" style="color: #ff0000"></i></button></div>';
    selectedLane.appendChild(newCard);
    // Reset values
    document.querySelector('#addCardInput').value = '';
    document.querySelector('#addCardDropdown').value = '';
  }
}

// Add Lane
let addLaneButton = document.querySelector('#addLaneButton');
addLaneButton.addEventListener('click', addLane);
function addLane() {
  let newLaneName = document.querySelector('#addLaneInput').value;
  let newLaneNameLowerCase = newLaneName.toLowerCase();
  newLaneNameLowerCase = newLaneNameLowerCase.replace(/\s+/g, '');
  let duplicateCheck = true;
  let selectDropdownOptions =
    document.querySelector('#addCardDropdown').options;
  for (let i = 0; i < selectDropdownOptions.length; i++) {
    if (selectDropdownOptions[i].value === newLaneNameLowerCase) {
      duplicateCheck = false;
      break; // Exit the loop after removing the option
    }
  }
  if (!newLaneNameLowerCase.trim()) {
    alert('Please enter a lane name!');
    document.querySelector('#addLaneInput').value = '';
  } else if (!duplicateCheck) {
    alert(
      'Duplicate or highly similar lane name! Please enter a different lane name.'
    );
    document.querySelector('#addLaneInput').value = '';
  } else {
    let laneDropdownOptions = document.querySelector('#addCardDropdown');
    let newOption = document.createElement('option');
    newOption.textContent = newLaneName;
    newOption.value = newLaneNameLowerCase;
    laneDropdownOptions.appendChild(newOption);
    let laneSection = document.querySelector('#laneSection');
    let newLane = document.createElement('div');
    newLane.classList.add('col-md-6', 'mt-5');
    // newLane.setAttribute("id", newLaneNameLowerCase);
    // newLane.innerHTML = '<h4>' + newLaneName + '</h4><div class="lane" id='+newLaneNameLowerCase+'></div>';
    newLane.innerHTML =
      '<div class="d-flex justify-content-between"><h4>' +
      newLaneName +
      '</h4><div class="laneButtons"><button class="editLane"><i class="fa-solid fa-pen-to-square p-1"></i></button><button class="deleteLane"><i class="fa-solid fa-x p-1" style="color: #ff0000"></i></button></div></div><div class="lane" id=' +
      newLaneNameLowerCase +
      '></div>';
    laneSection.appendChild(newLane);
    document.querySelector('#addLaneInput').value = '';
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
    let currentParentLane = e.target.closest('.col-md-6');

    if (currentParentLane.querySelector('.lane').innerHTML.trim() === '') {
      e.target.closest('.col-md-6').remove();
      let currentLaneID = currentParentLane.querySelector('.lane').id;
      // console.log(currentLaneID);
      let laneDropdownOptions = document.querySelector('select').options;
      for (let i = 0; i < laneDropdownOptions.length; i++) {
        if (laneDropdownOptions[i].value === currentLaneID) {
          laneDropdownOptions[i].remove(); // Removes the option with the specified value
          break; // Exit the loop after removing the option
        }
      }
    } else {
      alert('The current lane is not empty!');
    }
  }
});

// Edit Lane
document.querySelector('#laneSection').addEventListener('click', (e) => {
  if (e.target.closest('.editLane')) {
    let currentParentLane = e.target.closest('.col-md-6');
    if (currentParentLane.querySelector('.lane').innerHTML.trim() === '') {
      let newLaneName = prompt('Enter new card name!');
      let newLaneNameLowerCase = newLaneName.toLowerCase().replace(/\s+/g, '');
      // console.log(newLaneNameLowerCase);

      let laneDropdownOptions = document.querySelector('select').options;
      for (let i = 0; i < laneDropdownOptions.length; i++) {
        if (
          laneDropdownOptions[i].value ===
          currentParentLane.querySelector('.lane').id
        ) {
          laneDropdownOptions[i].value = newLaneNameLowerCase; // Removes the option with the specified value
          laneDropdownOptions[i].textContent = newLaneName;
          break; // Exit the loop after removing the option
        }
      }
      currentParentLane.querySelector('.lane').id = newLaneNameLowerCase;
      currentParentLane.querySelector('h4').textContent = newLaneName;
    } else {
      alert(
        'The current lane is not empty! Please delete cards before changing elements'
      );
    }
  }
});
