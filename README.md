# regex-closer (WIP)

Closes editor windows that match the pattern.

## Use cases

Do you ever find it bothersome to have numerous windows open while developing? Personally, 
I don't enjoy having 30 windows cluttering my workspace. 
Consequently, after completing a task, 
I often run the `Close All Editor` command. 
However, a recurring issue is that some of the closed windows end up reopening. 
Additionally, if there are terminal windows, they close as well, 
forcing me to reopen them and restart any commands I had running. 
To address this, I created the regex-closer.

Imagine you are working with the inventory service, 
and you have files like `inventory-service.ts`, 
`inventory-service.spec.ts`, `inventory-module.ts`, 
`inventory-controller.ts`, `product-service.ts` 
and `product-service.spec.ts` open. 
In this scenario, you can easily close all the test files by using the `spec` keyword or close all services with the `service` keyword. 
You can even close all the inventory-related files by using the `inventory` keyword. 
The flexibility of using regex allows you to specify patterns like `service.*tsx?` or `cs|js`.


## TODO
  - [x] Allow close by label
  - [ ] Better selector interface
  - [ ] Memory of past patterns