const RELATIONSHIP = {
    "husband": {
        "_": "chồng",
        "father": "bố chồng",
        "mother": {
            "_": "mẹ chồng",
            "father": "ông ngoại chồng",
            "mother": "bà ngoại chồng"
        },
        "olderSister": {
            "_": "chị chồng",
            "husband": "chồng chị chồng",
            "daughter": "cháu gái",
            "son": "cháu trai"
        }
    },
    "wife": {
        "_": "vợ",
        "youngerBrother": {
            "_": "em vợ",
            "wife": "em dâu",
			"son": "cháu trai",
			"daughter": "cháu trai"
        },
        "father": {
            "_": "bố vợ"
        },
        "mother": {
            "_": "mẹ vợ",
            "father": "ông ngoại vợ",
            "mother": "bà ngoại vợ"
        },
        "olderSister": {
            "_": "chị vợ",
            "husband": "anh đồng hao",
            "daughter": "cháu gái",
            "son": "cháu trai"
        },
        "youngerSister": {
            "_": "em gái vợ",
            "husband": "em đồng hao",
            "daughter": "cháu gái",
            "son": "cháu trai"
        }
    },
    "mother": {
        "_": "mẹ",
        "father": "ông ngoại",
        "mother": {
            "_": "bà ngoại",
            "father": "cụ ngoại",
            "mother": "cụ ngoại",
            "olderSister": {
                "_": "bác",
                "husband": "bác"
            }
        },
        "youngerBrother": {
            "_": "cậu",
            "wife": "mợ",
			"son": "em họ",
			"daughter": "em họ"
        },
        "youngerSister": {
            "_": "dì",
            "husband": "chú",
            "daughter": "em họ",
            "son": "em họ"
        },
        "olderBrother": "bác",
        "olderSister": {
            "_": "bác",
            "husband": "bác",
            "daughter": "chị họ",
            "son": "anh họ"
        }
    },
    "father": {
        "_": "bố",
        "father": "ông nội",
        "mother": {
			"_": "bà nội",
			"father": "cụ nội",
			"mother": "cụ nội"
		},
		"olderBrother": {
			"_": "bác"
		},
		"olderSister": {
			"_": "bác",
			"husband": "bác",
			"son": "anh họ",
			"daughter": "chị họ"
		},
    },
    "son": {
        "_": "con trai",
        "son": "cháu trai",
        "daughter": {
            "_": "cháu gái",
            "husband": "cháu rể"
        },
        "wife": "con dâu"
    },
    "daughter": {
        "_": "con gái",
        "son": {
            "_": "cháu trai",
            "wife": "cháu dâu",
			"son": "chút trai",
			"daughter": "chút gái"
        },
        "daughter": {
            "_": "cháu gái",
            "husband": "cháu rể",
            "daughter": "chút gái",
            "son": "chút trai"
        },
        "husband": "con rể"
    },
    "youngerBrother": {
        "_": "em trai",
        "wife": "em dâu",
		"son": "cháu trai",
		"daughter": "cháu gái"
    },
    "youngerSister": {
        "_": "em gái",
        "husband": "em rể",
        "daughter": "cháu gái",
        "son": "cháu trai"
    },
    "olderBrother": {
        "_": "anh trai"
    },
    "olderSister": {
        "_": "chị gái",
        "husband": "anh rể",
        "daughter": "cháu gái",
        "son": "cháu trai"
    }
};
