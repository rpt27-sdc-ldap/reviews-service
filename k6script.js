import http from 'k6/http';

export let options = {
  scenarios: {
    '1000rps': {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '1800s',
      preAllocatedVUs: 50, // how large the initial pool of VUs would be
      maxVUs: 150, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {
  const id = Math.ceil(Math.random() * Math.random() * Math.random() * 10000000);
  http.get('http://localhost:4001/books/'+id+'/reviews');
  //http.get('http://localhost:5500/reviews/' + id);
}