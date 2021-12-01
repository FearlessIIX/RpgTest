<script lang="ts">
    import player_base from "./utils/Player.json"
    import { Player } from "./utils/Player"
import { get } from "svelte/store";
    
    const player : Player = new Player("Katsuro", player_base)
    
    // Imma go to bed but i'll show you how to do 1 subscirption
    
    let playerHealth;
    let playerXp;
    let playerLevel
    
    player.level.xp.subscribe(val => playerXp = val)
    player.health.health.subscribe(val => playerHealth = val)
    player.level.level.subscribe(val => playerLevel = val)

    $: lineOne = `${player.name}, Level ${playerLevel}`
    $: lineTwo = `Health: ${playerHealth} of ${get(player.health.maxHealth)}`
    $: lineThree = `Level: ${playerXp} of ${get(player.level.maxXp)}`
    
    function clickGainXp() {
        player.gainXp(7)
    }
    function clickLoseHealth() {
        player.takeDamage(5)
    }
    function clickGainHealth() {
        player.gainHealth(5)
    }

    // svelte has an auto subscription funciton just by putting '$' infront of a store 
</script>

<div>
    <div>{lineOne}</div>
    <div>{lineTwo}</div>
    <div>{lineThree}</div>
    <button on:click="{clickGainXp}">Gain Xp</button>
    <button on:click="{clickLoseHealth}">Lose Health</button>
    <button on:click="{clickGainHealth}">Gain Health</button>
</div>

<style>
    button {
        @apply w-60 h-32 bg-gray-600 border-2 rounded-sm transition-colors duration-500
    }
    button:hover {
        @apply bg-gray-400
    }
</style>