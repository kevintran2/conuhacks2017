import collections
from matplotlib import pyplot as plt
import pandas
import re

### splits returned string into words and computes metrics
raw = "Hello I'm going there. There going me,"

# Remove punctuation except for apostrophe and make lowercase
text = re.sub(r'[^\w\s\']', '', raw)
words = text.lower().split()

# Count words
counts = collections.Counter(words)


df = pandas.DataFrame.from_dict(counts, orient='index')

df.plot(kind='bar')
plt.show()