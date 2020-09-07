import React, {Component} from 'react';
import './App.css';
import * as firebase from "firebase";
import axios from 'axios'

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
            .then(person => person.json())
            .then(
                (res) => {
                    const elementsIndex = this.state.people.findIndex((element) => element.id === id )
                    let newArray = [...this.state.people]

                    newArray[elementsIndex] = {...newArray[elementsIndex]}
                    this.setState({
                        people: newArray
                    }, () => this.state.people.map(item => console.log(item.res.name)))
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    getImages(q) {
        let params = {
            api_key: "7709a330315816dcca53bebaed84d80e1086e94b37382354ece88f6958819cbb",
            engine: "google",
            ijn: 0,
            q: "han solo",
            google_domain: "google.com",
            tbm: "isch"
        }

        params = {
            ...params,
            q: q
        }

        fetch(`https://cors-anywhere.herokuapp.com/https://serpapi.com/search?api_key=${params.api_key}&engine=${params.engine}&ijn=${params.ijn}&q=${params.q}&google_domain=${params.google_domain}&tbm=${params.tbm}`)
            .then(res => res.json())
            .then(res => {
                console.log(res.images_results)
            },
                (err) => {
                console.log(err)
                }
            )
    }

    componentDidMount() {
        this.getData()
        this.getImages()
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
