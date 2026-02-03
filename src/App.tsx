import './App.css'
import ToolBar from "./components/ToolBar/ToolBar.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home.tsx";
import AddForm from "./containers/AddForm/AddForm.tsx";
import EditContact from "./containers/EditContac/EditContact.tsx";



const  App = () =>  {


    return (
        <>
            <ToolBar/>
            <Routes>
                <Route path='/' element={(<Home/>)}/>
                <Route path='/new' element={(<AddForm/>)}/>
                <Route path='/:id/edit-contact' element={(<EditContact/>)}/>
                <Route path='*' element={(<h1>Page not found</h1>)}/>
            </Routes>
        </>
    )
}

export default App
