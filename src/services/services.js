import axios from "axios";

const StarWarsService = {

    getCharacters: (id) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `https://swapi.dev/api/people/${id}/`,
            }).then((resp) => {
                resolve(resp)
            }).catch((err) => {
                reject(err)
            });
        });
    },

    getImages: (q) => {
        let params = {
            api_key: "7709a330315816dcca53bebaed84d80e1086e94b37382354ece88f6958819cbb",
            engine: "google",
            ijn: 0,
            q: q,
            google_domain: "google.com",
            tbm: "isch"
        }

        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url: `https://cors-anywhere.herokuapp.com/https://serpapi.com/search?api_key=${params.api_key}&engine=${params.engine}&ijn=${params.ijn}&q=${params.q}&google_domain=${params.google_domain}&tbm=${params.tbm}`,
            }).then((resp) => {
                resolve(resp)
            }).catch((err) => {
                reject(err)
            });
        });
    },
};

export default StarWarsService;
