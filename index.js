import { Color } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';

const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
const input = document.getElementById("file-input");
let dimensionsActive = false;

window.webIfcAPI = viewer;
viewer.IFC.applyWebIfcConfig({ COORDINATE_TO_ORIGIN: true, USE_FAST_BOOLS: true });
viewer.axes.setAxes();
viewer.grid.setGrid();
viewer.clipper.active = true;


window.onmousemove = () => viewer.IFC.selector.prePickIfcItem();
// Select items and log properties
window.ondblclick = async () => {
    const item = await viewer.IFC.selector.pickIfcItem(true);
    if (item.modelID === undefined || item.id === undefined) return;
    console.log(await viewer.IFC.getProperties(item.modelID, item.id, true));
}

input.addEventListener("change",

    async (changed) => {

        const file = changed.target.files[0];
        const ifcURL = URL.createObjectURL(file);
        loadIfc(ifcURL);
    },

    false
);

async function loadIfc(url) {
    // await viewer.IFC.setWasmPath("static/wasm/");
    const model = await viewer.IFC.loadIfcUrl(url);
    viewer.shadowDropper.renderShadow(model.modelID);
}

window.onclick = () => {
    // const item = await viewer.IFC.selector.prePickIfcItem(true);
    if (dimensionsActive) {
        // if (item.modelID !== undefined || item.id !== undefined) {
        viewer.dimensions.create();
        // }
    }
}

loadIfc('models/01.ifc');

const handleKeyDown = (event) => {
    if (event.code === 'KeyP') {
        viewer.clipper.createPlane();
    }
    else if (event.code === 'Escape') {
        viewer.IFC.selector.unpickIfcItems();
    }
    if (event.code === 'KeyE') {
        // reference: https://ifcjs.github.io/info/blog/Build%20a%20CDE%20in%2030%20minutes/
        dimensionsActive = !dimensionsActive;
        viewer.dimensions.active = dimensionsActive;
        viewer.dimensions.previewActive = dimensionsActive;
        viewer.IFC.selector.unPrepickIfcItems();
        window.onmousemove = dimensionsActive ? null : () => viewer.IFC.selector.prePickIfcItem();
        document.body.style.cursor = dimensionsActive ? "crosshair" : "auto";
    }
    if (event.code === 'Delete') {
        viewer.dimensions.deleteAll();
        viewer.clipper.deletePlane();
        viewer.IFC.selector.unpickIfcItems();
    }
}

window.onkeydown = handleKeyDown;
