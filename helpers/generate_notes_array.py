#!/usr/bin/python

import os

ROOTPATH = '/www/homes/rectorky/www/stupid_weekly_projects/week1'
NOTESPATH = ROOTPATH + '/notes'
HELPERSPATH = ROOTPATH + '/helpers/'
URLPATH = '/~rectorky/stupid_weekly_projects/week1/notes/'

f = open(HELPERSPATH + 'notes.js', 'w')
f.write('var notes = [')
comma = 0

for dirname, dirnames, filenames in os.walk(NOTESPATH):
    for filename in filenames:
        f.write("\""+ URLPATH + filename+"\"")
        if comma < len(filenames)-1:
		f.write(',')
        	comma += 1
f.write('];')
f.close()
