# -*- coding: utf-8 -*-
import sys 
import re
import urllib
url = "http://localhost:8000/index.html"
html = urllib.urlopen(url).read()
#afterBody = html.split("<body>")[1]
#text = afterBody.split("</body>")[0]
#text = filter(lambda x: not re.match(r'^\s*$', x), text)
text_file = open("Output.txt", "w")
text_file.write(html)
text_file.close()
