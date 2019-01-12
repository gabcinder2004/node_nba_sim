module.exports = class Team {
    constructor(id, fullName, division, conference, players) {
        this.id = id;
        this.fullName = fullName;
        this.division = division;
        this.conference = conference;
        this.players = players;
        this.wins = 0;
        this.losses = 0;
    }

    get id() {
        return this._id;
    }

    set id(i) {
        this._id = i;
    }

    get fullName() {
        return this._fullName;
    }

    set fullName(i) {
        this._fullName = i;
    }

    get division() {
        return this._division;
    }

    set division(i) {
        this._division = i;
    }

    get conference() {
        return this._conference;
    }

    set conference(i) {
        this._conference = i;
    }

    get players() {
        return this._players;
    }

    set players(i) {
        this._players = i;
    }

    get wins() {
        return this._wins;
    }

    set wins(i) {
        this._wins = i;
    }

    get losses() {
        return this._losses;
    }

    set losses(i) {
        this._losses = i;
    }
}