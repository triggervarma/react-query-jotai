import { CharacterList } from "../../widgets/character-list/character-list";
import { SearchBar } from "../../widgets/search-bar/search-bar";
import "./styles.css";

export const HomePage = () => {
  return (
    <div className="homePage">
      <SearchBar />
      <CharacterList />
    </div>
  );
};
