import json
import openai
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator  
from django.views.decorators.csrf import csrf_exempt 
from .services.movie_analyzer.movie_analyzer import _get_valid_movie_ids
from .services.prompt_parse.prompt_parse import prompt_parse

@method_decorator(csrf_exempt, name='dispatch')
class AnalyzeMoviesView(View):
    def post(self, request):
        try:
            
            body = json.loads(request.body)
            query = body.get("query")
            movies = body.get("movies", [])

            if not query:
                return JsonResponse({"error": "query is required"}, status=400)
            if not movies:
                return JsonResponse({"error": "movies list is empty"}, status=400)

            valid_ids = _get_valid_movie_ids(query, movies)
            return JsonResponse(valid_ids, safe=False)

        except json.JSONDecodeError:
            return JsonResponse({"error": "invalid JSON"}, status=400)


class ParsePromptView(View):
    def get(self, request):
        query = request.GET.get("q", "").strip()
        
        if not query:
            return JsonResponse({"error": "query parameter is required"}, status=400)
        
        try:
            result = prompt_parse(query)
            if not isinstance(result, dict):
                return JsonResponse({"error": "Invalid response from AI"}, status=500)
                
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
        
        return JsonResponse(result)