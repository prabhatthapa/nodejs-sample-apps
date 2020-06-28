const chalk = require("chalk");
const yargs = require("yargs");

const { getNotes, addNote, removeNote, listNotes } = require("./notes.js");
const { command, describe, string, argv } = require("yargs");

// fs.appendFileSync("note.txt", "Welcome to NodeJS");

const notes = getNotes();

// console.log(chalk.green.bold("Success!"));

// console.log(process.argv);

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: (argv) => {
    addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: () => {
    removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "List notes",
  handler: () => {
    listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  handler: () => {},
});

// console.log(yargs.argv);
yargs.parse();
