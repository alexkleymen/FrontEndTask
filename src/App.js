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
      if (resolved.totalItems === 0) {
        setBooks([]);
        return false;
      }
      const bookList = resolved.items.map((el) => {
        let title = el.volumeInfo?.title;
        let description = el.volumeInfo?.description;
        let img = el.volumeInfo?.imageLinks?.thumbnail;
        let id = el.id;
        return {
          title,
          description,
          img,
          id,
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
          return <Stories key={book.id} data={book} />;
        })}
      </div>
    </div>
  );
}

export default App;
