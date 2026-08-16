# Lisp

Lisp, an abbreviation of "list processing", is both a family of programming languages and a programming language itself. It originated in the 1950s still in practice, after Fortran. It is very interesting. It often changes how a programmer look at programming ever after trying out Lisp dialects. 

## Experience

I have some experiences with Lisp, I learnt Racket at first, and then Common Lisp. Both are great options for beginners.

## Details

First, let's explain the main features of Lisp:
+ Functional first
+ S-syntax:
```lisp
(+ 1 2) ;; This evaluates to 3
```
+ Dynamic typing
+ Read-Eval-Print-Loop(REPL)
+ Homoiconicity, Code and Data are same

Now, let's discover Racket and Common Lisp, two Lisp dialects:
+ Racket:
  + Language-Oriented-Programming, lang is built into language
  + Built in IDE
  + Educational
  + Lisp-1 syntax, functions and variables definition are same
  + Some libraries with langs
+ Common Lisp:
  + Multi-Paradigm: Functional, Procedural, OOP
  + IDE are from 3rd parties
  + Used in AI research and business
  + Lisp-2 syntax, varied keywords
  + Many libraries with OpenGL bindings and more

## Code Example

Now, before deciding whether to learn Lisp or not, and which dialect, let me show you some examples first:
Racket:

```racket
#lang racket ;; define lang
(define example-var 32)
(define example-string "Good Morning!")
(define result (* 3 2 (- 3 2)))
(displayln example-var);; prints
(define (square x)
  (* x x))
```

Common Lisp:

```lisp
(defparameter *example* 10) ;; define *example*, ** are optional, not syntax
(defconst +g+ 10) ;; const, ++ are optional, not syntax
(defun square (x)
  (* x x))

(defun power (x &optional (n 2)) ;; &optional --> Optional, Default --> 2
  (expt x n))

(format t "Hello! ~%") ;; ~% is optional
```

## Try It Out

From these examples, you can see that Racket and Common Lisp are very different in syntax as well.

You can choose either to start first.

But for now, I am going to teach you how to start with Common Lisp.

First, install SBCL, a compiler for Common Lisp, it is often called `sbcl` in the packages.
Second, you can install Emacs on your system if you do not have one, the package name for Emacs is often just plainly `emacs`. After that, you can install SLIME, a powerful development plugin for Emacs, the package might be `emacsPackages.slime` or slime depending on the system.

Then, after installing, change the init file for Emacs. Emacs also uses Emacs Lisp which is a Lisp dialect, here is the init.el:
```elisp
(require 'slime)

(setq inferior-lisp-program "sbcl")
(slime-setup '(slime-fancy))
```
Alternatively, you can use (use-package) macro if it is set up:

``elisp
(require 'package)

(setq package-archives
      '(("gnu"    . "https://elpa.gnu.org/packages/")
	("nongnu" . "https://elpa.nongnu.org/nongnu/")
	("melpa"  . "https://melpa.org/packages/")))

(package-initialize)

(unless package-archive-contents
  (package-refresh-contents))

(unless (package-installed-p 'use-package)
  (package-install 'use-package))

(require 'use-package)

(use-package slime
  :ensure t
  :init
  (setq inferior-lisp-program "sbcl"))
```

Now fire up Emacs, and you will see an interface with a "Open a File" button, click that, and enter your file for testing, like `~/Projects/test/test.lisp`, then you will be launched into the coding interface.

Now, press M-x, which is often Alt+X, and then type `slime` and you will see the SLIME interface of REPL, you can write some code in the file, press C-c C-c, double Ctrl+C, which compiles it, and type the function in REPL SLIME and you will get the output.

From now onwards, you can explore more of Common Lisp like Recursions, Higher Order Functions, Macros and more libraries. Enjoy!


