// src/App.tsx
import React from 'react'
import Profile from './components/Profile'
import NavBar from './components/NavBar'
import Board from './components/Board'
import './App.css'

export default function App() {
  return (
    <>
      <NavBar />
      <main className='main'>
        <Board />
      </main>
    </>
  )
}
