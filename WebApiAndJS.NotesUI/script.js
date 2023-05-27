
const saveButton = document.querySelector('#btnSave');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const notesContainer = document.querySelector('#notescontainer');
const deleteButton = document.querySelector('#btnDelete');

//POST /notes
function addNote (title,description){
const body = {
    title: title,
    description: description,
    isVisible: true
};
    fetch('https://localhost:44383/api/Notes',{
    method : 'POST',
    body: JSON.stringify(body),
    headers: {
        "Content-Type": "application/json"
    }
    })
    .then(data => data.json())
    .then(response => {
        clearForm();  //post yaptigi esnada temizler
        getAllNotes(); //post yaptigi esnada hemde get yapar
    });
}
saveButton.addEventListener('click',function(){

    const id = saveButton.dataset.id;
    if (id){
        updateNote(id,titleInput.value,descriptionInput.value); //update 
    }else{
        addNote(titleInput.value,descriptionInput.value);
    }
});
//GET /notes                               //data-id="${note.id} Put icin eklendi
function displayNotes(notes){
    let allNotes = '';  
    notes.forEach(note => {
                    const noteElement = ` 
                        <div class="note" data-id="${note.id}">  
                        <h3>${note.title}</h3>
                        <p>${note.description}</p>
                        </div>
                        `;
        allNotes += noteElement;       
    });
    notesContainer.innerHTML = allNotes;

    //add event listeners
    document.querySelectorAll('.note').forEach(note => {
        note.addEventListener('click',function(){          
            populateForm(note.dataset.id)  //put

        });
    });
}
function getAllNotes(){
    fetch('https://localhost:44383/api/Notes')
    .then(data => data.json())
    .then(response => displayNotes(response));
  
}
getAllNotes();
//formu temizler
function clearForm(){
    titleInput.value = '';
    descriptionInput.value = ''; 
    deleteButton.classList.add('hidden'); //remove  
}
//PUT/notes
function populateForm(id){
   getNoteById(id);
}

function getNoteById(id){
    fetch(`https://localhost:44383/api/Notes/${id}`)
    .then(data => data.json())
    .then(response => displayNoteInForm(response));
}

function displayNoteInForm(note){
    titleInput.value = note.title;
    descriptionInput.value = note.description;
    deleteButton.classList.remove('hidden'); //remove
    deleteButton.setAttribute('data-id', note.id); //remove
    saveButton.setAttribute('data-id', note.id); //update
}

function updateNote(id,title,description){
    const body = {
        title: title,
        description: description,
        isVisible: true
    };
        fetch(`https://localhost:44383/api/Notes/${id}`,{
        method : 'PUT',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
        })
        .then(data => data.json())
        .then(response => {
            clearForm();  //post yaptigi esnada temizler
            getAllNotes(); //post yaptigi esnada hemde get yapar
        });
}

//DELETE/notes
deleteButton.addEventListener('click',function(){
    const id = deleteButton.dataset.id;
    deleteNote(id);
});

function deleteNote(id){
    fetch(`https://localhost:44383/api/Notes/${id}`,{
    method : 'DELETE',   
    headers: {
        "Content-Type": "application/json"
    }
    })
    .then(response => {  
        clearForm();
        getAllNotes();    
    });
}

