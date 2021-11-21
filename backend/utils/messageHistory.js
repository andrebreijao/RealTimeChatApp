import { formatMessage } from './message.js'

// const msg = (text, time, userName) => {
//   return { text, time, userName }
// }

// export const messageHistory = [msg('primeira mensagem', '7:59 pm', 'user1'),
// msg('segunda mensagem', '7:59 pm', 'user1'),
// msg('terceira mensagem', '7:59 pm', 'user1'),
// msg('quarta mensagem', '7:59 pm', 'user1')]

/*

Room history object

  - Object with all the room and their respective history
  const history = {Javascript: [msg1,msg2, msg3], Python: [msg1,msg2,msg3]}

  - Once the user connects, he receives the array of its respective room and if the room does not exist, create its record

  - When a user sends a message the room array is updated and all they users resceive the updated history

*/


const msgHistoryByRoom = {};

const addAndReturnRoomHistory = (msg, user, room) => {
  const msgFormated = formatMessage(user, msg)
  if (room in msgHistoryByRoom) {
    msgHistoryByRoom[room].push(msgFormated);
    return msgHistoryByRoom[room]
  }
  msgHistoryByRoom[room] = [msgFormated];
  return msgHistoryByRoom[room]
}

export { addAndReturnRoomHistory }
