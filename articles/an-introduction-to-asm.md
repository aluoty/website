# Introduction to ASM

Assembly, a low level language, used in many cases, including embedded programming, kernel development and low-level development.

It is often considered a very "hard" language due to its explicit design.

It first appeared in 1947. However, it still stands a ground in the modern days, mainly for learning and debugging.

## Introduction

Now, we are going to try some Assembly, first let's take a look at the specs:
  + Imperative
  + Unstructured
  + Sometimes Metaprogramming, Structured or Object Oriented
  + No typing discipline

## Details

Assembly also differs on different CPU arch, as it uses registers in CPUs that would not work the same in another CPU arch.

It also often ran via `assembling via assembler`, `linking` and then `running`.

However, on bare-metal setups, that differs.

## Bare-Metal

Bare metal is often considered as writing code without a typical Operating System. No system and kernel calls, only *you* managing even where a label in the code lives. However, bare metal programming can be tedious if you are emulating it.

For example, when emulating RISC-V on x86_64 via QEMU, you need to use UART, which is different from native hardware.

Thus, it is more encouraged to either buy a real board, or to program with kernel.

## Example

Let's see some examples, before deciding which CPU arch is best for you. 

x86_64 vs ARM vs RISC-V

+ x86_64:
  + CISC(Complex Instruction Set Computer)
  + Max raw computing power
  + Proprietary

+ ARM:
  + RISC(Reduced Instruction Set Computer
  + High energy efficiency, low heat
  + Proprietary

+ RISC-V:
  + RISC
  + Modular, custom extensions, scaling from microcontrollers to high-performance systems
  + Open

Although, x86_64 and ARM are still more used in the real programming world. For me, RISC-V is more elegant. 

Let's see some code examples now:
+ x86_64:
```assembly
; hello_x86.s (Intel Syntax)
global _start

section .text
_start:
    ; sys_write(fd=1, buf=msg, count=14)
    mov rax, 1          ; Linux sys_write syscall number
    mov rdi, 1          ; 1 = stdout
    mov rsi, msg        ; address of string
    mov rdx, 14         ; string length
    syscall             ; trigger system call

    ; sys_exit(status=0)
    mov rax, 60         ; Linux sys_exit syscall number
    xor rdi, rdi        ; status code 0
    syscall             ; trigger system call

section .data
msg: db "Hello, World!", 10  ; 10 is the ASCII newline character
```

+ arm:
```assembly
// hello_arm.s
.global _start

.text
_start:
    // sys_write(fd=1, buf=msg, count=13)
    mov x0, #1          // 1 = stdout
    ldr x1, =msg        // address of string
    mov x2, #13         // string length
    mov x8, #64         // Linux sys_write syscall number
    svc #0              // trigger software interrupt

    // sys_exit(status=0)
    mov x0, #0          // status code 0
    mov x8, #93         // Linux sys_exit syscall number
    svc #0              // trigger software interrupt

.data
msg:
    .ascii "Hello, World!\n"
```

+ risc-v:
```assembly
# hello_riscv.s
.global _start

.text
_start:
    # sys_write(fd=1, buf=msg, count=14)
    li a0, 1            # 1 = stdout
    la a1, msg          # load address of string
    li a2, 14           # string length
    li a7, 64           # Linux sys_write syscall number
    ecall               # trigger environment call

    # sys_exit(status=0)
    li a0, 0            # status code 0
    li a7, 93           # Linux sys_exit syscall number
    ecall               # trigger environment call

.data
msg:
    .string "Hello, World!\n"
```

## Closure

Now that you have decided your desired CPU arch for ASM, you can view [the RISC-V asm article](./riscv-asm.html) if you think it will help you! Bye!
