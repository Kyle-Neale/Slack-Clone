import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './home.js'

const Pages = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Pages
