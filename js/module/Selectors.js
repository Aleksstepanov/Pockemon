export default class {
    constructor(name) {
        this.$el = document.getElementById(`health-${name}`),
        this.$elProgressBar = document.getElementById(`progressbar-${name}`),
        this.$btnDamage = document.getElementById(`btn-kick-${name}`)
    }
}
