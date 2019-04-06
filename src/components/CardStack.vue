<template>
    <div class="cards">
        <card
                v-for="(card, index) in cards"
                :key="card"
                :card="card"
                img="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
                :is-current="index === 0"
                @cardAccepted="$emit('cardAccepted');"
                @cardRejected="$emit('cardRejected');"
                @cardSkipped="$emit('cardSkipped');"
                @hideCard="$emit('hideCard');"
        />
    </div>
</template>

<script>
    import Card from "../components/Card";

    export default {
        components: {
            Card
        },

        props: {
            cards: {
                type: Array,
                required: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    .cards {
        position: relative;
        display: flex;
        margin: 50px;
        width: 300px;
    }
</style>