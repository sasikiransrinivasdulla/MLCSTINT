export const experiments = [
  {
    id: 1,
    title: "Libraries Intro",
    subtitle: "NumPy, Pandas, Matplotlib",
    isNotesOnly: true,
    message: "Refer to your lab notes."
  },
  {
    id: 2,
    title: "Data Preprocessing",
    subtitle: "Imputation & split",
    code: `import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.DataFrame({
    "A": [1, 2, 3, 4, 5],
    "B": [10, None, 30, 40, 50],
    "C": [0, 1, 1, 0, 1]
})

df["B"] = df["B"].fillna(df["B"].mean())

X = df[["A", "B"]]
y = df["C"]

Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2)
print(len(Xtr), len(Xte))`,
    output: `4 1`
  },
  {
    id: 3,
    title: "KNN Classification",
    subtitle: "KNeighborsClassifier from sklearn",
    code: `from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score

data = [[1, 2], [2, 3], [3, 3], [6, 5], [7, 8], [8, 8]]
labels = [0, 0, 0, 1, 1, 1]

test_data = [[2, 2], [7, 7]]
test_labels = [0, 1]

for k in range(1, 4):
    model = KNeighborsClassifier(n_neighbors=k)
    
    model.fit(data, labels)
    preds = model.predict(test_data)
    
    acc = accuracy_score(test_labels, preds)
    
    print(f"K={k} → Accuracy: {acc * 100:.1f}%")`,
    output: `K=1 → Accuracy: 100.0%
K=2 → Accuracy: 100.0%
K=3 → Accuracy: 100.0%`
  },
  {
    id: 4,
    title: "Decision Tree",
    subtitle: "Simple threshold split",
    code: `x = [[2, 1], [3, 2], [10, 8], [12, 10]]
y = [0, 0, 1, 1]
test_pts = [[2, 1], [12, 10]]

thresh = 5
results = []

# Step 1: Process each test point
for i in range(len(test_pts)):
    pt = test_pts[i]
    val = pt[0]
    
    is_greater = False
    
    # Step 2: Apply threshold condition
    if val > thresh:
        is_greater = True
    else:
        is_greater = False
        
    # Step 3: Assign class based on condition
    if is_greater == True:
        pred = 1
    else:
        pred = 0
        
    # Store intermediate result
    results.append([pt, pred])

# Step 4: Final output printing
for r in results:
    pt = r[0]
    pred_class = r[1]
    print(f"[{pt[0]},{pt[1]}] → {pred_class}")`,
    output: `[2,1] → 0
[12,10] → 1`
  },
  {
    id: 5,
    title: "Naive Bayes",
    subtitle: "Manual probability freq",
    code: `x = [("sunny","hot"),("sunny","cool"),("rainy","cool")]
y = ["no","no","yes"]
t = ("sunny","cool")

sy_n = c_n = n = 0
sy_y = c_y = y_count = 0

for i in range(3):
    if y[i] == "no":
        n += 1
        if x[i][0] == t[0]: sy_n += 1
        if x[i][1] == t[1]: c_n += 1
    else:
        y_count += 1
        if x[i][0] == t[0]: sy_y += 1
        if x[i][1] == t[1]: c_y += 1

prob_n = (n/3) * (sy_n/n) * (c_n/n)
prob_y = (y_count/3) * (sy_y/max(1,y_count)) * (c_y/max(1,y_count))

if prob_y > prob_n:
    print("class = yes")
else:
    print("class = no")`,
    output: `class = no`
  },
  {
    id: 6,
    title: "Logistic Regression",
    subtitle: "Simple sigmoid approach",
    code: `import math

x = [1, 2, 3, 4]
y = [0, 0, 1, 1]
test_vals = [3, 2]

w = 1.0
b = -2.5
thresh = 0.5

z_vals = []
probs = []
preds = []

# Step 1: Calculate z values
for i in range(len(test_vals)):
    val = test_vals[i]
    z = (w * val) + b
    z_vals.append(z)

# Step 2: Apply sigmoid function
for i in range(len(z_vals)):
    z = z_vals[i]
    p = 1 / (1 + math.exp(-z))
    probs.append(p)

# Step 3: Apply threshold to get class
for i in range(len(probs)):
    p = probs[i]
    if p > thresh:
        preds.append(1)
    else:
        preds.append(0)

# Step 4: Print final output
for i in range(len(test_vals)):
    val = test_vals[i]
    c = preds[i]
    print(f"{val} → {c}")`,
    output: `3 → 1
2 → 0`
  },
  {
    id: 7,
    title: "SVM",
    subtitle: "Manual line separation",
    code: `x = [[1,1],[2,2],[6,6],[7,7]]
y = [0, 0, 1, 1]
t = 10

s = []
p = []

for i in range(len(x)):
    pt = x[i]
    sum_val = pt[0] + pt[1]
    s.append(sum_val)

for i in range(len(s)):
    val = s[i]
    
    if val > t:
        c = 1
    else:
        c = 0
        
    p.append(c)

for i in range(len(x)):
    pt = x[i]
    print(f"[{pt[0]},{pt[1]}] → {p[i]}")`,
    output: `[1,1] → 0
[2,2] → 0
[6,6] → 1
[7,7] → 1`
  },
  {
    id: 8,
    title: "Neural Network",
    subtitle: "MLPClassifier Model",
    code: `from sklearn.neural_network import MLPClassifier

data = [[0, 0], [1, 1], [0, 1], [1, 0]]
labels = [0, 0, 1, 1]
test_data = [[0, 0], [0, 1]]

model = MLPClassifier(hidden_layer_sizes=(4,), max_iter=2000)

model.fit(data, labels)

preds = []

for i in range(len(test_data)):
    test_pt = [test_data[i]]
    pred_val = model.predict(test_pt)
    preds.append(pred_val[0])

for i in range(len(test_data)):
    val = test_data[i]
    ans = preds[i]
    print(f"data={val} → {ans}")`,
    output: `data=[0, 0] → 0
data=[0, 1] → 1`
  },
  {
    id: 9,
    title: "Random Forest",
    subtitle: "RandomForestClassifier Model",
    code: `from sklearn.ensemble import RandomForestClassifier

data = [[1, 2], [2, 3], [6, 7], [7, 8]]
labels = [0, 0, 1, 1]
test_data = [[2, 2], [6, 8]]

model = RandomForestClassifier(n_estimators=10, random_state=42)

model.fit(data, labels)

preds = []

for i in range(len(test_data)):
    test_pt = [test_data[i]]
    pred_val = model.predict(test_pt)
    preds.append(pred_val[0])

for i in range(len(test_data)):
    val = test_data[i]
    ans = preds[i]
    print(f"data={val} → {ans}")`,
    output: `data=[2, 2] → 0
data=[6, 8] → 1`
  },
  {
    id: 10,
    title: "AdaBoost",
    subtitle: "Manual boosting concept",
    code: `data = [1, 2, 3, 6, 7]
labels = [0, 0, 0, 1, 1]

pred_w1 = []
pred_w2 = []
final_preds = []

for i in range(len(data)):
    if data[i] > 4:
        pred_w1.append(1)
    else:
        pred_w1.append(0)

for i in range(len(data)):
    if data[i] > 5:
        pred_w2.append(1)
    else:
        pred_w2.append(0)

for i in range(len(data)):
    total = pred_w1[i] + pred_w2[i]
    if total >= 1:
        final_preds.append(1)
    else:
        final_preds.append(0)

for i in range(len(data)):
    val = data[i]
    ans = final_preds[i]
    print(f"data={val} → {ans}")`,
    output: `data=1 → 0
data=2 → 0
data=3 → 0
data=6 → 1
data=7 → 1`
  },
  {
    id: 11,
    title: "Bayesian Network",
    subtitle: "Probabilistic inference",
    code: `from pgmpy.models import BayesianModel
from pgmpy.factors.discrete import TabularCPD
from pgmpy.inference import VariableElimination

model = BayesianModel([('Rain', 'Traffic')])

cpd_rain = TabularCPD('Rain', 2, [[0.8], [0.2]])

cpd_traf = TabularCPD('Traffic', 2,
                      [[0.9, 0.4],
                       [0.1, 0.6]],
                      evidence=['Rain'], evidence_card=[2])

model.add_cpds(cpd_rain, cpd_traf)

infer = VariableElimination(model)

res = infer.map_query(variables=['Traffic'], evidence={'Rain': 1})

out_val = res['Traffic']

if out_val == 1:
    print("Rain=1 → Traffic=High")
else:
    print("Rain=1 → Traffic=Low")`,
    output: `Rain=1 → Traffic=High`
  }
];
