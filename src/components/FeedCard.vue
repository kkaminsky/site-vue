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
                class="main-event-image"
        >
            <v-layout
                    v-if="!value.prominent"
                    fill-height
                    wrap
                    text-xs-right
                    ma-0
            >
                <v-flex xs12 class="d-flex flex-direction-column">
                    <div class="text-left h-0">
                        <v-chip  v-for="cat in value.categories"
                                label
                                class="ml-1 mb-1 text-uppercase"
                                :color="cat.color"
                                text-color="white"
                                small
                                :key="cat.id"
                        >
                        {{cat.name}}
                        </v-chip>
                    </div>
                    <h3 class="title font-weight-bold pt-0">
                        {{ value.name }}
                    </h3>
                    <!-- <span class="date-span">
                        {{ value.beginingDate.substr(0, 10) }}
                    </span> -->

                </v-flex>
                
                <v-flex class="flex-row">
                    
                    <!-- <v-flex class="flex-end">
                        
                    </v-flex> -->
                    <v-spacer>
                    </v-spacer>
                    <span class="date-span">
                        {{ value.beginingDate.substr(0, 10) }}
                    </span>
                    
                </v-flex>
            </v-layout>
        </v-img>
    </base-card>
</v-flex>


</template>

<script>
import Vue from 'vue'
    Vue.use(require('vue-moment'));
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
        mapMutations,

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
                    'md4': this.size === 3,
                    // 'pa-0': this.size === 2,
                    'pa-0': this.size === 2 || this.size === 1,
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