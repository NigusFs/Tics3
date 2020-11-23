from dataclasses import dataclass
from typing import List

@dataclass
class TestCase:
    test_input: str
    output: str


@dataclass
class Problem:
    title: str
    content: str
    difficulty: str
    source: str
    testcases: List[TestCase]
    categories: List[str]
