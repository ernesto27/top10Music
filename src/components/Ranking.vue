<template>

    <div>
      <header-element></header-element>

      <section class="container" style="margin-top:30px">
        <div>

            <p class="title is-4">Ranking 2017 de ernesto</p>
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
                albums:[]
            }
        },

        created(){
            var that = this;
            api.getRankingAlbumsByUser(this.uuid, function(data){
                that.albums = data;

            });
        }
    }

</script>
