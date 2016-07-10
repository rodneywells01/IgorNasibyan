module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
				livereload: true,
			},
			files: [
				'index.html'.
				'*/app/styles/**.css']
		}		
	});

	grunt.event.on('watch', function(action, filepath, target) {
	  // 	grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	 	// console.log("Holy shit it picked up a change!");
	});

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['watch']);
}