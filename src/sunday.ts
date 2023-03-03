require('dotenv').config({ path: __dirname+'/.env' });

console.log(__dirname);
console.log(process.env.PUBLIC_KEY);
console.log(process.env.PRIVATE_KEY);