import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: []
    },
    reducers: {
        load: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { load } = cartSlice.actions

export default cartSlice.reducer