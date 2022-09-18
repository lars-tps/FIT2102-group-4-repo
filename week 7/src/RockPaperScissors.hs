-- | Basic game of rock, paper, scissors.
module RockPaperScissors where

-- $setup
-- >>> import Prelude(fst, snd)
-- >>> import Control.Applicative
-- >>> rps = [Rock, Paper, Scissors]
-- >>> combinations = liftA2 (,) rps rps
-- >>> insight f = map (liftA2 f fst snd)

-- | Types for the game choices: rock, paper or scissors.
data RockPaperScissors = Rock | Paper | Scissors

-- | Result of a game: either one player won, or it's a draw.
data Result = Player1 | Player2 | Draw
  deriving(Eq, Show)

type Plays = [RockPaperScissors] -- This type alias is used to make our inputs more meaningful!

-- | A hand should print as:
--
--  * Rock: \"R\"
--  * Paper: \"P\"
--  * Scissors: \"S\"
--
-- >>> map show rps
-- ["R","P","S"]
instance Show RockPaperScissors where
  show = error "show not implemented"

-- | Equality between members.
--
-- >>> insight (==) combinations
-- [True,False,False,False,True,False,False,False,True]
instance Eq RockPaperScissors where
  _ == _ = error "eq not implemented"

-- | Ordering to determine winning moves.
--
-- >>> insight compare combinations
-- [EQ,LT,GT,GT,EQ,LT,LT,GT,EQ]
instance Ord RockPaperScissors where
  compare _ _ = error "ord not implemented"

-- | Tell which player won.
--
-- >>> insight whoWon combinations
-- [Draw,Player2,Player1,Player1,Draw,Player2,Player2,Player1,Draw]
whoWon :: RockPaperScissors -> RockPaperScissors -> Result
whoWon = error "whoWon not implemented"

-- | Counts number of times a Result occurred in a series of Plays.
--
-- >>> countResult [Rock, Paper, Paper, Scissors] [Rock, Scissors, Rock, Paper] Player1
-- 2
--
-- >>> countResult [Rock, Paper, Paper, Scissors] [Rock, Scissors, Rock, Paper] Player2
-- 1
--
-- >>> countResult [Rock, Paper, Paper, Scissors] [Rock, Scissors, Rock, Paper] Draw
-- 1
countResult :: Plays -> Plays -> Result -> Int
countResult = error "countResult not implemented"

-- | Calculates result of a series of Plays
--
-- Hint: use countResult!
--
-- >>> competition [Rock, Rock, Rock] [Paper, Paper, Paper]
-- Player2

-- >>> competition [Scissors, Scissors, Scissors] [Paper, Paper, Paper]
-- Player1

-- >>> competition [Scissors, Scissors, Rock] [Paper, Scissors, Paper]
-- Draw

-- >>> competition [Rock, Rock, Rock, Rock, Paper, Paper] [Scissors, Scissors, Scissors, Scissors, Scissors, Scissors]
-- Player1

-- >>> competition [Scissors, Scissors, Scissors, Scissors, Scissors, Scissors] [Rock, Rock, Rock, Rock, Paper, Paper]
-- Player2
competition :: Plays -> Plays -> Result
competition = error "competition not implemented"
