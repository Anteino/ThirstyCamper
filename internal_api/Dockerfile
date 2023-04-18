FROM ubuntu:22.04

RUN apt update
RUN DEBIAN_FRONTEND=noninteractive apt install -y python3 python3-pip
RUN pip3 install python-dotenv Flask flask-restful requests pymongo

COPY . /internal_api
WORKDIR /internal_api

EXPOSE 5000
CMD ["python3", "-u", "api.py"]