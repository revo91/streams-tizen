import { getToken, setToken } from './auth.service';
import { clientID, clientSecret } from '../config';

export const refreshToken = async () => {
  const data = {
    client_id: clientID,
    client_secret: clientSecret,
    grant_type: 'client_credentials'
  }
  const response = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const fetchedData = await response.json()
  setToken(fetchedData.access_token)
}

export const getGamesList = async (url) => {
  if (getToken() === null) {
    await refreshToken()
  }
  let response = await fetch(url, {
    headers: {
      'Client-ID': clientID,
      'Authorization': `Bearer ${getToken().accessToken}`
    }
  })
  if (response.status === 200) {
    const games = await response.json()
    return {
      status: response.status,
      pagination: games.pagination.cursor,
      data: games.data
    };
  }
  else if (response.status === 401) {
    refreshToken().then(() => {
      window.location.reload()
    })
  }
  else {
    return { status: response.status }
  }
}

export const getStreamsList = async (url) => {
  if (getToken() === null) {
    await refreshToken()
  }
  let response = await fetch(url, {
    headers: {
      'Client-ID': clientID,
      'Authorization': `Bearer ${getToken().accessToken}`
    }
  })
  if (response.status === 200) {
    const streams = await response.json()
    return {
      status: response.status,
      pagination: streams.pagination.cursor,
      data: streams.data
    };
  }
  else if (response.status === 401) {
    refreshToken().then(() => {
      window.location.reload()
    })
  }
  else {
    return { status: response.status }
  }
}

export const getStreamerNameFromID = async (id) => {
  if (getToken() === null) {
    await refreshToken()
  }
  let response = await fetch(`https://api.twitch.tv/helix/users?id=${id}`, {
    headers: {
      'Client-ID': clientID,
      'Authorization': `Bearer ${getToken().accessToken}`
    },
  })
  if (response.status === 200) {
    const streamer = await response.json()
    console.log(streamer)
    return {
      status: response.status,
      data: streamer.data
    };
  }
  else if (response.status === 401) {
    refreshToken().then(() => {
      window.location.reload()
    })
  }
  else {
    return { status: response.status }
  }
}
