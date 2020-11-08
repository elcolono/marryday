FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /app
WORKDIR /app

COPY ./requirements /app/requirements
RUN pip install --no-cache-dir -r requirements/prod.txt

ADD ./app /app

COPY start.sh /start.sh
COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh
RUN ls -all

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/start.sh"]
