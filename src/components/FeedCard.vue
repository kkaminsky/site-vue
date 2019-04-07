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
                :src="require(`@/assets/articles/${value.id}`.concat('.jpg'))"
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
                    <v-chip  v-for="cat in value.categories"
                            label
                            class="mx-0 mb-2 text-uppercase"
                            :color="cat.color"
                            text-color="white"
                            small
                            @click.stop=""
                    >
                        {{cat.name}}
                    </v-chip>
                    <h3 class="title font-weight-bold mb-2">
                        {{ value.name }}


                    </h3>
                    <div class="caption">
                        {{ value.beginingDate }}
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