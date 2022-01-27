import logo from './logo.svg';
import './App.css';
import UploadImage from './component/UploadImage';
// import Camera from './component/Camera';
import ClassComponet from './component/ClassComponet';

function App() {
  return (
    <div className="App">
      <UploadImage />
      {/* <Camera/> */}
      <ClassComponet/>
    </div>
  );
}

export default App;
