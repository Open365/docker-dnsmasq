From docker-registry.eyeosbcn.com/eyeos-fedora21-node-base:latest
Maintainer eyeOS

COPY start.sh /tmp/start.sh
COPY watcher.js /tmp/watcher.js
RUN yum install -y dnsmasq inotify-tools &&\
	chmod +x /tmp/start.sh

CMD /tmp/start.sh

EXPOSE 53
