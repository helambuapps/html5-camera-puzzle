chrome.app.runtime.onLaunched.addListener(function() {
  var width = 900, height = 710;

  chrome.app.window.create('camera.html', {
    'bounds': {
      'width': width,
      'height': height,

      // Show it in the middle of the screen
      'left': Math.floor((window.screen.width - width) / 2),
      'top': Math.floor((window.screen.height - height) / 2)
    }
  });
});