
var api = {

    database: null,

    init(config){
        console.log(config)
        firebase.initializeApp(config);
        console.log(firebase)
        this.database = firebase.database();
    },

    saveAlbumsSelected(data){
        console.log(this.database)
        firebase.database().ref().child('albums').push(data);
    }


}



module.exports = api;
