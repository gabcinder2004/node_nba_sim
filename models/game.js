module.exports = class Game {
    constructor(id, date, homeTeam, awayTeam) {
        this.id = id;
        this.date = date;
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.winningTeam = null;
    }
}