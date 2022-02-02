import "./App.css";
import ImageUploader from "./components/ImageUploader";
import NavBar from "./components/NavBar";
import RecipeCard from "./components/RecipeCard";
import { PhotoUploadType } from "./services/image-uploader/image-uploader.types";
import Stage from "./components/Stage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Stage />
    </div>
  );
}

export default App;
