import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ask from "./components/ask/Ask";
import Home from "./components/home/Home";
import Question from "./components/question/Question";
import Login from "./components/login/Login";
import Results from './components/search/Results';
import { useSelector } from 'react-redux';
import { selectUser } from './redux/features/userSlice';
import Unauthorized from './components/login/Unauthorized';
import PageNotFound from './components/PageNotFound';

function App() {
  const user = useSelector(selectUser);

  return (
    <BrowserRouter>

      {!user ? (

        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="*" element={<Unauthorized />} />
          </Route>
        </Routes>

      ) : (

        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="questions" element={<Home />} />
            <Route path="ask" element={<Ask />} />
            <Route path="questions/:questionId" element={<Question />} />
            <Route path="results" element={<Results />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      )
      }

    </BrowserRouter>
  );
}

export default App;
