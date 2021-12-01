let image = require('./images/mag-glass.png');


const Card = (card) => {
  return (
    <div className='container'>
      <input
        type='text'
        className='input'
        placeholder='Search By Name'
        onChange={card.handleChange}
        value={card.input}
      />
      <img className='image' alt='' src={image.default} />
    </div>
  )
}

export default Card;
