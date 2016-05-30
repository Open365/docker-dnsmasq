FROM docker-registry.eyeosbcn.com/alpine6-node-base
Maintainer eyeOS

ENV WHATAMI dnsmasq

COPY start.sh /tmp/start.sh
COPY sleep-infinity.sh /tmp/sleep-infinity.sh
COPY watcher.js /tmp/watcher.js
RUN apk update && \
	apk add inotify-tools && \
	chmod +x /tmp/start.sh && \
	chmod +x /tmp/sleep-infinity.sh && \
	rm -r /var/cache/apk/*

CMD /tmp/start.sh

EXPOSE 53
