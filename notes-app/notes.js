const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => "Hello World!";

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse("Note removed!"));
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse.bold("Your notes"));
  notes.forEach((note) => {
    console.log(chalk.inverse(note.title));
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const selectedNote = notes.find((note) => note.title === title);

  if (selectedNote) {
    console.log(chalk.bold.inverse(selectedNote.title));
    console.log(chalk.inverse(selectedNote.body));
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

const loadNotes = () => {
  try {
    const notesBuffer = fs.readFileSync("./notes.json");
    const notes = JSON.parse(notesBuffer.toString());
    return notes;
  } catch (error) {
    return [];
  }
};

const saveNotes = (notes) => {
  const notesString = JSON.stringify(notes);
  fs.writeFileSync("./notes.json", notesString);
};

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
