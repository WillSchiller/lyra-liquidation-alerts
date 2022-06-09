const faunadb = require('faunadb')
const q = faunadb.query


export default async function (data: object) {

  let client = new faunadb.Client({
    secret: process.env.FAUNA_TOKEN,
    domain: 'db.fauna.com',
    port: 443,
    scheme: 'https',
  })


  let query = client.query(
    q.Create(
      q.Collection('test'),
      { data: data }
    )
  )

  query.then(response => response)

}

