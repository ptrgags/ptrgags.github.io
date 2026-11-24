import { GridLayer, type Coords, type DoneCallback } from 'leaflet'

// See https://leafletjs.com/examples/extending-2-layers/
export class DebugCoordsLayer extends GridLayer {
  protected createTile(coords: Coords): HTMLElement {
    const tile = document.createElement('div')
    console.log('creating tile for', coords)
    tile.innerHTML = `(${coords.x}, ${coords.y}), zoom: ${coords.z}`
    tile.style.outline = '2px solid red'
    tile.style.backgroundColor = 'orange'
    tile.style.color = 'black'
    tile.style.fontSize = '24px'
    return tile
  }
}
