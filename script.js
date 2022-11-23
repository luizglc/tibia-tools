
async function getCharacter() {
  let characterURL = 'https://api.tibiadata.com/v3/character/'
  const inputCharacter = document.getElementById('inputCharacter').value

  let response = await fetch(`${characterURL}${inputCharacter}`)
  let data = await response.json()
  return data
}
async function getOnlinePlayers(world) {
  let response = await fetch(`https://api.tibiadata.com/v3/world/${world}`)
  let data = await response.json()
  return data
}
function characterTibiaAPI() {
  getCharacter().then((data) => {
    let characterInfo = data.characters.character
    let world = data.characters.character.world

    getOnlinePlayers(world).then((response) => {
      let players = response.worlds.world.online_players
      let tablePlayers = document.getElementById('playersTable')
      tablePlayers.innerHTML += '<thead><tr><th>Name</th><th>Level</th><th>Vocation</th></tr></thead>'
      players.forEach((player) => {
        if ((characterInfo.level / 1.5) < player.level && (characterInfo.level * 1.5) > player.level) {
          tablePlayers.innerHTML += `<tbody><tr><td>${player.name}</td><td>${player.level}</td><td>${player.vocation}</td></tr></tbody>`
        }
      })
    }).catch((error) => console.log(error))
  }).catch((error) => console.log(error))

  document.getElementById('inputCharacter').value = ''
}
document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const btn = document.querySelector('#buttonSubmit')
    btn.click()
  }
})