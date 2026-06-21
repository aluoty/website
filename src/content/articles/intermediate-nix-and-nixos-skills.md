---
title: Intermediate Nix and NixOS skills 
description: A short essay on intermediate Nix and NixOS skills and usage.
date: 2026-06-21
tags:
  - linux
  - nixos
  - programming
---  

# Introduction
Now that you have successfully driven a NixOS system, let's dive deeper in. 

## Table of Contents
Nix and NixOS has a lot of features, I will be covering these for now:
+ rebuilds and rollbacks
+ file strcture
+ nix-shell
+ flake
  + project-wide
+ home manager
+ configuration.nix
+ flake
  + system-wide
+ channels

All of these features together enables the user to create declarative environments with reproducibility that most of the users praise, favour and want.

## Rebuilds and Rollbacks
These are probably very important, and life-changing for usual Linux users.
First, let me tell you how to rebuild:
```bash
sudo nixos-rebuild switch # switch to a newer rebuild based on configuration.nix
sudo nixos-rebuild switch --flake /etc/nixos # switch to a newer rebuild based on flake.nix
```
And secondly, with BTRFS, you can boot into the NixOS systemd boot screen and see previous generations.
Or alternatively rollback with:
```bash
sudo nixos-rebuild switch --rollback
```
You can clean generations and unspecified packages(like via nix-shell), with:
```bash
sudo nix-collect-garbage -d
```
And those can be very interesting and useful for even daily usage. As this means that when something breaks, you can instantly rollback to a previous version that did not break. And it does not consume *a lot* of disk space.

## File Strcture
By learning this, you already know most of the differences of NixOS and other traditional linux distros.

First, you have /etc/nixos/ which stores your system-wide configs
And, /nix/store, which stores most of your software

Those are important to know, and NixOS looks at /nix/store, and create symlinks(via *ln*) to execute software.

## Nix-shell
Nix-shell is a tool that you should know, it can be split into these usages via these 2 procedures:
+ nix-shell -p ***
+ nix-shell # with shell.nix
First, let's try nix-shell -p ***, I have covered this briefly in [the first guide](an-introduction-to-nix-and-nixos) and I am going to reuse the example:
```bash
# Open your terminal first, whether GNOME terminal or Ptyxis in KDE
nix-shell -p fastfetch # This is nix-shell, it allows you to test tools that can be cleaned via sudo nix-collect-garbage -d
# After some time, you can do fastfetch
fastfetch
# Now you can exit the shell and the terminal
exit
# Close the terminal
```
And when reopening the terminal, you will see that fastfetch is gone, which I have explained, NixOS no longer knows the path and forgets the software, although it is still installed in /nix/store.

Secondly, let's try shell.nix. It is how you define a shell environment, here I will show you a basic example of shell.nix:
```nix
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  # Tools installed directly into the shell environment PATH
  packages = with pkgs; [
    nodejs
    git
  ];

  # Environment variables accessible inside the session
  ENV_VAR_EXAMPLE = "hello_world";

  # Commands executed automatically upon entering the shell
  shellHook = ''
    echo "Welcome to your reproducible development environment!"
    node --version
  '';
}
```
And when in the same directory as where that shell.nix is located at, you can:
```bash
nix-shell
```
And nodejs, git, and all those features will be activated, but upon exiting, nodejs disappears(if not installed globally)
However, shell.nix has recently been replaced by flake.nix with flake.lock.

## Nix flake(Project-wide)
Now, flake comes in, but not as system-wide, just like shell.nix but with more features.
Here, I will show you an example flake.nix that I use for Raylib:
```nix
{
  description = "Raylib C project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable"; # unstable channel for latest software
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux"; # arch
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        packages = [
          pkgs.raylib # for raylib
          pkgs.pkg-config
        ];

        shellHook = ''
          echo "Raylib dev shell ready" 
        ''; # spawns when entering the environment
      };
    };
}
```
And this has a lot of features, and things to know. However, for now, I do not have to explain much, and channels are explained later on.

## Home manager
Now this is very interesting, it takes Nix even further. It utilizes how a user is defined, for example(/etc/nixos/home.nix):
```nix
{ config, pkgs, ... }:

{
  # Home Manager needs a bit of information about you and the
  # paths it should manage.
  home.username = "yourusername";
  home.homeDirectory = "/home/yourusername";

  # This value determines the Home Manager release that your
  # configuration is compatible with. Do not change this value,
  # even if you update Home Manager.
  # This is the original version of installation
  home.stateVersion = "26.05";

  # The home.packages option allows you to install Nix packages into your
  # environment.
  home.packages = [
    pkgs.htop
    pkgs.git
    pkgs.neovim
    pkgs.tmux
  ];

  # Let Home Manager install and manage itself.
  programs.home-manager.enable = true;

  # Enable and configure your shell
  programs.bash = {
    enable = true;
    shellAliases = {
      ll = "ls -l";
    };
  };
}
```
And that is a short and sweet example of home.nix, however to have functionality of it, you need channels but that will be solved easier with flake.nix system wide. For now I would show you how to add the channel, for a setup without flake.nix(with flake.nix, this becomes obsolete, and will likely affect nothing):
```bash
nix-channel --add https://github.com/nix-community/home-manager/archive/master.tar.gz home-manager # unstable
nix-channel --update
```
However, it is recommended to use flake.nix, so let's forget that example just now, and move on.

## /etc/nixos/configuration.nix
This is where you register most of your stuff for the system to work. There are only some things to note:
+ If using home manager without flake.nix, you need to add imports in configuration.nix, but we are using flake.nix later
+ Best to have for nix flakes in configuration.nix: nix.settings.experimental-features = [ "nix-command" "flakes" ];
+ Best to enable unfree for packages like Chrome: nixpkgs.config.allowUnfree = true;
And that is almost it for configuration.nix.

## Nix flake(System-wide)
Now comes the interesting part, flake can also manage a whole system, here is what I use in /etc/nixos/flake.nix:
```nix
{
  description = "Alexander's NixOS Configuration";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager/master";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    nixvim = {
      url = "github:nix-community/nixvim";
    };
  };

  outputs = { nixpkgs, home-manager, nixvim, ... }:
  {
    nixosConfigurations.nixos =
      nixpkgs.lib.nixosSystem {
        system = "x86_64-linux";

        modules = [
          ./configuration.nix

          home-manager.nixosModules.home-manager

          {
            home-manager.useGlobalPkgs = true;
            home-manager.useUserPackages = true;

            home-manager.users.alex = {
              imports = [
                nixvim.homeModules.nixvim
                ./home.nix
              ];
            };
          }
        ];
      };
  };
}
```

This is very minimal, and also uses nixvim to manage my Neovim. And you can rebuild your system using:
```bash
sudo nixos-rebuild switch --flake /etc/nixos # if you do not have multiple hosts
```
However, most of the people do not need to have an advanced flake.nix with package tracking, channel tracking and such, but that will be learnt next time.

## Channels
This is the last part, which is channels. There are 2 types: Unstable(Rolling Cycle), and Stable(Point/Fixed-Release Cycle). I daily do use Unstable, but a lot of the times, people utilize how they use channels, eg, for project wide flake.nix, it is almost always on Unstable, while they can have a 26.05 channel system wide. And even more advanced, they can pin packages and allow both for system wide. 

And switching channels are easy in flake.nix, you just need to update the URL, to unstable/master, that depends and are fairly easy to know.

# Closure
This is the end of the intermediate Nix and NixOS skills guide, hope you enjoyed it and learnt something!
