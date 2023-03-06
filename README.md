# Mandelbrot experimenting

## Goals

### Primary
- Render full window width Mandelbrot fractals with decent precision
- Mouse wheel interactions with zoom in and out at the location of the cursor
- Reasonable performance to allow fluent interaction

### Strech goals
- Smooth coloring
- Optimized performance, look into worker threads
- Improved accuracy using big decimals while keeping reasonable performance
- Allow gestures like pinching for zooming on mobile

# Planning
Javascript and GPU accelerated floating point number precision is limited. Reasonable performance should be doable even without GPU though.

# Version history
6.3.2023 First working version