from django.http import HttpResponse
import os
from openai import OpenAI
import json

base_dir = os.path.dirname(os.path.abspath(__file__))
config_path = os.path.join(base_dir, "../../../config.json")

with open(config_path) as f:
    config = json.load(f)

client = OpenAI(api_key=config["OPENAI_API_KEY"])
def prompt_parse(user_query: str) -> dict:

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        
        response_format={"type": "json_object"},
        
        messages=[
            {
                "role": "system",
                "content": """You are a search query parser for a movie database.
                Your only job is to extract search parameters from the user's query
                and return them as JSON. If a parameter is not mentioned — return null or [].
                The maximum value for `year_to` must be the current year.
                If the parameters are in a different language, translate them into English
                Always return genres in English (action, comedy, horror, drama, etc).
                Languages and countries — as ISO 639-1 codes (uk, ko, fr, en, etc)."""
            },
            {
                "role": "user",
                "content": f"""
                Query: "{user_query}"
                
                Return JSON with the following structure:
                {{
                    "keywords": string or null,
                    "year_from": number or null,
                    "year_to": number or null,
                    "genres": [],
                    "sort_by": "popularity.desc",
                    "people": {{
                        "actors": [],
                        "directors": [],
                        "producers": []
                    }},
                    "runtime": {{"max_minutes": null, "min_minutes": null}},
                    "rating": {{"min_score": null, "min_votes": 100}},
                    "mood": null,
                    "era": null
                }}
                """
            }
        ]
    )
    return json.loads(response.choices[0].message.content)
