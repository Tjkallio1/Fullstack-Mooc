const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const nimi = "Jokke"
  const ika = 25

  return (
  <>
    <h1>Greetings</h1>
    <Hello name="Ossi" age={20 + 7}/>
    <Hello name={nimi} age={ika}/>
  </>
  )
}

export default App