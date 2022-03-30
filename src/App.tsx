
import { useFakeQuery } from './data/fakeFetchClient';
import { useState } from 'react';

import Card from './card';
import Badge from './badge';
import $ from 'jquery';
//This project was an interesting one for me -- so much learning! I loved it,
//after the frustration settled. hehe. There's still some functionality
//not in place. I wasn't able to pass data as I had intened without running
//into an infinite loop or scoping obstacles.  With more time I would've broken
//out the uniquePlayer logic into a separate component. Additionally, I
//would've liked to use useEffect() more often, having just learned about it.
//I understand the advantage of keeping a dummy component as a functional
//component vs a class component without adding the confusion of state, but am
//pleased to have learned so much about functional React hooks that make life
//a whole lot easier. I should mention it's also embarassing to admit that
//I've had very limited experince running logic exclusively in a functional
//component and passing state, as well as with TypeScript itself.
//My experience with React was primarily using classes and passing props
//to child compoonents.

//I would've like to make a new API call upon searching for a player, but again,
//was running into issues with the call not being made at the top-level.

//I wanted to make note that it seems the README instructions are referencing
//another database. I couldn't find any 'winRate' endpoints and instead am
//passing the uniquePlayers value to the badge in order to have criteria to
//color the badges and show the logic behind the dynamic value.

//Additionally, I added two more players to the fakeData.ts file. This allowed
//me to create a similar UI mock up to the one provided, totaling five players.

//I realize there is a lot left undone in this assessment. This is where I'm
//proud to present to you a semi-working project using technologies I haven't
//used before -- conversely, it makes it abundantly clear where I need more
//guidance and quite frankly, more experience. I just want to make clear how
//very interested I am in working for Terminal.io and would love nothing more
//than the opportunity to improve upon a solid understanding of programming and
//what I need to take my code to the next level. Thank you kindly for the
//consideration. With all that being said, Enjoy!

const App = () => {
  //Took   some time to realize that I wasnted formatting my return
  //TrypScript according to useState()
  const [card, setCard] = useState<any | null>(null);
  const [input, setInput] = useState<any | null>('');
  const [search, setSearch] = useState<any | null>('');
  const { data,loading } = useFakeQuery('SelectPlayers', {
    variables: { search: null },
  })
  $('.input').focus()

    // const loadCards = () => {
    //
    // }

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
        //This uniqueArray data, unfortunately, doesn't have any real value,
        //but I wanted to see if I could get the functionality in place that
        //change the badge color depending on it's value.

        //I was having some difficutly in passing the state values around
        //withouth causing an infinite loop.


        //I learned A LOT with this project not having been familiar with
        //useState(), useRef(), and useEffect() within functional components.
        //I plan on delving further into these particular hooks and how to take
        //advantage of them.

        //I would've like to completed more. Had I been able to reference the
        //{input} state (triggered by the handleChange), it would've been simple
        //to plug that logic into the 'if' conditional at the top of the render
        //function. I also would've used an handler function to orchestrate
        //the render in a more controlled fashion, i.e. loadCards(). This would
        //eliminate a lot of the headache from the render() function be called
        //right off the bat due to it being in {brackets} the component's render
        //function.

        uniqueArray.length <= 7
        ? $('.badge').css('background-color', 'red')
        : $('.badge').css('background-color', 'orange')
        return uniqueArray.length//was .length, but these arrays (uniqueArray)
        //should be compared against each other to remove any duplicates. I was
        //using nonsensical logic here, just trying to trigger the code. I
        //clearly am not pulling in the correct data, as there's still
        //duplicates that need to bew removed by comparing the multiple arrays
        //per player.
      })
      console.log('player', player.length)
      //sort logic not currently working
      let memberDate = parseInt(card.membershipDate.replace(/-/g, ''))
      // memberDate.sort((a, b) => b.date - a.date)
      console.log('Membership Date', memberDate)

      return (
        <li id='user' className='card' key={i}>
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
  // const renderSearched = (name) => {
  //   name.forEach((user) => {
  //     if (user == null) {
  //       console.log('NULLL USER', user)
  //     }
  //   })
  // }

//I was having some difficulty separating handleChange fucntion from the
////is still needing work to target each indivdual badge vs changing the color
//of all badges). You'll notice this logic also triggers the card state and
//the input state - please see React Dev tools state upon triggering logic.
  let playerArray = []
  const handleChange = (e) => {
    e.preventDefault()
    let searchInput = e.target.value
    setInput(searchInput)
    setCard(data)
    let name = data.map((name) => {
      return name.fullName.split(' ').join('').toLowerCase().match(searchInput)
    })
    setSearch(name)
    name.forEach((e) => {
      if (e == null) {
        // renderSearched(name)
        $('#user').hide()
        console.log("RENDER NAME ARRAY", name)
      } else if (e !== null){
          // render()
        $('#user').show()
        console.log('not serched')
      }
    })
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
