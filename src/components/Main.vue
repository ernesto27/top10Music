<template>

    <div>
      <header-element></header-element>

      <section class="container" style="margin-top:30px">
        <div>
            <button class="button is-primary" @click="openModal" >Agregar disco</button>
            <br />
            <p>Seleccionados: {{selectedAlbums.length}} de 10</p>

            <div class="modal is-activef " v-bind:class="{'is-active': isOpenModal}">
              <div class="modal-background"></div>
              <div class="modal-card">
                <header class="modal-card-head">
                  <p class="modal-card-title">Selecciona un disco</p>
                  <button class="delete" aria-label="close" @click='isOpenModal = false'></button>
                </header>
                <section class="modal-card-body">
                    <div class="autocomplete-input">
                        <p class="control has-icon has-icon-right">
                            <input
                                class="input is-large"
                                placeholder="Search..."
                                v-model="q"
                            >
                        </p>

                        <ul class="options-list" style="margin-top: 2px;">
                            <li class="highlighted" v-for="result in results" @click="selectAlbum(result)">
                                <article class="media">
                                    <figure class="media-left">
                                        <p class="image is-64x64">
                                            <img :src="result.thumb">
                                        </p>
                                    </figure>
                                    <p>
                                        <strong>{{result.title}}</strong>
                                        <br>
                                    </p>
                                </article>
                            </li>
                        </ul>
                    </div>

                </section>
                <footer class="modal-card-foot">
                  <button class="button is-success" :disabled="isDisabled" @click='saveAlbum'>Guardar</button>
                  <button class="button" @click='isOpenModal = false'>Cancel</button>
                </footer>
              </div>
            </div>

            <!-- Listado de albumes seleccionados - placeholder -->

            <div>
                <br />
                <p class="title is-4">My ranking</p>
                <br />


                <div class="box" v-for="(album, index) in selectedAlbums">
                  <article class="media">
                      <span class="tag is-info is-rounded is-medium" style="margin-right: 6px;">{{index + 1}}</span>

                    <div class="media-left">
                      <figure class="image is-64x64">
                        <img :src="album.thumb" alt="Image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>{{album.title}}</strong>
                          <br>
                          {{album.year}}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
            </div>
        </div>

      </section>

      <br />
    </div>
</template>


<script>

    // Crear formulario e ir mostrando resultados a medida que tipea

    import axios from 'axios'
    import api from '../api'

    export default{
        name: 'main',

        data(){
            return{
                q: '',
                results: [],
                isLoading: false,
                isOpenModal: false,
                isDisabled: true,
                isAlbumSelected: false,
                currentAlbumSelected: null,
                selectedAlbums: []
            }
        },

        created(){
        },

        methods:{
            getResults(){
                var that = this;

                if(that.isLoading) return false;

                that.isLoading = true;
                axios.get(`${api.endpoint}?q=${this.q}&year=${api.year}&format=${api.format}&key=${api.key}&secret=${api.secret}&per_page=5`)
                    .then(function(response){
                        var titles = [];
                        var data = [];
                        var results = response.data.results;

                        results.forEach(function(res){
                            console.log(res.title)

                            var isRepeat = false;
                            for( var x = 0; x <= titles.length; x++){
                                if(titles[x] == res.title){
                                    isRepeat = true;
                                    break;
                                }
                            };
                            if(!isRepeat){
                                titles.push(res.title);
                                data.push(res)
                            }
                        })

                        that.results = data;

                        that.isLoading = false;
                    });
            },

            openModal(){
                this.q = '';
                this.isOpenModal = true;

            },

            selectAlbum(result){
                console.log(result)
                this.q = result.title;
                this.isDisabled = false;
                this.currentAlbumSelected = result;
            },

            saveAlbum(){
                console.log('go to save album ')
                console.log(this.currentAlbumSelected)

                this.selectedAlbums.push(this.currentAlbumSelected);
                this.isOpenModal = false;
            }
        },

        watch:{
            q: function(val, oldval){
                if(val.length < oldval.length){
                    this.isDisabled = true;
                }
                // this.isDisabled = true;
                if(val.length < 3){
                    this.results = [];
                    return false;
                }
                console.log('do search')
                this.getResults();
            }
        }
    }

</script>



<style>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}



.autocomplete-input {
  position: relative;
  height: 300px;
}

ul.options-list {
  display: flex;
  flex-direction: column;
  margin-top: -12px;
  border: 1px solid #dbdbdb;
  border-radius: 0 0 3px 3px;
  position: absolute;
  width: 100%;
  overflow: hidden;
}

ul.options-list li {
  width: 100%;
  flex-wrap: wrap;
  background: white;
  margin: 0;
  border-bottom: 1px solid #eee;
  color: #363636;
  padding: 7px;
  cursor: pointer;
}


ul.options-list li.highlighted {
  background: #f8f8f8
}

ul.options-list li:hover{
    background: #e5e5e5;
}



/** LIGHTBOX MARKUP **/

.lightbox {
    /** Default lightbox to hidden */
    display: block;

    /** Position and style */
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    text-align: center;
    top: 0;
    left: 0;
    background: rgba(56, 56, 56, 0.8);
}



</style>
