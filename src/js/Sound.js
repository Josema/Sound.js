/*                              
                                        ys`
                                        -Md
                                         hM+
                                         -MN`
                                          yMs
                                          .MM-
                                           sMd
                                           .NM/
                                            sMm`
         +dmmh                              `NMo
        sMMMMh                               oMN.
       `MMMMMs                               `NMy
       :MMMMM+                                +MM:
       sMMMMM:                                 mMm 
       dMMMMM.                                 /MM+
      `MMMMMM`                                  mMN`
      /MMMMMm                                   /MMs
      sMMMMMh                                    dMM-
      mMMMMMy                     /:             :MMh
     `MMMMMMy                    :MMs             mMM/
     /MMMMMMd                    /MMM:            yMMm`
     sMMMMMMM/                   :MMMd  ``...--::+NMMMo
     mMMMMMMMMh+::://++oossyyyhhdmMMMMNMMMMMMMMMMMMMMMm
     MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMh
     MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNmdhyyso+/:-`
     hMMMMMMMMMMMMMMMMMMMMMNmdhyso+/:-.`
     `odNMMMNmdhyso+/:-.``


            https://github.com/Josenzo/Sound.js







========================================
      BROWSERS SUPPORTED FORMATS
========================================
================ MP3 = Wav = Ogg = AAC =
========================================
IE 9 =========== YES = NO == NO == YES =
Firefox 4.0===== NO == YES = YES = NO ==
Google Chrome == YES = YES = YES = YES =
Apple Safari 5== YES = YES = NO == YES =
Opera 10.6====== NO == YES = YES = NO ==
========================================



*/


var Sound = function ()
{

	//////////////////
	//  PROPERTIES  //
	//////////////////

	this.typeSelected;
	this.audio = new Audio();
	this.audio.this = this;
	//Load events
	this.audio.addEventListener('canplaythrough', function(e){
		if (this.readyState==4 && e.target.this.onBufferReady != null)
			e.target.this.onBufferReady();
	});
	this.audio.addEventListener('error', function(e){
		if (e.target.this.onBufferReady != null)
		{
			e.message = Sound.error[0];
			e.target.this.onError(e);
		}
	});



	//////////////
	//  EVENTS  //
	//////////////
	
	/**
	 * The onReady event occurs after run load() method and the browser can use some format correctly
	*/
	this.onReady;
	
	/**
	 * The onBufferReady event occurs when the sound have buffer loaded for playing
	*/
	this.onBufferReady;

	/**
	 * The onError event occurs when the sound it can't play
	*/
	this.onError;



	///////////////
	//  METHODS  //
	///////////////

	/**
	 * @return void
	*/
	this.play = function()
	{
		this.audio.play();
	}

	/**
	 * @return void
	*/
	this.pause = function()
	{
		this.audio.pause();
	}

	/**
	 * @return void
	*/
	this.stop = function()
	{
		this.pause();
		this.seek(0);
	}
	
	/**
	 * @return void
	*/
	this.playPause = function()
	{
		(this.audio.paused) ? this.play() : this.pause();
	}

	/**
	 * Sets and return the current position (in seconds) of the audio/video playback.
	 * 
	 * @param number seconds
	 * @return number
	*/
	this.seek = function(seconds)
	{
		if (typeof seconds == "number")
			this.audio.currentTime = seconds;

		return this.audio.currentTime;
	}

	/**
	 * Sets and return the volume of the sound
	 * 
	 * @param number value
	 * @return number
	*/
	this.volume = function(value)
	{
		if (typeof value == "number")
			this.audio.volume = value;

		return this.audio.volume;
	}

	/**
	 * Mute or unmute the sound. And return the state
	 * 
	 * @return boolean
	*/
	this.mute = function()
	{
		this.audio.muted = !this.audio.muted;
		return this.audio.muted;
	}

	/**
	 * Sets if the sound should start over again when finished. And return the state
	 * 
	 * @param boolean value
	 * @return boolean
	*/
	this.loop = function(value)
	{
		if (typeof value == "boolean")
			this.audio.loop = value;
			
		return this.audio.loop;
	}

	/**
	 * Returns the length of the current sound in seconds
	 * 
	 * @return number
	*/
	this.duration = function()
	{
		return this.audio.duration;
	}
	
	
	
	/**
	 * Load the best format for the browser. The preload property sets if the sound should start loading as soon as the page loads. And will return true if this browser can use some format of the paths.
	 * 
	 * @param object paths
	 * @param boolean preload (true default)
	 * @return boolean
	*/
	this.load = function(paths, preload)
	{
		this.audio.preload = (typeof preload == "boolean" && !preload) ? "none" : "auto";
	
		var canPlayType = false;
		for (var i in paths)
		{
			if (!!(this.audio.canPlayType && this.audio.canPlayType(Sound[i.toLowerCase()]).replace(/no/, '')))
			{
				canPlayType = true;
				this.typeSelected = i.toLowerCase();
				this.audio.src = paths[i];
				break;
			}
		}
		if (canPlayType && this.onReady != null)
			this.onReady();
		else if (!canPlayType && this.onError != null)
			this.onError({message: Sound.error[1]});
		
		
			
		return canPlayType;
	}
}

/////////////////
//  CONSTANTS  //
/////////////////

Sound.ogg = 'audio/ogg; codecs="vorbis"';
Sound.mp3 = 'audio/mpeg;';
Sound.wav = 'audio/wav;';
Sound.aac = 'audio/mp4; codecs="mp4a.40.2"';
Sound.m4a = Sound.mp4 = Sound.aac;

Sound.error = [
	"Has been occurred an unknown error",
	"This browser doesn't support this formats"
];
