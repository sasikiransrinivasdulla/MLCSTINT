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
    output: `4 1`,
    explanation: [
      { step: 1, eng: "DataFrame holds different values including missing ones", tel: "df lo different values unnai andulo konni missing values kuda unnai" },
      { step: 2, eng: "fillna changes missing blanks by calculating column average", tel: "fillna use chesi missing blanks anni column average tho fill chestham" },
      { step: 3, eng: "X stores input features and y stores output target", tel: "X lo input features y lo final output target store avutundi" },
      { step: 4, eng: "train_test_split divides data for training models vs testing", tel: "train_test_split data ni train cheyadaniki mariyu test cheyadaniki divide chestundi" },
      { step: 5, eng: "code prints final lengths of the split arrays", tel: "last lo split aina arrays entha peddaga unnayo lengths ni print chestundi" }
    ]
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
K=3 → Accuracy: 100.0%`,
    explanation: [
      { step: 1, eng: "data contains our main input points for learning", tel: "data lo manam model ki iche main input points unnai" },
      { step: 2, eng: "labels define which category each data point belongs to", tel: "labels prathi data point a category ki sambandinchindo chepthundi" },
      { step: 3, eng: "loop iterates through nearest neighbor limits from K=1 to 3", tel: "loop daggara unna neighbors gurinchi check cheyadaniki K=1 nunchi 3 daka run avtundi" },
      { step: 4, eng: "model calculates distance and makes predicting decision", tel: "model distance calculate chesi daggara ga unde dani batti predict chestundi" },
      { step: 5, eng: "accuracy is evaluated and printed for each specific K param", tel: "last lo accuracy entha vachindo prathi okka K value ki check chesi print chestundi" }
    ]
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

for i in range(len(test_pts)):
    pt = test_pts[i]
    val = pt[0]
    
    is_greater = False
    
    if val > thresh:
        is_greater = True
    else:
        is_greater = False
        
    if is_greater == True:
        pred = 1
    else:
        pred = 0
        
    results.append([pt, pred])

for r in results:
    pt = r[0]
    pred_class = r[1]
    print(f"[{pt[0]},{pt[1]}] → {pred_class}")`,
    output: `[2,1] → 0
[12,10] → 1`,
    explanation: [
      { step: 1, eng: "test_pts holds the fresh input points we want to guess", tel: "test_pts lo manam edhi class kanukkovalo aa kotha input points unnai" },
      { step: 2, eng: "thresh exact number maps where condition naturally branches", tel: "threshold ye exact number daggara condition marutundo clear ga chepthundi" },
      { step: 3, eng: "loop extracts test point checking core logical comparison", tel: "loop lo okkoka test point thiskuni threshold tho comparison chestundi" },
      { step: 4, eng: "if value is strictly greater it splits branch to class 1", tel: "value threshold kante ekuva unte class 1 ani tree split fix chestundi" },
      { step: 5, eng: "results array gathers mapping and prints them explicitly", tel: "results array lona gather chesi proper format tho output print chestundi" }
    ]
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
    output: `class = no`,
    explanation: [
      { step: 1, eng: "x stores simple word pairs mapped to correct y answer sets", tel: "x lo manam check cheyali anukune word pairs unnai marinchi y lo target classes unnai" },
      { step: 2, eng: "separated independent count tracking handles yes vs no", tel: "variables tracking clear ga yes enni sarlu mariyu no sarlu vachindo lekka vestundi" },
      { step: 3, eng: "loop manually iterates inspecting every basic logical tally", tel: "loop prathi array column ni check chesi tallies frequency register chestundi" },
      { step: 4, eng: "probability logic scales counts returning exact percentages", tel: "probability rules use chesi specific class matching math calculate chesthundi" },
      { step: 5, eng: "higher final computation probability returns final string decision", tel: "oka vela yes value peddaga unte final answer decision adigi print autundi" }
    ]
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

for i in range(len(test_vals)):
    val = test_vals[i]
    z = (w * val) + b
    z_vals.append(z)

for i in range(len(z_vals)):
    z = z_vals[i]
    p = 1 / (1 + math.exp(-z))
    probs.append(p)

for i in range(len(probs)):
    p = probs[i]
    if p > thresh:
        preds.append(1)
    else:
        preds.append(0)

for i in range(len(test_vals)):
    val = test_vals[i]
    c = preds[i]
    print(f"{val} → {c}")`,
    output: `3 → 1
2 → 0`,
    explanation: [
      { step: 1, eng: "test_vals stores testable scalar numbers needing classification", tel: "test_vals ani perunna dantlo thelsukovali anukune input numbers unnai" },
      { step: 2, eng: "loop derives strict linear calculation building z outputs", tel: "loop use chesi manual equationtho weight and bias linear ga multiply chestham" },
      { step: 3, eng: "secondary step transforms equation variables inside math sigmoid", tel: "rendova loop log math formula use chesi z values kacchiitamo sigmoid ga marchutundi" },
      { step: 4, eng: "strict parameter checks logical limit extracting categorical logic", tel: "tharwata values threshold datithe appudu specific class decide chesi appends vestundi" },
      { step: 5, eng: "the extracted answers display mapped cleanly via looping prints", tel: "last loop lo inputs and results final line prints kindha clear chesi petti istadi" }
    ]
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
[7,7] → 1`,
    explanation: [
      { step: 1, eng: "x array maintains pairs plotting basic spatial boundaries", tel: "x array lona data points ekkada unnayo define chese plane spatial boundaries thelustai" },
      { step: 2, eng: "t is manually chosen dividing distance barrier explicitly", tel: "t ane var strict barrier distance ga plane lona map chesi line theesthundi" },
      { step: 3, eng: "loop computes sum mapping distances against defined line logic", tel: "loop coordinates ni line distances ga decide cheyadaniki sum calculate chestundi" },
      { step: 4, eng: "simple logic assesses threshold boundaries sorting respective lists", tel: "logic sum calculations barrier pass aynaya lekunda class list values lo istaaru" },
      { step: 5, eng: "predicted outcomes correlate accurately formatting final screen", tel: "final loop screen meeda mapping lists lona exact outputs check chestundi" }
    ]
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
data=[0, 1] → 1`,
    explanation: [
      { step: 1, eng: "data array captures extremely restricted input matching lists", tel: "data lists artificial inputs prepare chesi neural matches kosam set authundi" },
      { step: 2, eng: "MLPClassifier structurally injects multi pathway hidden layer layers", tel: "MLPClassifier command networks prepare chesi hidden layers ni lopala forms isthundi" },
      { step: 3, eng: "the fitting algorithm runs neural training optimization iteratively", tel: "fitting algorithm computer brain ni data vadi iterate chethu perfect learning untundi" },
      { step: 4, eng: "testing points process structurally down predictive funnels loops", tel: "loop format lona okkoka test object neural predictive funnel lokಿ passing aypothay" },
      { step: 5, eng: "output strings display results learned actively from nodes", tel: "neural paths output emi choose chesayo clear parameter nodes results display cheyistai" }
    ]
  },
  {
    id: 9,
    title: "Random Forest",
    subtitle: "Manual logical voting",
    code: `data = [1, 2, 3, 6, 7]
labels = [0, 0, 0, 1, 1]

r1_preds = []
r2_preds = []
r3_preds = []
preds = []

for i in range(len(data)):
    val = data[i]
    if val > 4: r1_preds.append(1)
    else: r1_preds.append(0)
    
    if val > 5: r2_preds.append(1)
    else: r2_preds.append(0)
    
    if val > 3: r3_preds.append(1)
    else: r3_preds.append(0)

for i in range(len(data)):
    votes = r1_preds[i] + r2_preds[i] + r3_preds[i]
    if votes >= 2:
        preds.append(1)
    else:
        preds.append(0)

for i in range(len(data)):
    print(f"data={data[i]} → {preds[i]}")`,
    output: `data=1 → 0
data=2 → 0
data=3 → 0
data=6 → 1
data=7 → 1`,
    explanation: [
      { step: 1, eng: "data defines explicit values passed across three forest models", tel: "data ante clear values forests rule model systems check cheyadaniki pass autai" },
      { step: 2, eng: "loop generates three manually distinct logic separation outcomes", tel: "loop theskuni different checks pedthu manual outputs array trees forms create vestay" },
      { step: 3, eng: "three prediction buckets individually emulate forest tree logic", tel: "moodu separate variables exact decision logic trees emautayo predict records chestundi" },
      { step: 4, eng: "aggregated sums resolve classification identifying majority status", tel: "rendova loop sum aggregated marks count calculations majority check perform logic isthundi" },
      { step: 5, eng: "a boolean strictly evaluates two-thirds criteria making predictions", tel: "boolean calculation strictly majority vachinda leda cross verification chesi print chestundi" }
    ]
  },
  {
    id: 10,
    title: "AdaBoost",
    subtitle: "Manual boosting concept",
    code: `data = [1, 2, 3, 6, 7]
labels = [0, 0, 0, 1, 1]

pred_w1 = []
pred_w2 = []
preds = []

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
        preds.append(1)
    else:
        preds.append(0)

for i in range(len(data)):
    val = data[i]
    ans = preds[i]
    print(f"data={val} → {ans}")`,
    output: `data=1 → 0
data=2 → 0
data=3 → 0
data=6 → 1
data=7 → 1`,
    explanation: [
      { step: 1, eng: "data establishes exact arrays testing sequential manual pipeline", tel: "data established unna logic loop independent pipeline predictions lopaliki passing start chestundi" },
      { step: 2, eng: "independent logic boundaries function defining weak structural trees", tel: "independent checks strong rules levu gani weak parameters base avthu results isthay" },
      { step: 3, eng: "weak decisions assign fundamental values predicting separated results", tel: "e weak checks theeskovadam thone individual parameters decision result formats return avvutay" },
      { step: 4, eng: "final evaluation boosts accumulated accuracy defining thresholds", tel: "final loop add ups anni add chesi boosting logic values calculations finish esthay" },
      { step: 5, eng: "values triggering greater counts override original base classes", tel: "final add values base counts daththe accurate parameters decide print thesthundi" }
    ]
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
    output: `Rain=1 → Traffic=High`,
    explanation: [
      { step: 1, eng: "BayesianModel links discrete event occurrences causality directly", tel: "Rain occurrences inka traffic causations connect chesthu network model link creates ayindi" },
      { step: 2, eng: "TabularCPD tables outline relational dependence exact probabilities", tel: "Tabular tables discrete conditions events lona probability data percent clear dimensions isthay" },
      { step: 3, eng: "add function validates relations configuring mathematical nodes", tel: "add funciton relations tables math configurations check cheskuni nodes update map chestundi" },
      { step: 4, eng: "engine elimination performs localized dependency probability query", tel: "elimination method probability engine localized tests map check calculations pass map works isthundi" },
      { step: 5, eng: "query triggers explicit dictionary parameters output logic formats", tel: "target parameter inference final output string statements dictionary mappings result display" }
    ]
  }
];
