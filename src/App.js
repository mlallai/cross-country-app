import React, { useState } from 'react'
import { List, MainMap } from './components'
import './App.css';

const App = () => {

  const [markers, setMarkers] = useState([])

  const _handleAddMarker = (marker) => {
    setMarkers(prevState => [...prevState, marker])
  }

  const _handleUpdateMakers = (newMarkers) => {
    setMarkers(newMarkers)
  }

  const _handleDeleteMarker = (marker) => {
    const filtered = markers.filter(m => m.id !== marker.id)
    setMarkers(filtered)
  }
  return (
    <div className="App">
      <div className="List">
        <List
          markers={markers}
          updateMarkers={_handleUpdateMakers}
          onDeleteMarker={_handleDeleteMarker} />
      </div>
      <div className="MainMap">
        <MainMap
          markers={markers}
          onChangeMarker={_handleAddMarker}
        />
      </div>
    </div>
  );
}

export default App;
