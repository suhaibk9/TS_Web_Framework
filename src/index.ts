import { User } from './Models/User';
const user = new User({ name: 'John', age: 30 });
user.on('click', () => {
  console.log('click event');
});
user.on('hover', () => {
  console.log('hover event');
});
user.trigger('click');
user.trigger('hover');
