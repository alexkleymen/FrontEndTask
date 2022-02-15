import "./App.css";
import Stories from "./Stories";
import { useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const SearchBooks = async () => {
    try {
      const booksList = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${searchText}&key=AIzaSyCNQZVVP6g2vcySnYQUsrIhfyqqvdksT3U&maxResults=10`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
          },
        }
      );
      const resolved = await booksList.json();
      const bookList = resolved.items.map((el) => {
        return {
          title: el.volumeInfo.title,
          description: el.volumeInfo.description,
          img: el.volumeInfo.imageLinks.thumbnail,
        };
      });
      setBooks(bookList);
    } catch (e) {
      console.log(e);
    }
  };
  return books.length == 0 ? (
    <div className="App">
      <input
        type="text"
        placeholder="Book Name"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={SearchBooks}>Search!</button>
      <h1>No Books To Show</h1>
    </div>
  ) : (
    <div className="App">
      <input
        type="text"
        placeholder="Book Name"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={SearchBooks}>Search!</button>
      <div className="main">
        {books.map((book) => {
          return <Stories data={book} />;
        })}
      </div>
    </div>
  );
}

export default App;
