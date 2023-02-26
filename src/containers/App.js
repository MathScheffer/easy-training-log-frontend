import React from 'react'
/* import useRotina from '../customHooks/useRotina';
import { useEffect, useState } from 'react'; */
import Login from './Login';

import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom';
import HomeAdm from './HomeAdm';
import EditarUsuario from './EditarUsuario';
import EditarRotina from '../components/editar-rotina/editarRotina';
import PopupEditarRotina from '../components/editar-rotina/popupEditarRotina';
import PrivateRoute from '../components/PrivateRoute';
import HomeUsuario from './HomeUsuario';
function App() {
  return(
    <BrowserRouter>
      
        <Routes>
          <Route 
            path="/"
            element={<Navigate to='/login'/>}
          />
          <Route  
              path="/adm" 
              element={
                <PrivateRoute role='ADM'>
                  <HomeAdm />
                </PrivateRoute>
              }
          />
          <Route 
            path='/usuario/:id/*'
            element={
              <PrivateRoute role='USER'>
                <HomeUsuario/>
              </PrivateRoute>
            }
          />
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/editar/:id/*' element={
            <PrivateRoute role='ADM'>
                <EditarUsuario/>
            </PrivateRoute>
          }/>
          
        </Routes>
    </BrowserRouter>
    
  )
  
}

export default App;
