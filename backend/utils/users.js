const users = [];

//Join user to chat

const userJoin = (id, userName, room) => {
  const user = { id, userName, room };

  users.push(user);

  return user;
};

//Get current user
const getCurrentUser = (id) => {
  return users.find(user => user.id === id);
}

export { users,userJoin, getCurrentUser };
