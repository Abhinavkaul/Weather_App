import axios from 'axios';
import './App.css';
import React, { useState } from 'react';

function App() {

  const [inp, setInp] = useState('');
  const [show, setShow] = useState(false);
  const [res, setRes] = useState(null);
  const [valid, setvalid] = useState(true);

  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();


  const fetchapi = async () => {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=80538991ca1f89a36a902c5fdbae9949&units=metric`;
    try {
      const d = await axios.get(url);
      setRes(d.data)
      setvalid(true);
      setShow(true);

      const w = d.data.weather[0].description.toLowerCase()
      let background_img=""

      if (w === "clear") {
        background_img = 'https://media.istockphoto.com/photos/view-of-a-green-meadow-with-blue-flowers-on-a-sunny-day-picture-id173936056?b=1&k=20&m=173936056&s=170667a&w=0&h=-dyn96uJxXTHRaALnizqaxik4UHC9SbKphhf7I9B2d8=';
      }
      else if (w === "overcast clouds") {
        background_img = 'https://media.istockphoto.com/photos/dramatic-sky-picture-id904784522?b=1&k=20&m=904784522&s=170667a&w=0&h=dvcJZp9X09PZsZz5_-baxI8BKZhaA_UPh-KAz2uVFTI=';
      }
      else if (w === "clouds") {
        background_img = 'https://media.istockphoto.com/photos/beautiful-summer-sky-picture-id482466808?b=1&k=20&m=482466808&s=170667a&w=0&h=ILkqIdeEZ8mbcb4meYl6Zwgbe0aZhsfyLbrqtOzw-JU=';
      }
      else if (w === "haze") {
        background_img = 'https://images.unsplash.com/36/STzPBJUsSza3mzUxiplj_DSC09775.JPG?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
      }
      else if (w === "mist") {
        background_img = 'https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWlzdHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60';
      }
      else if (w === "rain") {
        background_img = 'https://media.istockphoto.com/photos/transparent-umbrella-under-rain-against-water-drops-splash-background-picture-id1257951336?b=1&k=20&m=1257951336&s=170667a&w=0&h=N_dkdVEznSiN43vNpVzjnnk8xUi4lg1IFK19JXxo5Zg=';
      }
      else if (w === "snow") {
        background_img = 'https://media.istockphoto.com/photos/winter-scene-snowfall-on-the-blurred-background-picture-id863513024?b=1&k=20&m=863513024&s=170667a&w=0&h=jfvMa1VP8OQ-1HwQfGqZv58PfuR1YZjRVGzyyJKdDzk=';
      }
      else {
        background_img = 'https://media.istockphoto.com/photos/view-of-a-green-meadow-with-blue-flowers-on-a-sunny-day-picture-id173936056?b=1&k=20&m=173936056&s=170667a&w=0&h=-dyn96uJxXTHRaALnizqaxik4UHC9SbKphhf7I9B2d8=';
      }

      document.body.style.backgroundImage = `url(${background_img})`;
    }
    catch (error) {
      setShow(false);
      console.error(error);
      setvalid(false);
    }
    setInp("")
  }

  const keyenter = (event) => {
    if (event.code === 'Enter') {
      fetchapi()
    }
  };


  return (
    <div className='mainDiv'>
      <h1>Current Weather</h1>
      <label>Enter Your Location : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
      <input
        type='text'
        placeholder='Location'
        value={inp}
        onChange={(e) => setInp(e.target.value)}
        onKeyDown={(e) => keyenter(e)} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

      <button onClick={fetchapi}>Get Weather</button>
      <br />

      {valid ? <div className='showdiv'>
        {show ? <div>
          <h2><i className='fas fa-map-marker-alt' />&nbsp;{res.name},&nbsp;{res.sys.country}</h2>
          <h3 className="date">{formattedDate}</h3>
          <h2>{res.main.feels_like}&nbsp;°C</h2>
          <h5>pressure : {res.main.pressure}, humidity : {res.main.humidity}</h5>
          <h5>long : {res.coord.lon}, &nbsp; lat : {res.coord.lat}, &nbsp; sea_level: {res.main.sea_level}</h5>
          <h2>{res.weather[0].description.toUpperCase()}</h2>
        </div>
          : ""}
      </div> : <h2>Enter Valid Location</h2>}

    </div>
  );
}

export default App;
