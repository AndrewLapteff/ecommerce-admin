import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import * as path from 'path'
import { NextResponse } from 'next/server'
import { Stream } from 'stream'

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'GET') {
    return response.status(405).end()
  }

  const stream = new ReadableStream({
    start(controller) {
      const file = fs.readFileSync(path.join(process.cwd(), 'torrents', 'test.torrent'))
      controller.enqueue(file)
      controller.close()
    }
  })

  return new NextResponse(stream)
}