export class Tile {
    is_room : boolean = false
    is_entrance : boolean = false
    position : string = "None"
    pathways : Array<Array<boolean>> = [];
    index = 0
}

export class Dungeon {
    rooms : Array<Array<Tile>> = undefined
    constructor(preset : Array<Array<number>> = undefined) {
        // When undefined, we need to first generate a preset
        if (preset == undefined) 
            this.rooms = 
                this.createDungeon(this.generateBase())
        else 
            this.rooms = this.createDungeon(preset)
        this.calcPositionsAndPathways()
    }
    // Takes: None. .Returns: The base for dungeon creation
    private generateBase() : Array<Array<number>>{
        
        // 0: Not room, 1: Is room, 2: Is Entrance
        
        return []
    }
    // Takes: Base for dungeon creation. .Returns: Created dungeon
    private createDungeon(base : Array<Array<number>>) : Array<Array<Tile>> {
        let ret_dungeon : Array<Array<Tile>> = []
        let index_count = -1
        for (const row of base) {
            let current_row : Array<Tile> = []
            for (const room of row) {
                index_count++
                switch (room) {
                    case 0: {
                        let tile = new Tile()
                        tile.index = index_count
                        current_row.push(tile)
                        break;
                    }
                    case 1: {
                        let tile = new Tile()
                        tile.is_room = true
                        tile.index = index_count
                        current_row.push(tile)
                        break;
                    }
                    case 2: {
                        let tile = new Tile()
                        tile.is_room = true
                        tile.index = index_count
                        tile.is_entrance = true
                        current_row.push(tile)
                        break;
                    }
                }
            }
            ret_dungeon.push(current_row)
        }
        return ret_dungeon
    }
    private calcPositionsAndPathways() {
        let row_num = 0
        
        //! This is a bad fix for a problem

        // Going through all of rows of rooms
        for (const row of this.rooms) {
            // Setting the Room Positions, as they are used to determine room Pathways
            {
                row_num++;
                let room_num = 0
                for (const room of row) {
                    try {
                        room_num++;
                        if (row_num == 1) {
                            // Setting the Top-Based room positions
                            if (room_num == 1) room.position = "tl"
                            else if (room_num == row.length)
                                room.position = "tr"
                            else 
                                room.position = "tp"
                        }
                        else if (row_num == this.rooms.length) {
                            // Setting the Bottom-Based room positions
                            if (room_num == 1) room.position = "bl"
                            else if (room_num == row.length)
                                room.position = "br"
                            else 
                                room.position = "bt"                    
                        }
                        else if (room_num == 1) room.position = "le"
                        else if (room_num == row.length) room.position = "ri"
                        else room.position = "mi"
                    }
                    catch (ignored) {
                        continue
                    }
                }
            }
            // Setting the Pathways for each room
            {
                let row_index = -1

                for (const row of this.rooms) {
                    row_index++;
                    let room_index = -1
                    for (const room of row) {
                        try {

                            room_index++;
    
                            let room_path = []
                            switch (room.position) {
                                case "tl": {
                                    room_path.push(
                                        false, row[room_index + 1].is_room,
                                        row[room_index + row.length].is_room, false
                                    )
                                    break
                                }
                                case "tp": {
                                    room_path.push(
                                        false, row[room_index + 1].is_room,
                                        row[room_index + row.length].is_room, row[room_index - 1].is_room
                                    )
                                    break
                                }
                                case "tr": {
                                    room_path.push(
                                        false, false,
                                        row[room_index + row.length].is_room, row[room_index - 1].is_room
                                    )
                                    break
                                }
                                case "le": {
                                    room_path.push(
                                        row[room_index - row.length].is_room, row[room_index + 1].is_room,
                                        row[room_index + row.length].is_room, false
                                    )
                                    break
                                }
                                case "mi": {
                                    room_path.push(
                                        row[room_index - row.length].is_room, row[room_index + 1].is_room,
                                        row[room_index + row.length].is_room, row[room_index - 1].is_room
                                    )
                                    break
                                }
                                case "ri": {
                                    room_path.push(
                                        row[room_index - row.length].is_room, false,
                                        row[room_index + row.length].is_room, row[room_index - 1].is_room
                                    )
                                    break
                                }
                                case "bl": {
                                    room_path.push(
                                        row[room_index - row.length].is_room, row[room_index + 1].is_room,
                                        false, false
                                    )
                                    break
                                }
                                case "bt": {
                                    room_path.push(
                                        row[room_index - row.length].is_room, row[room_index + 1].is_room,
                                        false, row[room_index - 1].is_room
                                    )
                                    break
                                }
                                case "br": {
                                    room_path.push(
                                        row[room_index - row.length].is_room, false,
                                        false, row[room_index - 1].is_room
                                    )
                                    break
                                }
                            }
                            room.pathways = room_path
                        }
                        catch (err) {
                            continue
                        }
                    }
                }
            }
        }
    }
}