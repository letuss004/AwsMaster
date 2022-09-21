// import {handler} from "../services/node_lambda/hello";
import {handler} from "../services/DynamoDBTables/thisIsTable/Create";

const event = {
    body: {
        location: 'Paris'
    }
}


handler(event as any, {} as any);
