import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import NewPostPage from "./pages/newPostPage/NewPostPage";
import PostPage from "./pages/postPage/PostPage";
import Header from "./components/header/Header";

function App() {
    return (
        <main>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/add' element={<NewPostPage />} />
                <Route path='/:id' element={<PostPage />} />
            </Routes>
        </main>
    );
}

export default App;
