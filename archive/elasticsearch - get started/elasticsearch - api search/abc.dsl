GET voice2text_bca/calls/_search
{
  "query": {
    "match_all": {}
  }
}

GET voice2text_bca/calls/_mapping

GET voice2text_bca/calls/_search
{
  "query": {
    "match_all": {}
  }
}

GET voice2text_bca/calls/_search
{
  "query": {
    "match": {
      "sus_name": "P2 NGUYEN THANH TINH"
    }
  }
}

GET voice2text_bca/calls/_search
{
  "query": {
    "filtered": {
      "filter": {
        "range": {
          "duration": {
            "gt": 90
          }
        }
      },
      "query": {
        "match": {
          "sus_name": "P2 NGUYEN THANH TINH"
        }
      }
    }
  }
}

GET /voice2text_bca/calls/_search
{
  "size": 0,
  "aggs": {
    "avg_duration": {
      "avg": { "field": "duration" }
    },
    "sum_duration": {
      "sum": { "field": "duration" }
    },
    "min_duration": {
      "min": { "field": "duration" }
    },
    "max_duration": {
      "max": { "field": "duration" }
    }
  }
}

GET /voice2text_bca/calls/_search
{
  "size": 0,
  "aggs": {
    "duration_stats": {
      "stats": { "field": "duration" }
    }
  }
}
