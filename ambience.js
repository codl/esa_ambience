window.ambience = function() {
    var inputs = document.querySelectorAll(".chooser input");
    var audios = {};
    for (var i = 0; i < inputs.length; i++){
        var input = inputs[i];
        var filename_prefix = input.dataset.filenamePrefix;

        var audio = document.createElement("audio");
        audio.loop = true;

        (function(audio, input){




            var change = function change(){
                if(input.checked){
                    for(var id in audios){
                        if(id == input.id){
                            audios[id].play();
                        }
                        else if(!audios[id].paused) {
                            audios[id].pause();
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
