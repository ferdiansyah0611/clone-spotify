import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import $ from 'jquery'
import {HomeIcon, SearchIcon, CollectionIcon, PlusIcon, HeartIcon} from '@heroicons/react/solid'

import Home from './page/home.jsx'
import Login from './page/login.jsx'
import Register from './page/register.jsx'

class Template extends React.Component{
  componentDidMount()
  {
    document.title = 'Clone Spotify'
    document.body.classList.add('bg-gray-800')
    $('#sidebar').css({width: 240})
    $('#container').css({marginLeft: 240, height: 1000})
    $(window).on('scroll', e => {
      
    })
  }
  render()
  {
    return (
      <Router>
        <nav className="bg-black w-full top-0 left-0 fixed pr-5 pl-5 pt-2 pb-2">
          <div className="flex float-right">
            <Link to="/register" className="mr-1 p-2 text-white font-bold">Register</Link>
            <Link to="/login" className="mr-1 pl-7 pr-7 pt-2 pb-2 text-black font-bold bg-white rounded-xl">Login</Link>
          </div>
        </nav>
        <section id="sidebar" className="bg-black h-full fixed left-0 top-0 text-white p-3">
          <h1 className="text-center font-bold pb-5 pt-5">Clone Spotify</h1>
          <ul>
            <li className="flex">
              <Link to="/" className="text-white font-bold text-opacity-100 hover:text-opacity-100 bg-gray-600 w-full p-3 rounded-md active">
                <HomeIcon className="h-6 float-left" /> <span className="ml-3">Home</span>
              </Link>
            </li>
            <li className="flex">
              <a href="#" className="text-white font-bold text-opacity-50 hover:text-opacity-100 w-full p-2 rounded-md">
                <SearchIcon className="h-6 float-left" /> <span className="ml-3">Search</span>
              </a>
            </li>
            <li className="flex">
              <a href="#" className="text-white font-bold text-opacity-50 hover:text-opacity-100 w-full p-2 rounded-md">
                <CollectionIcon className="h-6 float-left" /> <span className="ml-3">My Collection</span>
              </a>
            </li>
            <li className="flex mt-5">
              <a href="#" className="text-white font-bold text-opacity-50 hover:text-opacity-100 w-full p-2 rounded-md">
                <PlusIcon className="h-6 float-left" /> <span className="ml-3">Create Playlist</span>
              </a>
            </li>
            <li className="flex">
              <a href="#" className="text-white font-bold text-opacity-50 hover:text-opacity-100 w-full p-2 rounded-md">
                <HeartIcon className="h-6 float-left" /> <span className="ml-3">Favorite Songs</span>
              </a>
            </li>
          </ul>
        </section>
        <section id="container" className="mt-16 text-white pl-10 pr-10 pt-3 pb-3">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </section>
      </Router>
    );

  }
}
export default Template;