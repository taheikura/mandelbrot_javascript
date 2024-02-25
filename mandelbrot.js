const IMAGE_WIDTH = window.innerWidth
const IMAGE_HEIGHT = window.innerHeight

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let palette = []
let originx = -IMAGE_WIDTH/2;
let originy = -IMAGE_HEIGHT/2;
let zoom = 500;
let newOriginX = originx;
let newOriginY = originy;
let newZoom = zoom;
let isRendering = false;

// After page loads, generate palette, scale canvas to fit page
function onLoad() {
    generatePalette();

    canvas.width  = IMAGE_WIDTH;
    canvas.height = IMAGE_HEIGHT;

    canvas.addEventListener("wheel", debounce((e) => onWheel(e)));

    draw(ctx, 50, palette);
}

function generatePalette() {
    let r = 0, g = 0, b = 0;
    for (let i=0; i<256; i++) {
        palette[i] = { r: r, g: g, b: b };

        if (i < 64) {
            r += 3;
        } else if (i < 128) {
            g += 3;
        } else if (i < 192) {
            b += 3;
        }
    }
}

function debounce(func, timeout = 25) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

// Iteration count for pixel at x0, y0
function iterateMandelbrot(x0, y0, maxIterations) {
    let a = 0, b = 0, n = 0;
    let aa = 0, bb = 0, ab2 = 0;

    while(n < maxIterations) {
        aa = a*a;
        bb = b*b;
        if (aa+bb > 4) {
            break;
        }
        ab2 = a*b*2;
        a = aa - bb + x0;
        b = ab2 + y0;
        ++n;
    }

    return n;
}

// Get iteration counts for the whole line
// Support panning and zooming
function processLine(image, maxIterations, palette, y) {
    const y0 = (y + originy) / zoom;

    for (let x = 0, i = 0; x < image.data.length; x++, i+=4) {
        const x0 = (x + originx) / zoom;
        const n = iterateMandelbrot(x0, y0, maxIterations);

        if (n === maxIterations) {
            image.data[i] = 0;
            image.data[i+1] = 0;
            image.data[i+2] = 0;
            image.data[i+3] = 255;
        } else {
            const { r, g, b } = palette[Math.floor((n*255 / (maxIterations-1)))];
            image.data[i] = r;
            image.data[i+1] = g;
            image.data[i+2] = b;
            image.data[i+3] = 255;
        }
    }
}

function draw(ctx, maxIterations, palette) {
    zoom = newZoom;
    originx = newOriginX;
    originy = newOriginY;

    for (let y = 0; y < IMAGE_HEIGHT; ++y) {
        const image = ctx.createImageData(IMAGE_WIDTH, 1);

        processLine(image, maxIterations, palette, y);

        ctx.putImageData(image, 0, y);
    }
}

function onWheel(e) {
    e.preventDefault();

    const mousex = e.clientX - IMAGE_WIDTH/2;
    const mousey = e.clientY - IMAGE_HEIGHT/2;

    // I will figure out how to improve usability at high zoom levels later
    newZoom = zoom < 5000 ? zoom + e.wheelDelta*2 : zoom;

    newOriginX = originx + mousex/2;
    newOriginY = originy + mousey/2;

    draw(ctx, 50, palette);
}
