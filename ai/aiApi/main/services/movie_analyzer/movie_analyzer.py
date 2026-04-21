import json
from openai import OpenAI
import os

client = OpenAI(api_key='')

def _get_valid_movie_ids(query: str, movies: list) -> list[int]:
    movies_context = "\n".join([
        # 'id' замість 'movieId' — бо саме так надсилає C#
        f"ID:{m['id']} | {m['title']} ({_year(m.get('releaseDate'))}) | "
        f"Rating: {m.get('rating', {}).get('voteAverage', 0):.1f}/10 ({int(m.get('rating', {}).get('voteCount', 0))} votes) | "
        f"Genres: {', '.join(g['name'] for g in m.get('genres', []))} | "
        f"Overview: {(m.get('overview') or '')[:300]}"
        for m in movies
        if m.get('id') is not None  
    ])


    response = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_object"},
        messages=[
            {
                "role": "system",
                "content": (
                   "You are a movie filter assistant. "
                    "Your only job is to return a JSON object with a single key 'ids' "
                    "containing an array of movie IDs that match the user's query. "

                    "You have broad knowledge of movies, directors, actors, franchises, studios, and genres. "
                    "Use this knowledge to interpret the user's query intelligently. "
                    "For example: if the user says 'marvel' — you know Iron Man, Thor, Avengers etc. are Marvel movies, so include them if they appear in the list. "
                    "If the user says 'Nolan' — you know he directed Inception, Interstellar, The Dark Knight etc. "
                    "If the user says 'Tom Hanks' — you know his filmography. "
                    "Cross-reference your knowledge with the provided movie list and include matches. "

                    "Rating filter rules: "
                    "If the user's query mentions a specific rating or score (e.g. 'above 8', 'rated 7+', 'top rated') — "
                    "apply that rating range strictly. "
                    "Sort by relevance to the query descending. "
                    "Return only IDs that exist in the provided list — never invent new ones."
                )
            },
            {
                "role": "user",
                "content": (
                    f"User query: \"{query}\"\n\n"
                    f"Movies:\n{movies_context}\n\n"
                    f"Return a JSON object: {{\"ids\": [123, 456, 789]}}"
                )
            }
        ]
    )

    result = json.loads(response.choices[0].message.content)
    raw_ids = result.get("ids", [])

    valid_movie_ids = {m["id"] for m in movies}
    return [movie_id for movie_id in raw_ids if movie_id in valid_movie_ids]


def _year(date_str: str | None) -> str:
    if not date_str:
        return "N/A"
    return date_str[:4]