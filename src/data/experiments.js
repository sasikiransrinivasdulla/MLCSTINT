export const experiments = [
  {
    id: 1,
    title: "Libraries Intro",
    subtitle: "NumPy, Pandas, Matplotlib",
    isNotesOnly: true,
    message: "Refer to your lab notes.",
    description: `An introduction to essential Python libraries for machine learning.
NumPy is for matrix math, Pandas for data manipulation, and Matplotlib for plotting.`
  },
  {
    id: 2,
    title: "Data Preprocessing",
    subtitle: "Imputation & split",
    code: `from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

# Load Dataset
data = load_iris()

X = data.data
y = data.target

print("Original Data:")
print(X[:5])

# Preprocessing (Scaling)
scaler = StandardScaler()
X = scaler.fit_transform(X)

print("\\nPreprocessed Data:")
print(X[:5])

# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.3,
    random_state=1
)

print("\\nTraining Data:",
      len(X_train))

print("Testing Data:",
      len(X_test))`,
    output: `Original Data:
[[5.1 3.5 1.4 0.2]
 [4.9 3.  1.4 0.2]
 [4.7 3.2 1.3 0.2]
 [4.6 3.1 1.5 0.2]
 [5.  3.6 1.4 0.2]]

Preprocessed Data:
[[-0.90068117  1.01900435 -1.34022653 -1.3154443 ]
 [-1.14301691 -0.13197948 -1.34022653 -1.3154443 ]
 [-1.38535265  0.32841405 -1.39706395 -1.3154443 ]
 [-1.50652052  0.09821729 -1.2833891  -1.3154443 ]
 [-1.02184904  1.24920112 -1.34022653 -1.3154443 ]]

Training Data: 105
Testing Data: 45`,
    description: `Cleaning and structuring raw data for models. Involves standardizing features and splitting into train/test sets.

Formula (Z-Score Standardization):
z = (x - μ) / σ`
  },
  {
    id: 3,
    title: "KNN Classification",
    subtitle: "Manual distance + vote",
    code: `import math

data = [
    [1, 2, 0],
    [2, 3, 0],
    [3, 2, 0],

    [6, 5, 1],
    [7, 6, 1],
    [8, 5, 1],

    [11, 10, 2],
    [12, 11, 2],
    [13, 10, 2],

    [7, 5, 1]
]

test_point = [7, 7]

distance_list = []

for i in range(len(data)):
    x = data[i][0]
    y = data[i][1]
    label = data[i][2]

    diff_x = x - test_point[0]
    diff_y = y - test_point[1]

    dist = math.sqrt(diff_x*diff_x + diff_y*diff_y)

    distance_list.append([dist, label])

distance_list.sort()

for k in range(1, 5):
    neighbor_labels = []

    for i in range(k):
        neighbor_labels.append(distance_list[i][1])

    majority_class = max(set(neighbor_labels),
                         key=neighbor_labels.count)

    print("k =", k, "→ class =", majority_class)`,
    output: `k = 1 → class = 1
k = 2 → class = 1
k = 3 → class = 1
k = 4 → class = 1`,
    dynamicCode: `import math

n = int(input("Enter number of data points: "))
data = []
for _ in range(n):
    x = int(input("Enter x: "))
    y = int(input("Enter y: "))
    label = int(input("Enter label: "))
    data.append([x, y, label])

t_x = int(input("Enter test point x: "))
t_y = int(input("Enter test point y: "))
test_point = [t_x, t_y]

distance_list = []

for i in range(len(data)):
    x = data[i][0]
    y = data[i][1]
    label = data[i][2]

    diff_x = x - test_point[0]
    diff_y = y - test_point[1]

    dist = math.sqrt(diff_x*diff_x + diff_y*diff_y)

    distance_list.append([dist, label])

distance_list.sort()

for k in range(1, 5):
    neighbor_labels = []

    for i in range(k):
        neighbor_labels.append(distance_list[i][1])

    majority_class = max(set(neighbor_labels),
                         key=neighbor_labels.count)

    print("k =", k, "→ class =", majority_class)`,
    dynamicOutput: `Enter number of data points: 2
Enter x: 1
Enter y: 2
Enter label: 0
Enter x: 7
Enter y: 6
Enter label: 1
Enter test point x: 7
Enter test point y: 7
k = 1 → class = 1
k = 2 → class = 1
k = 3 → class = 1
k = 4 → class = 1`,
    description: `A non-parametric algorithm that classifies a point based on the majority class of its 'K' nearest neighbors using a distance metric.

Formula (Euclidean Distance):
d(p, q) = √[Σ(p_i - q_i)²]`
  },
  {
    id: 4,
    title: "Decision Tree",
    subtitle: "Simple threshold split",
    code: `import math

data = [
    ['Sunny', 'Hot', 'High', 'No'],
    ['Sunny', 'Hot', 'Normal', 'No'],
    ['Overcast', 'Hot', 'High', 'Yes'],
    ['Rain', 'Mild', 'High', 'Yes'],
    ['Rain', 'Cool', 'Normal', 'Yes'],
    ['Sunny', 'Cool', 'Normal', 'Yes'],
    ['Overcast', 'Mild', 'High', 'Yes']
]

features = ['Outlook', 'Temperature', 'Humidity']

# Entropy
def entropy(data):
    yes = no = 0

    for row in data:
        if row[-1] == 'Yes':
            yes += 1
        else:
            no += 1

    total = yes + no
    ent = 0

    if yes > 0:
        p = yes / total
        ent -= p * math.log2(p)

    if no > 0:
        p = no / total
        ent -= p * math.log2(p)

    return ent

# Information Gain
def info_gain(data, index):
    total_entropy = entropy(data)
    values = []

    for row in data:
        if row[index] not in values:
            values.append(row[index])

    weighted_entropy = 0

    for v in values:
        subset = []

        for row in data:
            if row[index] == v:
                subset.append(row)

        weight = len(subset) / len(data)
        weighted_entropy += weight * entropy(subset)

    return total_entropy - weighted_entropy

# Find Best Feature
best_gain = 0
best_feature = ""

for i in range(len(features)):
    gain = info_gain(data, i)

    print(features[i], "Info Gain =", gain)

    if gain > best_gain:
        best_gain = gain
        best_feature = features[i]

print("\\nBest Feature =", best_feature)`,
    output: `Outlook Info Gain = 0.46956521111470695
Temperature Info Gain = 0.46956521111470695
Humidity Info Gain = 0.0059777114237739015

Best Feature = Outlook`,
    dynamicCode: `import math

n = int(input("Enter number of rows: "))
data = []
for _ in range(n):
    outlook = input("Enter Outlook: ")
    temp = input("Enter Temp: ")
    hum = input("Enter Humidity: ")
    play = input("Enter Play (Yes/No): ")
    data.append([outlook, temp, hum, play])

features = ['Outlook', 'Temperature', 'Humidity']

# Entropy
def entropy(data):
    yes = no = 0

    for row in data:
        if row[-1] == 'Yes':
            yes += 1
        else:
            no += 1

    total = yes + no
    ent = 0

    if yes > 0:
        p = yes / total
        ent -= p * math.log2(p)

    if no > 0:
        p = no / total
        ent -= p * math.log2(p)

    return ent

# Information Gain
def info_gain(data, index):
    total_entropy = entropy(data)
    values = []

    for row in data:
        if row[index] not in values:
            values.append(row[index])

    weighted_entropy = 0

    for v in values:
        subset = []

        for row in data:
            if row[index] == v:
                subset.append(row)

        weight = len(subset) / len(data)
        weighted_entropy += weight * entropy(subset)

    return total_entropy - weighted_entropy

# Find Best Feature
best_gain = 0
best_feature = ""

for i in range(len(features)):
    gain = info_gain(data, i)

    print(features[i], "Info Gain =", gain)

    if gain > best_gain:
        best_gain = gain
        best_feature = features[i]

print("
Best Feature =", best_feature)`,
    dynamicOutput: `Enter number of rows: 2
Enter Outlook: Sunny
Enter Temp: Hot
Enter Humidity: High
Enter Play (Yes/No): No
Enter Outlook: Overcast
Enter Temp: Hot
Enter Humidity: High
Enter Play (Yes/No): Yes
Outlook Info Gain = 1.0
Temperature Info Gain = 0.0
Humidity Info Gain = 0.0

Best Feature = Outlook`,
    description: `A tree-like model that splits data on feature thresholds to maximize information gain.

Formula (Entropy):
H(S) = - Σ [p_i * log2(p_i)]

Formula (Information Gain):
IG(S, A) = H(S) - Σ [ (|S_v| / |S|) * H(S_v) ]`
  },
  {
    id: 5,
    title: "Naive Bayes",
    subtitle: "Manual probability freq",
    code: `data = [
    ['Sunny', 'Hot', 'High', 'No'],
    ['Sunny', 'Hot', 'Normal', 'No'],
    ['Overcast', 'Hot', 'High', 'Yes'],
    ['Rain', 'Mild', 'High', 'Yes'],
    ['Rain', 'Cool', 'Normal', 'Yes'],
    ['Sunny', 'Cool', 'Normal', 'Yes'],
    ['Overcast', 'Mild', 'High', 'Yes']
]

test = ['Sunny', 'Cool', 'Normal']

yes_count = 0
no_count = 0

for row in data:
    if row[-1] == 'Yes':
        yes_count += 1
    else:
        no_count += 1

p_yes = yes_count / len(data)
p_no = no_count / len(data)

yes_prob = p_yes
no_prob = p_no

for i in range(len(test)):
    yes_match = 0
    no_match = 0

    for row in data:
        if row[i] == test[i]:
            if row[-1] == 'Yes':
                yes_match += 1
            else:
                no_match += 1

    yes_prob *= yes_match / yes_count
    no_prob *= no_match / no_count

if yes_prob > no_prob:
    print("Class = Yes")
else:
    print("Class = No")`,
    output: `Class = Yes`,
    dynamicCode: `n = int(input("Enter number of rows: "))
data = []
for _ in range(n):
    outlook = input("Enter Outlook: ")
    temp = input("Enter Temp: ")
    hum = input("Enter Humidity: ")
    play = input("Enter Play (Yes/No): ")
    data.append([outlook, temp, hum, play])

t_out = input("Enter test Outlook: ")
t_temp = input("Enter test Temp: ")
t_hum = input("Enter test Humidity: ")
test = [t_out, t_temp, t_hum]

yes_count = 0
no_count = 0

for row in data:
    if row[-1] == 'Yes':
        yes_count += 1
    else:
        no_count += 1

p_yes = yes_count / len(data)
p_no = no_count / len(data)

yes_prob = p_yes
no_prob = p_no

for i in range(len(test)):
    yes_match = 0
    no_match = 0

    for row in data:
        if row[i] == test[i]:
            if row[-1] == 'Yes':
                yes_match += 1
            else:
                no_match += 1

    if yes_count > 0: yes_prob *= yes_match / yes_count
    if no_count > 0: no_prob *= no_match / no_count

if yes_prob > no_prob:
    print("Class = Yes")
else:
    print("Class = No")`,
    dynamicOutput: `Enter number of rows: 2
Enter Outlook: Sunny
Enter Temp: Hot
Enter Humidity: High
Enter Play (Yes/No): No
Enter Outlook: Overcast
Enter Temp: Hot
Enter Humidity: High
Enter Play (Yes/No): Yes
Enter test Outlook: Sunny
Enter test Temp: Cool
Enter test Humidity: Normal
Class = No`,
    description: `A probabilistic classifier calculating the probability of a class given the input features, assuming strict feature independence.

Formula (Bayes' Theorem):
P(c|x) = [P(x|c) * P(c)] / P(x)

Naive Assumption:
P(x|c) = Π P(x_i|c)`
  },
  {
    id: 6,
    title: "Logistic Regression",
    subtitle: "Simple sigmoid approach",
    code: `import math

data = [
    [1, 2, 0],
    [2, 3, 0],
    [3, 2, 0],
    [4, 3, 0],
    [5, 4, 0],

    [8, 7, 1],
    [9, 8, 1],
    [10, 9, 1],
    [11, 10, 1],
    [12, 11, 1]
]

w1 = 0
w2 = 0
b = 0
lr = 0.01

# Sigmoid Function
def sigmoid(z):
    return 1 / (1 + math.exp(-z))

# Training
for epoch in range(500):

    for row in data:
        x1 = row[0]
        x2 = row[1]
        y = row[2]

        z = w1*x1 + w2*x2 + b
        pred = sigmoid(z)

        error = y - pred

        w1 += lr * error * x1
        w2 += lr * error * x2
        b += lr * error

# Testing
test = [[2,3], [9,8], [6,5]]

for t in test:
    z = w1*t[0] + w2*t[1] + b
    pred = sigmoid(z)

    if pred >= 0.5:
        result = 1
    else:
        result = 0

    print("Data =", t, "Class =", result)`,
    output: `Data = [2, 3] Class = 0
Data = [9, 8] Class = 1
Data = [6, 5] Class = 1`,
    dynamicCode: `import math

n = int(input("Enter number of training rows: "))
data = []
for _ in range(n):
    x1 = int(input("Enter x1: "))
    x2 = int(input("Enter x2: "))
    label = int(input("Enter label: "))
    data.append([x1, x2, label])

w1 = 0
w2 = 0
b = 0
lr = 0.01

# Sigmoid Function
def sigmoid(z):
    return 1 / (1 + math.exp(-z))

# Training
for epoch in range(500):

    for row in data:
        x1 = row[0]
        x2 = row[1]
        y = row[2]

        z = w1*x1 + w2*x2 + b
        pred = sigmoid(z)

        error = y - pred

        w1 += lr * error * x1
        w2 += lr * error * x2
        b += lr * error

# Testing
m = int(input("Enter number of testing rows: "))
test = []
for _ in range(m):
    x1 = int(input("Enter test point x1: "))
    x2 = int(input("Enter test point x2: "))
    test.append([x1, x2])

for t in test:
    z = w1*t[0] + w2*t[1] + b
    pred = sigmoid(z)

    if pred >= 0.5:
        result = 1
    else:
        result = 0

    print("Data =", t, "Class =", result)`,
    dynamicOutput: `Enter number of training rows: 2
Enter x1: 1
Enter x2: 2
Enter label: 0
Enter x1: 8
Enter x2: 7
Enter label: 1
Enter number of testing rows: 1
Enter test point x1: 9
Enter test point x2: 8
Data = [9, 8] Class = 1`,
    description: `A linear model used for binary classification. It uses the sigmoid function to map linear inputs to a probability between 0 and 1.

Formula (Sigmoid):
σ(z) = 1 / (1 + e⁻ᶻ)
where z = w·x + b`
  },
  {
    id: 7,
    title: "SVM",
    subtitle: "Manual line separation",
    code: `data = [
    [1, 2, -1],
    [2, 3, -1],
    [3, 2, -1],
    [4, 3, -1],
    [5, 4, -1],

    [8, 7, 1],
    [9, 8, 1],
    [10, 9, 1],
    [11, 10, 1],
    [12, 11, 1]
]

w1 = 0
w2 = 0
b = 0
lr = 0.01

# Training
for epoch in range(500):

    for row in data:
        x1 = row[0]
        x2 = row[1]
        y = row[2]

        value = y * (w1*x1 + w2*x2 + b)

        if value < 1:
            w1 += lr * y * x1
            w2 += lr * y * x2
            b += lr * y

# Testing
test = [[2,3], [9,8], [6,5]]

for t in test:
    value = w1*t[0] + w2*t[1] + b

    if value >= 0:
        result = 1
    else:
        result = -1

    print("Data =", t, "Class =", result)`,
    output: `Data = [2, 3] Class = -1
Data = [9, 8] Class = 1
Data = [6, 5] Class = -1`,
    dynamicCode: `n = int(input("Enter number of training rows: "))
data = []
for _ in range(n):
    x1 = int(input("Enter x1: "))
    x2 = int(input("Enter x2: "))
    label = int(input("Enter label (-1 or 1): "))
    data.append([x1, x2, label])

w1 = 0
w2 = 0
b = 0
lr = 0.01

# Training
for epoch in range(500):

    for row in data:
        x1 = row[0]
        x2 = row[1]
        y = row[2]

        value = y * (w1*x1 + w2*x2 + b)

        if value < 1:
            w1 += lr * y * x1
            w2 += lr * y * x2
            b += lr * y

# Testing
m = int(input("Enter number of testing rows: "))
test = []
for _ in range(m):
    x1 = int(input("Enter test point x1: "))
    x2 = int(input("Enter test point x2: "))
    test.append([x1, x2])

for t in test:
    value = w1*t[0] + w2*t[1] + b

    if value >= 0:
        result = 1
    else:
        result = -1

    print("Data =", t, "Class =", result)`,
    dynamicOutput: `Enter number of training rows: 2
Enter x1: 1
Enter x2: 2
Enter label (-1 or 1): -1
Enter x1: 8
Enter x2: 7
Enter label (-1 or 1): 1
Enter number of testing rows: 1
Enter test point x1: 2
Enter test point x2: 3
Data = [2, 3] Class = -1`,
    description: `Finds the optimal hyperplane that maximizes the margin between classes using support vectors.

Formula (Hyperplane Margin):
y_i(w·x_i + b) ≥ 1

Objective: Maximize Margin (2 / ||w||)`
  },
  {
    id: 8,
    title: "Neural Network",
    subtitle: "MLPClassifier Model",
    code: `import math

data = [
    [1, 2, 0],
    [2, 3, 0],
    [3, 2, 0],
    [4, 3, 0],
    [5, 4, 0],

    [8, 7, 1],
    [9, 8, 1],
    [10, 9, 1],
    [11, 10, 1],
    [12, 11, 1]
]

# Weights
w1 = 0.5
w2 = 0.5
w3 = 0.5
w4 = 0.5
b1 = 0.5
b2 = 0.5

lr = 0.01

# Sigmoid
def sigmoid(x):
    return 1 / (1 + math.exp(-x))

# Training
for epoch in range(500):

    for row in data:
        x1 = row[0]
        x2 = row[1]
        y = row[2]

        # Hidden layer
        h1 = sigmoid(x1*w1 + x2*w2 + b1)

        # Output layer
        out = sigmoid(h1*w3 + h1*w4 + b2)

        error = y - out

        # Update weights
        w1 += lr * error * x1
        w2 += lr * error * x2
        w3 += lr * error * h1
        w4 += lr * error * h1

# Testing
test = [[2,3], [9,8], [6,5]]

for t in test:

    h1 = sigmoid(t[0]*w1 + t[1]*w2 + b1)
    out = sigmoid(h1*w3 + h1*w4 + b2)

    if out >= 0.5:
        result = 1
    else:
        result = 0

    print("Data =", t, "Class =", result)`,
    output: `Data = [2, 3] Class = 1
Data = [9, 8] Class = 1
Data = [6, 5] Class = 1`,
    dynamicCode: `import math

n = int(input("Enter number of training rows: "))
data = []
for _ in range(n):
    x1 = int(input("Enter x1: "))
    x2 = int(input("Enter x2: "))
    label = int(input("Enter label: "))
    data.append([x1, x2, label])

# Weights
w1 = 0.5
w2 = 0.5
w3 = 0.5
w4 = 0.5
b1 = 0.5
b2 = 0.5

lr = 0.01

# Sigmoid
def sigmoid(x):
    return 1 / (1 + math.exp(-x))

# Training
for epoch in range(500):

    for row in data:
        x1 = row[0]
        x2 = row[1]
        y = row[2]

        # Hidden layer
        h1 = sigmoid(x1*w1 + x2*w2 + b1)

        # Output layer
        out = sigmoid(h1*w3 + h1*w4 + b2)

        error = y - out

        # Update weights
        w1 += lr * error * x1
        w2 += lr * error * x2
        w3 += lr * error * h1
        w4 += lr * error * h1

# Testing
m = int(input("Enter number of testing rows: "))
test = []
for _ in range(m):
    x1 = int(input("Enter test point x1: "))
    x2 = int(input("Enter test point x2: "))
    test.append([x1, x2])

for t in test:

    h1 = sigmoid(t[0]*w1 + t[1]*w2 + b1)
    out = sigmoid(h1*w3 + h1*w4 + b2)

    if out >= 0.5:
        result = 1
    else:
        result = 0

    print("Data =", t, "Class =", result)`,
    dynamicOutput: `Enter number of training rows: 2
Enter x1: 1
Enter x2: 2
Enter label: 0
Enter x1: 8
Enter x2: 7
Enter label: 1
Enter number of testing rows: 1
Enter test point x1: 2
Enter test point x2: 3
Data = [2, 3] Class = 0`,
    description: `Interconnected nodes that use activation functions to learn complex, non-linear relationships via backpropagation.

Formula (Hidden Layer Output):
h = σ(Σ w_i·x_i + b)

Formula (Weight Update Rule):
w_new = w_old + α * error * x`
  },
  {
    id: 9,
    title: "Random Forest",
    subtitle: "Manual voting logic",
    code: `data = [
    [1, 2, 0],
    [2, 3, 0],
    [3, 2, 0],
    [4, 3, 0],
    [5, 4, 0],

    [8, 7, 1],
    [9, 8, 1],
    [10, 9, 1],
    [11, 10, 1],
    [12, 11, 1]
]

# Simple Trees (Decision Stumps)
def tree1(x):
    if x[0] <= 5:
        return 0
    return 1

def tree2(x):
    if x[1] <= 5:
        return 0
    return 1

def tree3(x):
    if x[0] + x[1] <= 10:
        return 0
    return 1

trees = [tree1, tree2, tree3]

# Testing
test = [[2,3], [9,8], [6,5]]

for t in test:
    votes = []

    for tree in trees:
        votes.append(tree(t))

    result = max(set(votes), key=votes.count)

    print("Data =", t, "Class =", result)`,
    output: `Data = [2, 3] Class = 0
Data = [9, 8] Class = 1
Data = [6, 5] Class = 1`,
    dynamicCode: `n = int(input("Enter number of testing rows: "))
test = []
for _ in range(n):
    x1 = int(input("Enter test point x1: "))
    x2 = int(input("Enter test point x2: "))
    test.append([x1, x2])

# Simple Trees (Decision Stumps)
def tree1(x):
    if x[0] <= 5:
        return 0
    return 1

def tree2(x):
    if x[1] <= 5:
        return 0
    return 1

def tree3(x):
    if x[0] + x[1] <= 10:
        return 0
    return 1

trees = [tree1, tree2, tree3]

for t in test:
    votes = []

    for tree in trees:
        votes.append(tree(t))

    result = max(set(votes), key=votes.count)

    print("Data =", t, "Class =", result)`,
    dynamicOutput: `Enter number of testing rows: 2
Enter test point x1: 2
Enter test point x2: 3
Enter test point x1: 9
Enter test point x2: 8
Data = [2, 3] Class = 0
Data = [9, 8] Class = 1`,
    description: `An ensemble method combining multiple decision trees (or stumps). Uses majority voting to prevent overfitting.

Formula (Majority Vote):
Result = Mode(tree_1(x), tree_2(x), ..., tree_n(x))`
  },
  {
    id: 10,
    title: "AdaBoost",
    subtitle: "Manual boosting calculation",
    code: `import math

data = [
    [1, 2, -1],
    [2, 3, -1],
    [3, 2, -1],
    [4, 3, -1],
    [5, 4, -1],

    [8, 7, 1],
    [9, 8, 1],
    [10, 9, 1],
    [11, 10, 1],
    [12, 11, 1]
]

# Weak Learners
def stump1(x):
    return -1 if x[0] <= 5 else 1

def stump2(x):
    return -1 if x[1] <= 5 else 1

def stump3(x):
    return -1 if x[0] + x[1] <= 10 else 1

learners = [stump1, stump2, stump3]
alphas = []

# Find Alpha for each learner
for stump in learners:
    error = 0

    for row in data:
        pred = stump(row)

        if pred != row[2]:
            error += 1

    error = error / len(data)

    if error == 0:
        alpha = 1
    else:
        alpha = 0.5 * math.log((1-error)/error)

    alphas.append(alpha)

# Testing
test = [[2,3], [9,8], [6,5]]

for t in test:
    total = 0

    for i in range(len(learners)):
        total += alphas[i] * learners[i](t)

    if total >= 0:
        result = 1
    else:
        result = -1

    print("Data =", t, "Class =", result)`,
    output: `Data = [2, 3] Class = -1
Data = [9, 8] Class = 1
Data = [6, 5] Class = 1`,
    dynamicCode: `import math

n = int(input("Enter number of training rows: "))
data = []
for _ in range(n):
    x1 = int(input("Enter x1: "))
    x2 = int(input("Enter x2: "))
    label = int(input("Enter label (-1 or 1): "))
    data.append([x1, x2, label])

# Weak Learners
def stump1(x):
    return -1 if x[0] <= 5 else 1

def stump2(x):
    return -1 if x[1] <= 5 else 1

def stump3(x):
    return -1 if x[0] + x[1] <= 10 else 1

learners = [stump1, stump2, stump3]
alphas = []

# Find Alpha for each learner
for stump in learners:
    error = 0

    for row in data:
        pred = stump(row)

        if pred != row[2]:
            error += 1

    error = error / len(data)

    if error == 0:
        alpha = 1
    else:
        alpha = 0.5 * math.log((1-error)/error)

    alphas.append(alpha)

# Testing
m = int(input("Enter number of testing rows: "))
test = []
for _ in range(m):
    x1 = int(input("Enter test point x1: "))
    x2 = int(input("Enter test point x2: "))
    test.append([x1, x2])

for t in test:
    total = 0

    for i in range(len(learners)):
        total += alphas[i] * learners[i](t)

    if total >= 0:
        result = 1
    else:
        result = -1

    print("Data =", t, "Class =", result)`,
    dynamicOutput: `Enter number of training rows: 2
Enter x1: 1
Enter x2: 2
Enter label (-1 or 1): -1
Enter x1: 8
Enter x2: 7
Enter label (-1 or 1): 1
Enter number of testing rows: 1
Enter test point x1: 2
Enter test point x2: 3
Data = [2, 3] Class = -1`,
    description: `An ensemble technique combining sequential weak learners. Each learner focuses heavily on the errors made by previous ones.

Formula (Learner Weight α):
α = 0.5 * ln((1 - error) / error)

Final Output:
sign(Σ α_i * learner_i(x))`
  },
  {
    id: 11,
    title: "Bayesian Network",
    subtitle: "pgmpy Probabilistic inference",
    code: `from pgmpy.models import DiscreteBayesianNetwork
from pgmpy.factors.discrete import TabularCPD
from pgmpy.inference import VariableElimination

# Model Structure
model = DiscreteBayesianNetwork([
    ('Rain', 'Traffic'),
    ('Traffic', 'Late')
])

# CPDs
cpd_rain = TabularCPD(
    'Rain', 2,
    [[0.7], [0.3]]
)

cpd_traffic = TabularCPD(
    'Traffic', 2,
    [[0.8, 0.2],
     [0.2, 0.8]],
    evidence=['Rain'],
    evidence_card=[2]
)

cpd_late = TabularCPD(
    'Late', 2,
    [[0.9, 0.3],
     [0.1, 0.7]],
    evidence=['Traffic'],
    evidence_card=[2]
)

# Add CPDs
model.add_cpds(
    cpd_rain,
    cpd_traffic,
    cpd_late
)

print("Model Valid:",
      model.check_model())

# Inference
infer = VariableElimination(model)

print("\\nP(Traffic)")
print(infer.query(
    variables=['Traffic']
))

print("\\nP(Late | Rain=1)")
print(infer.query(
    variables=['Late'],
    evidence={'Rain':1}
))`,
    output: `Model Valid: True

P(Traffic)
+------------+----------------+
| Traffic    |   phi(Traffic) |
+============+================+
| Traffic(0) |         0.6200 |
+------------+----------------+
| Traffic(1) |         0.3800 |
+------------+----------------+

P(Late | Rain=1)
+---------+-------------+
| Late    |   phi(Late) |
+=========+=============+
| Late(0) |      0.4200 |
+---------+-------------+
| Late(1) |      0.5800 |
+---------+-------------+`,
    dynamicCode: `from pgmpy.models import DiscreteBayesianNetwork
from pgmpy.factors.discrete import TabularCPD
from pgmpy.inference import VariableElimination

print("Define Probabilities for Rain")
r0 = float(input("P(Rain=0): "))
r1 = float(input("P(Rain=1): "))

print("Define Probabilities for Traffic given Rain")
t0_r0 = float(input("P(Traffic=0 | Rain=0): "))
t1_r0 = float(input("P(Traffic=1 | Rain=0): "))
t0_r1 = float(input("P(Traffic=0 | Rain=1): "))
t1_r1 = float(input("P(Traffic=1 | Rain=1): "))

# Model Structure
model = DiscreteBayesianNetwork([
    ('Rain', 'Traffic')
])

# CPDs
cpd_rain = TabularCPD(
    'Rain', 2,
    [[r0], [r1]]
)

cpd_traffic = TabularCPD(
    'Traffic', 2,
    [[t0_r0, t0_r1],
     [t1_r0, t1_r1]],
    evidence=['Rain'],
    evidence_card=[2]
)

# Add CPDs
model.add_cpds(
    cpd_rain,
    cpd_traffic
)

print("Model Valid:", model.check_model())

# Inference
infer = VariableElimination(model)

print("
P(Traffic)")
print(infer.query(
    variables=['Traffic']
))`,
    dynamicOutput: `Define Probabilities for Rain
P(Rain=0): 0.7
P(Rain=1): 0.3
Define Probabilities for Traffic given Rain
P(Traffic=0 | Rain=0): 0.8
P(Traffic=1 | Rain=0): 0.2
P(Traffic=0 | Rain=1): 0.2
P(Traffic=1 | Rain=1): 0.8
Model Valid: True

P(Traffic)
+------------+----------------+
| Traffic    |   phi(Traffic) |
+============+================+
| Traffic(0) |         0.6200 |
+------------+----------------+
| Traffic(1) |         0.3800 |
+------------+----------------+`,
    description: `A graphical model representing probabilistic relationships via a DAG. Uses conditional probability tables for inference.

Formula (Joint Probability Factorization):
P(X₁, ..., X_n) = Π P(X_i | Parents(X_i))`
  },
  {
    id: 12,
    title: "HMM",
    subtitle: "Hidden Markov Model",
    code: `import numpy as np
from hmmlearn import hmm

# Data
d0 = [
    [[1],[2],[2],[1]],
    [[2],[1],[2],[2]],
    [[1],[1],[2],[1]]
]

d1 = [
    [[7],[8],[7],[8]],
    [[8],[7],[8],[7]],
    [[7],[7],[8],[8]]
]

# Train HMM
def train(data):
    model = hmm.GaussianHMM(
        n_components=2,
        n_iter=50
    )

    X = np.vstack(data)
    lengths = [len(i) for i in data]

    model.fit(X, lengths)
    return model

m0 = train(d0)
m1 = train(d1)

# Testing
test = [
    [[2],[1],[2],[1]],
    [[8],[7],[8],[8]],
    [[5],[6],[5],[6]]
]

for t in test:

    s0 = m0.score(t)
    s1 = m1.score(t)

    if s0 > s1:
        result = 0
    else:
        result = 1

    print("Sequence =", t,
          "Class =", result)`,
    output: `Sequence = [[2], [1], [2], [1]] Class = 0
Sequence = [[8], [7], [8], [8]] Class = 1
Sequence = [[5], [6], [5], [6]] Class = 1`,
    dynamicCode: `import numpy as np
from hmmlearn import hmm

n = int(input("Enter number of sequences for Class 0: "))
d0 = []
for i in range(n):
    print("Sequence", i+1, "(4 numbers):")
    s1 = int(input("Num 1: "))
    s2 = int(input("Num 2: "))
    s3 = int(input("Num 3: "))
    s4 = int(input("Num 4: "))
    d0.append([[s1], [s2], [s3], [s4]])

m = int(input("Enter number of sequences for Class 1: "))
d1 = []
for i in range(m):
    print("Sequence", i+1, "(4 numbers):")
    s1 = int(input("Num 1: "))
    s2 = int(input("Num 2: "))
    s3 = int(input("Num 3: "))
    s4 = int(input("Num 4: "))
    d1.append([[s1], [s2], [s3], [s4]])

# Train HMM
def train(data):
    model = hmm.GaussianHMM(
        n_components=2,
        n_iter=50
    )

    X = np.vstack(data)
    lengths = [len(i) for i in data]

    model.fit(X, lengths)
    return model

m0 = train(d0)
m1 = train(d1)

# Testing
t_n = int(input("Enter number of testing sequences: "))
test = []
for i in range(t_n):
    print("Test Sequence", i+1, "(4 numbers):")
    s1 = int(input("Num 1: "))
    s2 = int(input("Num 2: "))
    s3 = int(input("Num 3: "))
    s4 = int(input("Num 4: "))
    test.append([[s1], [s2], [s3], [s4]])

for t in test:
    s0 = m0.score(t)
    s1 = m1.score(t)

    if s0 > s1:
        result = 0
    else:
        result = 1

    print("Sequence =", t, "Class =", result)`,
    dynamicOutput: `Enter number of sequences for Class 0: 1
Sequence 1 (4 numbers):
Num 1: 1
Num 2: 2
Num 3: 2
Num 4: 1
Enter number of sequences for Class 1: 1
Sequence 1 (4 numbers):
Num 1: 7
Num 2: 8
Num 3: 7
Num 4: 8
Enter number of testing sequences: 1
Test Sequence 1 (4 numbers):
Num 1: 2
Num 2: 1
Num 3: 2
Num 4: 1
Sequence = [[2], [1], [2], [1]] Class = 0`,
    description: `Models sequential data transitioning between unobservable hidden states. Each hidden state emits observable outputs.

Formula (Joint Sequence Probability):
P(X, Z) = P(Z₁) * P(X₁|Z₁) * Π [P(Z_t|Z_{t-1}) * P(X_t|Z_t)]`
  }
];
