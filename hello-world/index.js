// import express from "express";

// const app = express();

// app.listen(3600, () => {
//     console.log(`server is listening on port 3400`)
// })

// module.exports = app;


const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs')

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
}

const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

var argv = yargs
    .command('add', 'Add a Note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'list all notes')
    .command(
        'read',
        'Read a specific note',
        {
            title: titleOptions
        }
    )
    .command(
        'remove',
        'Remove a specific note',
        {
            title: titleOptions
        }
    )
    .help()
    .argv;

var command = process.argv[2];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note inserted.');
        notes.printMessage(note);
    } else {
        console.log('Note Title has been taken ')
    }
} else if (command === 'list') {
    var results = notes.getAll();
    console.log(`printing ${results.length} note(s).`)
    results.forEach(note => {
        notes.printMessage(note);
    });
    // if (results) {
    //     console.table(results)
    // }
} else if (command === 'read') {
    const note = notes.readNote(argv.title);
    if (note) {
        console.log('Note Found')
        notes.printMessage(note);
    } else {
        console.log('Note not found')
    }

} else if (command === 'remove') {
    const result = notes.removeNote(argv.title);
    const message = result ? 'Note was removed' : 'Note was not removed'
    console.log(message);

} else {
    console.log('Command not reconized');
}

// console.log('Command : ', command);
// console.log('Process :~  ', process.argv)
// console.log('yArgs :~  ', argv)

