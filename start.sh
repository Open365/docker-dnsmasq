#!/bin/sh

node /tmp/watcher.js &
exec /usr/sbin/dnsmasq --no-daemon --no-hosts --addn-hosts=/hosts/hosts.serf --no-dhcp-interface=eth0 --resolv-file=/resolv.conf
