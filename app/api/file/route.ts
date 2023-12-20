import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  // if (request.method !== 'GET') {
  //   return response.status(405).end()
  // }

  // const stream = new ReadableStream({
  //   start(controller) {
  //     const file = fs.readFileSync(path.join(process.cwd(), 'torrents', 'test.torrent'))
  //     controller.enqueue(file)
  //     controller.close()
  //   }
  // })

  return NextResponse.json({ message: 'Hello' })
}