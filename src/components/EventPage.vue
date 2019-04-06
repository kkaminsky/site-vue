<template>
    <div >
        <GameCardsStack
                :cards="visibleCards"
                @cardAccepted="handleCardAccepted"
                @cardRejected="handleCardRejected"
                @cardSkipped="handleCardSkipped"
                @hideCard="removeCardFromDeck"
        />
    </div>
</template>

<script>
    import GameCardsStack from "../components/CardStack";

    export default {

        components: {
            GameCardsStack
        },

        data() {
            return {
                visibleCards: ["Test", "Vue.js", "Webpack","dfsf","dfgfdsf"]
            };
        },

        methods: {
            handleCardAccepted() {
                console.log("handleCardAccepted");
            },
            handleCardRejected() {
                console.log("handleCardRejected");
            },
            handleCardSkipped() {
                console.log("handleCardSkipped");
            },
            removeCardFromDeck() {
                this.visibleCards.shift();
            }
        }
    };
</script>

