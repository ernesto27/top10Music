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
            <h1>Selecciona tus discos favoritos</h1>
            <div class="field">
                <div class="control">
                    <input class="input" type="text" placeholder="Text input" v-model="q">
                </div>
            </div>

            <ul>
                <li v-for="result in results" v-text="result.title"></li>
            </ul>

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

<!--     <div>
        <h1>Main page</h1>

        <input type="text" v-model="q"/>

        <ul>
            <li v-for="result in results" v-text="result.title"></li>
        </ul>
    </div> -->

    
</template>


<script>

    // Crear formulario e ir mostrando resultados a medida que tipea

    import axios from 'axios'
    import api from '../api'

    export default{
        name: 'main',

        data(){
            return{
                q: 'the war',
                results: [{}]
            }
        },

        created(){
            console.log('Component created')
            console.log(api)
            this.getResults();
            
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
