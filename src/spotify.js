class Spotify {
    constructor(clientID = '', secretID = '') {
        this.state = {
            clientID: clientID,
            secretID: secretID,
            token: null,
            url: [
                'https://accounts.spotify.com/api/token',
                'https://api.spotify.com/v1/browse/new-releases',
                'https://api.spotify.com/v1/browse/categories'
            ]
        }
    }
    async fetch(url) {
        let GetData;
        var token = this.checkToken()
        if (token) {
            await fetch(url, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(data => data.json()).then(data => GetData = data)
            return GetData
        }
        return false
    }
    async getToken() {
        if (document.cookie) {
            return document.cookie.split('=')[1]
        }
        await fetch(this.state.url[0], {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(`${this.state.clientID}:${this.state.secretID}`),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials'
        }).then(data => data.json()).then(data => {
            var now = new Date();
            now.setTime(now.getTime() + 1 * 3600 * 1000);
            this.state.token = `Bearer ${data.access_token}`
            document.cookie = "spotify-token=" + this.state.token + "; expires=" + now.toUTCString() + "; path=/";
            return data
        }).catch(e => {
            // this.getToken()
            console.error(e)
        })
    }
    checkToken() {
        if (document.cookie) {
            return document.cookie.split('=')[1]
        }
        return false
    }
    async getNewRelease() {
        return this.fetch(this.state.url[1] + '?limit=10')
    }
    async getAllCategory() {
        return this.fetch(this.state.url[2])
    }
    async getCategoryPlaylist(id) {
        return this.fetch(`https://api.spotify.com/v1/browse/categories/${id}/playlists`)
    }
    async getCategory(id) {
        return this.fetch(`https://api.spotify.com/v1/browse/categories/${id}`)
    }
    async getPlaylistItem(id) {
        return this.fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`)
    }
    async getPlaylist(id) {
        return this.fetch(`https://api.spotify.com/v1/playlists/${id}`)
    }
    async getSearch(search, type) {
        return this.fetch(`https://api.spotify.com/v1/search?q=${search}&type=${type}`)
    }
    async getAlbum(id) {
        return this.fetch(`https://api.spotify.com/v1/albums/${id}`)
    }
    async getAlbumTrack(id) {
        return this.fetch(`https://api.spotify.com/v1/albums/${id}/tracks`)
    }
    async getCurrentUser() {
        return this.fetch('https://api.spotify.com/v1/me')
    }
    async getArtist(id) {
        return this.fetch(`https://api.spotify.com/v1/artists/${id}`)
    }
    async getArtistTopTrack(id) {
        return this.fetch(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=ID`)
    }
}
window.Spotify = Spotify

export default Spotify