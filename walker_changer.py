import os
from lxml import etree
from io import StringIO, BytesIO
from pymongo import MongoClient, GEO2D
import re

#stands for stupid fucking kml.  Because this is appended onto all of the damn outputs
sfkml = '{http://www.opengis.net/kml/2.2}'
client = MongoClient('localhost', 27017)
db = client.project_db
db.points.remove()
db.points.create_index([("loc", GEO2D)])

#takes the hash tag off of the BOYLAT and BOYSPP
def changeSchemaUrl(original):
	return re.sub(r'#', "", original)

#takes a string of lattitude and longitude, splits them into an array of strings, maps it into an array of float
def splitCoordsMakeArray(coords):
	return map(float, re.split(r',', coords))

#finds all xml files, then finds all relevant points within the files and puts them into the db.
indir = '/home/bradgnar/ENC_ROOT/all_xml_files'
for root, dirs, filenames in os.walk(indir):
    for f in filenames:
        print f
        tree = etree.parse(indir + "/" + f)
        root = tree.getroot()
        for element in root.iter(sfkml + 'SchemaData'):
        	schemaUrl = element.get('schemaUrl')
        	if schemaUrl in ('#BOYLAT', '#BOYSPP'):
        		typeTag = changeSchemaUrl(schemaUrl)
        		placemark = element.getparent().getparent()
        		point = placemark.find(sfkml + 'Point')
        		coord = point.find(sfkml + 'coordinates')
        		locP = splitCoordsMakeArray(coord.text)
        		db.points.insert({"loc": [locP[1],locP[0]], "pointType": typeTag})
        		


