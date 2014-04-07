from lxml import etree
from io import StringIO, BytesIO


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
for element in root.iter('SchemaData'):
	extended = element.getparent()
	print("%s ---- %s" % (extended.tag, extended.text))