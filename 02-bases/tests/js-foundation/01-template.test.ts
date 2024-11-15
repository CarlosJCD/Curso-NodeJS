import { emailTemplate } from "../../src/js-foundation/01-template"

const NAME_PLACEHOLDER = "{{name}}"
const ORDER_ID_PLACEHOLDER = "{{orderId}}"

describe("js-foundation/01-template.ts", () => {
    test("emailTemplate should contain a greeting", () => {
        expect(emailTemplate).toContain("Hi, ");
    })

    test("emailTemplate should contain a placeholder for the name of the customer", () => {
        expect(emailTemplate).toContain(NAME_PLACEHOLDER)
    })
    
    test("emailTemplate should contain a placeholder for the order id", () => {
        expect(emailTemplate).toContain(ORDER_ID_PLACEHOLDER)
    })

})