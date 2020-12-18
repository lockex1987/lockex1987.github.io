// https://www.24h.com.vn/tai-chinh-bat-dong-san/choang-voi-nhung-biet-thu-sang-tren-dat-rung-phong-ho-soc-son-c161a998504.html
function openNewImage(e, t) {
    "no-popup" != e.lang && (
        picfile = new Image,
        picfile.src = e.src,
        width = picfile.width,
        height = picfile.height,
        "" != t && 0 < height ? height += 40 : 0 == height && (height = screen.height),
        winDef = "status=no,resizable=yes,scrollbars=no,toolbar=no,location=no,fullscreen=no,titlebar=yes,height="
                .concat(height)
                .concat(",")
                .concat("width=")
                .concat(width)
                .concat(","),
        winDef = winDef
                .concat("top=")
                .concat((screen.height - height) / 2)
                .concat(","),
        winDef = winDef
                .concat("left=")
                .concat((screen.width - width) / 2),
        
        newwin = open("", "_blank", winDef),
        newwin.document.writeln("<style>a:visited{color:blue;text-decoration:none}</style>"),
        newwin.document.writeln('<body topmargin="0" leftmargin="0" marginheight="0" marginwidth="0">'),
        newwin.document.writeln('<div style="width:100%;height:100%;overflow:auto;"><a style="cursor:pointer" href="javascript:window.close()"><img src="', e.src, '" border="0" alt="" /></a>'),
        "" != t && newwin.document.writeln('<div align="center" style="padding-top:5px;font-weight:bold;font-family:arial,Verdana,Tahoma;color:blue">', t, "</div></div>"),
        newwin.document.writeln("</body>"),
        newwin.document.close()
    )
}