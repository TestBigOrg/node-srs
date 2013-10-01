var srs = require('../');
var fs = require('fs');
var assert = require('assert');

var expected = { srid: 4326, auth: 'EPSG', esri: false, is_geographic: true, valid: true };

describe('WGS84', function() {
    it('should detect wgs84 proj4 init detection', function() {

        var parsed = srs.parse('+init=epsg:4326');
        assert.ok(parsed.proj4);
        assert.equal(parsed.proj4, '+proj=longlat +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +no_defs');
        assert.equal(parsed.srid, expected.srid);
        assert.equal(parsed.auth, expected.auth);
        assert.equal(parsed.esri, expected.esri);
        assert.equal(parsed.is_geographic, expected.is_geographic);
        assert.equal(parsed.valid, expected.valid);
    });

    it('should detect wgs84 proj4 literal from gdal trunk detection', function() {

        // +datum=WGS84
        var parsed = srs.parse('+proj=longlat +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +no_defs');
        assert.ok(parsed.proj4);
        assert.equal(parsed.proj4, '+proj=longlat +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +no_defs');
        assert.equal(parsed.srid, expected.srid);
        assert.equal(parsed.auth, expected.auth);
        assert.equal(parsed.esri, expected.esri);
        assert.equal(parsed.is_geographic, expected.is_geographic);
        assert.equal(parsed.valid, expected.valid);
    });

    it('should detect wgs84 proj4 literal +datum will trigger addition to towgs detection', function() {

        // +datum will trigger addition to towgs
        var parsed = srs.parse('+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
        assert.ok(parsed.proj4);
        assert.equal(parsed.proj4, '+proj=longlat +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +no_defs');
        assert.equal(parsed.srid, expected.srid);
        assert.equal(parsed.auth, expected.auth);
        assert.equal(parsed.esri, expected.esri);
        assert.equal(parsed.is_geographic, expected.is_geographic);
        assert.equal(parsed.valid, expected.valid);
    });

    it('should detect wgs84 wkt detection', function() {

        var val = 'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]';
        var parsed = srs.parse(val);
        assert.equal(parsed.proj4, '+proj=longlat +datum=WGS84 +no_defs');
        assert.ok(parsed.proj4);
        assert.equal(parsed.srid, expected.srid);
        assert.equal(parsed.auth, expected.auth);
        assert.equal(parsed.esri, expected.esri);
        assert.equal(parsed.is_geographic, expected.is_geographic);
        assert.equal(parsed.valid, expected.valid);
    });

    it('should detect wgs84 epsg detection', function() {

        var parsed = srs.parse('EPSG:4326');
        assert.ok(parsed.proj4);
        assert.equal(parsed.proj4, '+proj=longlat +datum=WGS84 +no_defs');
        assert.equal(parsed.srid, expected.srid);
        assert.equal(parsed.auth, expected.auth);
        assert.equal(parsed.esri, expected.esri);
        assert.equal(parsed.is_geographic, expected.is_geographic);
        assert.equal(parsed.valid, expected.valid);
    });

    it('should detect wgs84 common name detection', function() {

        var parsed = srs.parse('WGS84');
        assert.ok(parsed.proj4);
        assert.equal(parsed.proj4, '+proj=longlat +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +no_defs');
        assert.equal(parsed.srid, expected.srid);
        assert.equal(parsed.auth, expected.auth);
        assert.equal(parsed.esri, expected.esri);
        assert.equal(parsed.is_geographic, expected.is_geographic);
        assert.equal(parsed.valid, expected.valid);
    });

    it('should detect wgs84 proj4 literal no datum detection', function() {

        var parsed = srs.parse('+proj=longlat +ellps=WGS84 +no_defs');
        assert.ok(parsed.proj4);
        assert.equal(parsed.proj4, '+proj=longlat +ellps=WGS84 +no_defs');
        assert.equal(parsed.srid, expected.srid);
        assert.equal(parsed.auth, expected.auth);
        assert.equal(parsed.esri, expected.esri);
        assert.equal(parsed.is_geographic, expected.is_geographic);
        assert.equal(parsed.valid, expected.valid);
    });

    it('should detect wgs84 wkt from prj file', function() {

        var data = fs.readFileSync('./test/data/4326.esri.prj');
        var parsed = srs.parse(data);
        assert.ok(parsed.proj4);
        assert.equal(parsed.proj4, '+proj=longlat +ellps=WGS84 +no_defs');
        assert.equal(parsed.srid, expected.srid);
        assert.equal(parsed.auth, expected.auth);
        assert.equal(parsed.esri, expected.esri);
        assert.equal(parsed.is_geographic, expected.is_geographic);
        assert.equal(parsed.valid, expected.valid);
    });

    it('should detect wgs84 wkt from another prj file', function() {

        var data = fs.readFileSync('./test/data/4326.prj');
        var parsed = srs.parse(data);
        assert.ok(parsed.proj4);
        assert.equal(parsed.proj4, '+proj=longlat +ellps=WGS84 +no_defs');
        assert.equal(parsed.srid, expected.srid);
        assert.equal(parsed.auth, expected.auth);
        assert.equal(parsed.esri, expected.esri);
        assert.equal(parsed.is_geographic, expected.is_geographic);
        assert.equal(parsed.valid, expected.valid);
    });

});