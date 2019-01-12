var scheduleFactory = require('../collectors/schedule');
var file_manager = require('../utils/file_manager');
var Game = require('./game');

module.exports = class Schedule {
    get games() {
        return this._games;
    }

    set games(games) {
        this._games = games;
    }

    async getNextGames() {
        return this.games.filter(game => {
            return this.games.find(g => !g.winningTeam).date === game.date;
        });
    }

    async initialize() {
        var baseSchedule = await scheduleFactory.getSchedule();
        var games = [];
        await Promise.all(
            baseSchedule.map(async game => {
                games.push(new Game(game.id, game.date, game.hTeam, game.vTeam));
            }));

        this.games = games;
    }
}

