'use server'

import WebTorrent from 'webtorrent'



// using webtorrent and archiver to create a zip file from a magnet link and stream it to the client

import fs from 'fs'

export const  downloadTorrent = async (magnetURI: string) => {
  const client = new WebTorrent()

  client.add(magnetURI, (torrent) => {
    torrent.files.forEach((file) => {
      // Create a writable stream for the file to be written to disk
      const stream = fs.createWriteStream(file.name)

      // Stream the file to disk
      file.createReadStream().pipe(stream)

      stream.on('finish', () => {
        console.log(`Downloaded ${file.name}`)
      })
    })
  })
}
