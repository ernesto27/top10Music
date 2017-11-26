<template>
    <div class="column">
        <p class="is-size-4">Rankings generados</p>
        <ul>
            <li v-for="ranking in usersRanking">
                <a :href="ranking.url">{{ ranking.username }}</a>
            </li>
        </ul>
    </div>  
</template>

<script>
export default{
    props: ['usersRanking'],

    
}

</script>
