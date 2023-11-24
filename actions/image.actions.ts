'use server'

import { s3 } from "@/lib/s3"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { auth } from "@clerk/nextjs"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import crypto from 'crypto'




export const getSignedURL = async (type: string, size: number) => {
  const { userId } = auth()
  if (!userId) return { error: 'Unauthorized' }

  const commad = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: generateFineName(8),
    ContentType: type,
    ContentLength: size,
    Metadata: { userId }
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