<template>

    <div>
        <section class="hero is-info is-medium is-bold">
            <div class="hero-head">
              <nav class="navbar">
                <div class="container">
                  <div class="navbar-brand">
                    <a class="navbar-item" href="../">
                      <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo">
                    </a>
                    <span class="navbar-burger burger" data-target="navbarMenu">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>

                </div>
              </nav>
            </div>
            <div class="hero-body">
              <div class="container has-text-centered">
                <h1 class="title">
                  TOP 10 ALBUMS OF THE YEAR
                </h1>
                <h2 class="subtitle">
                    choose your selection below
                </h2>
              </div>
            </div>
      </section>


      <section class="container" style="margin-top:30px">
        <div>

            <a class="button is-primary" @click="isOpenModal = true">Seleccionar disco</a>

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
                            <li class="highlighted" v-for="result in results">
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

                    <select>
                        <option value="">10</option>
                        <option value="">10</option>
                        <option value="">10</option>
                    </select>
                </section>


                <footer class="modal-card-foot">
                  <button class="button is-success">Save changes</button>
                  <button class="button" @click='isOpenModal = false'>Cancel</button>
                </footer>
              </div>
            </div>
            
            

            <!-- Listado de albumes seleccionados - placeholder -->

            <div>
                <h3>Ranking </h3>
                <br />
                <div class="box">
                  <article class="media">
                    <div class="media-left">
                      <figure class="image is-64x64">
                        <img src="https://img.discogs.com/mfl8Sd6VIiwlE9LhjQ8icNyyi2k=/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-367084-1263095553.jpeg.jpg" alt="Image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>NIRVANA</strong>
                          <br>
                          NEVERMIND
                        </p>
                      </div>
                    </div>
                  </article>
                </div>

                <div class="box">
                  <article class="media">
                    <div class="media-left">
                      <figure class="image is-64x64">
                        <img src="https://img.discogs.com/mfl8Sd6VIiwlE9LhjQ8icNyyi2k=/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-367084-1263095553.jpeg.jpg" alt="Image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>NIRVANA</strong>
                          <br>
                          NEVERMIND
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
            </div>
        </div>
        
      </section>


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
                isOpenModal: false
            }
        },

        created(){
            console.log('Component created')
            console.log(api)
            // this.getResults();
            
        },

        methods:{
            getResults(){
                var that = this;

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
                    });
            },

            openModal(){

            }
        },

        watch:{
            q: function(val, oldval){
                console.log(val.length)
                if(val.length < 3) return false;
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
