import { Health, Level } from "./PlayerUtils"

export class Player  {
    name = "None"
    health : Health;
    level : Level;
    // Wrapper for Player Util Classes, allows common access
    constructor(pname :string, base) {
        this.name = pname
        this.level = new Level()
        this.health = new Health(base)
    }
    get getName() {return this.name}
    // Health Functons ---->
    public takeDamage(damageAmt : number) {
        if (this.health.takeDamage(damageAmt)) {
            console.log(this)
            alert("Player Has Died!!!")
        }
    }
    public gainHealth(gainAmt) {
        this.health.gainHealth(gainAmt)
    }
    private calcMaxHealth() {
        this.health.calcMaxHealth()
    }
        // Getters ---->
        get getHealth() {return this.health.getHealth()}
        get getMaxHealth() {return this.health.getMaxHealth()}
        get isDead() {return this.health.isDead()}
        // ---->
    // ---->
    // Level Functions ---->
    public gainXp(gainAmt : number) {
        // yeah, indeed
        let levelUps = this.level.gainXp(gainAmt)
        for (let i = 0; i < levelUps; i++) {
            this.calcMaxHealth()
        }
        // there is nothing changing the xp...
    }
        // Getters ---->
        get getLevel() {return this.level.getLevel()}
        get getXp() {return this.level.getXp()}
        get getMaxXp() {return this.level.getMaxXp()}
        // ---->
    // ---->
}