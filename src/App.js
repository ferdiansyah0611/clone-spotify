import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import $ from 'jquery'
import {
  HomeIcon, SearchIcon, CollectionIcon, PlusIcon, HeartIcon, ArrowLeftIcon, ArrowRightIcon, MenuIcon,
  RewindIcon, FastForwardIcon, PlayIcon
} from '@heroicons/react/solid'

import Home from './page/home.jsx'
import Login from './page/login.jsx'
import Register from './page/register.jsx'

class Template extends React.Component{
  constructor(props)
  {
    super(props)
    this.menu = this.menu.bind()
  }
  componentDidMount()
  {
    document.title = 'Clone Spotify'
    document.body.classList.add('bg-gray-800')
    $('#sidebar').css({width: 240})
    $('#container').css({marginLeft: 240})
    $(window).on('scroll', e => {
      
    })
  }
  menu(e)
  {
    e.preventDefault()
    if($('#sidebar').hasClass('hidden'))
    {
      $('#sidebar').removeClass('hidden').css({marginLeft: '-240px'})
      $('#sidebar').animate({left: '+=240px'})
    }else{
      $('#sidebar').animate({left: '-=240px'})
      setTimeout(() => {
        $('#sidebar').addClass('hidden')
      }, 500)
    }
  }
  render()
  {
    return (
      <Router>
        <nav id="navbar" className="bg-black w-full top-0 left-0 fixed pr-5 pl-5 pt-2 pb-2 z-50" style={{marginLeft: 240}}>
          <div className="flex float-left">
            <a href="#" onClick={this.menu} className="mr-1 p-2 text-white font-bold block sm:hidden"><MenuIcon className="h-6" /></a>
            <Link to="/" className="mr-1 p-2 cursor-not-allowed text-white text-opacity-50 font-bold"><ArrowLeftIcon className="h-6" /></Link>
            <Link to="/" className="mr-1 p-2 cursor-not-allowed text-white text-opacity-50 font-bold"><ArrowRightIcon className="h-6" /></Link>
          </div>
          <div className="flex float-right" style={{marginRight: 240}}>
            <Link to="/register" className="mr-1 p-2 text-white font-bold">Register</Link>
            <Link to="/login" className="mr-1 pl-7 pr-7 pt-2 pb-2 text-black font-bold bg-white rounded-xl">Login</Link>
          </div>
        </nav>
        <section id="sidebar" className="bg-black h-full fixed left-0 top-0 mt-14 sm:mt-0 text-white p-3 hidden sm:block transition duration-1000 z-50">
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
        <section id="player" className="bg-gray-700 p-1 fixed bottom-0 left-0 w-full z-30 sm:z-50 text-white">
          <div className="flex">
            <div className="sm:w-1/3"></div>
            <div className="sm:w-1/3 mx-auto block mb-5 text-center">
              <div className="justify-center flex">{/*style={{marginLeft: '36.5%'}}*/}
                <a href="">
                  <span><RewindIcon className="h-7 ml-2" /></span>
                </a>
                <a href="">
                  <span><PlayIcon className="h-7 ml-2" /></span>
                </a>
                <a href="">
                  <span><FastForwardIcon className="h-7 ml-2" /></span>
                </a>
              </div>
              <div className="mt-1">
                <span className="mr-3">1:30</span><progress value="50" max="100" className="bg-red-200 text-red-400"></progress><span className="ml-3">3:00</span>
              </div>
            </div>
            <div className="sm:w-1/3"></div>
          </div>
        </section>
        <section id="container" className="mt-16 text-white pl-3 pr-3 sm:pl-10 sm:pr-10 pt-3 pb-3 mb-32">
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