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

    export default{

        data(){
            return{
                albums:[{
                    id: 1,
                    thumb:"https://img.discogs.com/Niv7xlgmzvCCOSJnVRx54cCdfBc=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-10723372-1503106437-4750.jpeg.jpg",
                    title: 'steven wilson'

                },{
                    id: 2,
                    thumb:"https://img.discogs.com/vONNE3G-rRTNTxdla1cYtyFnQpQ=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-10394779-1496599474-1491.jpeg.jpg",
                    title: 'obituary'
                }]
            }
        },

        created(){

        }
    }

</script>
