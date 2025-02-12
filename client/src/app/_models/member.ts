import { images } from "./images"

export interface Member {
    id: number
    username: string
    age: number
    imageUrl: string
    initials: string
    createdAt: Date
    lastActive: Date
    gender: string
    description: string
    profession: string
    phoneNumber: string
    images: images[]
  }
  