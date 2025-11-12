import Pusher from 'pusher-js';

const { VITE_PUSHER_CLUSTER, VITE_PUSHER_KEY } = process.env;
const pusher = new Pusher(VITE_PUSHER_KEY, {
  cluster: VITE_PUSHER_CLUSTER
});

export default pusher;
