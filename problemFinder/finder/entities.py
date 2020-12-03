from dataclasses import dataclass
from typing import List

@dataclass
class TestCase:
    input_data: str
    output_data: str


@dataclass
class Problem:
    title: str
    content: str
    difficulty: str
    source: str
    testcases: List[TestCase]
    categories: List[str]
