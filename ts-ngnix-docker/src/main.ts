import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";

const sleep = (t: number) =>
  new Promise(resolve => setTimeout(resolve, t * 1000));
// const connection = new IORedis();

// Reuse the redis instance
const myQueue = new Queue("myqueue");
// const myWorker = new Worker("myworker", "myqueue", { connection });

const worker = new Worker("myqueue", async job => {
  // Will print { foo: 'bar'} for the first job
  // and { qux: 'baz' } for the second.
  console.log(job.data);
  await sleep(Math.random());
});

worker.on("completed", job => {
  console.log(`${job.id} has completed!`);
});

worker.on("failed", (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`);
});

async function addJobs() {
  console.log(await myQueue.getActive());
  // for (let i = 0; i <= 100; i++) {
  //   await myQueue.add("myJobName", { foo: "bar" });
  //   await myQueue.add("myJobName", { qux: "baz" });
  // }
}

async function main() {
  console.log("Hello World");
  await addJobs();
}

main();
