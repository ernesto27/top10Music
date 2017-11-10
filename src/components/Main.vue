<template>

    <h1>Main page</h1>

</template>


<script>

    import axios from 'axios'

    export default{
        name: 'main',

        created: function(){
            console.log('Component created')

            axios.get('https://api.discogs.com/database/search?q=steven%20wi&year=2017&format=album&key=CqxjBdycyAtyPcujhrDo&secret=TMnbpRilxEtsesiQklgRaAZDRiOAeBqO')
                .then(function(response){
                    console.log(response)
                })
        }
    }

</script>
