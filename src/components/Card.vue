<template>
    <div

            v-if="isShowing"
            ref="interactElement"
            :class="{
      isAnimating: isInteractAnimating,
      isCurrent: isCurrent
    }"
            class="card"
            :style="{ transform: transformString,backgroundColor:color
             }"



    >
        <v-card :color="color" ref="card" :dark="dark" :img="cardBgImage">
            <v-responsive v-if="showTopNav">
                <v-layout row justify-space-between class="ma-0">
                    <v-flex xs2>
                        <v-icon>clear</v-icon>
                    </v-flex>
                    <v-flex xs2 class="text-sm-right">
                        <v-icon>more_vert</v-icon>
                    </v-flex>
                </v-layout>
            </v-responsive>
            <v-card-text>
                <div class="layout ma-0 align-center" :class="cardLayout">
                    <v-avatar :size="avatarSize">
                        <img v-bind:src="avatar.src" v-bind:alt="name" v-if="showAvatar">
                        <span v-else class="white--text headline">{{ name.charAt(0) }}</span>
                    </v-avatar>
                    <div class="flex" :class="textAlign">
                        <div class="subheading">{{name}}</div>
                        <span class="caption">{{jobTitle}}</span>
                    </div>
                </div>
            </v-card-text>
        </v-card>
        <v-bottom-nav :value="true" color="transparent" :height="64" v-if="showBottomNav">
            <v-btn flat color="teal" value="recent">
                <span>Recent</span>
                <v-icon>history</v-icon>
            </v-btn>
            <v-btn flat color="teal" value="favorites">
                <span>Favorites</span>
                <v-icon>favorite_border</v-icon>
            </v-btn>
            <v-btn flat color="teal" value="nearby">
                <span>Nearby</span>
                <v-icon>place</v-icon>
            </v-btn>
        </v-bottom-nav>
        <!--<v-layout row wrap>
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-img
                        :src="image"
                        gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                ></v-img>
            </v-flex>
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-container fluid>
                    <v-layout row>
                        <v-flex xs12 sm10 md8 offset-sm1 offset-md28>
                            {{card}}
                        </v-flex>


                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm10 md8 offset-sm1 offset-md28>
                            dfsfsddsgfsdfsfsdfdsfsffsff
                        </v-flex>


                    </v-layout>
                </v-container>
            </v-flex>

        </v-layout>-->






    </div>
</template>

<script>
    import interact from "interact.js";
    const ACCEPT_CARD = "cardAccepted";
    const REJECT_CARD = "cardRejected";
    const SKIP_CARD = "cardSkipped";

    export default {
        static: {
            interactMaxRotation: 15,
            interactOutOfSightXCoordinate: 500,
            interactOutOfSightYCoordinate: 600,
            interactYThreshold: 150,
            interactXThreshold: 100
        },

        props: {
            card: {
                type: String,
                required: true
            },
            isCurrent: {
                type: Boolean,
                required: true
            },
            img: {
                type: String,
                required: true
            },
            name: {
                type: String,
                default: ''
            },
            avatar: {
                type: Object,
                default: null
            },
            jobTitle: {
                type: String,
                default: ''
            },
            cardBgImage: {
                type: String,
            },
            color: {
                type: String,
                default: ''
            },
            dark: {
                type: Boolean,
                default: false
            },
            bottomNav: {
                type: Boolean,
                default: false
            },
            topNav: {
                type: Boolean,
                default: false
            },
            mini: {
                type: Boolean,
                default: false
            }
        },

        data() {
            return {
                image:"https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
                isShowing: true,
                isInteractAnimating: true,
                isInteractDragged: null,
                interactPosition: {
                    x: 0,
                    y: 0,
                    rotation: 0
                }
            };
        },

        computed: {
            transformString() {
                if (!this.isInteractAnimating || this.isInteractDragged) {
                    const { x, y, rotation } = this.interactPosition;
                    return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
                }

                return null;
            },
            cardLayout () {
                const vm = this;

                return vm.mini ? 'row' : 'column';
            },

            textAlign () {
                const vm = this;

                return vm.mini ? 'text-sm-right' : 'text-sm-center';
            },

            avatarSize () {
                const vm = this;

                return vm.mini ? '54' : '96';
            },

            showAvatar () {
                const vm = this;

                return vm.avatar && vm.avatar.src;
            },

            showBottomNav () {
                const vm = this;

                return !vm.mini && vm.bottomNav;
            },

            showTopNav () {
                const vm = this;

                return !vm.mini && vm.topNav;
            }
        },

        mounted() {
            const element = this.$refs.interactElement;

            interact(element).draggable({
                onstart: () => {
                    this.isInteractAnimating = false;
                },

                onmove: event => {
                    const {
                        interactMaxRotation,
                        interactXThreshold
                    } = this.$options.static;
                    const x = this.interactPosition.x + event.dx;
                    const y = this.interactPosition.y + event.dy;

                    let rotation = interactMaxRotation * (x / interactXThreshold);

                    if (rotation > interactMaxRotation) rotation = interactMaxRotation;
                    else if (rotation < -interactMaxRotation)
                        rotation = -interactMaxRotation;

                    this.interactSetPosition({ x, y, rotation });
                },

                onend: () => {
                    const { x, y } = this.interactPosition;
                    const { interactXThreshold, interactYThreshold } = this.$options.static;
                    this.isInteractAnimating = true;

                    if (x > interactXThreshold) this.playCard(ACCEPT_CARD);
                    else if (x < -interactXThreshold) this.playCard(REJECT_CARD);
                    else if (y > interactYThreshold) this.playCard(SKIP_CARD);
                    else this.resetCardPosition();
                }
            });
        },

        beforeDestroy() {
            interact(this.$refs.interactElement).unset();
        },

        methods: {
            hideCard() {
                setTimeout(() => {
                    this.isShowing = false;
                    this.$emit("hideCard", this.card);
                }, 300);
            },

            playCard(interaction) {
                const {
                    interactOutOfSightXCoordinate,
                    interactOutOfSightYCoordinate,
                    interactMaxRotation
                } = this.$options.static;

                this.interactUnsetElement();

                switch (interaction) {
                    case ACCEPT_CARD:
                        this.interactSetPosition({
                            x: interactOutOfSightXCoordinate,
                            rotation: interactMaxRotation
                        });
                        this.$emit(ACCEPT_CARD);
                        break;
                    case REJECT_CARD:
                        this.interactSetPosition({
                            x: -interactOutOfSightXCoordinate,
                            rotation: -interactMaxRotation
                        });
                        this.$emit(REJECT_CARD);
                        break;
                    case SKIP_CARD:
                        this.interactSetPosition({
                            y: interactOutOfSightYCoordinate
                        });
                        this.$emit(SKIP_CARD);
                        break;
                }

                this.hideCard();
            },

            interactSetPosition(coordinates) {
                const { x = 0, y = 0, rotation = 0 } = coordinates;
                this.interactPosition = { x, y, rotation };
            },

            interactUnsetElement() {
                interact(this.$refs.interactElement).unset();
                this.isInteractDragged = true;
            },

            resetCardPosition() {
                this.interactSetPosition({ x: 0, y: 0, rotation: 0 });
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../styles/index.scss";

    $cardsTotal: 3;
    $cardsWidth: 300px;
    $cardsPositionOffset: 55vh * 0.06;
    $cardsScaleOffset: 0.08;
    $defaultTranslation: $cardsPositionOffset * $cardsTotal;
    $defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);
    $fs-card-title: 1.125em;

    .card {
        @include card();
        @include absolute(0);
        @include sizing(100% 80vw);
        @include flex-center();

        @include after() {
            @include sizing(21px 3px);
            @include absolute(right 0 bottom 11px left 0);

            margin: auto;
            border-radius: 100px;
            background: rgba($c-black, 0.3);
        }

        display: flex;
        max-height: 350px;
        margin: auto;
        font-size: $fs-h2;
        font-weight: $fw-bold;
        color: $c-white;
        background-color: red;


        opacity: 0;
        transform: translateY($defaultTranslation) scale($defaultScale);
        transform-origin: 50%,100%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        user-select: none;
        pointer-events: none;
        will-change: transform, opacity;

        height: 100vw;

        &.isCurrent {
            pointer-events: auto;
        }

        &.isAnimating {
            transition: transform 0.7s $ease-out-back;
        }
    }

    .cardTitle {
        margin: 0 0 15px;
        font-size: $fs-card-title;
    }

    @for $i from 1 through $cardsTotal {
        $index: $i - 1;
        $translation: $cardsPositionOffset * $index;
        $scale: 1 - ($cardsScaleOffset * $index);

        .card:nth-child(#{$i}) {
            z-index: $cardsTotal - $index;
            opacity: 1;
            transform: translateY($translation) scale($scale);

            @if $i == 3 {
                color: $c-red-25;
                background-color: $c-red-25;
            } @else if $i == 2 {
                color: $c-red-50;
                background-color: $c-red-50;
            }

            @if $i != 1 {
                background-image: none;

                @include after() {
                    @include sizing(0 0);
                }
            }
        }
    }
</style>
