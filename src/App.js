import { Component } from 'react';
import Notes from './components/Notes';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            msg: ""
        }

        this.showToast = this.showToast.bind(this);
    }

    showToast = (msg) => {
        // show toast
        this.setState({ isShow: true, msg });

        setTimeout(() => {
            // delete toast
            this.setState({ isShow: false });
        }, 3000);
    }

    render() {
        return (
            <div className="App">
                <Notes showToast={this.showToast}></Notes>
                <div id="snackbar" className={this.state.isShow ? "show" : ""}>{this.state.msg}</div>
            </div>
        );
    }
}

export default App;
