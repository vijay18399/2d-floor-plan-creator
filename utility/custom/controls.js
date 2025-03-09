

// Function to customize selection appearance
export function customizeSelection(ifo) {
    ifo.ownDefaults = {
        ...ifo.ownDefaults,
        transparentCorners: false,
        cornerColor: "#50A6C5",
        cornerStyle: "circle",
        borderColor: "#B5D1DB",
        cornerSize: 12,
        borderScaleFactor: 2.75,
        borderOpacityWhenMoving: 0,
        borderOpacity: 1,
        padding: 4,
    };
}
