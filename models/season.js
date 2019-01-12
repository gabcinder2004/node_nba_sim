var playerFactory = require('../models/factories/players');
var teamFactory = require('../models/factories/teams');
var Schedule = require('../models/schedule');
var standings = require('../cmds/standings');
var scheduleFactory = require('../collectors/schedule');
var file_manager = require('../utils/file_manager');
var guid = require('../utils/guid');

module.exports = class Season {
  async initialize() {
    try {
      // Generate players
      this.players = await playerFactory.generate();

      // Populate team rosters
      this.teams = await teamFactory.generate(this.players);

      // Generate schedule
      this.schedule = new Schedule();
      await this.schedule.initialize();

      // Save season file
      this.id = await guid();
      // var season = { id, players: players.detailed, teams, schedule: JSON.stringify(schedule) };
      file_manager.writeToFile(`saves/season-${this.id}.json`, JSON.stringify(this));

      console.log("Season initialized.");
      standings.print(this.teams);
    }
    catch (err) {
      console.error(err);
    }
  }

  get id() {
    return this._id;
  }

  set id(i) {
    this._id = i;
  }

  get players() {
    return this._players;
  }

  set players(p) {
    this._players = p;
  }

  get schedule() {
    return this._schedule;
  }

  set schedule(s) {
    this._schedule = s;
  }

  get teams() {
    return this._teams;
  }

  set teams(t) {
    this._teams = t;
  }

  static async load (filename) {
    return file_manager.readSaveFile(filename);
  }
}
