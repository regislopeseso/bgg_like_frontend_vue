<!-- This is the ./src/views/HomeView.vue view file -->
<script setup>

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
        <div id="big-ball">
        </div>
        <div id="board-games-grid">
          <div id="youtube-review-channel">
            <a href="https://www.youtube.com/@3MBG" target="_blank">
              <span class="span">3 MINUTE</span>
              <span class="span">Board Game</span>
            </a>
          </div>

          <div class="el el-1">
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
    padding: 12rem 0 0 5rem;//padding: 10rem;

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
      //width: 100vw;
      //padding: 15rem 10rem;

      @media screen and (max-width: 1440px) {
        //padding: 8rem 5rem;
        //margin-bottom: 0;
      }
      @media screen and (max-width: 1024px) {
        //padding: 8rem 2rem;
        //margin-bottom: calc(80px + 10vh);  // ou margin-bottom: 0;
      }
      @media screen and (max-width: 950px) {
        //margin-bottom: calc(100px + 30vh);
      }
      @media screen and (max-width: 930px) {
        //padding: 8rem 2rem;
        //margin-bottom: 0;
      }
      @media screen and (max-width: 850px) {
        //text-align: center;
      }
      @media screen and (max-height: 800px) {
        //margin-bottom: calc(200px + 80vh);
      }
      @media screen and (max-width: 768px) {
        flex-direction: column;
        flex-wrap: nowrap;
        //height: 100vh;
      }
      @media screen and (max-height: 550px) {
        //margin-bottom: calc(100px + 40vh);
      }
      @media screen and (max-width: 425px) {
        //display: flex;
        //justify-content: center;
        //padding: 8rem 2rem;
      }

      #first-container{
        flex: 1;
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;

        @media screen and (max-width: 1024px) {
          justify-content: start;
        }
        @media screen and (max-width: 930px) {
          justify-content: start;
        }
        @media screen and (max-width: 768px) {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-self: center;
          padding-bottom: 5rem;
        }
        @media screen and (max-width: 625px) {
          display: flex;
          flex-direction: column;
          flex-wrap: nowrap;
          align-self: center;
          padding-bottom: 8rem;
          align-items: center;
        }
        @media screen and (max-width: 425px) {
          flex-direction: column;
          align-items: center;
          padding-bottom: 3rem;
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
          }
          @media screen and (max-width: 425px) {
            width: 100%;
            padding-bottom: 2rem;
          }
        }

        #other-references-block{
          @media screen and (max-width: 1440px) {
            padding-bottom: 5rem;
          }
          @media screen and (max-width: 1024px) {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
          }
          @media screen and (max-width: 930px) {
            display: flex;
            flex-direction: row;
            justify-content: center;
          }
          @media screen and (max-width: 850px) {
            display: flex;
            flex-direction: row;
            align-self: center;
            padding: 2rem 0 0 0;
          }
          @media screen and (max-width: 768px) {
            align-content: start;
            padding-bottom: 0;
          }
          @media screen and (max-width: 625px) {
            align-content: center;
            padding-bottom: 5rem;
          }
          @media screen and (max-width: 425px) {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
            padding-bottom: 2rem;
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
        }
        @media screen and (max-width: 930px){
          height: 50%;
        }
        @media screen and (max-width: 768px){
          padding-top: 8rem
        }
        @media screen and (max-width: 425px) {
          justify-content: start;
        }

        #big-ball {
          position: absolute;
          height: calc(250px + 15vw);
          width: calc(250px + 15vw);
          border-radius: 50%;
          box-shadow: 0 0 5rem var(--blueish-color);
          animation: floatImage 5s ease-in-out infinite;
          z-index: 2;

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

          #youtube-review-channel{
            grid-column-start: 1;
            grid-column-end: 6;
            justify-self: center;

            a {
              display: inline-block;
              padding: 1rem 2rem;
              border-top-right-radius: 10rem;
              border-top-left-radius: 10rem;
              box-shadow: 0 0 1rem var(--blueish-color);
              font-weight: 700;
              color: var(--second-bg-color);
              letter-spacing: 5px;
              text-decoration: none;

              &:hover{
                box-shadow: 0 0 2rem var(--text-color);
                color: var(--text-color);
                background-color: var(--bg-color);

                span:first-child{
                color: var(--text-color);
                }
                span:last-child{
                  color: var(--blueish-color);
                }
              }

              span{
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
            box-shadow: 0.5rem 0.5rem 1rem black;
            border-radius: 50%;

            &:hover{
              background-color: var(--blueish-color);
              color: var(--second-bg-color);
              box-shadow: 0 0 1rem var(--blueish-color);
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
          }
          @media screen and (max-width: 425px) {
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
</style>
