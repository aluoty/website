---
title: An Introduction to Nix and NixOS
description: A short essay on Nix and NixOS.
date: 2026-06-21
tags:
  - linux
  - nixos
  - programming
---  

# Introduction
Nix and NixOS are 2 exceptional tools that I use daily.

Let me provide you with materials of them first: [Nix Wiki](https://en.wikipedia.org/wiki/Nix_(package_manager)), [Nix Source](https://github.com/NixOS/nix), [Nix and NixOS website](https://nixos.org), [NixOS Wiki](https://en.wikipedia.org/wiki/NixOS), [NixOS Source](https://github.com/NixOS/nixpkgs), [Nix and NixOS group on Github](https://github.com/NixOS), these are the websites you may be interested to visit. 

Let me introduce you to Nix and NixOS, Nix is both a programming language and a package manager. NixOS is an operating system based on Linux and Nix package manager and Nix language. However, Nix can also be installed on multiple OS and hosts, some notable exmaples are: Darwin-based(MacOS/OSX), other Linux-based operating systems, some BSD-based systems(OpenBSD and FreeBSD). 

## Nix Introduction
Nix is a purely functional programming language which means that it is mostly based on functions, similar to OCaml and Haskell. Nix as the package manager uses Nixpkgs, and Nixpkgs offers a wide selection of packages, surpassing AUR(~80k), Homebrew. Nixpkgs package count is ~120k.

## NixOS Introduction
NixOS is also exceptional operating system. Commonly paired with Btrfs filesystem that allow rollbacks. For example, when a package breaks, you can always rollback to the previous generation of the built system. It utilizes Nix, by having /etc/nixos folder, it contains hardware-configuration.nix, configuration.nix, home.nix(optional), flake.nix(optional), flake.lock(optional, used with flake.nix).

NixOS and Nix are often considered hard to use, by with some ideas in mind, it will be easier.

## Pre-Installation Guide
Before installing NixOS, it is good to know some things:
+ First, you usually do not install packages imperatively(through processes), you declare what your system is going to be
+ You have a wide selection of tools, but do not overwhelm yourself with them first
+ If you choose to erase a disk, backup things as the first experience for NixOS is best carried out on an empty drive
+ Rollbacks are available!
+ You have many packages available!

## Installation Guide
Let's dive right into the installation now, without further ado.

