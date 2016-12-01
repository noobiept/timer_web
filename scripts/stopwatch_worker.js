var timerInterval = 100; // 0.1 seconds
// we're setting an interval in a web worker instead of in the main thread, because when the webpage is inactive the browser throttles the javascript execution (that doesn't happen in the web worker thread)
setInterval(function () {
    postMessage(1);
}, timerInterval);
