import csv
import pwd
import json
import requests
import codecs
import collections

import crypt

from flask import Flask, url_for
from flask import json, request
from flask_cors import CORS, cross_origin
app = Flask(__name__)
CORS(app)

@app.route('/test', methods=["POST"])
def synclick():
    posted = request.get_data()
    request_json = request.json
    word = request_json['data']
    print(word)
    syns = get_synonyms(word)
    print(syns)
    return json.dumps(syns)

def get_synonyms(word):
    r = requests.get("http://words.bighugelabs.com/api/2/f2c786918d5b0a290582a98495f63a6d/" + word + "/json")
    return r.json()

if __name__ == '__main__':
    app.run()
