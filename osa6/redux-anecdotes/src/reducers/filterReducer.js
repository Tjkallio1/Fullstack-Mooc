import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
    setFilter: (state, action) => {
      return action.payload
    }
  }
})

export const { setFilter } = filterSlice.actions

/*
  export const filterChange = (filter) => {
    return {
      type: filterSlice.actions.filter.type,
      payload: filter,
    }
  }
*/
  
export default filterSlice.reducer