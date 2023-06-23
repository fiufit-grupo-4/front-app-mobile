import { unionWith } from 'lodash'

export function messagesReducer (state, action) {
  console.log("STATE.payload", action.payload)
  switch (action.type) {
    case 'add':
      return unionWith(state, action.payload, function (a, b) {
        return a.senderId === b.senderId
      }).sort(function (a, b) {
        const aData = a.data()
        const bData = b.data()

        return bData.timestamp.seconds - aData.timestamp.seconds
      })
    default:
      throw new Error('Action type is not implemented!')
  }
}
