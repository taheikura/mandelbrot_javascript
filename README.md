# Mandelbrot WIP

[Link to implementation](https://htmlpreview.github.io/?https://github.com/taheikura/mandelbrot_javascript/blob/main/index.html)

## Goals

### Primary

- No deployment necessary
- Render Mandelbrot fractals with decent precision, fill window
- Mouse wheel interactions with zoom in and out at the location of the cursor
- Reasonable performance to allow fluent interaction

### Strech goals

- Responsive to window size
- Smooth coloring
- Optimized performance, look into worker threads
- Improved accuracy using big decimals while keeping reasonable performance
- Allow gestures like pinching for zooming on mobile

## Planning

Javascript and GPU accelerated floating point number precision is limited. Reasonable performance should be doable even without GPU though.

## Version history

6.3.2023 First working version

25.2.2024 Add zooming
