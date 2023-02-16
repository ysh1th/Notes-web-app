export default class notesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type = "button">New Note</button>
                <div class="notes__list">
                    <div class="notes__list-item notes__list-item--selected"></div>
                </div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="Title...">
                <textarea class="notes__body" placeholder="Write notes here..."></textarea>
            </div>
        `;

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        // todo: hide the note preview
        this.updateNotePreviewVisibility(false); // by default, preview area is hidden
    }

    _createListItemHTML(id, title, body, updated) { // `_` states it is a private method or be used as primary method
        const MAX_BODY_LENGTH = 60;

        return `
        <div class="notes__list-item" data-note-id="${id}">
            <div class="notes__small-title">${title}</div>
            <div class="notes__small-body">
            ${body.substring(0,MAX_BODY_LENGTH)}
            ${body.length > MAX_BODY_LENGTH ? "...": ""}
            </div>
            <div class="notes__small-updated">
            ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
            </div>
        </div>
        `;
        // we used undefined locale in '.toLocaleString' so browser takes default locale set
        // to browser
        // "Locale" refers to a specific set of cultural and linguistic conventions for 
        // formatting and displaying information such as dates, times, numbers, and currency
    }


    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        // empty list
        notesListContainer.innerHTML = "";

        // insert HTML for each note
        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated)); // new Date here as it is ISO timestamp
            
            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // add select/delete events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("are you sure about this?");

                if(doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";
    }
}
