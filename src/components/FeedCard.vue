<template>
<v-flex
        xs12
        :class="classes"
>
    <base-card
            :height="value.prominent ? 450 : 350"
            dark
            :href="href"
    >
        <v-img
                :src="require(`@/assets/articles/${value.hero}`)"
                height="100%"
                gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
        >
            <v-layout
                    v-if="!value.prominent"
                    fill-height
                    wrap
                    text-xs-right
                    ma-0
            >
                <v-flex xs12>
                    <v-chip
                            label
                            class="mx-0 mb-2 text-uppercase"
                            :color="value.color"
                            text-color="white"
                            small
                            @click.stop=""
                    >
                        {{ value.category }}
                    </v-chip>
                    <h3 class="title font-weight-bold mb-2">
                        {{ value.title }}
                        {{color}}

                    </h3>
                    <div class="caption">
                        {{ value.author }}<br>Date
                    </div>
                </v-flex>
                <v-flex align-self-end>
                    <v-chip
                            class="text-uppercase ma-0"
                            color="primary"
                            label
                            small
                            @click.stop=""
                    >
                        Read More
                    </v-chip>
                </v-flex>
            </v-layout>
        </v-img>
    </base-card>
</v-flex>


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

    import {
        mapGetters,
        mapMutations
    } from 'vuex'

    export default {
        props: {
            size: {
                type: Number,
                required: true
            },
            value: {
                type: Object,
                default: () => ({})
            }
        },
        computed: {

            href(){
              return "/events/".concat(this.value.id)
            },
            ...mapGetters(['categories']),
        colors(){
            let a ={}
            this.categories.forEach(i=>a.i=getRandomColor());
            return a
        },
            classes () {
                return {
                    'md6': this.size === 2,
                    'md4': this.size === 3
                }
            }

        }
    }
</script>

<style>
    .v-image__image {
        transition: .3s linear;
    }
</style>