"use client"

import React from 'react'
import { faker } from '@faker-js/faker'
import Image from 'next/image'

interface User {
  id: string
  name: string
  avatar: string
  interests: string[]
  similarity: number // Add this line
}

const generateFakeUsers = (count: number): User[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    avatar: faker.image.avatar(),
    interests: Array.from({ length: 3 }, () => faker.word.noun()),
    similarity: faker.number.int({ min: 60, max: 100 }) // Add this line
  }))
}

const Matches = () => {
  const similarUsers = generateFakeUsers(10)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">For You</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {similarUsers.map((user) => (
          <div key={user.id} className="border rounded-lg p-4 flex items-center">
            <Image 
              src={user.avatar}
              alt={user.name} 
              width={64}
              height={64}
              className="rounded-full mr-4"
              placeholder="blur"
              blurDataURL="/placeholder-avatar.png"
            />
            <div className="flex-grow">
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">Interests: {user.interests.join(', ')}</p>
              <p className="text-sm font-medium text-green-600 mt-1">{user.similarity}% Match</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Matches