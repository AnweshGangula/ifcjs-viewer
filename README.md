# ifcjs-viewer - Extending Features

Basic source code for Web-IFC-Viewer

This project is created using the following [Template Repository](https://github.com/AnweshGangula/ifcjs-viewer-101#ifcjs-viewer-101). Please follow the instructions there to set-up a bsaic ifcjs-viewer.

## Features

### 3D Dimensions
You can add 3D dimensions in your model by adding the following lines of code in your js file
<p>
<details>
<summary>Dimension Annotations.</summary>
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
- E with enabling dimensions. You can also hide/unhide the dimensions once they are drawn
- D with creating the dimensions
  - To change the starting point of the dimension, you need to first click anywhere on the screen.

</details>
</p>