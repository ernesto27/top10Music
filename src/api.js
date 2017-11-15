
var api = {

    database: null,
    firebase: null,

    init(config){
        if(!this.firebase){
            this.firebase = firebase.initializeApp(config);
        }
        this.database = this.firebase.database();
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
