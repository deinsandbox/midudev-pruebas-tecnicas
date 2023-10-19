import net from 'node:net'
import fs from 'node:fs'

export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    callback(null, { time: process.hrtime(startTime), ip })
  })

  client.on('error', (err) => {
      client.end()
      callback(err)
  })
}

export function obtenerDatos(callback) {
  setTimeout(() => {
    callback(null, { data: 'datos importantes' });
  }, 2000);
}

export function obtenerDatosPromise({time}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'datos importantes' });
    }, time);
  })
}

export function procesarArchivo(callback) {
  try {
    const handleWriteFile = (error) => {
      if (error) {
        console.error('Error guardando archivo:', error.message);
        callback(error)
      }
    }

    const handleReadFile = (error, contenido) => {
      if (error) {
        console.error('Error leyendo archivo:', error.message);
        callback(error)
      }

      if (!contenido) {
        const error = new Error('There is no content on file')
        callback(error)
      }

      const textoProcesado = contenido?.toUpperCase()

      fs.writeFile('output.txt', textoProcesado, handleWriteFile)

      console.log('Archivo procesado y guardado con éxito')
      callback(null)
    }

    fs.readFile('input.txt', 'utf8', handleReadFile)

  } catch (error) {
    callback(error.message)
  }
}

export async function procesarArchivoPromise() {
  try {
    const content = await fs.promises.readFile('input.txt', 'utf8')
      .catch((error) => {
        console.error('Error leyendo archivo:', error.message)
        throw error
      })
    if (!content) {
      throw new Error('No hay contenido en el archivo')
    }
    const textoProcesado = content?.toUpperCase()

    try {
      await fs.promises.writeFile('output.txt', textoProcesado)
    } catch (error) {
      console.error('Error guardando archivo:', error.message)
      throw error
    }

    console.log('Archivo procesado y guardado con éxito')
    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error.message)
  }
}

export function leerArchivos() {
  const archivo1 = fs.readFileSync('archivo1.txt', 'utf8');
  const archivo2 = fs.readFileSync('archivo2.txt', 'utf8');
  const archivo3 = fs.readFileSync('archivo3.txt', 'utf8');

  return `${archivo1} ${archivo2} ${archivo3}`
}

export async function leerArchivosAwait() {
  const archivo1 = await fs.promises.readFile('archivo1.txt', 'utf8');
  const archivo2 = await fs.promises.readFile('archivo2.txt', 'utf8');
  const archivo3 = await fs.promises.readFile('archivo3.txt', 'utf8');

  return `${archivo1} ${archivo2} ${archivo3}`
}


export async function leerArchivosPromise() {
  const fileNames = ['archivo1.txt', 'archivo2.txt', 'archivo3.txt']

  const [archivo1, archivo2, archivo3] = await Promise.all(
    fileNames.map(path => fs.promises.readFile(path, 'utf8'))
  )

  return `${archivo1} ${archivo2} ${archivo3}`
}

export async function delay (time) {
  setTimeout(() => {
    return Promise.resolve()
  }, time);
}

