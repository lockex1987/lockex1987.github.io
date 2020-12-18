$(document).ready(function() {
    var comp = $('#compare');
    
    function downloadJSON(url, callback) {
        $.get(url, function(data) {
            var json = JSON.parse(data);
            var formattedText = JSON.stringify(json, null, 2);
            callback(formattedText);
        });
    }

    comp.mergely({
        cmsettings: {
            readOnly: false,
            lineWrapping: true
        },
        wrap_lines: true,
        
        //Doesn't do anything?
        //autoresize: true,
        
        editor_width: 'calc(50% - 25px)',
        editor_height: '100%',
        
        lhs: function(setValue) {
            downloadJSON($("#file1").attr('href'), setValue);
        },
        rhs: function(setValue) {
            downloadJSON($("#file2").attr('href'), setValue);
        }
    });

    function changeOptions(changer) {
        var options = comp.mergely('options');
        changer(options);
        
        comp.mergely('options', options);
        //comp.mergely('update');
    }
    
    $('#prev').click(function() {
        comp.mergely('scrollToDiff', 'prev');
    });
    $('#next').click(function() {
        comp.mergely('scrollToDiff', 'next');
    });
    $('#wrap').click(function() {
        changeOptions(function(x) {
            x.wrap_lines = !x.wrap_lines;
        });
    });
});