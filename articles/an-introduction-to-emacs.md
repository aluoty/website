# Emacs

Emacs, originally named EMACS(Editor MACroS). With the most used variant being GNU Emacs, the development of EMACS began in the mid-1970s.

## Details

Emacs is a powerful *"editor"* and has over 10000 built in commands, GNU Emacs also features Elisp.

Elisp is a lisp dialect used to customize and build the editor.

Emacs has also many features, like Magit(a powerful git interface), file managers, simple browsers and even games.

## Experience

I first used Emacs while I was learning Common Lisp, as Emacs features SLIME and SLY, both are powerful common lisp IDEs for Emacs.

Emacs is very easy to use, there are GUI and TUI versions. However, people mainly use GUI counterparts.

## Installation

Let's install Emacs now, a comprehensive installation guide is on the official [GNU Emacs website](https://www.gnu.org/software/emacs/download.html).

Here, I will summarize and show you some of the example commands used to install Emacs:
+ Debian based: `sudo apt install emacs` or `sudo apt-get install emacs`
+ RHEL based: `sudo dnf install emacs` or `sudo yum install emacs`
+ Arch based: `sudo pacman install emacs`

## Distro

Looking at the section title "Distro", you might be confused.

> "What is an Emacs distro?"

Well, Emacs distro are just like Neovim distro, it provides a pre-set configuration.

However, for the best learning and vanilla emacs, I recommend vanilla Emacs for a while, then Emacs Prelude.

If you like Evil-Mode(Vim keybindings) or want hybrid of Emacs and Vim, use Doom Emacs or Spacemacs.

First, and for now, we are going to use vanilla, then head to Prelude.

## Configuration

Let's locate the configuration directory, we will use `~/.config/emacs` for this guide. If you have any configuration, consider moving them to another directory like `mv ~/.config/emacs ~/.config/myemacs`.

Now that we have the environment, we can write some Elisp.

Here's an extremely simple configuration(`~/.config/emacs/init.el`):
```elisp
;; setup the require-package tool
(require 'package)

(setq package-archives
      '(("gnu"    . "https://elpa.gnu.org/packages/")
	("nongnu" . "https://elpa.nongnu.org/nongnu/")
	("melpa"  . "https://melpa.org/packages/")))
(package-initialize)

(unless (package-installed-p 'use-package)
  (package-refresh-contents)
  (package-install 'use-package))

(require 'use-package)

(setq use-package-always-ensure t)

;; vertical
(use-package vertico
  :ensure t
  :init
  (vertico-mode))

;; git interface
(use-package magit
  :ensure t)

;; see key
(use-package which-key
  :ensure t)

;; for lsp
(use-package company
  :ensure t
  :init (global-company-mode))

;; for rust
(use-package rust-mode
  :ensure t)

;; for SLY
(use-package sly
  :ensure t
  :init
  (setq inferior-lisp-program "sbcl"))

;; for terminal
(use-package vterm
  :ensure t)

;; light theme
(load-theme 'modus-operandi t)

;; lsp
(use-package eglot
  :hook ((c-mode . eglot-ensure)
	 (rust-mode . eglot-ensure)
	 (typescript-mode . eglot-ensure)))

;; code suggestion interface
(use-package corfu
  :ensure t)
```

After some configuration, if you enjoy configurating, you can continue using vanilla.

## Prelude

But for now, we will be using Emacs Prelude. Here I will provide three methods to install, if you wish to see them in more detail, view the official [Emacs Prelude installation site](https://prelude.emacsredux.com/en/latest/installation/).

+ Via curl: `curl -L https://github.com/bbatsov/prelude/raw/master/utils/installer.sh | sh`
+ Via wget: `wget --no-check-certificate \
  https://github.com/bbatsov/prelude/raw/master/utils/installer.sh \
  -O - | sh`
+ Via git: `git clone https://github.com/bbatsov/prelude.git path/to/local/repo
ln -s path/to/local/repo ~/.emacs.d
cd ~/.emacs.d` or just `git clone https://github.com/bbatsov/prelude.git ~/.config/emacs/`

### Configuration

Let's see some custom configuration for Emacs Prelude now, for personal config use `personal/preload/*` or `personal/*` or `personal/prelude-modules.el` for prelude modules.

Here's an example for `~/.config/emacs/personal/preload/config.el`:
```elisp
(use-package sly
  :ensure t
  :init
  (setq inferior-lisp-program "sbcl"))
```

And for prelude-modules, use `personal/prelude-modules.el`. You can do this to copy the example config: `cp ~/.config/emacs/sample/prelude-modules.el ~/.config/emacs/personal/prelude-modules.el`.

## Closure

Have fun trying Emacs, fun programming and configurating!
