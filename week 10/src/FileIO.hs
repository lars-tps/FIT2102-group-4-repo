-- | Given a file containing a list of files, open the listed files and print
-- their content, one after the other, in the output.  Available libraries:
--
--  * 'readFile' Read the content of a file and wrap it in 'IO'.
--  * 'lines' Split a string by newline character
--  * 'putStrLn' Write a line on the output
module FileIO where

import           Control.Monad
import           Prelude

-- | Do Notation
-- The following code works fine, but it uses explicit binds and a lambda function.
-- Rewrite using do notation!
-- helloName :: IO ()
-- helloName = putStrLn "What is your name?" >>
--             getLine >>= (\name ->
--             return ("Hello, " ++ name ++ "!")) >>=
--             putStrLn
helloName :: IO ()
helloName = do 
              putStrLn "What is your name?"
              name <- getLine
              putStrLn ("Hello, " ++ name ++ "!")

-- | Given a pair (filename, filecontent), print `filecontent` in the following format:
-- | Your code should skip any empty lines (i.e. null lines)
--
-- ================ filename
-- contents of
-- the file
-- one line
-- at a time
-- <return the number of characters printed>
--
-- /Hint/: use 'lines', 'traverse', 'putStrLn' and `length` to get number chars in String
--
-- >>> printFile ("theFile.txt", "Tim\nwas\n\n\nhere!")
-- ================ theFile.txt
-- Tim
-- was
-- here!
-- 11
printFile :: (FilePath, String) -> IO Int
printFile (fp, file) = do
  putStrLn $ "================ " ++ fp

  -- Invalid lines are null lines
  let validLines = filter (/= "") (lines file)

  -- Print out the valid lines
  traverse putStrLn validLines

  return $ sum $ fmap length validLines

-- | Given a list of pairs (filename, filecontent), print them all using `printFile`
-- and return the total number of characters printed
--
-- /Hint/: use `traverse`
--
-- /Hint 2/: The printing is a Monadic effect, the /value/ in the IO context is
-- the size of the files
--
-- >>> printFiles [("a.txt","hello"),("b.txt","world")]
-- ================ a.txt
-- hello
-- ================ b.txt
-- world
-- 10
printFiles :: [(FilePath, String)] -> IO Int
printFiles = do
                lenList <- traverse printFile
                return $ (foldr (+) 0) <$> lenList

-- | Open the file given as parameter and return a tuple with the name of the
-- file and its content.
--
-- /Hint/: use 'readFile' and a do block
--
-- >>> getFile "share/a.txt"
-- ("share/a.txt","Content of a.\n")
getFile :: FilePath -> IO (FilePath, String)
getFile path = do
            filecontent <- readFile path
            return $ (path,filecontent)

-- | Open a list of files.
--
-- /Hint/: use 'traverse' and 'getFile'
--
-- >>> getFiles ["share/a.txt","share/b.txt"]
-- [("share/a.txt","Content of a.\n"),("share/b.txt","Content of b.\n")]
getFiles :: [FilePath] -> IO [(FilePath, String)]
getFiles = traverse getFile

-- | Process a list of files.
-- | Given a path, open and print the contents of the files listed.
--
-- /Hint/: Use 'getFiles' and 'printFiles'.
--
-- >>> run "share/test.txt"
-- ================ share/a.txt
-- Content of a.
-- ================ share/b.txt
-- Content of b.
-- ================ share/c.txt
-- Content of c.
-- 39
run :: FilePath -> IO Int
run path = do
            paths <- readFile path
            contents <- getFiles $ lines paths
            printFiles contents

