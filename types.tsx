/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  ChatRoom: undefined;
  Contacts: undefined;
  NotFound: undefined;
};

export type MainTabParamList = {
  Camera: undefined;
  Chats: undefined;
  Status: undefined;
  Calls: undefined;
  
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type User = {
  id: String;
  name: String;
  imageUri: String;
  status: String
}

export type Message = {
  id: String;
  content: String;
  createdAt: string;
  user: User;
}

export type Chatroom = {
  id: String;
  users: User[];
  lastMessage: Message;
}


// id: '1',
// users: [{
//   id: 'u1',
//   name: 'Vadim',
//   imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
// }, {
//   id: 'u2',
//   name: 'Lukas',
//   imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
// }],
// lastMessage: {
//   id: 'm1',
//   content: 'Well done this sprint, guys!',
//   createdAt: '2020-10-03T14:48:00.000Z',
// }