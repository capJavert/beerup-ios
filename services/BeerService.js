class BeerService {
    baseURL = 'https://api.punkapi.com/v2'

    async list(params) {
        const searchParams = Object.keys(params).map(name => `${name}=${params[name]}`)
        
        return fetch(`${this.baseURL}/beers?${searchParams.join('&')}`)
          .then(response => response.json())
    }
}

const beerService = new BeerService()
export default beerService
