import  { appStorage } from ('localStorage');
//#region Seed Product on localstorage
appStorage.setItem(43264, JSON.stringify({
    "sku": 389234,
    "name": "Cama Box Suede Preto",
    "inventory": {
        "warehouses": [
            {
                "locality": "Santo André",
                "quantity": 4
            },
            {
                "locality": "São Bernardo do Campo",
                "quantity": 3
            },
            {
                "locality": "Matriz",
                "quantity": 12
            }
        ]
    }
}));
//#endregion
module.exports = appStorage;