import './App.css';
import React, {useState, useEffect} from 'react'
import axios from 'axios';

function App() {

  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isFetching, setIsFetching] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  const scrollHandler = e => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && photos.length < totalCount ) {
      setIsFetching(true)
    }
  }

  useEffect(() => {
    if(isFetching){
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
      .then(response => {
        setPhotos([...photos, ...response.data])
        setCurrentPage(prevState => prevState + 1)
        setTotalCount(response.headers['x-total-count'])
      })
      .finally(() => {
        setIsFetching(false)
      })
    }
    
  }, [isFetching])


  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)

    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [isFetching])


  return (
    <div className="App">
      {
        photos.map(item => 
          <div key={item.id} className="photo">
            <div className="title">{ item.id}</div>
            <img src={item.thumbnailUrl} alt="" />

          </div>
          )
      }
    </div>
  );
}

export default App;
