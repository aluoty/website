# Haskell

Haskell, named after logician Haskell Curry, is a purely functional programming language.

## Experience

Haskell is an enjoyable language, and will make you think differently in the programming world, alike to Lisp.

## Details
Haskell is:
+ Purely functional
+ General-purpose
+ Statically typed
+ Lazy evaluated
+ 0 Side effects by default

Haskell is used in both academia and the real world for reliable software.

Haskell also have both interpreters and compilers that can be used.

## Code Example

Let's see some Haskell code now:

+ Hello World: (only the last line is strictly necessary)
```haskell
module Main (main) where          -- not needed in interpreter, is the default in a module file

main :: IO ()                     -- the compiler can infer this type definition
main = putStrLn "Hello, World!"
```
+ Factorial:
```haskell
factorial :: (Integral a) => a -> a

-- Using recursion (with the "ifthenelse" expression)
factorial n = if n < 2
              then 1
              else n * factorial (n - 1)

-- Using recursion (with pattern matching)
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- Using recursion (with guards)
factorial n
   | n < 2     = 1
   | otherwise = n * factorial (n - 1)

-- Using a list and the "product" function
factorial n = product [1..n]

-- Using fold (implements "product")
factorial n = foldl (*) 1 [1..n]

-- Point-free style
factorial = foldr (*) 1 . enumFromTo 1
```

## Try It Out

First, install GHC(Glasgow Haskell Compiler) via GHCup usually, available in many repos for package managers.

You can write Haskell in many places, Neovim, Vim, Nano, VSCode.

GHCup also has options for HLS(Haskell's LSP) and Cabal(Haskell's build tool).

You can also try `ghci`, an interactive interpreter.

That's it, write some Haskell code, see if you enjoy. Bye!