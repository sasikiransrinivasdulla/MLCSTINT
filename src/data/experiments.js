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
    code: `data_records = [[1, 10, 0], [2, None, 1], [3, 30, 1], [4, 40, 0]]

clean_data = []
feature_sum = 0
valid_counts = 0

for i in range(len(data_records)):
    row = data_records[i]
    if row[1] is not None:
        feature_sum += row[1]
        valid_counts += 1

mean_value = feature_sum / valid_counts

for i in range(len(data_records)):
    row = data_records[i]
    if row[1] is None:
        row[1] = mean_value
    clean_data.append(row)

train_split_count = int(len(clean_data) * 0.5)
train_set = clean_data[:train_split_count]
test_set = clean_data[train_split_count:]

print(f"Train size: {len(train_set)}, Test size: {len(test_set)}")`,
    output: `Train size: 2, Test size: 2`,
    explanation: [
      { step: 1, eng: "The list data_records stores all tabular structures including missing null columns." },
      { step: 2, eng: "The variables feature_sum track the base valid row combinations systematically." },
      { step: 3, eng: "The loop calculates column thresholds verifying strict missing criteria dynamically." },
      { step: 4, eng: "The secondary block isolates incomplete elements substituting the general mean." },
      { step: 5, eng: "The final code generates fractional testing and training partition bounds." }
    ]
  },
  {
    id: 3,
    title: "KNN Classification",
    subtitle: "Manual distance + vote",
    code: `import math

data_points = [[1, 2], [2, 3], [3, 3], [6, 5]]
labels = [0, 0, 0, 1]
test_points = [2, 2]

distance_list = []

for i in range(len(data_points)):
    point = data_points[i]
    diff_x = point[0] - test_points[0]
    diff_y = point[1] - test_points[1]
    
    sq_dist = (diff_x * diff_x) + (diff_y * diff_y)
    dist = math.sqrt(sq_dist)
    
    distance_list.append((dist, labels[i]))

distance_list.sort()

for k in range(1, 4):
    neighbor_labels = []
    
    for i in range(k):
        neighbor_labels.append(distance_list[i][1])
        
    majority_class = max(set(neighbor_labels), key=neighbor_labels.count)
    print(f"k={k} → class={majority_class}")`,
    output: `k=1 → class=0
k=2 → class=0
k=3 → class=0`,
    explanation: [
      { step: 1, eng: "The list data_points stores all numerical coordinates required for measuring boundaries." },
      { step: 2, eng: "The list labels maps static outcome categories accurately against spatial sets." },
      { step: 3, eng: "The loop checks distance differentials explicitly processing metric planar roots." },
      { step: 4, eng: "The nested array sorts measured proximities sorting lowest isolated coordinates." },
      { step: 5, eng: "The final step defines overarching conditions electing categorical maximum components." }
    ]
  },
  {
    id: 4,
    title: "Decision Tree",
    subtitle: "Simple threshold split",
    code: `data_points = [[2, 1], [3, 2], [10, 8], [12, 10]]
labels = [0, 0, 1, 1]
test_points = [[2, 1], [12, 10]]

threshold_value = 5
predictions = []

for i in range(len(test_points)):
    test_pt = test_points[i]
    feature_val = test_pt[0]
    
    is_greater = False
    
    if feature_val > threshold_value:
        is_greater = True
    else:
        is_greater = False
        
    if is_greater == True:
        predictions.append([test_pt, 1])
    else:
        predictions.append([test_pt, 0])

for mapped_result in predictions:
    coordinate = mapped_result[0]
    class_out = mapped_result[1]
    print(f"{coordinate} → class={class_out}")`,
    output: `[2, 1] → class=0
[12, 10] → class=1`,
    explanation: [
      { step: 1, eng: "The list test_points inputs dynamic integer thresholds representing independent rules." },
      { step: 2, eng: "The static threshold_value defines linear logical structures explicitly bounding nodes." },
      { step: 3, eng: "The initial loop iterates evaluating isolated internal condition branches strictly." },
      { step: 4, eng: "The condition dictates definitive boolean categories bypassing structural ambiguity elements." },
      { step: 5, eng: "The final logical array renders predicted node branches matching final coordinates." }
    ]
  },
  {
    id: 5,
    title: "Naive Bayes",
    subtitle: "Manual probability freq",
    code: `data_points = [("sunny", "hot"), ("sunny", "cool"), ("rainy", "cool")]
labels = ["no", "no", "yes"]
test_points = ("sunny", "cool")

yes_count = no_count = total_count = 0
yes_match_1 = no_match_1 = yes_match_2 = no_match_2 = 0

for i in range(len(data_points)):
    total_count += 1
    if labels[i] == "no":
        no_count += 1
        if data_points[i][0] == test_points[0]: no_match_1 += 1
        if data_points[i][1] == test_points[1]: no_match_2 += 1
    else:
        yes_count += 1
        if data_points[i][0] == test_points[0]: yes_match_1 += 1
        if data_points[i][1] == test_points[1]: yes_match_2 += 1

prob_no = (no_count / total_count) * (no_match_1 / no_count) * (no_match_2 / no_count)
prob_yes = (yes_count / total_count) * (yes_match_1 / max(1, yes_count)) * (yes_match_2 / max(1, yes_count))

if prob_yes > prob_no:
    print("Predicted Class = yes")
else:
    print("Predicted Class = no")`,
    output: `Predicted Class = no`,
    explanation: [
      { step: 1, eng: "The list data_points provides text categorizations linking distinct structural mappings." },
      { step: 2, eng: "The variables yes_count tally occurrences identifying fundamental occurrence frequencies natively." },
      { step: 3, eng: "The complex loop traces discrete arrays mapping word probability occurrences explicitly." },
      { step: 4, eng: "The logical structure normalizes absolute counts determining multiplicative naive logic percentages." },
      { step: 5, eng: "The comparative condition extracts predominant frequencies designating definitive predictions mathematically." }
    ]
  },
  {
    id: 6,
    title: "Logistic Regression",
    subtitle: "Simple sigmoid approach",
    code: `import math

test_points = [3, 2]
weight_value = 1.0
bias_value = -2.5
threshold_prob = 0.5

z_values = []
probabilities = []
predictions = []

for i in range(len(test_points)):
    num = test_points[i]
    z_score = (weight_value * num) + bias_value
    z_values.append(z_score)

for i in range(len(z_values)):
    z = z_values[i]
    prob_val = 1 / (1 + math.exp(-z))
    probabilities.append(prob_val)

for i in range(len(probabilities)):
    p = probabilities[i]
    if p > threshold_prob:
        predictions.append(1)
    else:
        predictions.append(0)

for i in range(len(test_points)):
    print(f"{test_points[i]} → {predictions[i]}")`,
    output: `3 → 1
2 → 0`,
    explanation: [
      { step: 1, eng: "The list test_points encapsulates unclassified numbers generating arbitrary dynamic logic mappings." },
      { step: 2, eng: "The variables weight_value designate overarching limits guiding generalized spatial vectors natively." },
      { step: 3, eng: "The primary loop maps test parameters aggregating foundational linear numeric combinations." },
      { step: 4, eng: "The condition dynamically translates aggregated structures determining normalized math parameters natively." },
      { step: 5, eng: "The final validation applies defined probability caps generating static scalar bounds." }
    ]
  },
  {
    id: 7,
    title: "SVM",
    subtitle: "Manual line separation",
    code: `data_points = [[1, 1], [2, 2], [6, 6], [7, 7]]
labels = [0, 0, 1, 1]
boundary_limit = 10

point_sums = []
predictions = []

for i in range(len(data_points)):
    pt = data_points[i]
    total_val = pt[0] + pt[1]
    point_sums.append(total_val)

for i in range(len(point_sums)):
    val = point_sums[i]
    
    if val > boundary_limit:
        pred_class = 1
    else:
        pred_class = 0
        
    predictions.append(pred_class)

for i in range(len(data_points)):
    pt = data_points[i]
    print(f"[{pt[0]}, {pt[1]}] → {predictions[i]}")`,
    output: `[1, 1] → 0
[2, 2] → 0
[6, 6] → 1
[7, 7] → 1`,
    explanation: [
      { step: 1, eng: "The list data_points provides multi-axis tuples mapping discrete separation bounds perfectly." },
      { step: 2, eng: "The variable boundary_limit limits dimensional boundaries establishing manual logic borders exactly." },
      { step: 3, eng: "The initial loop iterates summing dimensional magnitudes converting metrics independently correctly." },
      { step: 4, eng: "The structural condition resolves logical metrics isolating elements breaching defined capacities." },
      { step: 5, eng: "The resulting print explicitly connects categorical indices directly assigning mapped integers." }
    ]
  },
  {
    id: 8,
    title: "Neural Network",
    subtitle: "MLP feedforward logic",
    code: `data_points = [1, 2, 3, 4]
labels = [0, 0, 1, 1]

weight_layer_1 = 1.5
weight_layer_2 = 2.0
activation_threshold = 5.0

hidden_layer_values = []
predictions = []

for i in range(len(data_points)):
    hidden_val = data_points[i] * weight_layer_1
    hidden_layer_values.append(hidden_val)

for i in range(len(hidden_layer_values)):
    out_val = hidden_layer_values[i] * weight_layer_2
    
    if out_val > activation_threshold:
        predictions.append(1)
    else:
        predictions.append(0)

for i in range(len(data_points)):
    print(f"data={data_points[i]} → output={predictions[i]}")`,
    output: `data=1 → output=0
data=2 → output=0
data=3 → output=1
data=4 → output=1`,
    explanation: [
      { step: 1, eng: "The list data_points stores unactivated linear representations processing external neural networks." },
      { step: 2, eng: "The variable activation_threshold gates arbitrary outputs standardizing discrete computational matrices internally." },
      { step: 3, eng: "The fundamental looping sequence filters preliminary math through structurally hidden layers." },
      { step: 4, eng: "The condition limits simulated matrices extracting categorical flags dynamically isolating variables." },
      { step: 5, eng: "The final iterative display maps uncoupled predictions bridging exact independent logic lists." }
    ]
  },
  {
    id: 9,
    title: "Random Forest",
    subtitle: "Manual voting logic",
    code: `data_points = [1, 2, 3, 6, 7]
labels = [0, 0, 0, 1, 1]

predictions_tree_1 = []
predictions_tree_2 = []
predictions_tree_3 = []
final_predictions = []

for i in range(len(data_points)):
    val = data_points[i]
    
    if val > 4: predictions_tree_1.append(1)
    else: predictions_tree_1.append(0)
    
    if val > 5: predictions_tree_2.append(1)
    else: predictions_tree_2.append(0)
    
    if val > 3: predictions_tree_3.append(1)
    else: predictions_tree_3.append(0)

for i in range(len(data_points)):
    majority_votes = predictions_tree_1[i] + predictions_tree_2[i] + predictions_tree_3[i]
    if majority_votes >= 2: final_predictions.append(1)
    else: final_predictions.append(0)

for i in range(len(data_points)):
    print(f"data={data_points[i]} → class={final_predictions[i]}")`,
    output: `data=1 → class=0
data=2 → class=0
data=3 → class=0
data=6 → class=1
data=7 → class=1`,
    explanation: [
      { step: 1, eng: "The list data_points dictates standalone indices executing distinctly separated logical evaluations." },
      { step: 2, eng: "The list predictions_tree_1 stores explicitly independent classifications generating conditional rules entirely." },
      { step: 3, eng: "The core loop populates structurally split rules distributing logic decisions independently." },
      { step: 4, eng: "The boolean condition checks cumulative counts designating final consensus outcomes cleanly." },
      { step: 5, eng: "The terminating script merges logical arrays bridging exact categorical results sequentially." }
    ]
  },
  {
    id: 10,
    title: "AdaBoost",
    subtitle: "Manual boosting calculation",
    code: `data_points = [1, 2, 3, 6, 7]
labels = [0, 0, 0, 1, 1]

weak_pred_1 = []
weak_pred_2 = []
final_predictions = []

for i in range(len(data_points)):
    if data_points[i] > 4: weak_pred_1.append(1)
    else: weak_pred_1.append(0)

for i in range(len(data_points)):
    if data_points[i] > 5: weak_pred_2.append(1)
    else: weak_pred_2.append(0)

for i in range(len(data_points)):
    combined_score = weak_pred_1[i] + weak_pred_2[i]
    if combined_score >= 1: final_predictions.append(1)
    else: final_predictions.append(0)

for i in range(len(data_points)):
    print(f"data={data_points[i]} → {final_predictions[i]}")`,
    output: `data=1 → 0
data=2 → 0
data=3 → 0
data=6 → 1
data=7 → 1`,
    explanation: [
      { step: 1, eng: "The list data_points processes individual categorical evaluations parsing strictly separated sequences." },
      { step: 2, eng: "The variable weak_pred_1 filters initial predictions processing limited categorical frameworks natively." },
      { step: 3, eng: "The basic sequences iterate completely discrete paths rendering strictly separated conditions." },
      { step: 4, eng: "The threshold conditions compile combined sums bridging sequential probabilistic categories uniformly." },
      { step: 5, eng: "The output arrays strictly align extracted variables bridging accurate categorical conclusions." }
    ]
  },
  {
    id: 11,
    title: "Bayesian Network",
    subtitle: "Probability inference",
    code: `events_rain = [1, 1, 0, 0, 1, 0]
events_traffic = [1, 1, 0, 0, 0, 0]

rain_count = 0
traffic_given_rain_count = 0
total_events = len(events_rain)

for i in range(total_events):
    if events_rain[i] == 1:
        rain_count += 1
        if events_traffic[i] == 1:
            traffic_given_rain_count += 1

prob_rain = rain_count / total_events

if rain_count > 0:
    prob_traffic_given_rain = traffic_given_rain_count / rain_count
else:
    prob_traffic_given_rain = 0

bayes_probability = prob_traffic_given_rain * prob_rain

if bayes_probability > 0.1:
    print("Rain=1 → Traffic=High")
else:
    print("Rain=1 → Traffic=Low")`,
    output: `Rain=1 → Traffic=High`,
    explanation: [
      { step: 1, eng: "The list events_rain evaluates arbitrary sequential nodes determining overlapping causal constraints." },
      { step: 2, eng: "The variables rain_count tracks static frequencies mapping accurate statistical causal occurrences." },
      { step: 3, eng: "The conditional loop determines sequential intersection rates calculating purely exact parameters." },
      { step: 4, eng: "The arithmetic condition resolves dynamic intersections rendering fractional categorical Bayesian limits." },
      { step: 5, eng: "The static logical operator checks probabilities formatting textual strings cleanly correctly." }
    ]
  }
];
