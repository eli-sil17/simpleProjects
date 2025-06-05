

import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from  sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
#from wordcloud import WordCloud
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import streamlit as st


df= pd.read_csv("MovieRecommendation_v2/movies.csv")

required_columns =["genres","keywords", "title", "overview"]
df= df[required_columns]

df= df.dropna().reset_index(drop=True)

# this is to combine every word into one column
df['combined']= df['genres'] + ' '+ df['keywords']+ ' '+ df['title'] 
data=df[['title', 'combined']]

combined_text = " ".join(df['combined'])

nltk.download('punkt')
nltk.download('punkt_tab')
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

def process_text(text):
  #Removes characters and numbers. ^ means not and it subs those characters with write spaces
  text = re.sub(r"[^a-zA-Z\s]", "", text)
  text= text.lower()
  # Word tokenization: splitting sentences into words.
  tokens=word_tokenize(text)
  tokens= [word for word in tokens if word not in stop_words]
  return " ".join(tokens)

data['cleaned_text']= df['combined'].apply(process_text)

#Vectorization with TF-IDF
tfidf_vectorizer = TfidfVectorizer(max_features=500)
tfidf_matrix = tfidf_vectorizer.fit_transform(data['cleaned_text'])
# Compute Cosine Similarity
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

from difflib import get_close_matches

def recommend_movies(movie_name, cosine_sim=cosine_sim,df=data,top_n=5):
  #finding the index of the movie
  titles = df['title'].tolist()
  movie_name = movie_name.strip().lower()
  close_matches = get_close_matches(movie_name, [t.lower() for t in titles], n=1, cutoff=0.6)

  if not close_matches:
        return "❌ Movie not found. Try a different title?"
      # Get original casing title from df
  matched_title = next(t for t in titles if t.lower() == close_matches[0])
  idx = df[df['title'] == matched_title].index[0]

   # Get similarity scores
  sim_scores = list(enumerate(cosine_sim[idx]))
  sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)# sorts it in decending order
  sim_scores = sim_scores[1:top_n+1]  # Exclude the movie itself

  movie_indices =[i[0]for i in sim_scores]

  #print( f"🔎 Showing results for: **{matched_title}**")
  st.markdown(f" Showing results for: **{matched_title}**")



  return df[['title']].iloc[movie_indices]



st.title("🎬 Movie Recommender")

def recommend_movies_links(movie_name):
    recommendations = recommend_movies(movie_name)
    
    if isinstance(recommendations, str): # check it the result is a string, if it is then we know it didn't get any recommendations
        st.warning(recommendations)
        return

    st.markdown("### 🔎 Recommendations:")
    
    for title in recommendations['title']:
        query = title.replace(" ", "+")
        url = f"https://www.google.com/search?q={query}+movie"
        st.markdown(f"- [{title}]({url})", unsafe_allow_html=True)

movie_name = st.text_input("Enter a movie title:") # would store the user input in the variable
if st.button("Get Recommendations"):
  if movie_name:
    recommend_movies_links(movie_name)
