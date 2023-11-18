
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