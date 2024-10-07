// Select elements
const noteInput = document.getElementById('note-input');
const addNoteButton = document.getElementById('add-note');
const notesList = document.getElementById('notes-list');

// Load notes from local storage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        addNoteToDOM(note);
    });
}

// Function to add a note to the DOM
function addNoteToDOM(noteText) {
    const li = document.createElement('li');
    li.innerHTML = `
        ${noteText}
        <button class="edit-note">Edit</button>
        <button class="delete-note">Delete</button>
    `;
    notesList.appendChild(li);

    // Add delete functionality
    const deleteButton = li.querySelector('.delete-note');
    deleteButton.addEventListener('click', function() {
        notesList.removeChild(li);
        updateLocalStorage();
    });

    // Add edit functionality
    const editButton = li.querySelector('.edit-note');
    editButton.addEventListener('click', function() {
        noteInput.value = noteText; // Set input to the note text
        notesList.removeChild(li); // Remove the note from the list
        updateLocalStorage(); // Update local storage
    });
}

// Function to update local storage
function updateLocalStorage() {
    const notes = [];
    const noteItems = notesList.querySelectorAll('li');
    noteItems.forEach(item => {
        notes.push(item.firstChild.textContent.trim());
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to add a note
addNoteButton.addEventListener('click', function() {
    const noteText = noteInput.value.trim();
    if (noteText) {
        addNoteToDOM(noteText);
        noteInput.value = '';
        updateLocalStorage();
    }
});

// Load notes when the app starts
loadNotes();
