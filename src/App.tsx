import { useRef } from 'react'
import './App.css'

function App() {
  const inputRef = useRef(null)

  return (
    <>
      <h1 className={``}>NEOBRUTALIST TORRENT CLIENT</h1>
      <input ref={inputRef} placeholder={'insert torrent thing'} />
      <button></button>
    </>
  )
}

export default App
