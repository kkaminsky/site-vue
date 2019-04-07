<template>
    <div class="cards" >

        <card
                v-for="(card, index) in cards"
                v-bind="card.user"
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
        data(){
            return{
                users: [
                    {
                        jobTitle: 'Web Developer',
                        name: 'Michael Wang',
                        color: '#ba234b',
                        dark: true,
                        avatar: {
                            src: 'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat4&accessoriesType=Prescription01&hatColor=Black&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Black&graphicType=Selena&eyeType=Squint&eyebrowType=AngryNatural&mouthType=Default&skinColor=DarkBrown',
                            size: '36'
                        }
                    },
                    {
                        jobTitle: 'Web Designer',
                        name: 'Jessie J',
                        color: '#e57b09',
                        dark: true,
                        avatar: {
                            src: 'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat1&accessoriesType=Sunglasses&hatColor=Red&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light',
                            size: '36'
                        }
                    },
                    {
                        jobTitle: 'Web Developer',
                        name: 'Jim J',
                        color: 'teal',
                        dark: true,
                        avatar: {
                            src: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Sunglasses&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Happy&eyebrowType=Default&mouthType=Default&skinColor=Light',
                            size: '36'
                        },
                    },
                    {
                        jobTitle: 'Product Manager',
                        name: 'John Doe',
                        color: '#a51288',
                        dark: true,
                        cardBgImage: '/static/bg/15.jpg',
                        avatar: {
                            src: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairSides&accessoriesType=Blank&hairColor=BrownDark&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=Hoodie&clotheColor=Gray01&eyeType=WinkWacky&eyebrowType=SadConcerned&mouthType=ScreamOpen&skinColor=Brown',
                            size: '36'
                        },
                    },
                ]
            }
        },
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