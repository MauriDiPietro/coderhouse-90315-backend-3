console.log(process.cwd())
console.log(process.pid)
console.log(process.version)
console.log(process.platform)
console.log(process.memoryUsage())

process.exit(1) // 0 = sin errores, (1, 5, 9) = con errores

console.log('Esto no se ejecuta porque el proceso se ha cerrado antes');
