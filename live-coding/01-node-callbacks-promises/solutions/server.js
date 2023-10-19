import express from 'express'

export const app = express()
app.use(express.json())

const items = [
  {
    id: 1,
    content: 'Item 1'
  }
]

app.get('/items', (req, res) => {
  return res.json(items)
})

app.get('/items/:id', (req, res) => {
  const { id } = req.params
  const itemFound = items.find(item => item.id === Number(id))
  if (!itemFound) {
    return res.status(404).json({ error: 'Item not found' })
  }

  return res.json(itemFound)
})

app.post('/items', (req, res) => {
  const { content } = req.body
  const newId = items.length + 1
  const newItem = { id: newId, content }
  items.push(newItem)
  return res.json(newItem)
})

app.put('/items/:id', (req, res) => {
  const { id } = req.params
  const { content } = req.body
  const itemFound = items.find(item => item.id === Number(id))
  if (!itemFound) {
    return res.status(404).json({ error: 'Item not found' })
  }

  itemFound.content = content
  return res.json(itemFound)
})

app.delete('/items/:id', (req, res) => {
  const { id } = req.params
  const itemIndex = items.findIndex(item => item.id === Number(id))
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' })
  }

  items.splice(itemIndex, 1)
  return res.status(200).json()
})

export const server = app.listen(process.env.port ?? 3000, () => {
  console.log('Listening on port http://localhost:3000')
})

