const allCoaches = [{
  id: 1,
  firstName: 'Bruce',
  lastName: 'Cassidy',
  teamId: 1,
},
{
  id: 2,
  firstName: 'Craige',
  lastName: 'Berube',
  teamId: 2,
}]

const coachByLastName = [{
  id: 1,
  firstName: 'Bruce',
  lastName: 'Cassidy',
  teamId: 1,

  team: {
    id: 1,
    location: 'Boston',
    mascot: 'Bruins',
    league: 'East',
  },
}]

module.exports = { allCoaches, coachByLastName }
