const fs = require('fs');
const fileName = 'notes-data.json';

const fetchNotes = () => {
  try {
    let noteString = fs.readFileSync(fileName);
    return JSON.parse(noteString);
  } catch (error) {
    console.log('No file was found with name : ' + fileName);
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync(fileName, JSON.stringify(notes));
};

const addNote = (title, body) => {
  // console.log('Adding Note', title, body)
  let notes = fetchNotes();
  let note = { title, body };
  let duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  } else {
    console.log("Duplicate key was found and data was not inserted into the database");
  }
};

const getAll = () => {
  return fetchNotes()
};

const removeNote = (title) => {
  console.log('trying to remove Note with title :~ ', title)
  // fetch notes
  let notes = fetchNotes();

  // filter notes, removing the one with title argument
  let modifiedNotes = notes.filter((note) => note.title !== title);

  // save notes
  saveNotes(modifiedNotes);

  return notes.length !== modifiedNotes.length;
};

const readNote = (title) => {
  console.log('trying to read note for title :~', title);
  const notes = fetchNotes();
  const note = notes.filter((node) => node.title === title);
  return note[0];
};

const printMessage = (note) => {
  console.log('---');
  console.log(`Title : ${note.title}`);
  console.log(`Body  : ${note.body}`);
}

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote,
  printMessage
};
