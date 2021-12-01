import { writable, get } from 'svelte/store';
import type { Writable } from 'svelte/store'

export class Health {
    health : Writable<number>
    maxHealth : Writable<number>
    dead : Boolean = false
    private base: { health_step: number, health: number }
    constructor(base) {
        this.maxHealth= writable(base.health)
        this.health = writable(get(this.maxHealth))
        this.base = base
    }
    // Getters ---->
        public getHealth() {return this.health}
        public getMaxHealth() {return this.maxHealth}
        public isDead() {return this.dead}
    // ---->
    public takeDamage(damageAmt: number) {
        this.health.update((val) => val-= damageAmt)
        if (get(this.health) <= 0) {
            this.dead = true
            this.health.update(v => 0)
        }
        return this.dead
    }
    public gainHealth(gainAmt : number) {
        // Todo: I might change this to be less effective if the user is under a status effect
        this.health.update((val) => val += gainAmt)
        if (get(this.health) > get(this.maxHealth)) 
            this.health.set(get(this.maxHealth))
        
    }
    public calcMaxHealth() {
        let step = Math.round(Math.random() * this.base.health_step)
        if (step == 0) step = Math.round(Math.random() * this.base.health_step)
        this.maxHealth.update((val) => val += step)
        this.health.set(get(this.maxHealth))
    }
}
export class Level {
    level : Writable<number>
    xp : Writable<number>
    maxXp : Writable<number>
    constructor(e_level : number = 1) {
        this.level = writable(e_level)
        this.xp = writable(0)
        this.maxXp = writable(25)
    }
    // Getters ---->
        public getLevel() {return this.level}
        public getXp() {return this.xp}
        public getMaxXp() {return this.maxXp}
    // ---->
    public gainXp(gainAmt : number): number {
        this.xp.update(val => val + gainAmt)
        let level_ups = 0
        while (get(this.xp) >= get(this.maxXp)) {
            this.levelUp()
            level_ups++
        }
        // if you see console.log, it runs it again after it's 0
        return level_ups
    }
    private levelUp() {
        if (get(this.level) == 100) {
            this.xp.set(get(this.maxXp))
        }
        else {
            this.xp.update(val => {
               return  val - get(this.maxXp)
            })
            this.maxXp.set(Math.round(this.determineMaxXp()))
            this.level.update(val => val + 1)
        }
    }
    private determineMaxXp() {
        let factor = 3
        let retMaxXp = 25
        for (let i = 1; i <= get(this.level); i++) {
            if (i % 20 == 0) factor++;
            retMaxXp += retMaxXp / factor
        }
        return retMaxXp
    }
}