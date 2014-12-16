'use strict';
var path = require("path");
var gutil = require('gulp-util');
var through = require('through2');

module.exports = function(){
    return through.obj(function(file, enc, cb){
		if (file.isNull()) {
			cb(null, file);
			return;
		}
        if (!file.isBuffer()) {
			cb(new gutil.PluginError('gulp-tpl2amd', 'Only Buffer is supported'));
			return;
        }
        file.contents = new Buffer('define([], function(){\n\n' 
            + '    return ' 
            + JSON.stringify({
                'template': file.contents.toString()
            })
            + '; \n\n});');
        var p = file.path;
        file.path = path.join(path.dirname(p),
            path.basename(p, path.extname(p)) + '.js');
        this.push(file);
        cb();
    });
};
