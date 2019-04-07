<template>
<div>
  <parallax></parallax>
  <v-container grid-list-md>
      <h2 class="text-xs-center display-1 mb-2 afterTag">Примите участие в захватывающих мероприятиях</h2>
      <v-flex class="d-flex text-xs-center headline">
            <p>Мы отобрали для вас список мероприятий по различным категориям и с самым высоким рейтингом, <br /> составленных на основе голосов участников</p>
      </v-flex>
      <v-layout wrap>
        <v-flex
          v-for="item in items"
          :key="item.heading"
          xs12
          md4
        >
          <v-item>
            <v-card
              class="d-flex align-center"
              height="250"
            >
            <div
                  class="text-xs-center"
            >
            <img v-bind:src="item.url">
            <h4 class="display-1 card-text">
            {{ item.header }} 
            </h4>
           
            <p class="text-center mt-2">
            {{ item.text }}
            </p>
           
            </div>
            </v-card>
          </v-item>
        </v-flex>
      </v-layout>
    </v-container>
    

    <v-container grid-list-md>
        <h2 class="text-xs-center display-1 mb-2 afterTag">Умная система подбора мероприятий</h2>
        <v-flex class="d-flex text-xs-center headline">
                <p>Списки предлагаемых мероприятий будут формироваться по выбранным вами категориям</p>
        </v-flex>
        <v-flex
         v-for="card in cards"
          :key="card.heading"
         xs12
         >
            <v-card>
                <v-layout row v-if="card.swipe == '1'">   
                    <v-flex xs8>
                        <v-img
                        v-bind:src="card.url"
                        aspect-ratio="2.75"
                        >
                        </v-img>
                    </v-flex>
                    <v-flex d-flex justify-center flex xs6 align-center class="flex-direction-column">
                        <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-2">{{ card.header }}</h3>
                            <div class="w-80 card-text"> {{ card.text }} </div>
                            <v-btn ml-0 outline color="indigo">Подробнее</v-btn>
                        </div>
                        </v-card-title>
                    </v-flex>
                </v-layout>

                <v-layout row v-else>   
                    <v-flex d-flex justify-center flex xs6 align-center class="flex-direction-column">
                        <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-2">{{ card.header }}</h3>
                            <div class="w-80 card-text"> {{ card.text }} </div>
                            <v-btn ml-0 outline color="indigo">Подробнее</v-btn>
                        </div>
                        </v-card-title>
            
                      
                    </v-flex>
                    <v-flex xs8>
                        <v-img
                        v-bind:src="card.url"
                        aspect-ratio="1.25"
                        >
                        </v-img>
                    </v-flex>
                </v-layout>  
            </v-card>
        </v-flex>
    </v-container>

     <v-container grid-list-md id="test">
        <h2 class="text-xs-center display-1 mb-2 afterTag">Найдите себе компанию</h2>
        <v-flex class="d-flex text-xs-center headline">
                <p>После выбора мероприятия мы предложим вам список людей, интересы которых схожи с вашими, <br /> которые тоже идут на данное событие и ищут компанию</p>
        </v-flex>
        <v-layout wrap>
        <v-flex
          v-for="inst in insts"
          :key="inst.heading"
          xs12
          md4
        >
          <v-item>
            <v-card
              class="d-flex align-center"
              height="250"
            >
            <div
                  class="text-xs-center"
            >
            <img v-bind:src="inst.url">
            <h4 class="display-1 card-text">
            {{ inst.header }} 
            </h4>
           
            <p class="text-center mt-2">
            {{ inst.text }}
            </p>
           
            </div>
            </v-card>
          </v-item>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container>
      <h2 class="text-xs-center display-1 mb-2 afterTag">Проявите себя</h2>
      <v-flex class="text-xs-center headline">
            <p>Зарегистрируйтесь на нашем сервисе, получите список релевантных вам мероприятий, <br /> а также возможность найти новых друзей</p>
            <v-btn ml-0 mt-0 outline color="indigo">Зарегистрироваться</v-btn>
      </v-flex>
    </v-container>

    <Footer></Footer>
</div>
</template>

<script>
import Parallax from '../components/Parallax.vue'
import Footer from '../components/Footer.vue'

export default {
    data(){
        return{
            items: [
                { header: 'События', url: require('@/assets/img/event.png') , text: 'Участвуйте в событиях от наших спонсоров, или создавайте события сами! Вы получите поддержку в этом нелегком начинании.'},
                { header: 'Достижения', url: require('@/assets/img/cup.png'), text: 'Зарабатывайте очки за участия в мероприятиях и получайте различные достижения за ваши успехи в событиях'},
                { header: 'Награды', url: require('@/assets/img/medal.png'), text: 'Обменивайте очки на различные награды в виде мерча и скидок. Лучшие участники в категориях получат особые призы'},
            ],
            cards:[
                { header: 'Музыка', swipe:'1', url:require('@/assets/img/music.jpg'),   text: 'Проявите свой неповторимый слух и чувство ритма, попробуйте поучаствовать в настоящем концерте или же создайте новую группу с нуля'},
                { header: 'Театр', swipe:'0', url:require('@/assets/img/theatre.jpg'),  text: 'Не боитесь сцены и хотите проявить себя? Вам обязательно надо принять участие в профессиональной постановке и научиться много новому и мастеров своего дела'},
                { header: 'Хореография', swipe:'1', url:require('@/assets/img/dance.jpg'),  text: 'Вас интересуют различные хореографические стили и методы? Или же вы просто любите музыку и культуру? Если да, то вам надо попробовать себя в хореографии '},
                { header: 'Волонтерство', swipe:'0', url:require('@/assets/img/volonter.jpg'),  text: 'Если вы чувствуете себя альтруистом и желание помогать людям вы ставите превыше всего, то волонтерство определенно ваш выбор' }
            ],
            insts:[
                { header: 'Выберите мероприятие', url: require('@/assets/img/select.png') , text: 'Выберите желаемое мероприятие и отметьте, что вы ищите компанию для совместного похода. Вы появитесь в списке желающих найти компанию'},
                { header: 'Найдите друга', url: require('@/assets/img/handshake.png'), text: 'Вам будет предложен список людей в виде карточек, которые также как и вы ищут компанию. Свайпните вправо тех с кем хотите пойти'},
                { header: 'Проведите время вместе', url: require('@/assets/img/friendship.png'), text: 'Выбранному вами пользователю придет уведомление, после подтверждения с его стороны, вы получите контакты друг друга для связи.'},
            ],
            name: '',
            email: '',
            dictionary: {
                attributes: {
                email: 'E-mail Address'
                // custom attributes
                },
                custom: {
                    name: {
                        required: () => 'Name can not be empty',
                        max: 'The name field may not be greater than 10 characters'
                    },
                }
            }
               
        }
    },
    name: "HomePage",
    components:{
        Parallax,
        Footer
    },

    methods: {
      submit () {
        
      }
    }
}
</script>

<style scoped>

</style>