import faunaClient from './clients/faunaClient';



const fauna = faunaClient()


export function PushToDB(account: string, orderId: number, data: object) {
  let query = fauna.client.query(
    fauna.cursor.Create(
      fauna.cursor.Collection('test'),
      { data: data }
    )
  )
  query.then(response => {
    Index(account, orderId, response.ref)
  })

}

function Index(account: string, orderId: number, data: object) {
  let query = fauna.client.query(
    fauna.cursor.Create(
      fauna.cursor.Collection('index'),
      { data: 
        {
          account: account,
          orderId: orderId,
          document: data
        } 
      }
    )
  )
  query.then(response => response)
}

export async function checkIndexById(id: number) {
  var arr = []
  let query = fauna.client.paginate(fauna.cursor.Match(fauna.cursor.Index('index_by_orderId2'), id))
  await query.each((page) => {
    arr = page
   })
   
    if (arr[0] === id) {
        return true
        
    } else {
        return false
    }
   
}

