/*
    Copyright (c) 2016 eyeOS

    This file is part of Open365.

    Open365 is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

var fs = require('fs');
var exec = require('child_process').exec;

function reloadDnsmasq(){
	exec('pidof dnsmasq | xargs --no-run-if-empty kill -1', function (error, stdout, stderr) {
		console.log("Restarting dnsmasq.");
		console.log('Error: ', error);
		console.log('stdout: ', stdout);
		console.log('stderr: ', stderr);
	});
};

fs.watchFile('/hosts/hosts.serf', function () {
	console.log("Watching hosts.serf");
	reloadDnsmasq();
});

fs.watchFile('/hosts/hosts.static', function () {
	console.log("Watching hosts.static");
	recreateHostsFile();
});

fs.watchFile('/resolv.conf', function () {
	console.log("Watching resolv.conf");
	reloadDnsmasq();
});

function recreateHostsFile() {
	getGateway(function(err, gateway) {
		if (err) {
			return;
		}
		writeNewHosts(gateway, reloadDnsmasq);
	});
}

function getGateway(callback) {
	exec('sh -c route | grep default | awk \'{ print $2 }\'', function(error, stdout, stderr) {
        if (error) {
            console.log('Error happened while getting the gateway');
			callback(new Error("Could not fetch gateway"));
            return;
        }
	    var gateway = stdout.split('\n')[0];
	    console.log("Got gateway:", gateway);
		callback(null, gateway);
	});
}

function writeNewHosts(gateway, callback) {
	var command = 'sed -e s/127.0.0.1/' + gateway + '/g /hosts/hosts.static > /hosts.withgateway';
	exec(command, function(error) {
		if (error) {
			console.log("Could not create new hosts file: " + error);
		}
		callback(error);
	});
}

// Startup
recreateHostsFile();
