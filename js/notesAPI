export default class notesAPI {

    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
        
        return notes.sort((a,b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
        // if update prop. of first object greater (more recent) second object: return -1 : first object
        // come before second object
        // if update prop. of second object > first object: return 1: second object should
        // before first object
    }

    static saveNotes(noteToSave){
        const notes = notesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);

        // edit/update
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random()* 1000000);
        noteToSave.updated = new Date().toISOString();
        notes.push(noteToSave);
        }

        
        

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNote(id) {
        const notes = notesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}

