const fs = require("fs");
const chalk = require("chalk");

const getNotes = function () {
  return "Hello World!";
};

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({ title, body });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken!"));
  }
};

const removeNote = function (title) {
  const notes = loadNotes();
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title;
  });

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse("Note removed!"));
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }
};

const loadNotes = function () {
  try {
    const notesBuffer = fs.readFileSync("./notes.json");
    const notes = JSON.parse(notesBuffer.toString());
    return notes;
  } catch (error) {
    return [];
  }
};

const saveNotes = function (notes) {
  const notesString = JSON.stringify(notes);
  fs.writeFileSync("./notes.json", notesString);
};

module.exports = { getNotes, addNote, removeNote };
