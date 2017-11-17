<template>
    <div>
        <div class="box" v-for="(album, index) in albums">
          <article class="media" v-if="index < 10">
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

</template>

<script>

    export default {
        props: ['albums'],

        created(){
            console.log(this.albums)
        }
    }

</script>
