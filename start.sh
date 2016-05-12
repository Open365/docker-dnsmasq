#!/usr/bin/env bash

node /tmp/watcher.js &
/usr/sbin/dnsmasq --no-daemon --no-hosts --addn-hosts=/hosts/hosts.serf --no-dhcp-interface=eth0 --resolv-file=/resolv.conf