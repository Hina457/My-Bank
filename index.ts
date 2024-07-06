#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue("#".repeat(43)));
console.log(chalk.bgGray("Wellcome to Hina alvi bank Account project!"));
console.log(chalk.blue("#".repeat(43)));


//Bank Account interface
interface BankAccount{
    accountnumber:number,
    balance:number,
    withdraw(amount:number): void
    Deposit(amount:number): void
    checkbalance() :void
}
//Bank Account class
class BankAccount implements BankAccount{
    accountnumber: number;
    balance: number;

    constructor(accountNumber:number,balance:number){
    this.accountnumber = accountNumber;
    this.balance=balance
    }

    //Debit Money
    withdraw (amount:number):void{
        if(this.balance>=amount){
            this.balance -=amount;
            console.log(`Withdraw of $${amount} successful. Remaining balance:$${this.balance}`);
            
        }else{
            console.log("Insufficient balance.");
            
        }
    }
    //credit Money
    Deposit(amount: number): void {
        if(amount > 100){
            amount -= 1;
        }this.balance +=amount;
        console.log(`Deposit of $${amount} Successful. Remaining balance:$${this.balance}`); 
    }
    //Check balance
    checkbalance(): void {
        console.log(`Current balance:$${this.balance}`);
    }
}

//costomer class
class customer{
    firstName:string
    lastName:string
    gender:string
    age:number
    mobilenumber:number
    account:BankAccount

    constructor(firstName: string, lastName: string,   gender: string, age: number, mobilenumber: number, account: BankAccount)
    {
      this.firstName = firstName
      this.lastName = lastName 
      this.gender = gender
      this.age = age
      this.mobilenumber = mobilenumber
      this.account = account
    }
}

//Create bank accounts
 
const accounts:BankAccount[] =[
    new BankAccount (1001,500),
    new BankAccount (1002,1000),
    new BankAccount (1003,2000),
];

//Create customers
const customers: customer[] =[
    new customer ("Hina" ,"Alvi","female",20, 312465678 ,accounts[0]),
    new customer ("Duaa" ,"Alvi","female",21, 332465678 ,accounts[1]),
    new customer ("Mariya" ,"Alvi","female",18, 302465678 ,accounts[2]),
]

//function to interact  with bank account

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type:"number",
            message:"Enter your Account number:"
        })
        const customer = customers.find(customer => customer.account.accountnumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`wellcome,${customer.firstName} ${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name:"select",
                type:"list",
                message:"select an operation",
                choices:["Deposit","withdraw","check balance","Exit"]
            }]);

              
            switch(ans.select){

                case "Deposit":
                    const Deposit = await inquirer.prompt({
                        name:"Deposit",
                        type: "number",
                        message:"Enter the amount to deposit."
                    })
                    customer.account.Deposit(Deposit.Deposit)
                case "withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name:"amount",
                        type:"number",
                        message:"Enter the amount to deposit:"
                    })
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                  
                    case "check balance":
                        customer.account.checkbalance();
                        break;

                    case "Exit":
                        console.log("Exiting bank program...");
                        console.log("\nThank you for using our bank services.Have a great day!");
                        return;
                        
            }
            
        }else{
            console.log("Invalid account number.please try again.");
            
        }
    }while(true)
    
}
service()