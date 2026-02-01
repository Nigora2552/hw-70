import './App.css'
import ToolBar from "./components/ToolBar/ToolBar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import AddForm from "./containers/AddForm/AddForm.tsx";



const  App = () =>  {

    return (
        <>
            <ToolBar/>
            <Routes>
                <Route path='/' element={(<Home/>)}/>
                <Route path='/new' element={(<AddForm/>)}/>
            </Routes>
        </>
    )
}

export default App
