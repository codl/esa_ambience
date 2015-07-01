window.ambience = function() {
    "use strict";
    var inputs = document.querySelectorAll(".chooser input");
    var audios = {};

    for (var i = 0; i < inputs.length; i++){
        var input = inputs[i];
        var filename_prefix = input.dataset.filenamePrefix;

        var audio = document.createElement("audio");
        audio.loop = true;
        audio.volume = 0;

        (function(audio, input){
            var fade;
            var fadeinout = function fadeinout(sign){
                if(fade){
                    clearTimeout(fade);
                    fade = null;
                }

                console.log(input.id, audio.volume);
                var newvol = audio.volume + .04 * sign;
                audio.volume = Math.max(0, Math.min(1, newvol));

                if(sign >= 0 && audio.volume >= 0.95){
                    return
                }
                if(sign < 0 && audio.volume <= 0.05){
                    audio.pause();
                    return;
                }

                fade = setTimeout(fadeinout, 500, sign);
            }
            audio.fadein = function fadein(){ audio.play(); fadeinout(+1); };
            audio.fadeout = function fadeout(){ fadeinout(-1); };

            var loadedmetadata = function loadedmetadata(){
                audio.currentTime = audio.duration * Math.random();
                console.log(audio.currentTime, audio.duration);
                audio.removeEventListener(loadedmetadata);
            }

            audio.addEventListener("loadedmetadata", loadedmetadata);

            var change = function change(){
                if(input.checked){
                    for(var id in audios){
                        var audio = audios[id];
                        if(id == input.id){
                            if(audio.readyState == audio.HAVE_ENOUGH_DATA){
                                audio.fadein();
                            }
                            else {
                                audio.addEventListener("canplaythrough", audio.fadein);
                            }
                        }
                        else if(!audio.paused) {
                            audio.fadeout();
                        }
                    }
                }
            };

            input.addEventListener("change", change);
        })(audio, input);

        var opus_source = document.createElement("source");
        opus_source.type = "audio/ogg; codecs=opus";
        opus_source.src = filename_prefix + ".opus";
        audio.appendChild(opus_source);
        var mp3_source = document.createElement("source");
        mp3_source.type = "audio/mpeg";
        mp3_source.src = filename_prefix + ".mp3";
        audio.appendChild(mp3_source);

        audios[input.id] = audio;
    }
}
