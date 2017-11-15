
var api = {

    database: null,

    init(config){
        firebase.initializeApp(config);
        this.database = firebase.database();
    },

    saveAlbumsSelected(data){
        return this.database.ref().child('albums').push(data).getKey();
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
