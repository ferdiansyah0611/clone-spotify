export const initalResponse = {
    items: [],
    next: null,
    previous: null,
};

class Spotify {
    constructor() {
        const clientID = "a4dab14e3ffc4c43992d96901d1f2b38";
        const secretID = "fa53df89e2fa4992a1fe04b563709fdd";

        this.state = {
            clientID: clientID,
            secretID: secretID,
            token: null,
            url: ["https://accounts.spotify.com/api/token"],
            base: "https://api.spotify.com/v1",
        };
    }
    async fetch(url) {
        let token = await this.checkToken();
        if (token) {
            return await fetch(this.state.base + url, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }).then((data) => data.json());
        }
        return false;
    }
    async getTokenHard() {
        return await fetch(this.state.url[0], {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa(`${this.state.clientID}:${this.state.secretID}`),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        })
            .then((data) => data.json())
            .then((data) => {
                let now = new Date();
                now.setTime(now.getTime() + 1 * 3600 * 1000);
                this.state.token = `Bearer ${data.access_token}`;
                document.cookie = "spotify-token=" + this.state.token + "; expires=" + now.toUTCString() + "; path=/";
            })
            .catch((e) => {
                // this.getToken()
                console.error(e);
                return false;
            });
    }
    async getToken() {
        if (document.cookie.indexOf("spotify-token") !== -1) {
            let split = document.cookie.split("spotify-token");
            if (split.length) {
                split = split[1];
                if (split.indexOf(";")) {
                    split = split.slice(1).split(";")[0];
                } else {
                    split = split.slice(1);
                }
                return split;
            }
        }
        return await fetch(this.state.url[0], {
            method: "POST",
            headers: {
                Authorization: "Basic " + btoa(`${this.state.clientID}:${this.state.secretID}`),
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        })
            .then((data) => data.json())
            .then((data) => {
                var now = new Date();
                now.setTime(now.getTime() + 1 * 3600 * 1000);
                this.state.token = `Bearer ${data.access_token}`;
                document.cookie = "spotify-token=" + this.state.token + "; expires=" + now.toUTCString() + "; path=/";
                return data;
            })
            .catch((e) => {
                // this.getToken()
                console.error(e);
                return false;
            });
    }
    async checkToken() {
        let getToken = await this.getToken();
        if (getToken) {
            if (getToken.access_token) {
                return `Bearer ${getToken.access_token}`;
            }
            return getToken;
        }
    }
    getNewRelease() {
        return this.fetch("/browse/new-releases?limit=10");
    }
    getAllCategory() {
        return this.fetch("/browse/categories");
    }
    getCategoryPlaylist(id) {
        return this.fetch(`/browse/categories/${id}/playlists`);
    }
    getCategory(id) {
        return this.fetch(`/browse/categories/${id}`);
    }
    getPlaylistItem(id) {
        return this.fetch(`/playlists/${id}/tracks`);
    }
    getPlaylist(id) {
        return this.fetch(`/playlists/${id}`);
    }
    getSearch(search, type) {
        return this.fetch(`/search?q=${search}&type=${type}`);
    }
    getAlbum(id) {
        return this.fetch(`/albums/${id}`);
    }
    getAlbumTrack(id) {
        return this.fetch(`/albums/${id}/tracks`);
    }
    getArtist(id) {
        return this.fetch(`/artists/${id}`);
    }
    getArtistTopTrack(id) {
        return this.fetch(`/artists/${id}/top-tracks?market=ID`);
    }
    custom(url) {
        return this.fetch(url);
    }
}

const spotify = new Spotify();
async function call() {
    await spotify.getTokenHard();
}

call();

export default spotify;
