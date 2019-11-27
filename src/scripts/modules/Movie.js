
export default class Movie {
  constructor(elem) {
    this.elem = elem
    // this.opts = opts
    // console.log('movie')
    // this.init()
    this.bindEvents()
  }

  init() {
    // console.log('movie - init()')
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    tag.id = "youtubeScript";
    var firstScriptTag = document.getElementsByTagName('script')[5];
    console.log('firstScriptTag')
    console.log(firstScriptTag)
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  bindEvents() {

    // console.log('movie - bindEvents()')

    var player;

    player = new YT.Player('player', {
      width: '560',
      height: '315',
      videoId: 'SmAIyQjvKAM',
      playerVars:  {
        'autoplay': 0,
        'modestbranding': 1,
        // 'controls': 0,
        'showinfo': 0,
        'disablekb': 1,
        'html5': 1,
        'loop' : 0,
        'rel': 0,
        'fs': 0,
        'playsinline': 1,
        'playlist' : 'SmAIyQjvKAM'
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });

    function onPlayerReady() {
      // console.log('movie - onPlayerReady()')
      player.mute();
      player.playVideo();

    }

    var done = false;
    function onPlayerStateChange() {
      // console.log('movie - onPlayerStateChange()')
      if (player.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo() {
      // console.log('movie - stopVideo()')
      player.stopVideo();
    }

    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.ENDED) {
        event.target.stopVideo();
      }
    }
    

    // iframeのreadyをグローバルにする
    // window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  }

}
