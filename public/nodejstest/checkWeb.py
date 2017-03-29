# -*- coding: utf-8 -*-
import sys 
import re
import urllib
url = "http://localhost:4330/hemsidor/serverquiz/nodejstest/index.php"
html = urllib.urlopen(url).read()
afterBody = html.split("<body>")[1]
text = afterBody.split("</body>")[0]
text = filter(lambda x: not re.match(r'^\s*$', x), text)
text_file = open("Output.txt", "w")
text_file.write(text)
text_file.close()
