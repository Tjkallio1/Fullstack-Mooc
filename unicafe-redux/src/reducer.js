const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const addGood = {
        ...state,
        good: state.good +1
      }
      return addGood
    case 'OK':
      const addOk = {
        ...state,
        ok: state.ok +1
      }
      return addOk
    case 'BAD':
      const addBad = {
        ...state,
        bad: state.bad +1
      }
      return addBad
    case 'ZERO':
      const setZero = {
        good: 0,
        ok: 0,
        bad: 0
      }
      return setZero
    default: return state
  }
  
}

export default counterReducer
