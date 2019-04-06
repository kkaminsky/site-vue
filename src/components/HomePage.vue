<template>

    <v-container
            grid-list-xl
    >
        <v-layout row wrap>
            <v-flex
                    v-for="card in cards"
                    :key="card.title"
                    v-bind="{ [`xs${card.flex}`]: true }"
            >
                <v-card>
                    <v-img
                            :src="card.src"
                            height="200px"
                    >
                        <v-container
                                fill-height
                                fluid
                                pa-2
                        >
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline white--text" v-text="card.title"></span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-img>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>favorite</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>bookmark</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>share</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    // Utilities
    import {
        mapState
    } from 'vuex'
    export default {
        name: 'Feed',
        components: {
            FeedCard: () => import('./FeedCard.vue')
        },
        data: () => ({
            cards: [
                { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
                { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
                { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
            ],
            layout: [2, 2, 1, 2, 2, 3, 3, 3, 3, 3, 3],
            page: 1
        }),
        computed: {
            ...mapState(['articles']),
            pages () {
                return Math.ceil(this.articles.length / 11)
            },
            paginatedArticles () {
                const start = (this.page - 1) * 11
                const stop = this.page * 11
                return this.articles.slice(start, stop)
            }
        },
        watch: {
            page () {
                window.scrollTo(0, 0)
            }
        }
    }
</script>