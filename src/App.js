import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom"
import $ from 'jquery'
import {
    HomeIcon,
    SearchIcon,
    CollectionIcon,
    PlusIcon,
    HeartIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    MenuIcon,
    RewindIcon,
    FastForwardIcon,
    PlayIcon,
    PauseIcon,
    DotsHorizontalIcon,
} from '@heroicons/react/solid'

import Home from './page/home.jsx'
import Login from './page/login.jsx'
import Register from './page/register.jsx'
import Search from './page/search.jsx'
import ShowCategory from './page/ShowCategory.jsx'
import ShowPlaylist from './page/ShowPlaylist.jsx'
import ShowAlbum from './page/ShowAlbum.jsx'
import ShowArtist from './page/ShowArtist.jsx'

import DefaultContext from './context.js'

import { clientID, secretID } from './env.js'
import Spotify from './spotify.js'

var interval, music = null

class MenuRightAuth extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      styleBody: {

      },
      open: false,
      classClosed: ""
    }
    this.action = this.action.bind(this)
  }
  componentDidMount()
  {
    this.setState({styleBody: {
      marginTop: '-100%' ,
      width: 120
    }})
  }
  action(e)
  {
    if(this.state.open){
      this.setState({
        styleBody: {
          marginTop: '-100%' ,
          width: 120
        },
        open: false,
        classClosed: ""
      })
      return true
    }
    this.setState({
      styleBody: {
        marginTop: 56,
        width: 120
      },
      open: true,
      classClosed: "closed fixed top-0 left-0 w-full h-full z-40"
    })
    return true
  }
  render(){
    return(
      <>
        <span data-status={this.state.open} onClick={this.action} className={this.props.menuClass}>
          <svg data-status={this.state.open} xmlns="http://www.w3.org/2000/svg" className="h-6" viewBox="0 0 20 20" fill="currentColor">
            <path data-status={this.state.open} d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </span>
        <div onClick={this.action} className={this.state.classClosed}></div>
        <div className="body-right-menu z-50 font-bold fixed top-0 right-0 bg-black transition-all duration-700 ease-in-out" style={this.state.styleBody}>
          <ul>
            <li className="flex"><NavLink to="/login" activeClassName="text-green-400" className="text-white hover:text-green-400 text-sm font-bold w-full p-3">Login</NavLink></li>
            <li className="flex"><NavLink to="/register" activeClassName="text-green-400" className="text-white hover:text-green-400 text-sm font-bold w-full p-3">Register</NavLink></li>
          </ul>
        </div>
      </>
    )
  }
}

class Template extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchData: '',
            searchAlbum: {
              albums: {
                items: []
              }
            },
            searchArtist: {
              artists: {
                items: []
              }
            },
            searchPlaylist: {
              playlists: {
                items: []
              }
            },
            searchTrack: {
              tracks: {
                items: []
              }
            },
            searchShow: {
              shows: {
                items: []
              }
            },
            searchEpisode: {
              episodes: {
                items: []
              }
            },
            autoPlayMusic: false,
            randomMusic: false,
            keyMusic: 0,
            timeStart: 0,
            process: 0,
            search: false,
            statusPlay: false,
            nameMusic: "No play a music",
            imgMusic: false,
            listMusic: [],
            setVal: (key, val) => {
                this.setState({
                    [key]: val
                });
            },
            playMusic: async (e, key = false) => {
                if (key || key === 0) {
                    this.setState({keyMusic: key})
                    e.target = {}
                    e.target.dataset = {}
                    if(this.state.listMusic[key].track)
                    {
                      e.target.dataset.url = this.state.listMusic[key].track.preview_url
                      e.target.dataset.name = this.state.listMusic[key].track.artists.map((art) => art.name).join(' & ') + " - " + this.state.listMusic[key].track.name
                      e.target.dataset.img = this.state.listMusic[key].track.album.images.length >= 1 ? this.state.listMusic[key].track.album.images[1].url : ''
                    }
                    if(!this.state.listMusic[key].track)
                    {
                      e.target.dataset.url = this.state.listMusic[key].preview_url
                      e.target.dataset.name = this.state.listMusic[key].artists.map((art) => art.name).join(' & ') + " - " + this.state.listMusic[key].name
                      if(this.state.listMusic[key].album && this.state.listMusic[key].album.images){
                        e.target.dataset.img = this.state.listMusic[key].album.images.length >= 1 ? this.state.listMusic[key].album.images[1].url : ''
                      }
                    }
                }
                if(e.target.dataset.key || e.target.dataset.key === 0){
                  this.setState({keyMusic: e.target.dataset.key})
                }
                /*console.log(key)*/
                /*if music in played*/
                if(this.state.statusPlay)
                {
                  music.pause()
                  music.currentTime = 0
                  this.setState({ timeStart: 0, process: 0, statusPlay: false })
                }
                music = await new Audio(e.target.dataset.url)
                music.load()
                music.onplay = (event) => {
                    music.currentTime = this.state.process
                    this.setState({
                        statusPlay: true,
                        nameMusic: e.target.dataset.name,
                        imgMusic: e.target.dataset.img,
                    })
                    $('#music-spin').addClass('music-spin')
                    document.title = e.target.dataset.name
                    interval = setInterval(() => {
                        this.setState({
                            process: ++this.state.process/* += 1 / 30 * 100*/,
                            timeStart: ++this.state.timeStart,
                        })
                    }, 1000)
                }
                music.onpause = (event) => {
                    this.setState({ process: this.state.process })
                    clearInterval(interval)
                    this.setState({ statusPlay: false })
                    $('#music-spin').removeClass('music-spin')
                }
                music.onended = (event) => {
                    document.title = 'Clone Spotify'
                    music.remove()
                    this.setState({ timeStart: 0, process: 0 })
                    $('#music-spin').removeClass('music-spin')
                    clearInterval(interval)
                    if(this.state.autoPlayMusic)
                    {
                      if(this.state.randomMusic)
                      {
                        this.state.playMusic({}, Math.floor(Math.random() * this.state.listMusic.length))
                      }else{
                        this.state.playMusic({}, ++this.state.keyMusic)
                      }
                    }
                }
                if (e.target.dataset.url) {
                    this.state.playNow('')
                    music.play()
                }
            },
            playNow: (e) => {
                if (music) {
                    music.play()
                }
            },
            pauseMusic: (e) => {
                music.pause()
            }
        }
        this.menu = this.menu.bind(this)
        this.playMusic = this.playMusic.bind(this)
        this.playNow = this.state.playNow.bind(this)
        this.pauseMusic = this.state.pauseMusic.bind(this)
        this.changeSecondMusic = this.changeSecondMusic.bind(this)
        this.nextMusic = this.nextMusic.bind(this)
        this.previousMusic = this.previousMusic.bind(this)
        this.searchData = this.searchData.bind(this)
        this.submitSearch = this.submitSearch.bind(this)
        this.actionmusic = this.actionmusic.bind(this)
        this.changeStatusPlayMusic = this.changeStatusPlayMusic.bind(this)
        this.showMusic = this.showMusic.bind(this)
    }
    async componentDidMount() {
        document.title = 'Clone Spotify'
        document.body.classList.add('bg-gray-800', 'overflow-auto')
        document.body.classList.remove('overflow-hidden')
        /*$('#sidebar').css({ width: 240 , marginLeft: '-100%'})*/
        $('#container').css({ marginLeft: 240 })
        await new Spotify(clientID, secretID).getTokenHard()
        document.body.addEventListener('contextmenu', e => {e.preventDefault()})
    }
    componentWillUnmount(){
      if(music)
      {
        music.pause()
      }
      document.body.classList.add('overflow-auto')
    }
    playMusic(e){
      this.state.playMusic(e)
    }
    showMusic(e)
    {
      if(e.target.dataset.action === 'open'){
        document.body.classList.add('overflow-hidden')
        $('#player').removeClass('sm:z-50').addClass('z-60')
        /*$('#player').animate({
          marginBottom: '0',
          height: '100vh',
        }, 800)*/
        $('#queue').removeClass('invisible')
        $('#queue').animate({
          marginBottom: 90,
          height: '86.9vh',
        }, 900)
        $('#close-queue').removeClass('invisible')
        $('#close-queue').animate({
          marginTop: '0',
        }, 900)
      }
      if(e.target.dataset.action === 'close'){
        document.body.classList.remove('overflow-hidden')
        document.body.classList.add('overflow-auto')
        $('#queue').animate({
          marginBottom: '-100%',
          height: '0',
        }, 900)
        // $('#queue').addClass('invisible')
        $('#close-queue').animate({
          marginTop: '-100%',
        }, 900)
        // $('#close-queue').addClass('invisible')
      }
    }
    changeSecondMusic(e) {
        music.currentTime = e.target.value
        clearInterval(interval)
        this.setState({ process: e.target.value, timeStart: e.target.value })
    }
    changeStatusPlayMusic(e)
    {
      this.setState({[e.target.dataset.name]: this.state[e.target.dataset.name] ? false: true})
    }
    nextMusic(e) {
        if (this.state.statusPlay) {
            music.pause()
            music.currentTime = 0
            this.setState({ statusPlay: false, timeStart: 0, process: 0 })
            clearInterval(interval)
        }
        for (var i = 0; i < this.state.listMusic.length; i++) {
          if(i > this.state.keyMusic)
          {
            if(this.state.listMusic[i].track)
            {
              if (this.state.listMusic[i].track.artists.map((art, key) => art.name).join(' & ') + " - " + this.state.listMusic[i].track.name !== this.state.nameMusic) {
                  console.log(i)
                  if (this.state.listMusic[i].track.preview_url) {
                      console.log(this.state.listMusic[i].track.preview_url)
                      this.state.playMusic({}, i)
                      break
                  }
              }
            }
            if(!this.state.listMusic[i].track)
            {
              if (this.state.listMusic[i].artists.map((art, key) => art.name).join(' & ') + " - " + this.state.listMusic[i].name !== this.state.nameMusic) {
                  console.log(i)
                  if (this.state.listMusic[i].preview_url) {
                      console.log(this.state.listMusic[i].preview_url)
                      this.state.playMusic({}, i)
                      break
                  }
              }
            }
          }
        }
    }
    previousMusic(e) {
        if (this.state.statusPlay) {
            music.pause()
            music.currentTime = 0
            this.setState({ statusPlay: false, timeStart: 0, process: 0 })
            clearInterval(interval)
        }
        console.log(this.state.keyMusic)
        if(this.state.keyMusic !== 0 && this.state.keyMusic !== this.state.listMusic.length)
        {
          this.state.playMusic({}, --this.state.keyMusic)

        }
    }
    actionmusic(e)
    {
      if(e.target.dataset.action === 'open')
      {
        $('#actionmusic').removeClass('hidden')
        $('.menumusic-close').addClass("closed fixed top-0 left-0 w-full h-full z-40")
      }
      if(e.target.dataset.action === 'close'){
        $('#actionmusic').addClass('hidden')
        e.target.classList.remove('closed', 'fixed', 'top-0', 'left-0', 'w-full', 'h-full', 'z-40')
      }
    }
    menu(e) {
        e.preventDefault()
        if ($('#sidebar').hasClass('open')) {
            $('#sidebar').removeClass('open').css({ marginLeft: '-240px' })
            $('#sidebar').animate({ left: '+=240px' })
        } else {
            $('#sidebar').animate({ left: '-=240px' })
            $('#sidebar').addClass('open')
        }
    }
    async searchData(e) {
        this.setState({
            searchData: e.target.value,
        })
    }
    async submitSearch(e) {
      e.preventDefault()
        this.setState({
            searchAlbum: await new Spotify().getSearch(this.state.searchData, 'album'),
            searchArtist: await new Spotify().getSearch(this.state.searchData, 'artist'),
            searchPlaylist: await new Spotify().getSearch(this.state.searchData, 'playlist'),
            searchTrack: await new Spotify().getSearch(this.state.searchData, 'track'),
            searchShow: await new Spotify().getSearch(this.state.searchData, 'show'),
            searchEpisode: await new Spotify().getSearch(this.state.searchData, 'episode'),
        })
    }
    render() {
        return (
            <Router>
        <DefaultContext.Provider value={this.state}>
          <nav id="navbar" className="bg-black w-full top-0 left-0 fixed pr-5 pl-5 pt-2 pb-2 z-60 shadow-2xl" style={{marginLeft: 240}}>
            <div className="flex float-left">
              <span onClick={this.menu} className="mr-1 p-2 text-white font-bold block sm:hidden cursor-pointer">
                <MenuIcon className="h-6" />
              </span>
              <Link to="/" className="mr-1 hidden sm:block p-2 cursor-not-allowed text-white text-opacity-50 font-bold">
                <ArrowLeftIcon className="h-6" />
              </Link>
              <Link to="/" className="mr-1 hidden sm:block p-2 cursor-not-allowed text-white text-opacity-50 font-bold">
                <ArrowRightIcon className="h-6" />
              </Link>
              {
                this.state.search ? 
                <form onSubmit={this.submitSearch}>
                  <input
                    onKeyUp={this.searchData}
                    defaultValue={this.state.searchData}
                    className="focus:outline-none focus:ring focus:ring-green-400 p-2"
                    placeholder="Search music, artist, album and more"
                    type="text"
                  />
                </form>: ''
              }
              {
                this.state.search ? 
                <MenuRightAuth menuClass="p-2 text-white font-bold cursor-pointer hidden sm:hidden" />
                : ''
              }
            </div>
            <div className="flex float-right" style={{marginRight: 240}}>
            {
                this.state.search ? 
                <MenuRightAuth menuClass="p-2 text-white font-bold block md:hidden cursor-pointer" />
                : ''
              }
              <Link to="/register" className={this.state.search ? 'hidden md:block mr-1 p-2 text-white font-bold': 'mr-1 p-2 text-white font-bold'}>Register</Link>
              <Link to="/login" className={this.state.search ? "hidden md:block mr-1 pl-7 pr-7 pt-2 pb-2 text-black font-bold bg-white rounded-xl" : "mr-1 pl-7 pr-7 pt-2 pb-2 text-black font-bold bg-white rounded-xl"}>Login</Link>
            </div>
          </nav>
          <section id="sidebar" className="open bg-black h-full fixed left-0 top-0 mt-14 sm:mt-0 text-white p-3 sm:block transition-all duration-700 z-40 shadow-2xl">
            <h1 className="text-center font-bold pb-5 pt-5">Clone Spotify <br/><a href="https://github.com/ferdiansyah0611" target="_blank" rel="noreferrer" className="underline">by Ferdiansyah</a></h1>
            <ul>
              <li className="flex">
                <NavLink exact to="/" activeClassName="font-bold text-opacity-100 bg-gray-600" className="text-white font-bold text-opacity-50 hover:text-opacity-100 w-full p-2 rounded-md">
                  <HomeIcon className="h-6 float-left" /> <span className="ml-3">Home</span>
                </NavLink>
              </li>
              <li className="flex">
                <NavLink to="/search" activeClassName="font-bold text-opacity-100 bg-gray-600" className="text-white font-bold text-opacity-50 hover:text-opacity-100 w-full p-2 rounded-md">
                  <SearchIcon className="h-6 float-left" /> <span className="ml-3">Search</span>
                </NavLink>
              </li>
              <li className="flex">
                <Link to="/" className="text-white font-bold text-opacity-50 hover:text-opacity-100 w-full p-2 rounded-md">
                  <CollectionIcon className="h-6 float-left" /> <span className="ml-3">My Collection</span>
                </Link>
              </li>
              <li className="flex mt-5">
                <Link to="/" className="text-white font-bold text-opacity-50 hover:text-opacity-100 w-full p-2 rounded-md">
                  <PlusIcon className="h-6 float-left" /> <span className="ml-3">Create Playlist</span>
                </Link>
              </li>
              <li className="flex">
                <Link to="/" className="text-white font-bold text-opacity-50 hover:text-opacity-100 w-full p-2 rounded-md">
                  <HeartIcon className="h-6 float-left" /> <span className="ml-3">Favorite Songs</span>
                </Link>
              </li>
            </ul>
          </section>
          <section id="player" className="bg-gray-700 fixed bottom-0 left-0 w-full z-30 sm:z-40 text-white shadow-2xl">
            <svg style={{marginTop: '-100%'}} id="close-queue" onClick={this.showMusic} data-action="close" xmlns="http://www.w3.org/2000/svg" className="h-12 invisible cursor-pointer w-full fixed top-0 left-0 bg-black bg-opacity-50 z-50" viewBox="0 0 20 20" fill="currentColor">
              <path data-action="close" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <ul className="invisible w-full bg-black overflow-auto pt-28 pb-10 fixed left-0 bottom-0 z-30" style={{marginBottom: '-100%', height: 0}} id="queue">
            {
              this.state.listMusic.map((data, key) => {
                var name        = data.track ? data.track.artists.map((art, key) => art.name).join(' & ') + " - " + data.track.name: data.artists.map((art, key) => art.name).join(' & ') + " - " + data.name
                var classActive = this.state.nameMusic === name ? 'bg-green-700 flex transition duration-700 w-2/2 hover:bg-green-400 hover:bg-opacity-50 cursor-pointer': 'flex transition duration-700 w-2/2 hover:bg-gray-700 hover:bg-opacity-50 cursor-pointer'
                var trackUrl    = data.track ? data.track.preview_url: data.preview_url
                return(
                  <li key={key} className={classActive}>
                      <span className="w-1/4 rounded-sm p-2 play-icon cursor-pointer" onClick={this.state.statusPlay ? this.pauseMusic: this.playNow} data-url={trackUrl} data-name={name}>
                      {
                        this.state.nameMusic === name ?
                          this.state.statusPlay ?
                            <svg data-url={trackUrl} data-name={name} xmlns="http://www.w3.org/2000/svg" className="h-10" viewBox="0 0 20 20" fill="currentColor">{/*pauseicon*/}
                              <path data-url={trackUrl} data-name={name} fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          :
                            <svg data-url={trackUrl} data-name={name} xmlns="http://www.w3.org/2000/svg" className="h-10" viewBox="0 0 20 20" fill="currentColor">{/*playicon*/}
                              <path data-url={trackUrl} data-name={name} fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                        :
                          <svg data-url={trackUrl} data-name={name} xmlns="http://www.w3.org/2000/svg" className="h-10" viewBox="0 0 20 20" fill="currentColor">{/*playicon*/}
                            <path data-url={trackUrl} data-name={name} fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                      }
                      </span>
                      <p className="w-2/4 font-bold text-sm p-2" dangerouslySetInnerHTML={{__html: name}}/>
                      <span className="w-1/4 rounded-sm p-2 play-icon cursor-pointer">
                          <DotsHorizontalIcon data-url={trackUrl} data-name={name} className="h-10"/>
                      </span>
                    </li>
                )
              })
            }
            </ul>
            {
              this.state.imgMusic ? <img onClick={this.showMusic} data-action="open" style={{zIndex: 60}} id="music-spin" className="absolute bottom-0 left-0 cursor-pointer rounded-full w-20 mb-14 ml-2 border-gray-200 border-2" src={this.state.imgMusic} alt=""/> :''
            }
            <div className="flex flex z-50 fixed left-0 bottom-0 w-full bg-gray-700">
              <div className="sm:w-1/3"></div>
              <div className="sm:w-1/3 mx-auto block mb-1 text-center">
              <marquee onClick={this.showMusic} data-action="open" className="w-3/4 cursor-pointer" behavior="" direction="left">{this.state.nameMusic}</marquee>
                <div className="justify-center flex">
                  <span className="cursor-pointer" onClick={this.previousMusic}>
                    <span>
                      <RewindIcon className="h-7 mr-3" />
                    </span>
                  </span>
                  <span onClick={this.state.statusPlay ? this.pauseMusic: this.playNow} className="cursor-pointer">
                    <span>
                    {
                      this.state.statusPlay ? <PauseIcon className="h-7" /> : <PlayIcon className="h-7" />
                    }
                    </span>
                  </span>
                  <span className="cursor-pointer" onClick={this.nextMusic}>
                    <span>
                      <FastForwardIcon className="h-7 ml-3" />
                    </span>
                  </span>
                </div>
                <div className="mt-1 flex">
                  <span className="mr-3 w-1/3">0:{this.state.timeStart}</span>
                  <input className="w-3/3" onChange={this.changeSecondMusic} type="range" value={this.state.process} min="0" max="30"/>
                  <span className="ml-3 w-1/3">0:30</span>
                </div>
              </div>
              <div className="sm:w-1/3">
                <span onClick={this.actionmusic} data-action="open" className="action-music bg-green-400 fixed right-0 bottom-0 cursor-pointer p-3 rounded-full mb-16 mr-3 z-40">
                  <svg data-action="open" xmlns="http://www.w3.org/2000/svg" className="h-7" viewBox="0 0 20 20" fill="currentColor">
                    <path data-action="open" d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </span>
                <div className="menumusic-close" onClick={this.actionmusic} data-action="close"></div>
                <div className="body text-white bg-gray-600 fixed right-0 bottom-0 mb-32 hidden z-50" id="actionmusic">
                  <ul>
                    <li className="block p-3 text-sm cursor-pointer text-opacity-80 hover:text-opacity-100 text-gray-100" data-name="autoPlayMusic" onClick={this.changeStatusPlayMusic}>Auto Play ({this.state.autoPlayMusic ? 'ON': 'OFF'})</li>
                    <li className="block p-3 text-sm cursor-pointer text-opacity-80 hover:text-opacity-100 text-gray-100" data-name="randomMusic" onClick={this.changeStatusPlayMusic}>Random ({this.state.randomMusic ? 'ON': 'OFF'})</li>
                    <li className="block p-3 text-sm cursor-pointer text-opacity-80 hover:text-opacity-100 text-gray-100">Add To Favorite</li>
                    <li className="block p-3 text-sm cursor-pointer text-opacity-80 hover:text-opacity-100 text-gray-100">Share</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section id="container" className="mt-16 text-white pl-3 pr-3 sm:pl-10 sm:pr-10 pt-3 pb-3 mb-32">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/search">
                <Search />
              </Route>
              <Route path="/browse/category/:id" component={ShowCategory} />
              <Route path="/browse/albums/:id" component={ShowAlbum} />
              <Route path="/playlists/:id" component={ShowPlaylist} />
              <Route path="/artists/:id" component={ShowArtist} />
            </Switch>
          </section>
        </DefaultContext.Provider>
      </Router>
        );

    }
}
export default Template;