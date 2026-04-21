from django.urls import path
from .views import AnalyzeMoviesView, ParsePromptView

urlpatterns = [
    path("analyze_movies/", AnalyzeMoviesView.as_view(), name="analyze-movies"),
    path("parse_prompt/", ParsePromptView.as_view(), name="parse-prompt"),
]