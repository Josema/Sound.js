Sound.js v1.0
=============

Josema Gonzalez (a.k.a. EnZo)
[www.josema.es](http://www.josema.es)

#### What is  ####

Sound.js its a simple class in javascript to using audio/sounds on browsers. Sound.js requiere a Audio tag (HTML5)


### Usage ###


```html
<script src="js/Sound.js"></script>
```

This code creates a instance Sound and detect what is the best format for the browser. After load method will sound.


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