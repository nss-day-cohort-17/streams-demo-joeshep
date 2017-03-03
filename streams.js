// Leveraging the 'stream' core module
const { Readable, Writable, Transform } = require('stream');

const readStream = new Readable();
console.log("readStream", readStream);
const transformStream = Transform();
const writeStream = Writable();

let i = 0;

readStream._read = () => {
  if (i > 100) {
    readStream.push(null)
  } else {
    setTimeout( () => readStream.push(`${i++}`), 50)
  }
}

transformStream._transform = (buffer, encoding, done) => {
  setTimeout( () => done(null, `${(Number(buffer) *2)}`), 1000)
}

writeStream._write = (buffer, encoding, done) => {
  process.stdout.write(`${buffer}\n`)
  setTimeout(done, 500)
}

readStream.pipe(transformStream).pipe(writeStream)
