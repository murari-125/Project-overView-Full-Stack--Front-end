import { useEffect, useState } from "react";
import GalleryView from "./components/GalleryView";
import SearchBar from "./components/SearchBar";
import loadingGif from "./assets/loadingGif.gif";


const App = () => {
  const [projects, setProjects] = useState([]);
  const [searchInput, setSearchInput] = useState();
  const [loading, setLoading] = useState();
  const fetchData = async () => {
    setProjects([]);
    setLoading(true);
    try {
      const response = await fetch(
        "https://gorgeous-bee-tank-top.cyclic.app/fetch/projects",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchButton = async () => {
    if (!searchInput) {
      alert("Please provide input before search");
      return;
    }
    setProjects([]);
    setLoading(true);
    try {
      const response = await fetch(
        "https://gorgeous-bee-tank-top.cyclic.app/fetch/project",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: searchInput }),
        }
      );
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar
        searchInput={(value) => {
          setSearchInput(value);
        }}
        searchClick={handleSearchButton}
        viewAllClick={fetchData}
      />
      {projects.length < 1 && loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={loadingGif}
            alt="Loading"
            style={{ marginTop: "30vh" }}
          ></img>
        </div>
      ) : (
        !loading &&
        projects.length > 0 && (
          <GalleryView projects={projects} searchInput={searchInput} />
        )
      )}

      {!projects.length > 0 && !loading && (
        <h1 style={{ marginTop: "30vh", textAlign: "center" }}>
          No Results Found...
        </h1>
      )}
    </>
  );
};

export default App;
