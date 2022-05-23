# ifcjs-viewer - Extending Features

Basic source code for Web-IFC-Viewer

This project is created using the following [Template Repository](https://github.com/Gangula2/ifcjs-viewer-101). Please follow the instructions there to set-up a bsaic ifcjs-viewer.

## Features

### Object Selection
You can enable highlighting object on hover and object selection on double mouse click with the below code
<p>
<details>
<summary>Code to enable Object Selection.</summary>
<br>

```js
window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
// Select items and log properties
window.ondblclick = async () => {
    const item = await viewer.IFC.selector.pickIfcItem(true);
    if (item.modelID === undefined || item.id === undefined) return;
    console.log(await viewer.IFC.getProperties(item.modelID, item.id, true));
}
```

</details>
</p>

### 3D Dimensions
You can add 3D dimensions in your model by adding the following lines of code in your js file
<p>
<details>
<summary>Code to enable Dimension Annotations.</summary>
<br>


```js
let dimensionsActive = false;

window.webIfcAPI = viewer;
viewer.IFC.applyWebIfcConfig({ COORDINATE_TO_ORIGIN: true, USE_FAST_BOOLS: true });

window.onkeydown = (event) => {
    if (event.code === 'KeyE') {
        dimensionsActive = !dimensionsActive;
        viewer.dimensions.active = dimensionsActive;
        viewer.dimensions.previewActive = dimensionsActive;
        viewer.IFC.selector.unPrepickIfcItems();
        window.onmousemove = dimensionsActive ? null : () => viewer.IFC.selector.prePickIfcItem();
    }
    if (event.code === 'KeyD') {
        viewer.dimensions.create();
    }
}
```

In the above code we are adding associating the Key
- **E:** with enabling dimensions. You can also hide/unhide the dimensions once they are drawn
    - Left-click on any elements to start dimensioning
- **D:** with creating the dimensions
  - To change the starting point of the dimension, you need to first click anywhere on the screen.

</details>
</p>

### Section Planes

You can enable creating section planes on selected elements using below code
<p>
<details>
<summary>Code to enable Section Planes.</summary>
<br>

```js
window.onkeydown = (event) => {
    if (event.code === 'KeyP') {
        viewer.clipper.createPlane();
    }
```

</details>
</p>
