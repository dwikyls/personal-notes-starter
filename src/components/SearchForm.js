import { Component } from "react";

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        }

        this.onTitleChanged = this.onTitleChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onTitleChanged(event) {
        this.setState((prevState) => {
            return {
                ...prevState,
                title: event.target.value,
            }
        });
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSearch(this.state);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" className="note-search" value={this.state.title} onChange={this.onTitleChanged} placeholder="Cari Note"></input>
            </form>
        );
    }
}

export default SearchForm;
