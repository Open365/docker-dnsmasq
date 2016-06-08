FROM docker-registry.eyeosbcn.com/alpine6-node-base
Maintainer eyeOS

ENV WHATAMI dnsmasq

COPY alpine-*.list /var/service/
COPY start.sh /tmp/start.sh
COPY sleep-infinity.sh /tmp/sleep-infinity.sh
COPY watcher.js /tmp/watcher.js

RUN apk update && \
	/scripts-base/buildDependencies.sh --production --install && \
	chmod +x /tmp/start.sh && \
	chmod +x /tmp/sleep-infinity.sh && \
	rm -r /var/cache/apk/* && \
	/scripts-base/buildDependencies.sh --production --purgue

CMD /tmp/start.sh

EXPOSE 53
