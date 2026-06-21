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

### Obtaining Image
Let's dive right into the installation now, without further ado. First, let's proceed to the [installation page](https://nixos.org/download/) and head to the NixOS Graphical ISO Image section and install your with your CPU arch, whether ARM64(aarch64) or AMD64(x86_64).

### Flashing
Before booting into the graphical installer for NixOS, you should flash the image onto the drive first.
+ If you are on Linux, use:
```bash
lsblk # find the correct drive
sudo umount /dev/sdX* # unmount any mounted partitions
sudo dd bs=4M conv=fsync oflag=direct status=progress if=<path-to-image> of=/dev/sdX # flash the image
```
+ If you are on Windows, use Rufus, with DD mode, ISO mode will not work properly when I tested.
+ If you are on MacOS(OSX), use:
```bash
diskutil list # find the correct drive
diskutil unmountDisk /dev/disk[number] # unmount any mounted partitions
sudo dd bs=4M conv=fsync oflag=direct status=progress if=<path-to-image> of=/dev/sdX # flash the image, hopefully works
```

### Booting into NixOS
Now that you have flashed the image and are ready to go. Check what your boot key is, often F9-12, Del, or ESC. Then reboot your system by either finding a button or via:
```bash
sudo reboot # on Linux
```
After that, smash your boot key like crazy, and you will be prompted with a screen that has input devices. Choose the desired drive that you flashed the image onto, and press the *Enter* key. 

Again, you will be prompted with a screen that probably displays the selection for interface and respective kernel versions. The ones are probably: GNOME with latest kernel, GNOME with LTS kernel, KDE with latest kernel, KDE with LTS kernel. And for whatever one you choose, it does not affect what your system is going to be. For this example, I am choosing GNOME, while you can choose any one of them.

### Testing NixOS
You are in NixOS probably by now. You should first be prompted with an Installer. It guides you through things, but do not interact with it just yet. First, you can inspect the environment, one thing that I like to do is to test something, for example(if you have a drive that has enough size >~8GB): 
```bash
# Open your terminal first, whether GNOME terminal or Ptyxis in KDE
nix-shell -p fastfetch # This is nix-shell, it allows you to test tools that can be cleaned via sudo nix-collect-garbage -d
# After some time, you can do fastfetch
fastfetch
# Now you can exit the shell and the terminal
exit
# Close the terminal
```
And now once you try to open the terminal again and try fastfetch, it is not viable, as software are stored differently, I will explain that later on.
Now, you can try to inspect some simple /etc/nixos/configuration.nix config that online users or AI have to consider for the final time. If yes, then proceed onto the installer and install. You will be guided through Timezone, Locales(Best to set US English as primary locale for system, excluding Dates, etc.), your DE(XFCE, KDE, GNOME, or No Desktop for WM installation later on), then your users, and disk configuration(use entire disk) and in that choose BTRFS filesystem, it is crucial and you can have Swap. Then just proceed, and shortly, after <10min, you can reboot.

# Closure
Now with a new system, you can try edit /etc/nixos/configuration.nix briefly, for more guides, please take a look at [my second article regarding NixOS](intermediate-nix-and-nixos-skills.md).



