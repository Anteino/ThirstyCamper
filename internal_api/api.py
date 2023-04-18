from flask import Flask, request
from flask_restful import Resource, Api, reqparse

import pymongo
import json
from bson import json_util

from dotenv import dotenv_values
config = dotenv_values(".env")

app = Flask(__name__)
api = Api(app)

class Users(Resource):
	def get(self):
		mongo_client = pymongo.MongoClient(config["MONGODB_URL"])
		mongo_db = mongo_client["ThirstyCamper"]
		mongo_users = mongo_db["users"]

		name = request.args.get('name')

		if(name):
			existingUser = mongo_users.find_one({"name": name}, {"_id": 0})
			if(existingUser == None):
				return {"message": "User " + name + " wasn't found."}, 200
			else:
				return {"message": "User " + name + " was found.", "data": existingUser}, 200
		else:
			all_users = mongo_users.find({}, {"_id": 0})
			return {"data": json.loads(json_util.dumps(all_users))}, 200

	def put(self):
		parser = reqparse.RequestParser()
		parser.add_argument("name", type=str, required=True)
		args = parser.parse_args()
		name = args["name"]

		mongo_client = pymongo.MongoClient(config["MONGODB_URL"])
		mongo_db = mongo_client["ThirstyCamper"]
		mongo_users = mongo_db["users"]

		existingUser = mongo_users.find_one({"name": name},{})
		
		if(existingUser == None):
			mongo_users.insert_one({"name": name, "beers": 0, "sodas": 0, "arrivalDate": "", "departureDate": "", "skippedDinners": []})
			return {"message": "User " + name + " was created."}, 201
		else:
			return {"message": "User " + name + " already exists."}, 200
	
	def delete(self):
		parser = reqparse.RequestParser()
		name = ""
		try:
			parser.add_argument("name", type=str, required=True)
			args = parser.parse_args()
			name = args["name"]
		except Exception:
			return {"message": "No user to delete was specified."}, 200

		mongo_client = pymongo.MongoClient(config["MONGODB_URL"])
		mongo_db = mongo_client["ThirstyCamper"]
		mongo_users = mongo_db["users"]

		existingUser = mongo_users.find_one({"name": name},{})
		if(existingUser == None):
			return {"message": "No user with name '" + name + "' was found."}, 200
		else:
			mongo_users.delete_one({"name": name})
			return {"message": "Deleted user with name '" + name + "'."}, 200

	@app.after_request
	def handle_options(response):
		response.headers["Access-Control-Allow-Origin"] = "*"
		response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS"
		response.headers["Access-Control-Allow-Headers"] = "Content-Type, X-Requested-With"

		return response

api.add_resource(Users, '/users')

if __name__ == '__main__':
	app.run(host='0.0.0.0')
