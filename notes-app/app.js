const chalk = require("chalk");
const yargs = require("yargs");

const getNotes = require("./notes.js");
const { command, describe, string } = require("yargs");

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
  handler: function (argv) {
    console.log(`Note title - ${argv.title} and body ${argv.body}`);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  handler: function () {
    console.log("Remove the note");
  },
});

yargs.command({
  command: "list",
  describe: "List notes",
  handler: function () {
    console.log("List notes");
  },
});

yargs.command({
  command: "read",
  describe: "Read a note",
  handler: function () {
    console.log("Read the note");
  },
});

// console.log(yargs.argv);
yargs.parse();
