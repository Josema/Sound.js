Sound.js v1.0
=============

Josema Gonzalez (a.k.a. EnZo)
[www.josema.es](http://www.josema.es)

#### What is  ####

Sound.js it's a simple class written in native JavaScript to use audio/sounds for modern browsers (HTML5).


### Usage ###


```html
<script src="js/Sound.js"></script>
```

This code create a Sound instance which detect what is the best format for the browser. After load the file, the music will play.


```html
<script>
var mysound = new Sound();
mysound.load({
	mp3: 'music/eits-First-Breath-After-Coma.mp3',
	ogg: 'music/eits-First-Breath-After-Coma.ogg',
	wav: 'music/eits-First-Breath-After-Coma.wav'
});
mysound.onBufferReady = function() { 
	this.play();
}
</script>
```