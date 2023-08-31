import { useState, useEffect } from 'react';
import { Diary } from './types';
import axios from 'axios';

const App = () => {

  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3001/api/diaries').then(response => {
      setDiaries(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Add new entry</h2>
      <h2>Diary entries</h2>
      {diaries.map(diary =>
          <p key={diary.id}>{diary.date} {diary.weather} {diary.visibility}</p>
        )}
    </div>
  );
}

export default App;
