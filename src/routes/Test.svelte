<script lang="ts">
    import { writable, get } from "svelte/store"
    import type { Writable } from "svelte/store"

    class Person {
        name : string = "None"
        age : Writable<number> = writable(0)
        friends : Writable<Array<string>> = writable([])
        constructor(name : string) {
            this.name = name
        }

        // Getters
        get getName() {return this.name}
        get getAge() {return this.age}
        get getFriends() {return this.friends}
        // ---->
        // Setters
        public changeName(new_name : string) {this.name = new_name}
        public changeAge(new_age : number) {this.age.update((val) => val = new_age)}
        // ... is a spread operator, it will take everything in the array and spread it out
        // yeah, it's the basics of JS
        public addFriend(new_friend: string) { this.friends.update(val => [...val, new_friend]) }
        // ---->
    }
    let MyAge;
    let newFriend : string;
    let MyFriends;
    let me = new Person("Katsuro")
    let friends = ["Josh", "Ethan", "Lucas", "Evan", "Bryce"]

    me.changeAge(17)
    for (const friend of friends) {me.addFriend(friend)}

    me.getFriends.subscribe(val => MyFriends = val)

    console.log(MyFriends);
    
    me.getAge.subscribe((val) => MyAge = val)

    function ageUp() { me.changeAge(get(me.getAge) + 1) }
    
    function submit(event : Event) {
        console.log(newFriend)
        if (newFriend == undefined) {alert("Name is undefined")}
        else {
            // if you want to check if it's not empty just say newFriend
            // js ifs check if it's an empty string and will return a false
            // yeah, but if the string is empty then it will be false
            if (newFriend) me.addFriend(newFriend)
        }
        console.log(me)
    }
</script>

<div class="w-full h-screen flex justify-center items-center">
    <div class="w-2/4 h-3/4 border-2 border-black rounded-xl">
        <div class="flex items-center justify-center rounded-md w-1/2 h-1/4">
            <div class="flex float-left border-black border-2 rounded-md">
                <div class="m-5">Name: {me.name}</div><div class="m-5">Age: {MyAge}</div>
            </div>
        </div>
        <div class="w-full min-h-[50%] flex justify-center items center">
            <ul>
                {#each MyFriends as friend, index}
                    <li class="m-3 underline">Friend {index + 1}: {friend}</li>
                {/each}
            </ul>
        </div>
    </div>
</div>

<div class="w-full h-screen flex items-center justify-center">
    <div class="w-2/4 h-3/4 border-2 border-black rounded-xl">
        <div class="w-full h-1/4 flex justify-around items-center">
            <button on:click={ageUp} class="h-20 w-32 bg-gray-300 border-black border-2 rounded-md transition-colors duration-500 hover:bg-gray-50">Add One</button>
        </div>
        <div class="w-full h-1/4 flex justify-around items-center">
            <button on:click|preventDefault={submit} class="h-20 w-32 bg-gray-300 border-black border-2 rounded-md transition-colors duration-500 hover:bg-gray-50" >Add Friend</button>
            <div class="h-2/4">
                <label for="new-friend">New Friend: </label>
                <input bind:value="{newFriend}" class="m-4 h-full p-3" type="text" name="new-friend">
            </div>
        </div>
    </div>
</div>