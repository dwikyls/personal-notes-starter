import { Component } from "react";
import { getInitialData } from "../utils";
import CreateForm from "./CreateForm";
import NoteCard from "./NoteCard";
import SearchForm from "./SearchForm";

class Notes extends Component {
    constructor(props) {
        super(props);
        console.log('building...')
        this.state = {
            notes: getInitialData(),
            tempNotes: [],
        }

        this.state.tempNotes = [...this.state.notes];

        this.onDelete = this.onDelete.bind(this);
        this.onArchieve = this.onArchieve.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.addNote = this.addNote.bind(this);
    }

    onDelete(id) {
        const notes = this.state.notes.filter(note => note.id !== id);
        const tempNotes = this.state.tempNotes.filter(tempNote => tempNote.id !== id);

        this.setState({ notes, tempNotes });
        this.props.showToast("Note berhasil dihapus");
    }

    onArchieve(id, archived) {
        const indexNote = this.state.notes.findIndex(note => note.id === id);
        const notes = [...this.state.notes];
        notes[indexNote].archived = archived;

        this.setState({ notes });
        this.props.showToast("Note berhasil dipindahkan");
    }

    onSearch({ title }) {
        let notes = [...this.state.tempNotes];

        if (title.trim() !== "") {
            notes = notes.filter(function (note) {
                return note.title.toLowerCase().includes(title.toLowerCase());
            });
        }

        this.setState({ notes });
    }

    addNote({ title, body }) {
        const newNotes = [
            ...this.state.tempNotes,
            {
                id: +new Date(),
                title,
                body,
                archived: false,
                createdAt: new Date(Date.now()).toISOString()
            },
        ];

        this.setState({
            notes: newNotes,
            tempNotes: newNotes
        });

        this.props.showToast("Note berhasil ditambahkan");
    }

    render() {
        const newNotes = this.state.notes.filter(function (note) {
            return note.archived === false;
        });

        const arcvhievedNotes = this.state.notes.filter(function (note) {
            return note.archived === true;
        });

        return (
            <div>
                <div className="note-app__header">
                    <h1>Notes</h1>
                    <SearchForm onSearch={this.onSearch}></SearchForm>
                </div>
                <div className="note-app__body">
                    <CreateForm addNote={this.addNote}></CreateForm>
                    <h2>Catatan Aktif</h2>
                    {
                        newNotes.length > 0 ? <div className="notes-list">
                            {newNotes.map((note) => {
                                return (
                                    <NoteCard
                                        key={note.id}
                                        id={note.id}
                                        title={note.title}
                                        body={note.body}
                                        archived={note.archived}
                                        createdAt={note.createdAt}
                                        onDelete={this.onDelete}
                                        onArchieve={this.onArchieve} />
                                );
                            })}
                        </div> : <p className="notes-list__empty-message">Tidak ada catatan</p>
                    }
                    <h2>Arsip</h2>
                    {
                        arcvhievedNotes.length > 0 ? <div className="notes-list">
                            {arcvhievedNotes.map((note) => {
                                return (
                                    <NoteCard
                                        key={note.id}
                                        id={note.id}
                                        title={note.title}
                                        body={note.body}
                                        archived={note.archived}
                                        createdAt={note.createdAt}
                                        onDelete={this.onDelete}
                                        onArchieve={this.onArchieve} />
                                );
                            })}
                        </div> : <p className="notes-list__empty-message">Tidak ada catatan</p>
                    }
                </div >
            </div>
        );
    }
}

export default Notes;
