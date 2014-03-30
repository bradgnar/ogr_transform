var ogr2ogr = require('ogr2ogr'),
	fs = require('fs');

var shapefile = ogr2ogr('home/bradgnar/ENC_ROOT/US5NC18M/US5NC18M.000')
                    .skipfailures()
                    .stream();
shapefile.pipe(fs.createWriteStream('home/bradgnar/ENC_ROOT/US5NC18M/US5NC18Msum.json'));