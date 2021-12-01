
import { useFakeQuery } from './data/fakeFetchClient';
import { useState } from 'react';
import Card from './card';
import Badge from './badge';
import $ from 'jquery';
//This project was an interesting one for me -- so much learning! I loved it,
//after the frustration settled. hehe. There still some functionality
//not in place. I wasn't able to pass data as I had intened without running
//into infinite loop or scoping obstacles.  With more time, I would've broken
//out the uniquePlayer logic into a separate component. Additionally, I
//would've liked to use useEffect() more often, having just learned about it.
//I understand the advantage of keeping a dummy component as a functional
//component vs a class component without adding the confusion of state but am
//pleased to hafve learned so much about functional React hooks that make life
//a whole lot easier.

//I would've like to make a new API call upon searching for a player, but again,
//was running into issues with the call not being made at the top-level.

//I wanted to make note that it seems the README instructions are referencing
//another database. I couldn't find any 'winRate' endpoints and instead am
//passing the uniquePlayers value to the badge in order to have criteria to
//color the badges.

const App = () => {
  //Took   some time to realize that I wasnted formatting my return
  //trypscript according to useState()
  const [card, setCard] = useState<any | null>(null);
  const [input, setInput] = useState<any | null>('');
  const [search, setSearch] = useState<any | null>('');
  const { data, error, loading } = useFakeQuery('SelectPlayers', {
    variables: { search: null },
  })
  $('.input').focus()

    const render = () => {
    if((data !== null) && (search.state !== null)) {
      return data.map((card, i) => {
      //Push each unique player into playerArray -- loop thru player.games
      //and compare all other players with a filter method to get unique
      //players from all games. -- this array still currently contains
      //duplicates.

      //want to filter thru every game and find all unique players PER MAIN Player
      let player = card.games.map((otherPlayers, i) => {
        let uniquePlayers = otherPlayers.otherPlayers
        playerArray.push(uniquePlayers)
        //filter players per user
        let uniqueArray = playerArray.filter(function(item, pos) {
          return playerArray.indexOf(item) === pos
        })
        //this uniquaArray data, unfortunately, doesn't have any real value,
        //but I wanted to see if I could get the functionality in place that
        //change the badge color depending on it's value

        //I was having some difficutly in passing the state values around
        //withouth causing an infinite loop. I learned A LOT with this project
        //not having been familiar with useState() and useEffect() within
        //functional components.
        uniqueArray.length <= 7
        ? $('.badge').css('background-color', 'red')
        : $('.badge').css('background-color', 'orange')

        return uniqueArray.length//was .length, but these arrays (uniqueArray)
        //should be compared against each other to remove any duplicates.
      })
      console.log('player', player.length)

      //sort logic not currently working
      let memberDate = parseInt(card.membershipDate.replace(/-/g, ''))
      // memberDate.sort((a, b) => b.date - a.date)
      console.log('Membership Date', memberDate)

      return (
        <li className='card' key={i}>
        <img alt='' src={card.avatar}/><br />
        <div className='name'>{card.fullName}</div><br />
        <div className='membership'>Joined: {card.membershipDate}</div><br />
        <div className='unique'>Unique Opponents: {player}</div>
          <p id='badge-color' data-size={player}>
            <Badge
              player={player}
            />
          </p>
        </li>
      )
      })
    }
  }

//I was having some difficulty separating the logic out of handleChange. This
//handleChange logic triggers the badge color change (which is still needing
//work to target each indivdual badge vs changing the color of all badges).
//You'll notice this logic also triggers the card state and the input state --
//please see React Dev tools upon logic trigger.
  let playerArray = []
  const handleChange = (e) => {
    $('li').hide()
    let searchInput = e.target.value
    setInput(searchInput)
    setCard(data)
    let name = data.map((name) => {
      return name.fullName.split(' ').join('').toLowerCase().match(searchInput)
    })
    setSearch(name)
    if (name !== null) {
      console.log("RENDER NAME", name)
      $('li').show()
      render()
    } else {
      $('li').hide()
    }
  }

  const searchAfterTimeout = () => {
    //employ handleClick after 4 seconds
  }

  return (
    <div>
      <h1>Recent Activity</h1>
      <span>{loading ? 'Loading...' : ''}</span><br /><br />
      <Card
        card={card}
        input={input}
        handleChange={handleChange}
      />
      <ul>
        {render()}
      </ul>
      <br />
    </div>
  )
}

export default App;
