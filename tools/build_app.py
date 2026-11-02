#!/usr/bin/env python3
"""يبني نسخة الأبلكيشن (index.html) من نسخة الآرتيفاكت ويعلّي رقم نسخة الكاش في sw.js.
الاستخدام: python3 tools/build_app.py /path/to/artifact/index.html"""
import re, sys, pathlib
root = pathlib.Path(__file__).resolve().parent.parent
src = pathlib.Path(sys.argv[1]).read_text(encoding='utf-8')
def rep(a, b):
    global src
    assert src.count(a) == 1, a
    src = src.replace(a, b)
rep('<link rel="preconnect" href="https://fonts.googleapis.com">\n', '')
rep('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n', '')
rep('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lalezar&family=Readex+Pro:wght@400;600;700&display=swap">', '<link rel="stylesheet" href="fonts/fonts.css">')
rep('<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>', '<script src="three.min.js"></script>')
head = (root / 'tools' / 'head.html').read_text(encoding='utf-8')
tail = (root / 'tools' / 'tail.html').read_text(encoding='utf-8')
(root / 'index.html').write_text(head + src + tail, encoding='utf-8')
sw = (root / 'sw.js').read_text(encoding='utf-8')
m = re.search(r"life-street-v(\d+)", sw)
sw = sw.replace(m.group(0), f"life-street-v{int(m.group(1)) + 1}")
(root / 'sw.js').write_text(sw, encoding='utf-8')
print('built; cache', f"life-street-v{int(m.group(1)) + 1}")
