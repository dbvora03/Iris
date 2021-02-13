from flask import Flask, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
import psycopg2

app = Flask(__name__)

conn = psycopg2.connect(
    database='rapid-jackal-697.defaultdb',
    user='shrinjay',
    port=26257,
    host='free-tier.gcp-us-central1.cockroachlabs.cloud'
) #this is the connection to the cockroach DB i think?



@app.route('/', methods=['GET', 'POST'])
def hello_world():
    if request.method == 'POST':
        request.form['']#all the fields needed are from the request.form[]
                        #these fields get passed to the machine learning model
                        #the model will then make a return
        #return....



app.run()