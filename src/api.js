
var api = {

    database: null,

    init(config){
        firebase.initializeApp(config);
        this.database = firebase.database();
    },

    saveAlbumsSelected(data){
        this.database.ref().child('albums').push(data);
    },

    getRankingAlbumsByUser(uuid, callback){
        this.database
                .ref(`/albums/${uuid}`)
                .once('value')
                .then(function(snapshot){
                    callback(snapshot.val());
                });
    }


}



module.exports = api;
