const print = async (teams) => {
    console.table(teams.map(team => {
        return {
            "Team": team.fullName,
            "Division": team.divName,
            "Conference": team.confName,
            "Record": `${team.wins}-${team.losses}`
        }
    }));
}

const printDivision = async (teams, divName) => {
    print(teams.filter(team => team.divName === divName));
}

const printConference = async (teams, confName) => {
    print(teams.filter(team => team.confName === confName));
}

module.exports = { print, printDivision, printConference }