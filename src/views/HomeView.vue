<!-- This is the ./src/views/HomeView.vue view file -->
<script setup>
import { ref } from 'vue'

const shineBlueish = ref(true)

</script>

<template>
  <main>
    <div id="home">
      <div id="first-container">
        <div id="text-block">
          <h3>Welcome to</h3>
          <h1>Board Game Geek Like 2.0</h1>
          <h3>The right place for board game fans</h3>
          <p>Here you'll certainly find a board game that suits you!'</p>
          <p>Check out more cool stuff below!</p>
        </div>
        <div id="other-references-block">
            <a href="https://boardgamegeek.com/" target="_blank">
            <img src="/images/home/bgg.png" alt="" />
          </a>
          <a href="https://en.boardgamearena.com" target="_blank">
            <img src="/images/home/boardgamearena.png" alt="" />
          </a>
          <a href="https://ludopedia.com.br/" target="_blank"
            ><img src="/images/home/ludopedia.svg" alt=""
          /></a>
          <a href="https://www.spiel-des-jahres.de/" target="_blank"
            ><img src="/images/home/spieldesjahres.png" alt=""
          /></a>
        </div>
      </div>

      <div id="second-container">
        <div id="big-ball" :class="{'blueish-shadow' : shineBlueish}">
        </div>

        <div id="board-games-grid">
          <div
            id="youtube-review-channel"
            @mouseenter="shineBlueish = false"
            @mouseleave="shineBlueish = true"
          >
            <a href="https://www.youtube.com/@3MBG" target="_blank">
              <span class="span">3 MINUTES</span>
                <i class="bi bi-link"></i>
              <span class="span">Board Game</span>
            </a>
          </div>

          <div class="el el-1"
            @mouseenter="shineBlueish = false"
            @mouseleave="shineBlueish = true"
          >
            <a
              href="https://www.youtube.com/watch?v=vztcik0ZZkU"
              target="_blank"
              ><img src="/images/home/brass_birmingham.webp" alt=""
            /></a>
          </div>
          <div class="el el-2">
            <a
              href="https://www.youtube.com/watch?v=uRbFP_DP6yo"
              target="_blank"
            ></a>
            <img src="/images/home/pandemic.webp" alt="" />
          </div>
          <div class="el el-3">
            <a
              href="https://www.youtube.com/watch?v=itsCTmC5Iy4"
              target="_blank  "
            ></a>
            <img src="/images/home/terraformingMars.webp" alt="" />
          </div>
          <div class="el el-4">
            <img src="/images/home/scythe.webp" alt="" />
          </div>
          <div class="el el-5">
            <img src="/images/home/throughTheAges.webp" alt="" />
          </div>
          <div class="el el-6">
            <img src="/images/home/wingspan_pic1.png" alt="" />
          </div>
          <div class="el el-7">
            <img src="/images/home/azul.webp" alt="" />
          </div>
          <div class="el el-8">
            <img src="/images/home/obcession.webp" alt="" />
          </div>
          <div class="last-row">
            <div class="el el-9 el-left">
              <img src="/images/home/root.webp" alt="" />
            </div>
            <div class="el el-9 el-right">
              <img src="/images/home/clans.webp" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  main {
    width: 100vw;
    height: 100vh;
    padding: 15rem 10rem 0 10rem;//padding: 10rem;


    @media screen and (max-width: 850px) {
      padding: 8rem 0;
    }

    h1,h2,h3,p {
      padding: 0;
      margin: 0;
    }

    #home {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      @media screen and (max-width: 768px) {
        flex-direction: column;
        flex-wrap: nowrap;
      }

      #first-container{
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;


        @media screen and (max-width: 1024px) {
          justify-content: start;

          @media (max-width: 850px) {
            padding-bottom: 5rem;
          }
        }


        #text-block{
          text-align: start;


          h1 {
            font-size: clamp(2.5rem, 2.5vw, 5rem);
            font-weight: 700;
            line-height: 1.3;
          }

          h3 {
            font-size: clamp(1.5rem, 1vw, 3rem);
            font-weight: 500;
          }

          @media screen and (max-width: 850px) {
            text-align: center;

            @media (max-width: 425px) {
              padding: 0 0 2rem 0;
            }
          }
        }

        #other-references-block{
          @media screen and (max-width: 1440px) {
            padding-bottom: 5rem;

            @media (max-width: 1024px) {
              display: grid;
              grid-template-columns: repeat(2, 1fr);

              @media (max-width: 930px) {
                display: flex;
                flex-direction: row;
                justify-content: center;

                @media (max-width: 850px) {
                  display: flex;
                  flex-direction: row;
                  align-self: center;
                  padding: 2rem 0 0 0;

                  @media (max-width: 768px) {
                    align-content: start;
                    padding-bottom: 0;

                    @media (max-width: 625px) {
                      align-content: center;
                      padding-bottom: 5rem;

                      @media (max-width: 425px) {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 2rem;
                        padding-bottom: 2rem;
                      }
                    }
                  }
                }
              }
            }
          }

          a {
              display: inline-flex;
              justify-content: center;
              align-items: center;
              width: clamp(7rem, 5vw, 10rem);
              height: clamp(7rem, 5vw, 10rem);
              background-color: transparent;
              border: 5px solid var(--blueish-color);
              border-radius: 50%;
              color: var(--blueish-color);
              margin: 3rem 1.5rem 3rem 0;
              transition: all 0.7s;

              &:hover{
                  background-color: var(--blueish-color);
                  color: var(--second-bg-color);
                  box-shadow: 0 0 1rem var(--blueish-color);
                  transform: scale(1.1);
              }

              @media screen and (max-width: 1024px) {
                margin: 1rem;
              }
              @media screen and (max-width: 930px) {
                margin: 1rem;
              }
              @media screen and (max-width: 625px) {
                width: clamp(5rem, 3vw, 8rem);
                height: clamp(5rem, 3vw, 8rem);
              }
              @media screen and (max-width: 425px) {
                border: 2px solid var(--blueish-color);
                width: clamp(7rem, 5vw, 10rem);
                height: clamp(7rem, 5vw, 10rem);
              }


              img{
                  align-items: center;
                  max-width: 100%;
                  height: auto;
                  display: block;
                  border-radius: 50%;
                  margin-top: auto;
              }
          }
        }
      }

      #second-container{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        z-index: 1;


        @media screen and (max-width: 1024px) {
          justify-content: center;
          height: 100%;

          @media (max-width: 930px){
            height: 50%;

            @media (max-width: 768px){
              padding-top: 8rem;

              @media (max-width: 425px) {
                justify-content: start;
              }
            }
          }
        }

        #big-ball {
          position: absolute;
          height: calc(250px + 15vw);
          width: calc(250px + 15vw);
          border-radius: 50%;
          transition: all 0.3s ease-in-out;
          animation: floatImage 5s ease-in-out infinite;
          z-index: 2;
          box-shadow: 0 0 5px 10px var(--second-bg-color);

          @keyframes floatImage {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-2rem);
            }
            100% {
              transform: translateY(0);
            }
          }
        }

        #board-games-grid{
          display: grid;
          gap: 1.5rem;
          grid-template-rows: auto;
          grid-template-columns: repeat(5, 1fr);
          z-index: 3;
          animation: floatImage 3s ease-in-out infinite;
          transition: all 0.3s ease-in-out;

          #youtube-review-channel{
            grid-column-start: 1;
            grid-column-end: 6;
            justify-self: center;

            a {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              gap: 15px;
              padding: 1rem 2rem;
              border: 1px solid var(--second-bg-color);
              box-shadow: 0 0 5px 5px var(--second-bg-color);
              border-top-right-radius: 3rem;
              border-top-left-radius: 3rem;
              border-bottom-right-radius: 10px;
              border-bottom-left-radius: 10px;
              background-color: var(--bg-color);
              font-weight: 700;
              color: var(--second-bg-color);
              text-decoration: none;
              transition: all 0.3s ease-in-out;

              i {
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                transition: all 0.3s ease-in-out;
              }

              &:hover{
                box-shadow: 0 0 10px 10px var(--blueish-color);
                border: 1px solid var(--blueish-color);
                color: var(--text-color);
                background-color: var(--bg-color);
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
                border-bottom-right-radius: 10px;
                border-bottom-left-radius: 10px;

                i {
                  color: var(--yellowish-color);
                  transform: rotate(720deg) scale(2);
                }

                span:first-child{
                  color: var(--text-color);
                }
                span:last-child{
                  color: var(--blueish-color);
                }
              }

              span{
                //letter-spacing: 5px;
                transition: all 0.3s ease-in-out;

                &:first-child{
                  color: var(--blueish-color);
                }
                &:last-child{
                  color: var(--text-color);
                }
              }
            }
          }

          .el{
            width: clamp(6rem, 5vw, 10rem);
            height: clamp(6rem, 5vw, 10rem);
            overflow: hidden;
            box-shadow: 0 0 5px 5px var(--second-bg-color);
            border-radius: 50%;
            transition: all 0.3s ease-in-out;

            &:hover{

              box-shadow: 0 0 5px 5px var(--blueish-color);
              transform: scale(2.5, 2);
              border-radius: 0;
            }

            img {
              width: 100%;
              height: 100%;
            }
          }

          .el-1 {
            grid-column: 2 / span 1;
          }
          .el-3 {
            grid-column: 4 / span 2;
          }
          .last-row {
            display: flex;
            grid-column: 1 / span 5;
            align-items: baseline;
            justify-content: center;
            gap: 10px;
          }

          @media screen and (max-width: 625px) {
            grid-template-columns: repeat(4, 1fr);

          .el-1 {
            grid-column: 2 / span 1;
          }
          .el-2 {
            grid-column: 3 / span 2;
          }
          .el-3 {
            grid-column: 2 / span 1;
          }
          .el-4 {
            grid-column: 3 / span 1;
          }
          .el-5 {
            grid-column: 2 / span 1;
          }
          .el-6 {
            grid-column: 3 / span 2;
          }
          .el-7 {
            grid-column: 2 / span 1;
          }
          .el-8 {
            grid-column: 3 / span 2;
          }

            @media (max-width: 425px) {
              grid-template-columns: repeat(4, 1fr);

              .el-1 {
                grid-column: 2 / span 1;
              }
              .el-2 {
                grid-column: 3 / span 2;
              }
              .el-3 {
                grid-column: 2 / span 1;
              }
              .el-4 {
                grid-column: 3 / span 1;
              }
              .el-5 {
                grid-column: 4 / span 1;
              }
              .el-6 {
                grid-column: 1 / span 1;
              }
              .el-7 {
                grid-column: 2 / span 1;
              }
              .el-8 {
                grid-column: 3 / span 2;
              }
            }
          }
        }
      }
    }
  }

  .blueish-shadow {
    box-shadow: 0 0 2rem 2rem var(--blueish-color) !important;
  }


</style>
