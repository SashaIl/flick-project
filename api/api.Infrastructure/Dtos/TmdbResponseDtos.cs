using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Infrastructure.Dtos;

public record TmdbKeywordResponse(List<TmdbKeyword> Results);
public record TmdbKeyword(int Id, string Name);

public record TmdbPersonResponse(List<TmdbPerson> Results);
public record TmdbPerson(int Id, string Name);