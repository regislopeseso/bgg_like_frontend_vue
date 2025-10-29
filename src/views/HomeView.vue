<script setup>

</script>

<template>
  <main>
    <div id="first-container">
      <div id="text-block">
        <h3>Welcome to</h3>
        <h1>Board Game Geek Like 2.0</h1>
        <h3>The right place for board game fans</h3>
        <p>Here you'll certainly find a board game that suits you!'</p>
        <p>Check out more cool stuff below!</p>
      </div>
      <div id="other-references-block">
        <div class="small-ball"></div>
        <div class="small-ball"></div>
        <div class="small-ball"></div>
        <div class="small-ball"></div>
      </div>
    </div>
    <div id="second-container">
      <div class="big-ball">
        <a>3 Minutes Board Game</a>
        <div id="quick-videos-container">
          <div class="small-ball"></div>
          <div class="small-ball"></div>
          <div class="small-ball"></div>
          <div class="small-ball"></div>
          <div class="small-ball"></div>
          <div class="small-ball"></div>
          <div class="small-ball"></div>
          <div class="small-ball"></div>
          <div class="small-ball"></div>
        </div>
      </div>
    </div>

  </main>
</template>

<style lang="scss" scoped>
  main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    padding: 10rem;

    h1,h2,h3,p {
      padding: 0;
      margin: 0;
    }

    #first-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;

      #text-block{
        padding: 5px;
        border: 1px solid var(--text-color);
      }

      #other-references-block{
        display: flex;
        flex-direction: row;
        gap: 15px;
        padding: 25px;
        border: 1px solid var(--text-color);

      }
    }

    .small-ball {
      width: 100px;
      height: 100px;
      border: 5px solid var(--blueish-color);
      border-radius: 50%;
      transition: all 0.3s ease-in-out;

      &:hover{
        transform: scale(1.2);
        background-color: var(--blueish-color);
      }
    }

    #second-container {
      padding-top: 5rem;

      .big-ball {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 500px;
        height: 500px;
        border: none;
        border-radius: 50%;
        box-shadow: 0 0 25px 25px var(--blueish-color);

        a {
          justify-content: center;
          border: 1px solid var(--text-color);
          padding: 10px;
          border-radius: 25px 25px 0 0;
        }

        #quick-videos-container{
          display: grid;
          justify-content: center;
          grid-template-columns: repeat(4, 200px);
          grid-template-columns: 100px 3fr;
        }
      }
    }
  }

</style>
