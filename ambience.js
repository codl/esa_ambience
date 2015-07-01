window.ambience = function() {
    var inputs = document.querySelectorAll(".chooser input");
    var audios = {};
    for (var i = 0; i < inputs.length; i++){
        var input = inputs[i];
        var filename_prefix = input.dataset.filenamePrefix;

        var audio = document.createElement("audio");
        audio.loop = true;

        (function(audio, input){
            var progress = function progress(){
                var bar = document.querySelector("label[for=" + input.id + "] .progress");
                if(audio.buffered.length > 0 && audio.duration) {
                    bar.style.width = (100 - audio.buffered.end(0) * 100 / audio.duration) + "%";
                }
            };

            audio.addEventListener("progress", progress);

            var load = function load(){
                var bar = document.querySelector("label[for=" + input.id + "] .progress");
                bar.style.width = 0;
            };

            audio.addEventListener("load", load);

            var input_ = function input_(){
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

            input.addEventListener("change", input_);
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
