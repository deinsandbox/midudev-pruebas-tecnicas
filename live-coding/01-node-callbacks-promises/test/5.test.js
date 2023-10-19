import { delay } from "../solutions/index.js";

import { describe, it } from 'node:test'
import { equal } from 'node:assert/strict'

describe('2. obtenerDatosPromise', () => {
  it('2.1. obtenerDatosPromise', async () => {
    delay(3000).then(
      () => {
        equal(data, 'datos importantes')
      }
    )
  })
})
