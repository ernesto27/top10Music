<template>

    <div>
      <header-element></header-element>

      <section class="container" style="margin-top:30px">
        <div>
            <p style="text-align:center" v-if="!username"><img src="static/ajax-loader.gif" /></p>
            <p class="title is-4" v-if="username">Ranking 2017 de {{ username }}</p>
            <ranking-list :albums="albums"></ranking-list>
        </div>
      </section>
    </div>
</template>

<script>
    import config from '../config';
    import api from '../api';

    export default{
        props: ['uuid'],
        data(){
            return{
                albums:[],
                username: ''
            }
        },

        created(){
            var that = this;
            api.init(config.firebase);
            api.getRankingAlbumsByUser(this.uuid, function(data){
                that.albums = data;
                that.username = data[10].username;
            });
        }
    }

</script>
