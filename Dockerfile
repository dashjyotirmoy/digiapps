FROM nginx:alpine
LABEL maintainer="sandeep.debata@gds.ey.com"

# Create a group and user for www-data
RUN adduser -u 1000 -S www-data -G www-data -h /opt/digital

# Get the latest code
COPY nginx.conf /etc/nginx/nginx.conf
COPY build /usr/share/nginx/html

# Set content on /tms directory
RUN mkdir /usr/share/nginx/html/digitalops
RUN ln -s /usr/share/nginx/html/* /usr/share/nginx/html/digitalops/

# Provide permissions to required directories
RUN touch /var/run/nginx.pid && \
  chown -R www-data:www-data /var/run/nginx.pid && \
  chown -R www-data:www-data /var/cache/nginx && \
  chown -R www-data:www-data /etc/nginx && \
  chown -R www-data:www-data /usr/share/nginx && \
  chmod 777 -R /tmp && chmod o+t -R /tmp

#Switch to nginx user
USER www-data

# Expose required port from nginx config
EXPOSE 3000
