import React, {Component} from 'react';
import './App.css';
import * as firebase from "firebase";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            people: []
        }
    }

    getData() {
        const ref = firebase.database().ref('/people')

        ref.on("value", snapshot => {
            const state = snapshot.val();
            const people = state.filter(Boolean);
            this.setState({people: people}, () => this.state.people.map(item => this.getCharacters(item.id)));
        });
    }

    getCharacters(id) {
        fetch(`https://swapi.dev/api/people/${id}/`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    componentDidMount() {
        this.getData()
    }

    handleVote(type, id) {
        const elementsIndex = this.state.people.findIndex((element) => element.id === id )
        let newArray = [...this.state.people]

        if (type === 'yay') {
            newArray[elementsIndex] = {...newArray[elementsIndex], yay: newArray[elementsIndex].yay + 1}
        }

        if (type === 'nay') {
            newArray[elementsIndex] = {...newArray[elementsIndex], nay: newArray[elementsIndex].nay + 1}
        }

        const ref = firebase.database().ref('/people')

        ref.update(newArray)
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.people.map((person) => {
                        return (
                            <div style={{marginBottom: '10px'}} key={person.id}>
                                <button value={!person ? 0 : person.yay} onClick={() => this.handleVote('yay', person.id)}>YAY: {!person ? 0 : person.yay}</button>
                                <button value={!person ? 0 : person.nay} onClick={() => this.handleVote('nay', person.id)}>NAY: {!person ? 0 : person.nay}</button> <br />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default App;
