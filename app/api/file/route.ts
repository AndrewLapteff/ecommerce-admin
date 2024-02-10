import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import Magnet2torrent from 'magnet2torrent-js'
export const magnetLink = 'magnet:?xt=urn:btih:90289fd34dfc1cf8f316a268add8354c85334458'

const m2t = new Magnet2torrent({ timeout: 10 })

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return NextResponse.error()
  }

  const { magnetUrl } = await request.json()
  let stream

  try {
    stream = await m2t.getTorrent(magnetUrl).then(torrent => {
      const buffer = torrent.toTorrentFile()
      const blob = new Blob([ buffer ], { type: 'application/x-bittorrent' })
      const stream = blob.stream()
      return { stream, fileName: torrent.name + '.torrent' }
    }).catch(e => {
      return NextResponse.json({ error: e.message }, { status: 400 })
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (stream instanceof Response || !stream) {
    return NextResponse.json({ error: 'timeout' }, { status: 400 })
  }

  return new NextResponse(stream.stream, {
    headers: {
      'Content-Type': 'application/x-bittorrent',
      'Content-Disposition': `attachment; filename="${stream.fileName}"`,
      'File-Name': stream.fileName
    }
  })
}