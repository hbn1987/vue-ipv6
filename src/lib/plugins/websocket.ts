export function createWSClient(url: string): Promise<Nullable<WebSocket>> {
  return new Promise((resolve, reject) => {
    try {
      const wsServer = url
      // if (import.meta.env.PROD) {
      //   const cleanedUrl = url.startsWith('/') ? url.substring(1) : url
      //   wsServer = `${location.protocol === 'https' ? 'wss' : 'ws'}://${
      //     location.host
      //   }${import.meta.env.BASE_URL}${cleanedUrl}`
      // }
      const wsClient = new WebSocket(wsServer)
      wsClient.onopen = () => {
        resolve(wsClient)
      }
      wsClient.onclose = (event) => {
        reject(event)
      }
      wsClient.onerror = (event) => {
        reject(event)
      }
    } catch (error) {
      // SECURITY_ERR
      reject(error)
    }
  })
}

export function receiveWSMessage(wsClient: WebSocket): Promise<DNS[]> {
  return new Promise((resolve, reject) => {
    try {
      if (!wsClient) reject(null)
      let data: DNS[] = []
      wsClient.onmessage = (event) => {
        if (event.data) {
          const object = JSON.parse(event.data)
          if (object.type === 'items') {
            data = data.concat(object?.data)
          } else if (object.type === 'done') {
            resolve(data)
          }
        }
      }
    } catch (error) {
      reject(error)
    }
  })
}
