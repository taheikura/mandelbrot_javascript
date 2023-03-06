const imageWidth = window.innerWidth
const imageHeight = window.innerHeight
let palette = []
let offsetx = -imageWidth/2;
let offsety = -imageHeight/2;
let panx = -100;
let pany = 0;
let zoom = 500;

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

function onLoad() {
    generatePalette();

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.canvas.width  = imageWidth;
    ctx.canvas.height = imageHeight;

    draw(ctx, 50, palette);
}

function processLine(image, maxIterations, palette, j) {
    const y0 = (j + offsety + pany) / zoom;

    for (let i = 0, x = 0; x < image.data.length; x++, i+=4) {
        let x0 = (x + offsetx + panx) / zoom;
        let a = 0;
        let b = 0;
        let n = 0;

        while(n < maxIterations) {
            const aa = a*a;
            const bb = b*b;
            const ab2 = a*b*2;
            a = aa - bb + x0;
            b = ab2 + y0;
            if (aa+bb > 4) {
                break;
            }
            ++n;
        }

        if (n === maxIterations) {
            image.data[i] = 0;
            image.data[i+1] = 0;
            image.data[i+2] = 0;
            image.data[i+3] = 0;
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
    for (let j = 0; j < imageHeight; ++j) {
        const image = ctx.createImageData(imageWidth, 1);

        processLine(image, maxIterations, palette, j);

        ctx.putImageData(image, 0, j);
    }
}
