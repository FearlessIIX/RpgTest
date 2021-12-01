<!--  routes/maps.svelte  -->
<script lang="ts">
    import { onMount } from "svelte"
    import { Dungeon as dungeon} from "./Maps/Dungeon"
    import type { Tile, Dungeon } from "./Maps/Dungeon"
    const dungeon_one = [
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 1],
        [0, 0, 1, 0, 1],
        [1, 1, 2, 1, 1],
        [0, 1, 0, 1, 0]]
    let frame : HTMLUListElement;
    let dunj = new dungeon(dungeon_one)

    function createDungeonFrame(dungeon : Array<Array<number>>) {
        for (const row of dungeon) {
            // Creating a "flex" List Item to store that row of Rooms
            let current_row = document.createElement("li")
            current_row.className = "flex"

            for (const room of row) {
                // Creating a div for each room, then assigning its className
                let child = document.createElement("div")
                // The parts of className shared by both Rooms and Non-Rooms
                let common_class = "w-[25px] h-[25px] border-solid border-black border-2 "
                // Using ternary to assign className to child
                // When true: child is given "bg-blue-600". When false: child is given "bg-gray-400"
                child.className = (room == 1) ? 
                    common_class + "bg-blue-600" : (room == 2) ? 
                        common_class + "bg-green-600" : common_class + "bg-gray-400"

                current_row.appendChild(child)
            }
            frame.appendChild(current_row)
        }

        console.log(dunj)
    }

    onMount(() => createDungeonFrame(dungeon_one))
</script>

<div>
    <ul bind:this="{frame}" class="border-2 border-solid border-black p-2 lg:w-1/6 md:w-1/4 sm:w-1/2">
    </ul>
</div>