process.on('exit', (code) => {
  console.log(`Exit ==> El proceso termino con codigo ${code}\n\n`);
});

process.exit(5)

console.log("EJECUTANDO MI PROGRAMA")
