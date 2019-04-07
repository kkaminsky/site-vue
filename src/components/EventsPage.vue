<template>
    <v-container
            grid-list-xl
    >

        <v-layout wrap>
            <v-flex xs12>
                <slot/>
            </v-flex>

            <feed-card
                    v-for="(article, i) in paginatedArticles"
                    :key="article.id"
                    :size="layout[i]"
                    :value="article"


            />
        </v-layout>

        <v-layout align-center>
            <v-flex xs3>
                <base-btn
                        v-if="page !== 1"
                        class="ml-0"
                        title="Previous page"
                        square
                        @click="page--"
                >
                    <v-icon>info</v-icon>
                </base-btn>
            </v-flex>

            <v-flex
                    xs6
                    text-xs-center
                    subheading
            >
                Стр. {{ page }} / {{ pages }}
            </v-flex>

            <v-flex
                    xs3
                    text-xs-right
            >
                <base-btn
                        v-if="pages > 1 && page < pages"
                        class="mr-0"
                        title="Next page"
                        square
                        @click="page++"
                >
                    <v-icon>mdi-chevron-right</v-icon>
                </base-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    export default {
        name: 'Feed',
        components: {
            FeedCard: () => import('./FeedCard.vue')
        },
        data: () => ({
            layout: [1, 2, 2, 1, 2, 2, 3, 3, 3, 2, 2, 2],
            page: 1,
            events: []
        }),
        created:function (){
            this.$http.get("/dimas/api/v1.0/events", { 'headers': { 'Authorization': "Basic ZG1pdHJ5OjEyMzQ=" } }).then(
                response=>{
                    console.log(response.data.events)
                    this.events = response.data.events
                }
            )
        },
        computed: {

            pages () {
                return Math.ceil(this.$store.getters.events.length / 11)
            },
            paginatedArticles () {
                const start = (this.page - 1) * 11
                const stop = this.page * 11

                return this.events.slice(start,stop)
            }
        },
        watch: {
            page () {
                window.scrollTo(0, 0)
            }
        }
    }
</script>

<style scoped>

</style>