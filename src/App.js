import React, {Component} from 'react';
import './App.css';
import * as firebase from "firebase";
import StarWarsService from "./services/services";

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
        StarWarsService.getCharacters(id)
            .then(() => {
                let characterIndex = this.state.people.findIndex((character) => character.id === id )
                let newArray = [...this.state.people]

                newArray[characterIndex] = {...newArray[characterIndex]}
                this.setState({
                    people: newArray
                })
            })
            .then(() => {
                this.state.people.map((item) => {
                    this.getImages(item.res.name)
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getImages(q) {
        StarWarsService.getImages(q)
            .then((res) => {
                const elementsIndex = this.state.people.findIndex((element) => element.res.name === q )
                let newArray = [...this.state.people]

                newArray[elementsIndex] = {...newArray[elementsIndex], imageURL: res.data.images_results[Math.floor(Math.random() * 100)].original}

                this.setState({people: newArray})

            })
            .catch((err) => {
                console.log(err)
            })
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
        console.log(this.state.people)
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
