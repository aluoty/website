# RISC-V ASM

RISC-V Assembly is one of the cleanest Assembly you will find that can be used. It is clean for many reasons, mainly because it was designed in a clean-state approach, no historical baggage and decades of backward compatibility. 

It is also quite new, but its usage has been increasing for quite some time.

## Details

For our practices, we are not going to do bare-metal, as emulation for bare-metal can be quite confusing and doing bare-metal on real hardware can also be challenging.

We will be using an emulator called [QEMU](https://www.qemu.org/), you can download QEMU at its [download page](https://www.qemu.org/download/). If the package manager you are using is not listed, you can either compile it, or check for your package manager's page and search the package up.

You will also need riscv64 compatible gcc, and other riscv64 compatible binutils and gdb for debugging.

## Knowledge

Before writing any actual code, I will let you learn the basics of RISC-V ASM. 

### Registers

First, there are physical registers, in RISC-V, there are 32 general-purpose registers from `x0 to x31` by default.

|        Names             |       Details               |      Saver        |
|--------------------------|-----------------------------|-------------------|
|        x0, zero          |    Hard Wired 0             |       ---         |
|        x1, ra            |    Return Address           |      Caller       |
|        x2, sp            |    Stack Pointer            |      Callee       |
|        x3, gp            |    Global Pointer           |       ---         |
|        x4, tp            |    Thread Pointer           |       ---         |
|        x5-7, t0-2        |    Temporary Value          |      Caller       |
|        x8, s0/fp         | Saved Register/Frame Pointer|      Callee       |
|        x9, s1            |    Saved Register           |      Callee       |
|        x10-11, a0-1      |Function Argument/Return Values|    Caller       |
|        x12-17, a2-7      |    Function Argument        |      Caller       |
|        x18-27, s2-11     |    Saved Register           |      Callee       |
|        x28-31, t3-6      |     Temporary Value         |      Caller       |


Don't be too worried about registers, the most used ones are probably `ra`, `sp`, `a0`, `t0`, `s0`.

### Instructions

The syntax of RISC-V ASM follows `opcode rd, rs1, rs2`(dest, source, source2).
Here are some common examples:
```riscv
# Note that these are just examples, not real programs

li a0, 10 # Load immediate value of 10 into a0

addi a0, zero, 10 # Another way to load a0 with 10

li a1, 20
li a2, 5

sub a0, a1, a2 # a0 = a1 - a2

addi a0, a0, -5 # a0 = a0 -5

addi sp, sp, -16 # Init stack of 16 bytes
sw a0, 8(sp) # Store a0 value into sp with offset 8, *(sp+8)

lw a4, 8(sp) # Loads the value of value stored in sp with offset 8 into a4

beq a0, a1, equal_label # Check if equal, if equal, jump to equal_label, if not continue

blt a0, a1, less_label # Check if a0 < a1, if a0 < a1, jump to less_label, if not continue

equal_label: 
    addi a0, zero, 1 # Set a0 to zero + 1 = 1

less_label:
    addi a0, a0, 1 # a0 = a0 + 1

# Here are some pseudoinstructions and explanations

li a0, 42 # Translates to addi a0, zero, 42

mv a0, a1 # Copies value of a1 to a0, same as addi a0, a1, 0

addi sp, sp, 16 # Restore stack

call example_function # calls function, take args from a0, a1, ...

example_function:
    addi a0, a0, 10 # Changes a0 globally
    ret # Does not return value of a0
```

That's the basics. Honestly, that's enough to start off.

### Calls

The type of kernel call that is used when not using libc functions is `ecall`.

For example:
```riscv
li a7, 93          # Linux sys_exit system call number is 93
li a0, 0           # Argument 1: Return status code (0 = success)
ecall              # Trigger the system call
```


## Code

So, let's setup up the environment by first installing the packages listed, alternatively, I have a `flake.nix` here if you use nix:
```nix
{
  description = "RISC-V Development";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs }:
  let
    system = "x86_64-linux";

    pkgs = import nixpkgs {
      inherit system;
    };
  in
  {
    devShells.${system}.default =
      pkgs.mkShell {

      packages = with pkgs; [
        qemu
        pkgsCross.riscv64.buildPackages.gcc
        pkgsCross.riscv64.buildPackages.binutils
        gdb
      ];
    };
  };
}
```

Let's go, first, we can create a separate directory and touch a file, `touch hello.s` preferably.

Let's read some real RISC-V ASM code now, here's the example of Hello World, run by `riscv64-unknown-linux-gnu-as hello.s -o hello.o`, then `riscv64-unknown-linux-gnu-ld hello.o -o hello`, finally `qemu-riscv64 ./hello`:
```riscv
.global _start      # Provide program entry point to the linker

.text               # Section containing executable instructions
_start:
    # --- Step 1: Write "Hello, World!" to stdout ---
    li a0, 1        # Argument 1: File descriptor (1 = stdout)
    la a1, message  # Argument 2: Pointer to the string
    li a2, 14       # Argument 3: Length of the string (including \n)
    li a7, 64       # Linux system call number for sys_write (64)
    ecall           # Invoke the environment system call

    # --- Step 2: Exit the program safely ---
    li a0, 0        # Argument 1: Exit status code (0 = success)
    li a7, 93       # Linux system call number for sys_exit (93)
    ecall           # Invoke the environment system call

.data               # Section containing initialized data
message:
    .ascii "Hello, World!\n"
```

Here's another example that uses libc functions like `printf`, run by `riscv64-unknown-linux-gnu-gcc hello.s -o hello`, then `qemu-riscv64 ./hello`:
```riscv
.global main
.text

main:
     addi sp, sp, -16 # Initialize stack
     sd   ra, 8(sp) # Reserve ra for later

     la   a0, msg # Load a0 = msg
     call printf # calls printf from libc

     ld   ra, 8(sp)
     addi sp, sp, 16
     li   a0, 0
     ret

.data
msg:
    .string "Hello World!\n"
```

Here's another short program, a recursive factorial implementations using libc, run by `riscv64-unknown-linux-gnu-gcc factorial.s -o factorial`, and then `qemu-riscv64 ./factorial`:
```riscv
        .global main
        .text

main:
        # Prologue
        addi    sp, sp, -16
        sd      ra, 8(sp)

        # printf("What number ...");
        la      a0, ask
        call    printf

        # scanf("%d", &input);
        la      a0, fmt_in
        la      a1, input
        call    scanf

        # factorial(input)
        lw      a0, input            # load 32-bit int
        call    factorial

        # printf("The result is %d\n", result);
        mv      a1, a0
        la      a0, msg
        call    printf

        # return 0;
        ld      ra, 8(sp)
        addi    sp, sp, 16
        li      a0, 0
        ret


# int factorial(int n)
factorial:
        li      t0, 1
        ble     a0, t0, base

        # Stack frame
        addi    sp, sp, -16
        sd      ra, 8(sp)
        sw      a0, 4(sp)

        addi    a0, a0, -1
        call    factorial

        lw      t0, 4(sp)
        mulw    a0, a0, t0

        ld      ra, 8(sp)
        addi    sp, sp, 16
        ret

base:
        li      a0, 1
        ret


        .section .rodata
ask:
        .string "What number to pass as args for factorial n? "

fmt_in:
        .string "%d"

msg:
        .string "The result is %d\n"


        .section .bss
        .balign 4
input:
        .space 4
```

## Closure

You have now learnt the basics of RISC-V ASM, you can try to write more code. Mainly in three ways, kernel calls, bare-metal, libc calls. For learning on a different CPU arch, kernel calls is the subjective best, and you can also try libc. If you have a RISC-V arch controller, definitely try all three.

Hope you've learnt something, bye!
