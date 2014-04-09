from lxml import etree
from io import StringIO, BytesIO
import pymongo

#this stuff should just set up the basic variables for gunning through the xml
os.chdir("home/bradgnar/ENC_ROOT/US5NC18M/noms")
tree = etree.parse("US5NC18M001.kml")
root = tree.getroot()

#print out the root element as a check to see that we are in the right place
print(root.tag)

#this will iterate through the schema data's
#I will need to check the attributes of the SchemaData
#If schemaURL is #BOYLATT or #BOYSPP then I will need to do the following:
#1) get the parent which is ExtendedData
#2) get ExtendedData sibling which is Point
#3) get Point child which is coordinates 
#When I check the schemaURL attribute I also need to store the 

sfkml = '{http://www.opengis.net/kml/2.2}'

for element in root.iter(sfkml + 'SchemaData'):
	schemaUrl = element.get('schemaUrl')
	if schemaUrl == '#BOYLAT'
		extended = element.getparent()



##This will search through the xml and take out the different stuff
for element in root.iter(sfkml + 'SchemaData'):
    schemaUrl = element.get('schemaUrl')
    if schemaUrl in ('#BOYLAT', '#BOYSPP'):
            placemark = element.getparent().getparent()
            print(placemark.tag + ' -----------')
            point = placemark.find(sfkml + 'Point')
            print(point.tag + '###########')
            coord = point.find(sfkml + 'coordinates')
            print(coord.text)
   


