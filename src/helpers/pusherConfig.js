import Pusher from 'pusher-js';

const { REACT_APP_PUSHER_CLUSTER, REACT_APP_PUSHER_KEY } = process.env;
const pusher = new Pusher(REACT_APP_PUSHER_KEY, {
  cluster: REACT_APP_PUSHER_CLUSTER
});

export default pusher;
