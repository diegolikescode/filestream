import { useCallback, useRef } from 'react'
import './App.css'
import { TorrentLinks } from './utils'

function App() {
  const inputRef = useRef('')

  const cb = useCallback(() => {
    console.log(inputRef.current)
  }, [inputRef])

  return (
    <>
      <h1 className={``}>NEOBRUTALIST TORRENT CLIENT</h1>
      <div className={`mt-4 flex flex-col gap-2`}>
        <input
          className={`bg-amber-200 text-black placeholder-gray-600 rounded-md pl-2`}
          placeholder={'insert torrent thing'}
          defaultValue={TorrentLinks.StrangerThings}
          onChange={(e) => {
            inputRef.current = e.target.value
          }}
        />
        <button
          onClick={() => cb()}
          className={`bg-green-300 p-2 text-black rounded-md w-32`}
        >
          add torrent
        </button>
      </div>
    </>
  )
}

export default App
