'use server'

import fs from 'fs'
import { s3 } from "@/lib/s3"
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { auth } from "@/lib/auth"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'




export const getSignedURL = async (type: string, size: number) => {
  const session = await auth()

  if (typeof session?.user === 'undefined') return { error: 'Unauthenticated' }

  const commad = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFineName(8),
    ContentType: type,
    ContentLength: size,
    Metadata: { userId: session.user.id }
  })

  const signedURL = await getSignedUrl(s3, commad, {
    expiresIn: 60
  })
  return { url: signedURL }
}

export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, '0'))
    .join("")
  return hashHex
}

export const generateFineName = (bytes = 8) => crypto.randomBytes(bytes).toString('hex')

export const getObject = async (key: string) => {

  // const command = new GetObjectCommand({
  //   Bucket: process.env.AWS_BUCKET_NAME!,
  //   Key: key
  // })
  // const { Body } = await s3.send(command)
  // const res = await Body?.transformToWebStream()
  // const reader = res?.getReader()
  // const chunks = []
  // if (typeof reader === 'undefined') return { error: 'Error' }
  // while (true) {
  //   const { done, value } = await reader?.read()
  //   if (done) break
  //   chunks.push(value)
  // }
  // const blob = new Blob(chunks)
  // const url = URL.createObjectURL(blob)

  const commad = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFineName(8),
    ContentType: 'torrent',
    ContentLength: 1000,
    Metadata: { userId: '123' }
  })

  const signedURL = await getSignedUrl(s3, commad, {
    expiresIn: 60
  })

  console.log(signedURL.split('?')[0])
}