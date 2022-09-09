-- | Example questions using hoogle


module Examples where

import Prelude

-- $setup

-- | Calculate eulerProblem1
--
-- >>> eulerProblem1 1000
-- 233168
eulerProblem1 :: Int -> Int
eulerProblem1 a = sum $ filter (\x -> !(mod x 3 == 0 && mod x 5 == 0)) [1..a-1]

-- | Function to check if every element in a list is even.
-- Avoid hard coding recursion in these functions, if you do, you will lose marks!
--
-- >>> allEvens [1,2,3,4,5]
-- False
-- >>> allEvens [2,4]
-- True
allEvens :: [Int] -> Bool
allEvens lst = all even lst

-- | Function to check if any element is odd
-- Avoid hard coding recursion in these functions, if you do, you will lose marks!
--
-- >>> anyOdd [1,2,3,4,5]
-- True
-- >>> anyOdd [0,0,0,4]
-- False
anyOdd :: [Int] -> Bool
anyOdd lst = all odd lst

-- | Function to sum every element in two lists
-- Avoid hard coding recursion in these functions, if you do, you will lose marks!
--
-- >>> sumTwoLists [1,2,3,4,5] [1,2,3,4,5]
-- [2,4,6,8,10]
sumTwoLists :: [Int] -> [Int] -> [Int]
sumTwoLists x y = zipWith (+) x y 

-- | Function to make a list of the first item of each pair in a list of pairs
-- Avoid hard coding recursion in these functions, if you do, you will lose marks!
--
-- >>> firstItem [(2,1), (4,3), (6,5)]
-- [2,4,6]
firstItem :: [(a,b)] -> [a]
firstItem lst = map fst lst 
