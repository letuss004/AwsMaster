import {Stack, StackProps} from "aws-cdk-lib";
import {AttributeType, Table} from "aws-cdk-lib/aws-dynamodb";
import {Construct} from "constructs";

export class GenericTable {
  private name: string;
  private primaryKey: string;
  private stack: Stack;
  private table: Table | undefined;

  constructor(name: string, primaryKey: string, stack: Stack) {
    this.name = name;
    this.primaryKey = primaryKey;
    this.stack = stack;
    this.initialize();
  }

  private initialize() {
    this.createTable()
  }

  private createTable() {
    this.table = new Table(this.stack, this.name, {
      partitionKey: {
        name: this.primaryKey,
        type: AttributeType.STRING
      },
      tableName: this.name
    })
  }
}
