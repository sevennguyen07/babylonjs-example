### Environment

An example of using Babylonjs with three primitive objects: Cylinder, Cube, IcoSphere and run an animation.

Selecting a mesh should bring up a UI window with primitives parameters adjustment.
You can choose any library or plain HTML to implement the following UI
When a primitive mesh is selected, the UI should display options specific for the selected primitive. It should be possible to set:

- For the _Cube_: 3 dimensions: width, height, depth (range 0.1-2.0)
- For the _Cylinder_: Diameter and height (range 0.1-2.0)
- For the _IcoSphere_: Diameter (range 0.1-2.0) and subdivisions (range 1-10)

### Install

`npm install`

try to run `npm cache clear --force` to clear cache first if you get error with `npm install`

### Run

- `npm run dev`
- Go to `localhost:8080` in the web browser
