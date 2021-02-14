from flask import Flask, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
import psycopg2
import pandas as pd

df_spending_age = pd.read_csv("./data/spending_age.csv")

census_bus_categories = {
    "Grocery": "Food purchased from stores",
    "Restaurant": "Food purchased from restaurants",
    "Household Help (Cleaning, Lawn Work etc.)": "Household operations",
    "Furniture": "Household furnishings",
    "Household Equipment": "Household equipment",
    "Appliances": "Household appliances",
    "Clothing": "Clothing and accessories",
    "Personal Care": "Personal care",
    "Recreation Equipment": "Recreational equipment and related services",
    "Home Entertainment Equipment": "Home entertainment equipment and services",
    "Recreation Services": "Recreational services",
    "Reading Materials (Bookstore)": "Reading materials and other printed matter",
    "Tobacco and Alcohol": "Tobacco products and alcoholic beverages",
    "Gambling": "Games of chance"
}

age_mapping = {
    "Less than 30 years": list(range(0, 29)),
    "30 to 39 years": list(range(30, 39)),
    "40 to 54 years": list(range(40, 54)),
    "55 to 64 years": list(range(55, 64)),
    "65 years and over": list(range(65, 120))
}

def get_ages(df, category):
    df_age = df[(df['REF_DATE'] == 2019) & (df['Household expenditures, summary-level categories'] == category)
                & ~(df['Age of reference person'] == "All classes")]
    age_data = {}
    for index, row in df_age.iterrows():
        age_data[row['Age of reference person']] = row['VALUE']
    age_target = max(age_data, key=age_data.get)
    return age_mapping[age_target]


print(get_ages(df_spending_age, census_bus_categories['Grocery']))

app = Flask(__name__)

conn = psycopg2.connect(
   "dbname=rapid-jackal-697.defaultdb\
    user=shrinjay\
    port=26257\
    host=free-tier.gcp-us-central1.cockroachlabs.cloud\
    password=sunny03112002"
)




@app.route('/', methods=['GET', 'POST'])
def hello_world():
    if request.method == 'POST':
        request.form['']#all the fields needed are from the request.form[]
                        #these fields get passed to the machine learning model
                        #the model will then make a return
        #return....



app.run()