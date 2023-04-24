import { useState } from 'react'

const Statistics = (props) => {

  const { good, neutral, bad, allFeedback, allAverage, handleGood, handleNeutral, handleBad} = props

  const average = allFeedback !==0 ? allAverage / allFeedback : 0
  const posAverage = allFeedback !==0 ? good / allFeedback : 0

  const Button = () => {
    return (
    <div>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
    </div>
    )
  }

  const StatisticLine = (props) => {
    const {text, value} = props

    return (
      <div>
        <p>{text} {value}</p>
      </div>
    )
  }

  const ViewStatistics = (props) => {
    if(props.allFeedback === 0) {
      return  (
        <div>
          No feedback given
        </div>
      )
    }

    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine />
      </div>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button />
      <ViewStatistics allFeedback={allFeedback} />
      {allFeedback > 0 && (
      <>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={allFeedback} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={posAverage} />
      </>
      )} 
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setAllFeedback] = useState(0)
  const [allAverage, setAllAverage] = useState(0)

  const handleGood =() => {
    setGood(good + 1)
    setAllFeedback(allFeedback + 1)
    setAllAverage(allAverage +1)
  }

  const handleNeutral =() => {
    setNeutral(neutral + 1)
    setAllFeedback(allFeedback + 1)
  }

  const handleBad =() => {
    setBad(bad + 1)
    setAllFeedback(allFeedback + 1)
    setAllAverage(allAverage - 1)
  }

return (
  <div>
    <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      allFeedback={allFeedback}
      allAverage={allAverage}
      handleGood={handleGood}
      handleNeutral={handleNeutral}
      handleBad={handleBad}
    />
  </div>
)
} 
/*
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allFeedback, setAllFeedback] = useState(0)
  const [allAverage, setAllAverage] = useState(0)

  const handleGood =() => {
    setGood(good + 1)
    setAllFeedback(allFeedback + 1)
    setAllAverage(allAverage +1)
  }

  const handleNeutral =() => {
    setNeutral(neutral + 1)
    setAllFeedback(allFeedback + 1)
  }

  const handleBad =() => {
    setBad(bad + 1)
    setAllFeedback(allFeedback + 1)
    setAllAverage(allAverage - 1)
  }

  const average = allFeedback !==0 ? (allAverage / allFeedback) : 0
  const posAverage = allFeedback !==0 ? (good / allFeedback) : 0

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {allFeedback}</p>
      <p>average {average} </p>
      <p>positive {posAverage}</p>
    </div>
  )
}
*/
export default App
