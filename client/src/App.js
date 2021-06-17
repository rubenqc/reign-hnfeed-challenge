import Header from './components/Header'
import Row from './components/Row'

import {useEffect, useState} from "react";

function App() {
  const [stories,setStories] = useState([])
  const [selectedStory, setSelectedStory] = useState(null)

  const fetchStories = async () => {
    const response = await fetch(`http://localhost:3001/stories`)
    const data = await response.json()
    setStories(data)
  }


  useEffect(() => fetchStories(), [selectedStory])

  const onDeleteStory = async (id) => {
    const response = await fetch(`http://localhost:3001/stories/${id}`, {
      method: 'DELETE'
    })
    await response.json()
    setSelectedStory(id)
  }

  return (
    <div className="App">
      <Header/>
      {
          stories.map((story, index) => (
              <Row key={index} {...story} onDeleteStory={onDeleteStory}/>
          ))
      }
    </div>
  );
}

export default App;
