<template>
    
    <div>
        <h1>Main page</h1>

        <input type="text" v-model="q"/>

        <ul>
            <li v-for="result in results" v-text="result.title"></li>
        </ul>
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
