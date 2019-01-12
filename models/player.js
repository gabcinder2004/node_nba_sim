module.exports = class Player {
    constructor(id, firstName, lastName, position, teamId, historicalStats, ratings) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.teamId = teamId;
        this.historicalStats = historicalStats;
        this.ratings = ratings;
    }

    set id(i) {
        this._id = i;
    }

    get id() {
        return this._id;
    }

    set firstName(i) {
        this._firstName = i;
    }

    get firstName() {
        return this._firstName;
    }

    set lastName(i) {
        this._lastName = i;
    }

    get lastName() {
        return this._lastName;
    }

    set position(i) {
        this._position = i;
    }

    get position() {
        return this._position;
    }

    set teamId(i) {
        this._teamId = i;
    }

    get teamId() {
        return this._teamId;
    }

    set historicalStats(i) {
        this._historicalStats = i;
    }

    get historicalStats() {
        return this._historicalStats;
    }

    set ratings(i) {
        this._ratings = i;
    }

    get ratings() {
        return this._ratings;
    }
}