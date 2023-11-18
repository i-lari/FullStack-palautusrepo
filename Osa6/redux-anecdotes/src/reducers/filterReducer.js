import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState : 'ALL',
    reducers: {
      filterChange(state, action) {
        const filter = action.payload
        return filter
      },
    },
  })


export const { filterChange } = filterSlice.actions
export default filterSlice.reducer

/*

const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload
      default:
        return state
    }
  }

  export const filterChange = ( filter ) => {
    const ret = {
      type: 'SET_FILTER',
      payload: filter,
    }
    return ret
  }

  export default filterReducer

  */
