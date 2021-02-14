from flask import Flask, request, jsonify
from sklearn.cluster import KMeans
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


def get_avg_property_values(df, community_name):
    df_non_residential = df[(df["ASSESSMENT_CLASS"] == "NR") & (df["COMM_NAME"] == community_name)]
    if len(df.index) == 0:
        return False
    mean_value = df_non_residential["NR_ASSESSED_VALUE"].mean()
    return mean_value


def get_comm_data():
    df_census_raw = pd.read_csv("./data/census_all.csv")
    CENSUS_AGE_GROUPS = ['MF_0_4', 'MF_5_14', 'MF_15_19', 'MF_20_24', 'MF_25_34',
                         'MF_35_44', 'MF_45_54', 'MF_55_64', 'MF_65_74', 'MF_75']
    df_census = df_census_raw[['COMM_CODE', 'NAME', ] + CENSUS_AGE_GROUPS]
    df_census['MF_0_29'] = df_census[CENSUS_AGE_GROUPS[0]] + df_census[CENSUS_AGE_GROUPS[1]] + \
                           df_census[CENSUS_AGE_GROUPS[2]] + df_census[CENSUS_AGE_GROUPS[3]] + \
                           0.5 * df_census[CENSUS_AGE_GROUPS[4]]

    df_census['MF_30_39'] = 0.5 * df_census[CENSUS_AGE_GROUPS[4]] + 0.5 * df_census[CENSUS_AGE_GROUPS[5]]
    df_census['MF_40_54'] = 0.5 * df_census[CENSUS_AGE_GROUPS[5]] + df_census[CENSUS_AGE_GROUPS[6]]
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
        average_ages.append(avg_age)

    income_midpoints = {
        'Under $20,000': 10000,
        '$20,000 to $39,999': 30000,
        '$40,000 to $59,999': 50000,
        '$60,000 to $79,999': 70000,
        '$80,000 to $99,999': 90000,
        '$100,000 to $124,999': 112500,
        '$125,000 to $149,999': 137500,
        '$150,000 to $199,999': 175000,
        '$200,000 and over': 200000
    }

    df_income_raw = pd.read_csv("./data/census_income.csv")
    average_incomes_ward = {}
    for index, row in df_income_raw.iterrows():
        row_sum = 0
        for col in income_midpoints.keys():
            row_sum += row[col] * income_midpoints[col]
        average_incomes_ward[row['Ward']] = row_sum / row['Total - Household total income groups in 2015 for private ' \
                                                     'households - 25% sample data']

    num_to_ward =  {
        1: "CAL - WARD - WARD 1  (3.9%)",
        2: "CAL - WARD - WARD 2  (3.4%)",
        3: "CAL - WARD - WARD 3  (3.9%)",
        4: "CAL - WARD - WARD 4  (5.0%)",
        5: "CAL - WARD - WARD 5  (4.6%)",
        6: "CAL - WARD - WARD 6  (4.6%)",
        7: "CAL - WARD - WARD 7  (6.3%)",
        8: "CAL - WARD - WARD 8  (7.0%)",
        9: "CAL - WARD - WARD 9  (7.2%)",
        10: "CAL - WARD - WARD 10  (6.4%)",
        11: "CAL - WARD - WARD 11  (5.2%)",
        12: "CAL - WARD - WARD 12  (3.7%)",
        13: "CAL - WARD - WARD 13  (4.5%)",
        14: "CAL - WARD - WARD 14  (3.2%)"
    }

    comm_ward = {}
    df_wards = pd.read_csv('./data/Communities_by_Ward.csv')
    for index, row in df_wards.iterrows():
        comm_ward[row['NAME']] = row['WARD_NUM']

    average_incomes = []

    for comm in df_census['NAME'].tolist():
        if comm in comm_ward.keys() and num_to_ward[comm_ward[comm]] in average_incomes_ward.keys():
            average_incomes.append(average_incomes_ward[num_to_ward[comm_ward[comm]]])
        else:
            average_incomes.append(None)

    df_clean = pd.DataFrame({'community': df_census['NAME'].tolist(), 'avg_age': average_ages, 'avg_income': average_incomes})
    df_clean = df_clean.dropna()
    return df_clean

def create_clusters(df):
    kmeans = KMeans(n_clusters=20).fit(df[['avg_age', 'avg_income']])
    print(kmeans.labels_)
    labels = {
        df['community'].tolist()[i]: kmeans.labels_[i]
        for i in range(len(kmeans.labels_))
    }
    print(labels)
    print(kmeans.predict(np.array([20, 100000]).reshape(1, -1)))
    return kmeans, labels


cleaned_comm = get_comm_data()
kmeans, community_clusters = create_clusters(cleaned_comm)


app = Flask(__name__)

@app.route('/send_data', methods=['POST']) #first post request for basic data
def send_data():
    if request.method == 'POST':
        business_type = request.get_json()['businessType']#all the fields needed are from the request.form[]
                        #these fields get passed to the machine learning model
                        #the model will then make a return

        age = get_ages(df_spending_age, census_bus_categories[business_type])
        income = get_income(df_spending_income, census_bus_categories[business_type])

        # return....
        return jsonify(
            {
                'age': age,
                'income': income
            }
        )


@app.route('/get_cluster', methods=['POST']) #second post request with resending data
def get_clusters():
    body = request.get_json()
    pred = [int(body['avg_age']), int(body['avg_income'])]
    pred_trans = np.array(pred).reshape(1, -1)
    cluster = kmeans.predict(pred_trans)
    selected_communities = []
    for community, comm_cluster in community_clusters.items():
        if cluster == comm_cluster:
            selected_communities.append(community)
    selected_stats = {
        community: {
            'avg_age': cleaned_comm[(cleaned_comm['community'] == community)]['avg_age'].tolist()[0],
            'avg_income': cleaned_comm[(cleaned_comm['community'] == community)]['avg_income'].tolist()[0]
        }
        for community in selected_communities
    }
    print(selected_stats)
    return jsonify(selected_stats)
    # if request.method == 'POST':

if __name__ == '__main__':
    app.run()
