import { useEffect, useState } from 'react';
import './App.css';
import Loading from './loading';
import { useFetch } from './useFetch';
import Person from './followers';

const App = () => {
  const url = 'https://api.github.com/users/john-smilga/followers?per_page=100';
  const { loading, data } = useFetch(url);
  const [page, setPage] = useState(1);
  const [buttons, setButtons] = useState([]);
  const maxPage = data.length;
  useEffect(() => {
    if (page === 1) {
      setButtons([1, 2, 3, "...", maxPage])
    }
    if (page === 2) {
      setButtons([1, 2, 3, "...", maxPage]);
    }
    if (page === 3) {
      setButtons([1, 2, 3, 4, "...", maxPage]);
    }
    if (page > 3) {
      setButtons([1, "...", page - 1, page, page + 1, "...", maxPage]);
    }
    if (page === maxPage) {
      setButtons([1, "...", page - 2, page - 1, page]);
    }
    if (page + 2 === maxPage) {
      setButtons([1, "...", page - 1, page, page + 1, page + 2]);
    }
    if (page + 1 === maxPage) {
      setButtons([1, "...", page - 1, page, page + 1]);
    }

  }, [page, loading])
  if (loading) {
    return <Loading />
  }
  else {
    let followers = data[page - 1];
    const people = followers.map((follower) => {
      const { login, id, avatar_url, html_url } = follower;
      const person = {
        name: login,
        image: avatar_url,
        link: html_url,
        id: id
      }
      return person;
    })
    const handleClick = (e) => {
      const btn = parseInt(e.target.value);
      if (isNaN(btn)) {
        setPage(page)
      } else {
        setPage(btn);
      }

    }
    const handlePrev = () => {

      if (page <= 1) {
        setPage(1);
      } else {
        setPage(page - 1)
      }

    }
    const handleNext = () => {
      if (page >= maxPage) {
        setPage(maxPage)
      } else {
        setPage(page + 1);
      }
    }

    return (
      <>
        <div className="people">
          {people.map((person) => {
            return <Person probs={person} key={Math.random()} />
          })}
        </div>
        <div className="pagination">
          <button onClick={handlePrev} className="btnPrev">prev</button>
          {buttons.map((button, index) => {
            return <button value={button} key={index} onClick={handleClick} className={`${page == button ? 'active' : button != "..." ? 'btn' : ''}`}>{button}</button>
          })}
          <button onClick={handleNext} className="btnNext" >next</button>
        </div>
      </>
    )

  }

}

export default App
