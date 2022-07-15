import { Component } from "react";

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
        }

        this.onTitleChanged = this.onTitleChanged.bind(this);
        this.onBodyChanged = this.onBodyChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onTitleChanged(event) {
        if (event.target.value.length <= 50) {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    title: event.target.value,
                }
            });
        }
    }

    onBodyChanged(event) {
        this.setState((prevState) => {
            return {
                ...prevState,
                body: event.target.value,
            }
        });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.title.trim().length > 0 && this.state.body.trim().length > 0) {
            this.props.addNote(this.state);
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit} className="note-input">
                <h2>Buat Catatan</h2>
                <p className="note-input__title__char-limit">Batas judul: {50 - this.state.title.length} karakter</p>
                <input type="text" value={this.state.title} onChange={this.onTitleChanged} placeholder="Judul Note"></input>
                <textarea type="textarea" value={this.state.body} onChange={this.onBodyChanged} placeholder="Isi Note"></textarea>
                <button type="submit" className="primary">Tambah Note</button>
            </form>
        );
    }
}

export default CreateForm;
