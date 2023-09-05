import { useState, useEffect } from 'react';
import { Diary } from './types';
import { getAllDiaries, createDiary } from './diaryService';

const App = () => {

  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState('');
  const [weather, setWeather] = useState('');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
      console.log('diaries listed')
    })
  }, [])

  const showError = (message: string, duration: number) => {
    setErrorMessage(message);
    setErrorVisible(true);
    setTimeout(() => {
      setErrorVisible(false);
      setErrorMessage('');
    }, duration);
  };

  const diaryCreation =(event: React.SyntheticEvent) => {
    event.preventDefault()
    createDiary({
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    })
    .then((data) => {
      if (typeof data === 'string') {
        showError(data, 5000);
      } else {
        setDiaries((prevDiaries) => [...prevDiaries, data]);
        console.log('added diary:', data);
      }
    })
    .catch((error) => {
      console.error('Error creating diary:', error);
    });

    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <div className={errorVisible ? 'error-message' : 'hidden-error-message'}>
          {errorMessage}
      </div>
      <div>
        <form onSubmit={diaryCreation}>
          <div>
            date
            <input value={date} onChange={(event) => setDate(event.target.value)} />
          </div>
          <div>
            visibility
            <input value={visibility} onChange={(event) => setVisibility(event.target.value)} />
          </div>
          <div>
            weather
            <input value={weather} onChange={(event) => setWeather(event.target.value)} />
          </div>
          <div>
            comment
            <input value={comment} onChange={(event) => setComment(event.target.value)} />
          </div>
          <button type='submit'>add</button>
        </form>
      </div>
      <h2>Diary entries</h2>
      {diaries.map(diary =>
          <div key={diary.id}>
            <p><strong>{diary.date}</strong></p> 
            <p>weather: {diary.weather}</p> 
            <p>visibility: {diary.visibility}</p> 
            <p>comment: {diary.comment}</p>         
          </div>
        )}
    </div>
  );
}

export default App;
