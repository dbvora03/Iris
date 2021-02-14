from flask import Flask, redirect, url_for, request
from sklearn.cluster import KMeans
import psycopg2
import pandas as pd
import numpy as np

df_spending_age = pd.read_csv("./data/spending_age.csv")
df_spending_income = pd.read_csv("./data/spending_income.csv")
df_spending_property = pd.read_csv("./data/property_values.csv")
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
    "Less than 30 years": "0 to 30",
    "30 to 39 years": "30 to 39",
    "40 to 54 years": "40 to 54",
    "55 to 64 years": "55 to 64",
    "65 years and over": "65+"
}

income_mapping = {
    "Lowest quintile": "25800 or less",
    "Second quintile": "25801 to 45900",
    "Third quintile": "45901 to 70500",
    "Fourth quintile": "70501 to 108800",
    "Highest quintile": "108800+"
}

def get_ages(df, category):
    df_age = df[(df['REF_DATE'] == 2019) & (df['Household expenditures, summary-level categories'] == category)
                & ~(df['Age of reference person'] == "All classes")]
    age_data = {}
    for index, row in df_age.iterrows():
        age_data[row['Age of reference person']] = row['VALUE']
    age_target = max(age_data, key=age_data.get)
    return age_mapping[age_target]

def get_income(df, category):
    df_income = df[(df['REF_DATE'] == 2019) & (df['Household expenditures, summary-level categories'] == category)]
    income_data = {}
    for index, row in df_income.iterrows():
        income_data[row['Before-tax household income quintile']] = row['VALUE']
    income_target = max(income_data, key=income_data.get)
    return income_mapping[income_target]

print(get_ages(df_spending_age, census_bus_categories['Grocery']))
print(get_income(df_spending_income, census_bus_categories['Grocery']))

def get_comm_data():
    df_census_raw = pd.read_csv("./data/census_all.csv")
    CENSUS_AGE_GROUPS = ['MF_0_4', 'MF_5_14', 'MF_15_19', 'MF_20_24', 'MF_25_34',
                           'MF_35_44', 'MF_45_54', 'MF_55_64', 'MF_65_74', 'MF_75']
    df_census = df_census_raw[['COMM_CODE', 'NAME', ] + CENSUS_AGE_GROUPS]
    df_census['MF_0_29'] = df_census[CENSUS_AGE_GROUPS[0]] + df_census[CENSUS_AGE_GROUPS[1]] + \
                           df_census[CENSUS_AGE_GROUPS[2]] + df_census[CENSUS_AGE_GROUPS[3]] + \
                           0.5*df_census[CENSUS_AGE_GROUPS[4]]

    df_census['MF_30_39'] = 0.5*df_census[CENSUS_AGE_GROUPS[4]] + 0.5*df_census[CENSUS_AGE_GROUPS[5]]
    df_census['MF_40_54'] = 0.5*df_census[CENSUS_AGE_GROUPS[5]] + df_census[CENSUS_AGE_GROUPS[6]]
    df_census['MF_55_64'] = df_census[CENSUS_AGE_GROUPS[7]]
    df_census['MF_65'] = df_census[CENSUS_AGE_GROUPS[8]] + df_census[CENSUS_AGE_GROUPS[9]]
    average_ages = []
    for index, row in df_census.iterrows():
        age_dict = {
            '0_29': row['MF_0_29'],
            '30_39': row['MF_30_39'],
            '40_54': row['MF_40_54'],
            '55_64': row['MF_55_64'],
            '65': row['MF_65']
        }
        peak_age = max(age_dict, key=age_dict.get)
        age_string = peak_age.split('_')
        avg_age = (int(age_string[0]) + int(age_string[1]) if len(age_string) == 2 else 0) / len(age_string)
        print(avg_age)
        average_ages.append(avg_age)


    df_clean = pd.DataFrame({'community': df_census['NAME'].tolist(), 'avg_age': average_ages})
    print(df_clean.head())

get_comm_data()

# df = pd.DataFrame({'name': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
#                     'avg_rent': [500, 700, 800, 900, 1500, 2400, 345],
#                    'avg_income': [423423, 43252345, 4321432, 53454, 1423413, 42345435, 423423]})
#
# kmeans = KMeans(n_clusters=2).fit(df[['avg_rent', 'avg_income']])
# centoids = kmeans.cluster_centers_
# print(centoids)
# print(kmeans.predict(np.array([54353453, 23432]).reshape(1, -1)))
# print(kmeans.labels_)
# labels = {
#     df['name'][i]: kmeans.labels_[i]
#     for i in range(len(kmeans.labels_))
# }
# print(labels)

#
#
#
# app = Flask(__name__)
#
# conn = psycopg2.connect(
#    "dbname=rapid-jackal-697.defaultdb\
#     user=shrinjay\
#     port=26257\
#     host=free-tier.gcp-us-central1.cockroachlabs.cloud\
#     password=sunny03112002"
# )
#
# def get_avg_property_values(df, community_name):
#     df_non_residential = df[df("ASSESSMENT_CLASS") == "Non-residential" & df("COMM_NAME") == community_name]
#     mean_value = df_non_residential["ASSESSED_VALUE"].mean()
#     return mean_value
#
#
#
# @app.route('/send_data', methods=['POST']) #first post request for basic data
# def send_data():
#     if request.method == 'POST':
#         business_type = request.form['businessType']#all the fields needed are from the request.form[]
#                         #these fields get passed to the machine learning model
#                         #the model will then make a return
#
#         age = get_ages(df_spending_age, census_bus_categories[business_type])
#         income = get_income(df_spending_income, age_mapping[business_type])
#
#         # return....
#         return Flask.jsonify(
#             age=age,
#             income=income
#         )
#
#
# #
# # @app.route('/send_data_2', methods=['POST']) #second post request with resending data
# # def send_data():
# #     return
# #     # if request.method == 'POST':
#
# if __name__ == '__main__':
#     app.run()
