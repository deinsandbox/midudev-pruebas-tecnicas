import { leerArchivos, leerArchivosAwait, leerArchivosPromise } from "../solutions/index.js";

import { describe, it } from 'node:test'
import { equal } from 'node:assert/strict'

describe('4. leerArchivos', () => {
  it('4.1. leerArchivos', () => {
    const mensaje = leerArchivos()
    equal(mensaje, 'hola qué tal')
  })

  it('4.1. leerArchivosAwait', async () => {
    const mensaje = await leerArchivosAwait()
    equal(mensaje, 'hola qué tal')
  })

  it('4.1. leerArchivosPromise', async () => {
    const mensaje = await leerArchivosPromise()
    equal(mensaje, 'hola qué tal')
  })
})